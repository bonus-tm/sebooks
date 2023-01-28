<script setup>
console.log('Home created')
</script>

<template>
  <h1>Books home</h1>
  <router-link :to="{name: 'books'}">
    View books
  </router-link>
</template>

<style scoped>
</style>
