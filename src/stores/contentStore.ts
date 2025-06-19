import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { authUser, fetchContent } from '@/services/api'
export const useContentStore = defineStore('counter', () => {
  const count = ref(0)
  const content = ref(null as any)
  const loading = ref(false)
  const error = ref(null as any)

  function fetchContentData() {
    fetchContent()
  }

  function login(email: string) {
    loading.value = true
    error.value = null
    authUser(email)
  }
  return { count, fetchContentData, login, content, loading, error }
})
