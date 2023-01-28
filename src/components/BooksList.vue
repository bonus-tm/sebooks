<script setup>
import IconStar from '@/components/IconStar.vue'
import {onMounted} from 'vue'
import {getAuthors, getBooksByAuthor} from '@/services/books.js'
import {useUserStore} from '@/services/user.js'

const props = defineProps({
  openBookId: {type: String, default: ''},
})

const userStore = useUserStore()

const authors = getAuthors()

/*
const booksSorted = computed(() => {
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
})
*/

onMounted(() => {
  // TODO fix not working scroll
  // this.$nextTick(() => {
  //   this.$refs[this.userData.openedBookId][0].scrollIntoView({block: 'center'})
  // })
})

const cssTitleInList = bookId => {
  return {
    'text-gray-400': userStore.read.includes(bookId),
    'dark:text-gray-500': userStore.read.includes(bookId)
  }
}
</script>

<template>
  <ul class="h-full overflow-y-scroll py-4">
    <li v-for="(author, i) in authors" :key="`auth-${i}`">
      <span class="pl-10 text-sm">{{ author.creator }}</span>
      <ul class="pb-4">
        <li
          v-for="book in getBooksByAuthor(author.creator)"
          :key="`auth-${i}-${book.id}`"
          :ref="book.id"
          :class="cssTitleInList(book.id)"
          class="flex pr-4 text-lg cursor-pointer"
          @click="$emit('open', book.id)"
        >
          <div class="pl-4 w-9">
            <icon-star
              v-if="userStore.marked.includes(book.id)"
              class="w-5 h-5 mt-1 text-yellow-800 dark:text-yellow-300"
              filled
            />
          </div>
          <router-link
            :class="[book.id === props.openBookId ? 'bg-yellow-300 dark:text-yellow-800' : '']"
            :to="{name: 'book', params: {bookId: book.id}}"
            class="pl-1 no-underline"
          >
            {{ book.title }}
          </router-link>
        </li>
      </ul>
    </li>
  </ul>
</template>
