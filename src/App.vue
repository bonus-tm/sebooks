<script setup>
import {onMounted, watch} from 'vue'
import {getActivePinia, storeToRefs} from 'pinia'
import {useUserStore} from '@/services/user.js'

const userStore = useUserStore()
const {favorites, finished} = storeToRefs(userStore)

onMounted(() => {
  let userData = localStorage.getItem('userData') || '{}'
  userData = JSON.parse(userData)
  favorites.value = userData.user?.favorites || []
  finished.value = userData.user?.finished || []

  let pinia = getActivePinia()
  watch(
    pinia.state,
    state => {
      localStorage.setItem('userData', JSON.stringify(state))
    },
    {deep: true}
  )
})
</script>

<template>
  <router-view />
</template>
