<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  src: string
  alt?: string
  fallbackSrc?: string
  lazy?: boolean
  customClass?: string
}>()

const hasError = ref(false)

function handleError() {
  hasError.value = true
}
</script>

<template>
  <div class="relative">
    <img
      v-if="!hasError"
      :src="src"
      :alt="alt"
      :loading="lazy ? 'lazy' : 'eager'"
      :class="customClass"
      @error="handleError"
    />
    <!-- Fallback image on error -->
    <img
      v-else
      :src="fallbackSrc"
      :alt="alt"
      class="w-full object-cover rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
      :class="customClass"
    />
  </div>
</template>
