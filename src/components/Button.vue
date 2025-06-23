<script setup lang="ts">
defineProps<{
  onClick: () => void
  label?: string
  disabled?: boolean
  customClass?: string
  type?: 'button' | 'submit' | 'reset'
}>()
</script>

<template>
  <button
    @click.stop="onClick"
    :disabled="disabled"
    class="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xs font-medium px-4 py-2 rounded-full shadow-lg transition"
    :class="customClass"
  >
    <slot>
      <!-- slot for svg icon -->
    </slot>
    <span>{{ label || 'REFRESH' }}</span>
  </button>
</template>
