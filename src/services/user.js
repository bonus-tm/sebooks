import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useUserStore = defineStore('user', () => {
  const version = ref(3)
  const marked = ref([])
  const read = ref([])

  return {version, marked, read}
})
