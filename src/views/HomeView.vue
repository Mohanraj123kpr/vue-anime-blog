<script setup lang="ts">
import { computed } from 'vue'
import { useContentStore } from '@/stores/contentStore'
import { useRouter } from 'vue-router'
import Button from '@/components/Button.vue'
import ContentCard from '@/components/ContentCard.vue'
import userAvatar from '@/components/userAvatar.vue'
import { clearToken } from '@/services/api'

const store = useContentStore()
const router = useRouter()

// Format current date
const formattedFullDate = computed(() => {
  const date = new Date()
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
})

// Navigate to detail view
const goToDetails = () => {
  router.push({ name: 'anime-detail' })
}

// Handle user logout
const handleLogout = () => {
  router.push({ name: 'login' })
}
// Pick a random content item
const pickRandom = () => {
  try {
    store.pickNextContent()
  } catch (error) {
    console.error('Failed to pick random content:', error)
  }
}
</script>
<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Header with Date and User Initials -->
    <div class="flex justify-between items-center px-4 sm:px-6 pt-6">
      <!-- Date and Heading -->
      <div>
        <div class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          {{ formattedFullDate }}
        </div>
        <div class="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">Today</div>
      </div>

      <!-- User Avatar -->
      <div class="flex items-center">
        <userAvatar
          :userName="store.selectedContent.userName"
          userAction="Logout"
          @userActionClick="handleLogout"
        />
      </div>
    </div>

    <!-- Main Content Card -->
    <div
      v-if="store.selectedContent"
      class="flex justify-center items-center px-4 sm:px-6 py-8 sm:py-10"
    >
      <ContentCard
        :title="store.selectedContent.title"
        :subtitle="store.selectedContent.subTitle"
        :logo="store.selectedContent.logo"
        :thumbnail="store.selectedContent.thumbNailImage"
        :onCardClick="goToDetails"
      >
        <template #action>
          <Button :onClick="pickRandom" label="REFRESH">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </Button>
        </template>
      </ContentCard>
    </div>

    <!-- Fallback -->
    <div v-else class="text-center py-20 text-gray-400 text-sm">
      No content found. Try refreshing.
    </div>
  </div>
</template>
