<script setup>
import {onMounted, ref} from 'vue'
import {useRoute} from 'vue-router'
import {storeToRefs} from 'pinia'
import {getAuthors, getBooksByAuthor} from '@/services/books.js'
import {useUserStore} from '@/services/user.js'
import IconStar from '@/components/IconStar.vue'

const route = useRoute()
const userStore = useUserStore()
const {favorites, finished} = storeToRefs(userStore)

const authors = getAuthors()

const bookRefs = ref({})

onMounted(() => {
  bookRefs.value[route.params.bookId].scrollIntoView({block: 'center'})
})
</script>

<template>
  <ul class="h-full overflow-y-scroll py-4">
    <li v-for="(author, i) in authors" :key="`auth-${i}`">
      <span class="pl-10 text-sm">
        {{ author.creator }}
      </span>
      <ul class="pb-4">
        <li
          v-for="book in getBooksByAuthor(author.creator)"
          :key="`auth-${i}-${book.id}`"
          :ref="(el) => {bookRefs[book.id] = el}"
          :class="{'bg-yellow-300': book.id === route.params.bookId}"
          class="flex pr-4 text-lg cursor-pointer"
        >
          <div class="pl-4 w-9">
            <icon-star
              v-if="favorites.includes(book.id)"
              :class="[book.id === route.params.bookId ? 'dark:text-yellow-800' : 'dark:text-yellow-300']"
              class="w-5 h-5 mt-1 text-yellow-800"
              filled
            />
          </div>
          <router-link
            :class="[
              {'dark:text-yellow-800': book.id === route.params.bookId},
              {'text-gray-400': finished.includes(book.id)},
              {'dark:text-gray-500': finished.includes(book.id)},
            ]"
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
