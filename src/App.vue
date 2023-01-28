<script setup>
import {computed, onBeforeMount, ref} from 'vue'
import localForage from 'localforage'
import BookItem from '@/views/BookItem.vue'
// import IconStar from '@/components/IconStar.vue'
import BooksList from '@/components/BooksList.vue'
import {books} from '@/books.json'

let sortableFields = ['authorSort', 'titleSort', 'wordsCount', 'readingEase']
let sortBy = 'authorSort'

let userData = ref({
  version: 2,
  marked: [],
  read: [],
  openedBookId: books[0].id,
  sortBy: 'authorSort',
  filterBy: []
})

const openedBook = computed(() => {
  let id = userData.value.openedBookId
  let book = books.find(book => book.id === id)
  let marked = userData.value.marked.includes(id)
  let read = userData.value.read.includes(id)
  return {...book, marked, read}
})

onBeforeMount(async () => {
  console.log('App created')
  userData.value = await localForage.getItem('userData')

  // Convert user data to version 2
  if (userData.value && userData.value.version !== 2) {
    let opened = await localForage.getItem('opened')
    let v2 = {
      version: 2,
      marked: [],
      read: [],
      openedBookId: opened || books[0].id,
      sortBy: 'authorSort',
      filterBy: []
    }
    for (let [id, {read, marked}] of Object.entries(userData)) {
      if (marked) v2.marked.push(id)
      if (read) v2.read.push(id)
    }
    userData.value = {...v2}
    await saveUserData()
    await localForage.removeItem('opened')
  }

  await loadUserData()
})

const openBook = async bookId => {
  userData.value.openedBookId = bookId
  await saveUserData()
}

/**
 * @param {String} property is 'marked' or 'read'
 * @returns {Promise<void>}
 */
const toggle = async property => {
  let id = userData.value.openedBookId
  if (userData.value[property].includes(id)) {
    let i = userData.value[property].findIndex(bookId => bookId === id)
    userData.value[property].splice(i, 1)
  } else {
    userData.value[property].push(id)
  }
  await saveUserData()
}

const saveUserData = async () => {
  await localForage.setItem('userData', userData.value)
}
const loadUserData = async () => {
  let data = await localForage.getItem('userData')
  if (data) {
    for (let [key, value] of Object.entries(data)) {
      userData.value[key] = value
    }
  }
}
</script>

<template>
  <router-view />
</template>
