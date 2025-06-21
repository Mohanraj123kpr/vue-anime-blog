import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { authUser } from '@/services/api'

export const useContentStore = defineStore('counter', () => {
  const currentIndex = ref(0)
  const animeList = ref<any[]>([
    {
      id: 3,
      title: 'Black Clover',
      subTitle: 'There are many variations of passages',
      userName: 'Pawan Kumar',
      logo: 'https://i.pinimg.com/736x/51/a4/bd/51a4bd7a1df81792b78c04635754d153.jpg',
      thumbNailImage:
        'https://i0.wp.com/www.kearipan.com/wp-content/uploads/2022/07/black-clover-anime.jpg',
      mainImage: 'https://upload.wikimedia.org/wikipedia/en/6/69/Black_Clover%2C_volume_1.jpg',
      text: ` "<html>  \n<head>   \n<title> Black Clover </title>  \n</head>  \n<body>  \n<p>\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.\n</p>\n<p>\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.\n</p>\n<p>\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n</p>\n<p>\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.\n</p>\n</body>    \n</html> "`,
    },
    {
      thumbNailImage: 'https://images8.alphacoders.com/100/thumb-1920-1002974.png',
      mainImage: 'https://i.pinimg.com/736x/f6/6a/bc/f66abc15b6527003da54a93b90d23b8f.jpg',
      userName: 'Tushar Saini',
      subTitle: 'There are many variations of passages',
      text: "<html>  \n<head>   \n<title> The Tale of naruto Uzumaki</title>  \n</head>  \n<body>  \n<p>\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.\n</p>\n<p>\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.\n</p>\n<p>\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n</p>\n<p>\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.\n</p>\n</body>    \n</html> ",
      id: 1,
      logo: 'https://i.pinimg.com/474x/b4/a4/f8/b4a4f823e4cd01b9273d1bc342f7ce98.jpg',
      title: 'The Tale of naruto Uzumaki',
    },
    {
      thumbNailImage:
        'https://e0.pxfuel.com/wallpapers/847/217/desktop-wallpaper-android-luffy-ace-sabo-cool-ace-one-piece-thumbnail.jpg',
      mainImage: 'https://i.pinimg.com/236x/23/79/48/237948a6d5088270501c2918a3b27d11.jpg',
      userName: 'Ankit Hooda',
      subTitle: 'There are many variations of passages',
      text: "<html>  \n<head>   \n<title> One Piece </title>  \n</head>  \n<body>  \n<p>\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.\n</p>\n<p>\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.\n</p>\n<p>\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n</p>\n<p>\nThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.\n</p>\n</body>    \n</html> ",
      id: 2,
      logo: 'https://i.pinimg.com/originals/e7/9c/df/e79cdfc22bbbd73435ec83e9d1f05bc4.jpg',
      title: 'One Piece',
    },
  ])
  const selectedContent = ref(animeList.value[0]) // default

  function pickNextContent() {
    if (animeList.value.length === 0) return

    currentIndex.value = (currentIndex.value + 1) % animeList.value.length
    selectedContent.value = animeList.value[currentIndex.value]
  }

  function login(email: string) {
    authUser(email)
  }

  const userInitials = computed(() => {
    if (!selectedContent.value?.userName) return ''
    return selectedContent.value.userName
      .split(' ')
      .map((word: string) => word[0])
      .join('')
      .toUpperCase()
  })

  return {
    animeList,
    selectedContent,
    pickNextContent,
    userInitials,
    login,
  }
})
