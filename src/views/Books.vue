<script setup>
import {useRoute, useRouter} from 'vue-router'
import {getFirstBook} from '@/services/books.js'
import BooksList from '@/components/BooksList.vue'

const route = useRoute()

if (!route.params.bookId) {
  const book = getFirstBook()
  const router = useRouter()
  router.replace({name: 'book', params: {bookId: book.id}})
}
</script>

<template>
  <div class="fixed top-0 bottom-0 w-96 dark:bg-gray-800">
    <BooksList />
  </div>
  <div class="ml-96 h-full">
    <router-view />
  </div>
</template>
