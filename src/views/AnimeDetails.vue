<script setup lang="ts">
import { computed } from 'vue'
import { useContentStore } from '@/stores/contentStore' // Adjust path as needed

const store = useContentStore()

// Computed to extract body content from selectedContent.text
const content = computed(() => {
  if (!store.selectedContent) return null
  const html = store.selectedContent.text || ''
  const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
  const body = match ? match[1] : html
  return {
    ...store.selectedContent,
    text: enhanceParagraphs(body),
  }
})

function enhanceParagraphs(html: string): string {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  doc.querySelectorAll('p').forEach((p) => {
    const words = p.textContent?.trim().split(/\s+/) || []
    if (words.length >= 3) {
      const boldPart = words.slice(0, 3).join(' ')
      const rest = words.slice(3).join(' ')
      p.innerHTML = `<strong class="font-semibold">${boldPart}</strong> ${rest}`
    }
  })

  return doc.body.innerHTML
}

function pickRandom() {
  store.pickNextContent()
}
</script>

<template>
  <div
    v-if="content"
    class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white overflow-x-hidden"
  >
    <!-- Thumbnail Banner -->
    <img
      :src="content.thumbNailImage"
      alt="Thumbnail"
      class="w-full h-72 sm:h-80 object-cover shadow-md"
    />

    <!-- Main Container -->
    <div class="p-6 sm:p-8 max-w-3xl mx-auto space-y-6">
      <!-- Header Row -->
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-4">
          <img
            :src="content.logo"
            alt="Logo"
            class="h-12 w-12 rounded-full border-2 border-blue-500 shadow-sm"
          />
          <div>
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
              {{ content.title }}
            </h1>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ content.subTitle }}
            </p>
          </div>
        </div>

        <!-- Refresh Button -->
        <button
          @click="pickRandom"
          class="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xs font-medium px-4 py-2 rounded-full shadow-lg transition"
        >
          REFRESH
        </button>
      </div>

      <!-- Main Image -->
      <img
        :src="content.mainImage"
        alt="Main"
        class="w-full max-w-lg mx-auto rounded-xl shadow-lg"
      />

      <!-- HTML Content Body -->
      <div
        class="prose dark:prose-invert max-w-none prose-p:leading-7 prose-p:text-[1.05rem] prose-p:font-sans"
        v-html="content.text"
      />
    </div>
  </div>
</template>

<style scoped>
p {
  margin-bottom: 10px;
}
.prose p {
  margin-bottom: 1rem;
  font-size: 1.05rem;
  line-height: 1.7;
  font-family: system-ui, sans-serif;
}
</style>
