<script setup>
import BooksList from '@/components/BooksList.vue'

const props = defineProps({
  bookId: {type: String, default: ''},
})

console.log('Books created')
</script>

<template>
  <div class="fixed top-0 bottom-0 w-96 dark:bg-gray-800">
    <BooksList :open-book-id="props.bookId" />
  </div>
  <div class="ml-96 h-full">
    <router-view />
  </div>
</template>
