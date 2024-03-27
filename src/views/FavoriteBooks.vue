<template>
  <div v-if="user && user.books" class="mb-[68px] ml-[67px] mr-[65px] mt-[79px]">
    <div class="space-y-[50px]">
      <h3 class="text-center text-4xl font-bold">Liked Books</h3>
      <div class="grid grid-cols-3 grid-rows-1 gap-x-[10px] gap-y-[58px] pb-16">
        <FavoriteBookCard v-for="book in books" :key="book.id" :book="book" />
      </div>
    </div>
  </div>
  <BooksNotFound
    v-else
    title="Favorite Books"
    description="Add more books in your collection to see it"
  />
</template>

<script setup>
import FavoriteBookCard from '@/components/FavoriteBookCard.vue'
import BooksNotFound from '@/components/BooksNotFound.vue'
import { refreshGoogleAccessToken } from '@/api/googleAuthTokens.js'
import { useUserStore } from '@/stores/user.js'
import { getFavoriteBooks } from '@/api/books.js'
import { computed, onBeforeUpdate, ref } from 'vue'

const user = computed(() => useUserStore().user)
const books = ref([])

const isLoading = ref(true)
const error = ref(null)
const getBooks = async () => {
  try {
    if (user.value) {
      const response = await getFavoriteBooks(user.value.accessToken)
      books.value = response.data.items || null
    } else {
      alert('You logout, please login to see your books.')
    }
  } catch (e) {
    isLoading.value = false
    if (e.request.status === 401) {
      await refreshAccessToken(getBooks)
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

await getBooks()

onBeforeUpdate(() => {
  getBooks()
})
</script>
