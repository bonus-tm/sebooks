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
    url: url.substr(4),
    title,
    subject: subject.map(({_}) => _),
    description,
    language,
    creator
  }

  const propertiesToUse = {
    'file-as': {
      refinesToUse: {
        '#author': {key: 'authorSort'},
        '#title': {key: 'titleSort'}
      }
    },
    'se:subject': {key: 'tags', array: true},
    'belongs-to-collection': {key: 'collection', keep: 'id'},
    'collection-type': {key: 'collectionType', keep: 'refines'},
    'group-position': {key: 'groupPosition', keep: 'refines'},
    'se:long-description': {key: 'description'},
    'se:word-count': {key: 'wordsCount'},
    'se:reading-ease.flesch': {key: 'readingEase'},
    'se:url.vcs.github': {key: 'urlGithub'},
    'se:url.encyclopedia.wikipedia': {key: 'urlWikipedia'},
    'se:name.person.full-name': {
      refinesToUse: {
        '#author': {key: 'authorFullName'}
      }
    }
  }

  for (let {_, $: {id, property, refines}} of meta) {
    if (property in propertiesToUse) {
      let {key, refinesToUse, array, keep} = propertiesToUse[property]
      if (refinesToUse && refines in refinesToUse) {
        key = refinesToUse[refines].key
      }
      if (key) {
        if (array) {
          if (!info[key]) info[key] = []
          info[key].push(_)
        } else {
          info[key] = _
        }

        if (key === 'urlGithub') {
          info.id = _.substr(34)
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
  let booksDirs = fs.readdirSync(ebooksDir, {withFileTypes: true})
  let booksCount = booksDirs.length
  console.log(`Found ${booksCount} books.\n`)
  let books = []

  for (let [i, bookDir] of booksDirs.entries()) {
    if (bookDir.isDirectory()) {
      try {
        console.log(`Loading "${bookDir.name}"`)
        let bookData = await loadBookData(path.join(ebooksDir, bookDir.name))
        books.push(formatBookData(bookData))

        console.log('Copy cover.jpg')
        copyCoverImage(bookDir.name, ebooksDir, path.join(dir, 'public', 'covers'))

        console.log(`OK — ${i + 1} of ${booksCount}`)
      } catch (e) {
        console.log(e)
      }
    }
  }

  fs.writeFileSync(path.join(dir, 'src', 'books.json'), JSON.stringify(books))
}

main()
