<script setup lang="ts">
import { ref, onMounted } from 'vue'

const content = ref<any>(null)

function extractBodyContent(html: string): string {
  const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
  return match ? match[1] : html
}

onMounted(() => {
  const passed = history.state
  if (passed) {
    content.value = {
      ...passed,
      text: extractBodyContent(passed.text),
    }
  }
})
</script>

<template>
  <div v-if="content" class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
    <!-- Thumbnail -->
    <img :src="content.thumbNailImage" class="w-full h-64 object-cover" />

    <div class="p-4 max-w-2xl mx-auto space-y-4">
      <!-- Logo + Title + Refresh -->
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-3">
          <img :src="content.logo" class="h-10 w-10 rounded-full" />
          <div>
            <h1 class="text-xl font-bold">{{ content.title }}</h1>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ content.subTitle }}</p>
          </div>
        </div>
        <button class="bg-blue-600 text-white text-xs px-3 py-1 rounded-full hover:bg-blue-700">
          REFRESH
        </button>
      </div>

      <!-- Main Image -->
      <img :src="content.mainImage" class="w-full max-w-md mx-auto rounded-md shadow" />

      <!-- HTML Text Content -->
      <div class="prose dark:prose-invert max-w-none" v-html="content.text"></div>
    </div>
  </div>
</template>
