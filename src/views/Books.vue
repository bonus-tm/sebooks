<script setup>
import BooksList from '@/components/BooksList.vue'
</script>

<template>
  <div class="fixed top-0 bottom-0 w-96 dark:bg-gray-800">
    <BooksList />
  </div>
  <div class="ml-96 h-full">
    <router-view />
  </div>
</template>
