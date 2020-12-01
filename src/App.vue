<template>
  <div id="app">
    <div class="fixed ml-96 mt-4">
      <book-item
        v-if="opened"
        :book="openedBook"
        :user-data="userData[opened]"
        @toggle="toggle"
      />
    </div>
    <ul class="fixed overflow-y-scroll w-96 h-screen">
      <li v-for="(author, i) in authors" :key="`auth-${i}`">
        <span class="pl-10 text-sm">{{ author.creator }}</span>
        <ul class="pb-4">
          <li
            v-for="book in booksByAuthor(author.creator)"
            :key="`auth-${i}-${book.id}`"
            :class="cssTitleInList(book.id)"
            class="flex pr-4 text-lg cursor-pointer hover:bg-yellow-50"
            @click="opened = book.id"
          >
            <div
              :class="{'bg-yellow-100': book.id === opened}"
              class="pl-4 w-9"
            >
              <icon-star
                v-if="userData[book.id] && userData[book.id].marked"
                class="w-5 h-5 mt-1"
                filled
              />
            </div>
            <div class="pl-1" :class="{'font-bold': book.id === opened}">
              {{ book.title }}
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
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
  methods: {
    booksByAuthor (creator) {
      return this.books.filter(book => book.creator === creator)
    },
    cssTitleInList (bookId) {
      return {'text-gray-400': this.userData[bookId]?.read}
    },
    toggle (field) {
      if (!this.userData[this.opened]) {
        this.$set(this.userData, this.opened, {marked: false, read: false})
      }
      this.userData[this.opened][field] = !this.userData[this.opened][field]
    }
  }
}
</script>
