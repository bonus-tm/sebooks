<template>
  <div id="app">
    <div class="fixed overflow-y-scroll w-96 h-screen border-r border-yellow-400 dark:border-gray-600 border-solid">
      <ul class="bg-yellow-50 dark:bg-gray-700">
        <li v-for="(author, i) in authors" :key="`auth-${i}`">
          <span class="pl-10 text-sm">{{ author.creator }}</span>
          <ul class="pb-4">
            <li
              v-for="book in booksByAuthor(author.creator)"
              :key="`auth-${i}-${book.id}`"
              :ref="book.id"
              :class="cssTitleInList(book.id)"
              class="flex pr-4 text-lg cursor-pointer"
              @click="openBook(book.id)"
            >
              <div class="pl-4 w-9">
                <icon-star
                  v-if="userData[book.id] && userData[book.id].marked"
                  class="w-5 h-5 mt-1 text-yellow-800 dark:text-yellow-300"
                  filled
                />
              </div>
              <div
                :class="[book.id === opened ? 'font-bold dark:text-yellow-300' : '']"
                class="pl-1"
              >
                {{ book.title }}
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <div class="absolute left-96 r-0 p-4">
      <book-item
        v-if="opened"
        :book="openedBook"
        :user-data="userData[opened]"
        @toggle="toggle"
      />
    </div>
  </div>
</template>

<script>
import localForage from 'localforage'
import uniqBy from 'lodash.uniqby'
import BookItem from '@/components/BookItem'
import books from './books.json'
import IconStar from '@/components/IconStar'

export default {
  name: 'App',
  components: {
    IconStar,
    BookItem
  },
  data () {
    return {
      books,
      sortableFields: ['authorSort', 'titleSort', 'wordsCount', 'readingEase'],
      sortBy: 'authorSort',
      opened: null,
      userData: {}
    }
  },
  computed: {
    authors () {
      return uniqBy(
        this.books.map(({creator, authorSort}) => ({
          creator,
          authorSort
        })),
        'authorSort'
      )
    },
    booksSorted () {
      return this.books.map(b => b)
        .sort((a, b) => {
          let fieldA = a[this.sortBy]
          let fieldB = b[this.sortBy]
          if (isFinite(fieldA) && isFinite(fieldB)) {
            return fieldA - fieldB
          } else {
            if (fieldA < fieldB) return -1
            if (fieldA > fieldB) return 1
            return 0
          }
        })
    },
    openedBook () {
      if (!this.opened) return {}
      let i = this.books.findIndex(book => book.id === this.opened)
      if (i !== -1) return this.books[i]
      return {}
    }
  },
  watch: {
    opened (newValue) {
      this.$refs[newValue][0].scrollIntoView({behavior: 'smooth'})
    }
  },
  async created () {
    this.opened = await localForage.getItem('opened')
    let userData = await localForage.getItem('userData')
    if (userData) this.userData = userData
  },
  methods: {
    async openBook (bookId) {
      this.opened = bookId
      await localForage.setItem('opened', this.opened)
    },
    booksByAuthor (creator) {
      return this.books.filter(book => book.creator === creator)
    },
    cssTitleInList (bookId) {
      return {
        'text-gray-400': this.userData[bookId]?.read,
        'dark:text-gray-500': this.userData[bookId]?.read
      }
    },
    async toggle (field) {
      if (!this.userData[this.opened]) {
        this.$set(this.userData, this.opened, {marked: false, read: false})
      }
      this.userData[this.opened][field] = !this.userData[this.opened][field]

      await localForage.setItem('userData', this.userData)
    }
  }
}
</script>
