import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useUserStore = defineStore('user', () => {
  const version = ref(3)
  const favorites = ref([])
  const finished = ref([])

  function toggleFavorite(bookId) {
    let i = favorites.value.findIndex(id => id === bookId)
    if (i === -1) {
      favorites.value.push(bookId)
    } else {
      favorites.value.splice(i, 1)
    }
  }

  function toggleFinished(bookId) {
    let i = finished.value.findIndex(id => id === bookId)
    if (i === -1) {
      finished.value.push(bookId)
    } else {
      finished.value.splice(i, 1)
    }
  }

  return {version, favorites, finished, toggleFavorite, toggleFinished}
})
