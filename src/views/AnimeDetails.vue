<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount } from 'vue'
import { useContentStore } from '@/stores/contentStore'
import { useRouter } from 'vue-router'
import Button from '@/components/Button.vue'
import ImageViewer from '@/components/ImageViewer.vue'

const store = useContentStore()
const router = useRouter()

// Computed: extract enhanced HTML content + images
const content = computed(() => {
  if (!store.selectedContent) return null
  // Extract body content from HTML
  const html = store.selectedContent.text || ''
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
  const bodyContent = bodyMatch ? bodyMatch[1] : html

  return {
    ...store.selectedContent,
    text: enhanceContent(bodyContent),
    images: extractImages(bodyContent),
  }
})

// Bold first 3 words and style images
const enhanceContent = (html: string): string => {
  try {
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

    // Style images and set alt text
    doc.querySelectorAll('img').forEach((img) => {
      img.classList.add('rounded-lg', 'shadow-md', 'my-4', 'mx-auto', 'max-w-full')
      if (!img.alt) img.alt = store.selectedContent?.title || ''
    })

    return doc.body.innerHTML
  } catch (error) {
    console.error('Failed to enhance HTML:', error)
    return html
  }
}

// Extract images for preview gallery
const extractImages = (html: string): Array<{ src: string; alt: string }> => {
  // Regex to find <img> tags and extract src and alt attributes
  const imgRegex = /<img[^>]+src="([^">]+)"(?:[^>]+alt="([^">]*)")?[^>]*>/g
  const images = []
  let match

  // Loop through all matches
  while ((match = imgRegex.exec(html)) !== null) {
    images.push({
      src: match[1],
      alt: match[2] || store.selectedContent?.title || '',
    })
  }

  // If no images found, return empty array
  return images
}

// Refresh content
const pickRandom = () => {
  try {
    store.pickNextContent()
  } catch (err) {
    console.error('Error while refreshing content:', err)
  }
}

// Close detail view
const closeContent = () => {
  router.push({ name: 'home' })
}

// Escape key to close
const onKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') closeContent()
}

// Lifecycle hooks for keydown event
onMounted(() => window.addEventListener('keydown', onKeyDown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeyDown))
</script>

<template>
  <div
    v-if="content"
    class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300"
  >
    <!-- Banner Image with Close -->
    <div class="relative">
      <ImageViewer
        :src="content.thumbNailImage"
        :alt="content.title"
        customClass="w-full h-60 sm:h-72 md:h-80 object-cover shadow-md"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"></div>

      <!-- Close Button -->
      <button
        @click="closeContent"
        class="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition"
        aria-label="Close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Main Content Area -->
    <div class="p-4 sm:p-6 md:p-8 max-w-3xl mx-auto space-y-8">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div class="flex items-center gap-4 w-full sm:w-auto">
          <ImageViewer
            :src="content.logo"
            :alt="content.subTitle"
            customClass="h-10 w-10 sm:h-12 sm:w-12 rounded-xl border-2 border-blue-500 shadow-sm object-cover"
          />
          <div class="truncate">
            <h1
              class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-tight truncate"
            >
              {{ content.title }}
            </h1>
            <p class="text-sm sm:text-base text-gray-500 dark:text-gray-400 truncate">
              {{ content.subTitle }}
            </p>
          </div>
        </div>

        <!-- Refresh Button -->
        <Button :onClick="pickRandom" label="Refresh">
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
      </div>

      <!-- Main Image -->
      <div class="flex justify-center">
        <ImageViewer
          v-if="content.mainImage"
          :src="content.mainImage"
          :alt="content.title"
          customClass="w-full max-w-lg mx-auto rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
        />
      </div>

      <!-- HTML Content -->
      <div
        class="prose dark:prose-invert max-w-none prose-p:leading-relaxed prose-p:text-[1rem] sm:prose-p:text-[1.05rem] prose-img:mx-auto prose-img:rounded-lg prose-img:shadow-md"
        v-html="content.text"
      />

      <!-- Image Gallery -->
      <div v-if="content.images.length" class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <ImageViewer
          v-for="(img, index) in content.images"
          :key="index"
          :src="img.src"
          :alt="img.alt"
          customClass="w-full rounded-lg shadow-md"
        />
      </div>
    </div>
  </div>

  <div v-else class="text-center text-gray-400 py-20">
    Content not available. Please return to home.
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
