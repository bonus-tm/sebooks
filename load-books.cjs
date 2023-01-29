const fs = require('fs')
const path = require('path')
const xml2js = require('xml2js')

const dir = path.resolve()
const ebooksDir = '../standardebooks.org/web/www/ebooks'

/**
 * Достать основную инфу книжки из xml и сформировать нормальный объект
 * @param content
 * @returns {{identifier: string, creator: *, subject: *, description: *, language: *, title: *}}
 */
const formatBookData = content => {
  let {
    'dc:identifier': [{_: url}],
    'dc:title': [{_: title}],
    'dc:subject': subject,
    'dc:description': [{_: description}],
    'dc:language': [language],
    'dc:creator': [{_: creator}],
    meta
  } = content.package.metadata[0]

  let info = {
    url: url.substring(4),
    title,
    subject: subject.map(({_}) => _),
    description,
    language,
    creator
  }

  // Дальше идёт очень замороченная хрень, но такой вот формат XML, чёрт ногу сломит
  const propertiesToUse = {
    'file-as': {
      refinesToUse: {
        '#author': {key: 'authorSort'},
        '#title': {key: 'titleSort'}
      }
    },
    'se:subject': {key: 'tags', array: true},
    'belongs-to-collection': {key: 'belongsToCollection', array: true},
    'collection-type': {key: 'collectionType', refinesKey: 'belongsToCollection'},
    'group-position': {key: 'position', refinesKey: 'belongsToCollection', isNumber: true},
    'se:long-description': {key: 'description'},
    'se:word-count': {key: 'wordsCount', isNumber: true},
    'se:reading-ease.flesch': {key: 'readingEase', isNumber: true},
    'se:url.vcs.github': {key: 'urlGithub'},
    'se:url.encyclopedia.wikipedia': {key: 'urlWikipedia'},
    'se:name.person.full-name': {
      refinesToUse: {
        '#author': {key: 'authorFullName'}
      }
    }
  }

  for (let {_: value, $: {id, property, refines}} of meta) {
    if (property in propertiesToUse) {
      let {key, refinesToUse, refinesKey, array, isNumber} = propertiesToUse[property]

      if (isNumber) {
        value = Number(value)
      }

      if (refinesToUse && refines in refinesToUse) {
        key = refinesToUse[refines].key
      }

      if (key) {
        if (array) {
          info[key] ??= []

          if (id) {
            // массив объектов, типа коллекций
            info[key].push({id, [key]: value})
          } else {
            // просто массив строк — например, теги
            info[key].push(value)
          }
        } else if (refinesKey) {
          // дописать поле в один из объектов, id которого === refines, в массиве refinesKey
          let el = info[refinesKey].find(element => `#${element.id}` === refines)
          el[key] = value
        } else {
          info[key] = value
        }

        if (key === 'urlGithub') {
          info.id = value.substring(34)
        }
      }
    }
  }

  return info
}

/**
 * Загрузить xml из content.opf и конвертировать в json
 * @param bookPath
 * @returns {Promise<{identifier: string, creator: *, subject: *, description: *, language: *, title: *}>}
 */
const loadBookData = async bookPath => {
  let xmlString = fs.readFileSync(
    path.join(bookPath, 'src', 'epub', 'content.opf')
  )
  return xml2js.parseStringPromise(xmlString)
}

/**
 * Скопировать обложку книги
 * @param bookName
 * @param srcPath
 * @param destPath
 */
const copyCoverImage = (bookName, srcPath, destPath) => {
  fs.copyFileSync(
    path.join(srcPath, bookName, 'images', 'cover.jpg'),
    path.join(destPath, `${bookName}.jpg`)
  )
}

/**
 * @returns {Promise<void>}
 */
const main = async () => {
  let booksDirs = []
  // отобрать только фолдеры
  let list = fs.readdirSync(ebooksDir, {withFileTypes: true})
  for (let entry of list) {
    if (entry.isDirectory()) {
      booksDirs.push(entry)
    }
  }

  let booksCount = booksDirs.length
  console.log(`Found ${booksCount} books.\n`)

  let result = {
    updatedAt: null,
    updatedAtHuman: null,
    books: [],
    authors: [],
    series: [],
    sets: [],
    tags: [],
  }

  // Получить основную инфу о книгах из XML
  for (let [i, bookDir] of booksDirs.entries()) {
    if (bookDir.isDirectory()) {
      try {
        process.stdout.write(`${i + 1} of ${booksCount}: "${bookDir.name}" loading... `)

        let bookData = await loadBookData(path.join(ebooksDir, bookDir.name))
        result.books.push(formatBookData(bookData))

        process.stdout.write('done, Copy cover.jpg... ')
        copyCoverImage(bookDir.name, ebooksDir, path.join(dir, 'public', 'covers'))

        console.log('OK')
      } catch (e) {
        console.log(e)
      }
    }
  }
  console.log(`\nLoaded ${result.books.length} books`)

  // Проиндексировать по авторам, сериям, сетам и тегам
  for (let book of result.books) {
    // авторы
    let i = result.authors.findIndex(a => a.creator === book.creator)
    if (i === -1) {
      result.authors.push({
        creator: book.creator,
        authorSort: book.authorSort,
        authorFullName: book.authorFullName,
        books: [{id: book.id}],
      })
    } else {
      result.authors[i].books.push({id: book.id})
    }

    // коллекции — серии и сеты
    for (let collection of book.belongsToCollection || []) {
      let  collectionType = collection.collectionType === 'series' ? 'series' : 'sets'

      let i = result[collectionType].findIndex(c => c.name === collection.belongsToCollection)
      if (i === -1) {
        result[collectionType].push({
          name: collection.belongsToCollection,
          collectionType: collection.collectionType,
          books: [{id: book.id, position: collection.position}],
        })
      } else {
        result[collectionType][i].books.push({id: book.id, position: collection.position})
      }
    }

    // теги
    for (let tag of book.tags) {
      let i = result.tags.findIndex(t => t.name === tag)
      if (i === -1) {
        result.tags.push({
          name: tag,
          books: [{id: book.id}],
        })
      } else {
        result.tags[i].books.push({id: book.id})
      }
    }
  }

  // отсортировать книги в авторах
  for (let author of result.authors) {
    author.books.sort((a, b) => {
      if (a.id < b.id) return -1
      if (a.id > b.id) return 1
      return 0
    })
  }

  // отсортировать книги в сериях и сетах
  for (let series of result.series) {
    series.books.sort((a, b) => a.position - b.position)
  }
  for (let set of result.sets) {
    set.books.sort((a, b) => a.position - b.position)
  }

  // отсортировать книги в тегах
  for (let tag of result.tags || []) {
    tag.books.sort((a, b) => {
      if (a.id < b.id) return -1
      if (a.id > b.id) return 1
      return 0
    })
  }


  result.updatedAt = Date.now()
  result.updatedAtHuman = Date().toLocaleString()

  fs.writeFileSync(path.join(dir, 'src', 'books.json'), JSON.stringify(result, null, 2))
}

main()
