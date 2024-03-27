<template>
  <div class="flex gap-10">
    <RouterLink :to="{ name: 'BookDetails', params: { id: book.id } }">
      <BookImage :id="book.id" class="h-[250px] w-[180px] rounded-[5px]" />
    </RouterLink>
    <div class="mt-[66px] flex w-[219px] flex-col justify-between">
      <div class="space-y-[15px]">
        <RouterLink :to="{ name: 'BookDetails', params: { id: book.id } }">
          <h5 class="line-clamp-1">{{ book.volumeInfo.title }}</h5>
        </RouterLink>
        <div class="line-clamp-3 font-nunito text-s opacity-50">
          {{ book.volumeInfo.description }}
        </div>
      </div>
      <Button
        class="w-[147px] border-yellow bg-yellow py-[6px] text-white hover:bg-white hover:text-yellow/60 active:border-yellow active:text-yellow"
        @click="toggleFavorite"
        >{{ buttonText }}
      </Button>
    </div>
  </div>
</template>

<script setup>
import Button from '@/components/Button.vue'
import BookImage from '@/components/BookImage.vue'
import { useUserStore } from '@/stores/user.js'
import { computed, ref } from 'vue'
import { refreshGoogleAccessToken } from '@/api/googleAuthTokens.js'
import { addFavoriteBook, removeFavoriteBook } from '@/api/books.js'

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
})

const userStore = useUserStore()
const user = computed(() => userStore.user)

const isLoading = ref(true)
const error = ref(null)

const buttonText = ref('Add to favorite')

const addBookToFavorites = async () => {
  try {
    isLoading.value = true
    await addFavoriteBook(props.book.id, user.value.accessToken)
  } catch (e) {
    isLoading.value = false
    if (e.request.status === 401) {
      await refreshAccessToken(addBookToFavorites)
    } else {
      error.value = e.message
    }
  } finally {
    isLoading.value = false
  }
}

const removeBookFromFavorites = async () => {
  try {
    isLoading.value = true
    await removeFavoriteBook(props.book.id, user.value.accessToken)
  } catch (e) {
    isLoading.value = false
    if (e.request.status === 401) {
      await refreshAccessToken(removeBookFromFavorites)
    } else {
      error.value = e.message
    }
  } finally {
    isLoading.value = false
  }
}

const refreshAccessToken = async (func) => {
  try {
    isLoading.value = true
    const accessTokenResponse = await refreshGoogleAccessToken(user.value.refreshToken)
    user.value.accessToken = accessTokenResponse.data.access_token
    await func()
  } catch (error) {
    error.value = error.message
  } finally {
    isLoading.value = false
  }
}

const toggleFavorite = async () => {
  if (user.value) {
    if (!user.value.books.some((favoriteBook) => favoriteBook.id === props.book.id)) {
      buttonText.value = 'Remove favorite'
      userStore.addFavoriteBook(props.book)
      await addBookToFavorites()
    } else {
      buttonText.value = 'Add to favorite'
      userStore.removeFavoriteBook(props.book)
      await removeBookFromFavorites()
    }
  } else {
    alert('Please login to manipulate with favorite books.')
  }
}
</script>
