<script setup lang="ts">
import ImageViewer from '@/components/ImageViewer.vue'
defineProps<{
  title: string
  subtitle: string
  thumbnail: string
  logo: string
  onCardClick?: () => void
}>()
</script>

<template>
  <div
    class="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] cursor-pointer animate-fade-in"
    @click="onCardClick"
  >
    <!-- Banner Image -->
    <ImageViewer :src="thumbnail" alt="Banner" customClass="w-full h-72 object-cover" />

    <!-- Content Info -->
    <div class="p-6 space-y-4">
      <div class="flex justify-between items-center">
        <!-- Avatar and Titles -->
        <div class="flex items-center gap-4">
          <ImageViewer
            :src="logo"
            customClass="h-12 w-12 rounded-xl border-2 border-blue-500 shadow-md"
            alt="Avatar"
          />
          <div>
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white leading-tight">
              {{ title }}
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ subtitle }}</p>
          </div>
        </div>

        <!-- Action Slot (like refresh) -->
        <slot name="action" />
      </div>
    </div>
  </div>
</template>
