<script setup lang="ts">
import { computed } from 'vue'
import { useContentStore } from '@/stores/contentStore'
import { useRouter } from 'vue-router'

const store = useContentStore()
const router = useRouter()

// Dynamic date
const formattedDate = computed(() => {
  const date = new Date()
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
})

function goToDetails() {
  router.push({ name: 'anime-detail' })
}

function pickRandom() {
  store.pickNextContent()
}
</script>

<template>
  <div v-if="store.selectedContent">
    <!-- Top Header with Date and Initials -->
    <div class="flex justify-between items-center px-6 py-4">
      <div class="text-xs text-gray-500 dark:text-gray-400 uppercase">{{ formattedDate }}</div>
      <div
        class="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-semibold rounded-full h-8 w-8 flex items-center justify-center"
      >
        {{ store.userInitials }}
      </div>
    </div>

    <!-- Main Content Card -->
    <div class="min-h-screen flex justify-center items-center bg-white dark:bg-gray-900 p-4">
      <div
        class="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:scale-105 transition-transform cursor-pointer"
        @click="goToDetails"
      >
        <img
          :src="store.selectedContent.thumbNailImage"
          alt="Banner"
          class="w-full h-64 object-cover"
        />

        <div class="p-4 flex justify-between items-center">
          <div class="flex items-center gap-3">
            <img :src="store.selectedContent.logo" class="h-10 w-10 rounded-full" />
            <div>
              <h2 class="font-bold text-gray-900 dark:text-white">
                {{ store.selectedContent.title }}
              </h2>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ store.selectedContent.subTitle }}
              </p>
            </div>
          </div>

          <!-- Refresh Button -->
          <button
            @click.stop="pickRandom"
            class="bg-blue-600 text-white text-xs px-3 py-1 rounded-full hover:bg-blue-700"
          >
            REFRESH
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
