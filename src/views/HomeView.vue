<script setup lang="ts">
import { useContentStore } from '@/stores/contentStore'
import { onMounted, ref } from 'vue'

const content = ref<any>(null)
onMounted(() => {
  content.value = {
    thumbNailImage: 'https://images8.alphacoders.com/100/thumb-1920-1002974.png',
    mainImage: 'https://i.pinimg.com/736x/f6/6a/bc/f66abc15b6527003da54a93b90d23b8f.jpg',
    userName: 'Tushar Saini',
    subTitle: 'There are many variations of passages',
    text: "<html>  \n<head>   \n<title> The Tale of naruto Uzumaki</title>  \n</head>  \n<body>  \n<p>\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.\n</p>\n<p>\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.\n</p>\n<p>\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n</p>\n<p>\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.\n</p>\n</body>    \n</html> ",
    id: 1,
    logo: 'https://i.pinimg.com/474x/b4/a4/f8/b4a4f823e4cd01b9273d1bc342f7ce98.jpg',
    title: 'The Tale of naruto Uzumaki',
  }

  console.log(content.value, 'content')
})
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
    <!-- Header with logo and title -->
    <div class="flex items-center gap-4 p-4">
      <img :src="content?.logo" alt="Logo" class="h-10 w-10 rounded-full object-cover" />
      <h1 class="text-2xl font-bold">{{ content?.title }}</h1>
    </div>

    <!-- Thumbnail / Hero Banner -->
    <img
      :src="content?.thumbNailImage"
      alt="Thumbnail"
      class="w-full max-h-60 object-cover rounded-md shadow mb-4"
    />

    <div class="p-4 max-w-3xl mx-auto space-y-4">
      <!-- Subtitle + user -->
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-semibold">{{ content?.subTitle }}</h2>
        <span class="text-sm text-gray-600 dark:text-gray-400">{{ content?.userName }}</span>
      </div>

      <!-- Main Image -->
      <img
        :src="content?.mainImage"
        alt="Main visual"
        class="w-full max-w-md mx-auto rounded shadow-md"
      />

      <!-- Rendered HTML text -->
      <div class="prose dark:prose-invert max-w-none" v-html="content?.text"></div>
    </div>
  </div>
</template>
