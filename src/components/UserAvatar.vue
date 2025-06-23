<script setup lang="ts">
import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'

// Props
const props = defineProps<{
  userName: string
  userAction: string
}>()

const emit = defineEmits<{
  (e: 'userActionClick'): void
}>()

// Refs
const avatarRef = ref(null)
const showCard = ref(false)

// Show initials from name
const initials = computed(() =>
  props.userName
    .split(' ')
    .map((name) => name.charAt(0).toUpperCase())
    .join(''),
)

// Toggle dropdown
const toggleCard = () => {
  showCard.value = !showCard.value
}

// Call user action and close card
const handleUserActionClick = () => {
  emit('userActionClick')
  showCard.value = false
}

// Close on outside click
onClickOutside(avatarRef, () => {
  showCard.value = false
})
</script>

<template>
  <div class="relative" ref="avatarRef">
    <!-- Avatar Circle -->
    <div
      class="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white text-xs sm:text-sm font-bold rounded-full h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center shadow-inner cursor-pointer"
      @click="toggleCard"
    >
      {{ initials }}
    </div>

    <!-- Dropdown Card -->
    <transition name="fade">
      <div
        v-if="showCard"
        class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border dark:border-gray-600 rounded-lg shadow-lg z-50 p-4"
      >
        <div class="text-sm font-semibold text-gray-900 dark:text-white">
          {{ userName }}
        </div>
        <button
          class="mt-2 cursor-pointer text-xs text-red-600 hover:underline dark:text-red-400"
          @click="handleUserActionClick"
        >
          {{ userAction }}
        </button>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* Optional: Smooth transition */
.card-enter-active,
.card-leave-active {
  transition: opacity 0.2s ease;
}
.card-enter-from,
.card-leave-to {
  opacity: 0;
}
</style>
