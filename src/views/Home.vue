<script setup>
import {useRouter} from 'vue-router'

console.log('Home created')
const router = useRouter()
router.replace({name: 'books'})
</script>

<template>
  <h1>Books home</h1>
  <router-link :to="{name: 'books'}">
    View books
  </router-link>
</template>

<style scoped>
</style>
