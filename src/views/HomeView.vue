<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const content = {
  id: 3,
  title: 'Black Clover',
  subTitle: 'There are many variations of passages',
  userName: 'Pawan Kumar',
  logo: 'https://i.pinimg.com/736x/51/a4/bd/51a4bd7a1df81792b78c04635754d153.jpg',
  thumbNailImage:
    'https://i0.wp.com/www.kearipan.com/wp-content/uploads/2022/07/black-clover-anime.jpg',
  mainImage: 'https://upload.wikimedia.org/wikipedia/en/6/69/Black_Clover%2C_volume_1.jpg',
  text: ` "<html>  \n<head>   \n<title> Black Clover </title>  \n</head>  \n<body>  \n<p>\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.\n</p>\n<p>\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.\n</p>\n<p>\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n</p>\n<p>\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.\n</p>\n</body>    \n</html> "`,
}

onMounted(() => {
  console.log('Content loaded:', content)
})

const formattedDate = computed(() => {
  const date = new Date()
  const options = { weekday: 'long' as const, day: 'numeric' as const, month: 'long' as const }
  return date.toLocaleDateString('en-US', options)
})

const userInitials = computed(() => {
  return content.userName
    .split(' ')
    .map((name) => name.charAt(0).toUpperCase())
    .join('')
})

const goToDetails = () => {
  router.push({ name: 'anime-detail', state: content })
}
</script>

<template>
  <div>
    <!-- Top Section with Dynamic Date and Initials -->
    <div class="flex justify-between items-center px-6 py-4">
      <div class="text-xs text-gray-500 dark:text-gray-400 uppercase">{{ formattedDate }}</div>
      <div
        class="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-semibold rounded-full h-8 w-8 flex items-center justify-center"
      >
        {{ userInitials }}
      </div>
    </div>

    <!-- Main Content -->
    <div class="min-h-screen flex justify-center items-center bg-white dark:bg-gray-900 p-4">
      <div
        class="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:scale-105 transition-transform cursor-pointer"
        @click="goToDetails"
      >
        <img :src="content.thumbNailImage" alt="Banner" class="w-full h-64 object-cover" />

        <div class="p-4 flex justify-between items-center">
          <div class="flex items-center gap-3">
            <img :src="content.logo" class="h-10 w-10 rounded-full" />
            <div>
              <h2 class="font-bold text-gray-900 dark:text-white">{{ content.title }}</h2>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ content.subTitle }}</p>
            </div>
          </div>
          <button class="bg-blue-600 text-white text-xs px-3 py-1 rounded-full hover:bg-blue-700">
            REFRESH
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
