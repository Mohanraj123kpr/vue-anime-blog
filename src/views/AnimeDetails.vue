<script setup lang="ts">
import { computed } from 'vue'
import { useContentStore } from '@/stores/contentStore' // Adjust path as needed

const store = useContentStore()
const emit = defineEmits(['refresh-request'])

// Computed to extract body content from selectedContent.text
const content = computed(() => {
  if (!store.selectedContent) return null
  const html = store.selectedContent.text || ''
  const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
  const bodyContent = match ? match[1] : html
  return {
    ...store.selectedContent,
    text: bodyContent,
  }
})

function pickRandom() {
  store.pickNextContent()
}
</script>

<template>
  <div v-if="content" class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
    <img :src="content.thumbNailImage" class="w-full h-64 object-cover" />

    <div class="p-4 max-w-2xl mx-auto space-y-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-3">
          <img :src="content.logo" class="h-10 w-10 rounded-full" />
          <div>
            <h1 class="text-xl font-bold">{{ content.title }}</h1>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ content.subTitle }}</p>
          </div>
        </div>

        <!-- Emit event on click -->
        <button
          class="bg-blue-600 text-white text-xs px-3 py-1 rounded-full hover:bg-blue-700"
          @click="pickRandom"
        >
          REFRESH
        </button>
      </div>

      <img :src="content.mainImage" class="w-full max-w-md mx-auto rounded-md shadow" />

      <div class="prose dark:prose-invert max-w-none" v-html="content.text"></div>
    </div>
  </div>
</template>
