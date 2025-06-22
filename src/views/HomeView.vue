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
  <div v-if="store.selectedContent" class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Top Header with Date and User Initials -->
    <div class="flex justify-between items-center px-6 py-4">
      <div class="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">
        {{ formattedDate }}
      </div>
      <div
        class="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-bold rounded-full h-9 w-9 flex items-center justify-center shadow-inner"
      >
        {{ store.userInitials }}
      </div>
    </div>

    <!-- Main Content Card -->
    <div class="flex justify-center items-center px-4 py-10">
      <div
        class="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] cursor-pointer animate-fade-in"
        @click="goToDetails"
      >
        <!-- Banner Image -->
        <img
          :src="store.selectedContent.thumbNailImage"
          alt="Banner"
          class="w-full h-72 object-cover"
        />

        <!-- Details Section -->
        <div class="p-6 space-y-4">
          <!-- Title & Avatar Row -->
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-4">
              <img
                :src="store.selectedContent.logo"
                class="h-12 w-12 rounded-full border-2 border-blue-500 shadow-md"
                alt="Avatar"
              />
              <div>
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white leading-tight">
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
              class="bg-gradient-to-r cursor-pointer from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xs font-medium px-4 py-1.5 rounded-full shadow-md transition-colors duration-200"
            >
              REFRESH
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
