<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useContentStore } from '@/stores/contentStore'

const router = useRouter()
const store = useContentStore()

const email = ref('')
const error = ref('')

// Handle login action
const handleLogin = async () => {
  try {
    await store.login(email.value)
    router.push({ name: 'home' }) // Navigate to home after successful login
  } catch (err) {
    error.value = 'Login failed. Please try again.'
    console.error('Login error:', err)
  }
}

// Computed: validate email format
const isEmailValid = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.value.trim())
})
</script>

<template>
  <div
    class="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-100 to-white dark:from-gray-900 dark:to-gray-800 px-6 py-12"
  >
    <!-- Login Card -->
    <div
      class="w-full sm:max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-xl p-8 transition-all duration-300"
    >
      <div class="text-center mb-6">
        <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white">🌸 AnimeVerse</h1>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Enter your email to explore anime content
        </p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >Email address</label
          >
          <input
            v-model="email"
            type="email"
            id="email"
            required
            placeholder="you@example.com"
            class="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <Button
          type="submit"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!isEmailValid"
        >
          Continue
        </Button>
      </form>

      <p v-if="error" class="text-sm text-red-500 mt-4 text-center">{{ error }}</p>
    </div>
  </div>
</template>
