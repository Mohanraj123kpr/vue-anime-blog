import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { fetchContent } from '@/services/api'
import { login } from '@/services/api'
export const useContentStore = defineStore('counter', () => {
  const count = ref(0)
  const content = ref(null as any)
  const loading = ref(false)
  const error = ref(null as any)

  function fetchContentData() {
    loading.value = true
    error.value = null
    fetchContent()
      .then((response) => {
        content.value = response.data
      })
      .catch((err) => {
        error.value = err
      })
      .finally(() => {
        loading.value = false
      })
  }

  function login() {
    loading.value = true
    error.value = null
  }
  return { count, fetchContentData, content, loading, error }
})
