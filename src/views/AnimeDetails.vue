<script setup lang="ts">
import { computed } from 'vue'
import { useContentStore } from '@/stores/contentStore'

const store = useContentStore()

const content = computed(() => {
  if (!store.selectedContent) return null

  const html = store.selectedContent.text || ''
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
  const bodyContent = bodyMatch ? bodyMatch[1] : html

  console.log(store.selectedContent, 'selectedContent')

  return {
    ...store.selectedContent,
    text: enhanceContent(bodyContent),
    images: extractImages(bodyContent),
  }
})

function enhanceContent(html: string): string {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  // Enhance paragraphs (first 3 words bold)
  doc.querySelectorAll('p').forEach((p) => {
    const words = p.textContent?.trim().split(/\s+/) || []
    if (words.length >= 3) {
      const boldPart = words.slice(0, 3).join(' ')
      const rest = words.slice(3).join(' ')
      p.innerHTML = `<strong class="font-semibold">${boldPart}</strong> ${rest}`
    }
  })

  // Process images
  doc.querySelectorAll('img').forEach((img) => {
    img.classList.add('rounded-lg', 'shadow-md', 'my-4', 'mx-auto', 'max-w-full')
    if (!img.alt) img.alt = store.selectedContent?.title || ''
  })

  return doc.body.innerHTML
}

function extractImages(html: string): Array<{ src: string; alt: string }> {
  const imgRegex = /<img[^>]+src="([^">]+)"(?:[^>]+alt="([^">]*)")?[^>]*>/g
  const images = []
  let match

  while ((match = imgRegex.exec(html)) !== null) {
    images.push({
      src: match[1],
      alt: match[2] || store.selectedContent?.title || '',
    })
  }

  return images
}

function pickRandom() {
  store.pickNextContent()
}
</script>

<template>
  <div
    v-if="content"
    class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white overflow-x-hidden transition-colors duration-300"
  >
    <!-- Thumbnail Banner with gradient overlay -->
    <div class="relative">
      <img
        :src="content.thumbNailImage"
        :alt="content.title"
        class="w-full h-72 sm:h-80 object-cover shadow-md"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"></div>
    </div>

    <!-- Main Container -->
    <div class="p-6 sm:p-8 max-w-3xl mx-auto space-y-8">
      <!-- Header Row -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div class="flex items-center gap-4">
          <img
            :src="content.logo"
            :alt="content.subTitle"
            class="h-12 w-12 rounded-full border-2 border-blue-500 shadow-sm object-cover"
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
          class="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xs font-medium px-4 py-2 rounded-full shadow-lg transition-all"
        >
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
          <span>REFRESH</span>
        </button>
      </div>

      <!-- Main Featured Image -->
      <img
        v-if="content.mainImage"
        :src="content.mainImage"
        :alt="content.title"
        class="w-full max-w-lg mx-auto rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
      />

      <!-- HTML Content Body -->
      <div
        class="prose dark:prose-invert max-w-none prose-p:leading-7 prose-p:text-[1.05rem] prose-p:font-sans prose-img:mx-auto prose-img:rounded-lg prose-img:shadow-md"
        v-html="content.text"
      />

      <!-- Additional Images Gallery -->
      <div v-if="content.images.length" class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <img
          v-for="(img, index) in content.images"
          :key="index"
          :src="img.src"
          :alt="img.alt"
          class="w-full rounded-lg shadow-md"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.prose :deep(p) {
  margin-bottom: 1.25rem;
  font-size: 1.05rem;
  line-height: 1.7;
}

.prose :deep(strong) {
  font-weight: 600;
  color: inherit;
}

.prose :deep(a) {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
}

.prose :deep(a:hover) {
  text-decoration: underline;
}

.dark .prose :deep(a) {
  color: #60a5fa;
}
</style>
