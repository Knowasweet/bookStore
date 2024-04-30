<template>
  <div v-if="userBooks.length > 0" class="mb-[68px] ml-[67px] mr-[65px] mt-[79px]">
    <div class="space-y-[50px]">
      <h2 class="text-center text-6xl font-bold">Liked Books</h2>
      <div class="grid grid-cols-3 grid-rows-4 gap-x-[10px] gap-y-[58px] pb-16">
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
import FavoriteBookCard from '@/components/books/book/cards/FavoriteBookCard.vue'
import BooksNotFound from '@/components/uikit/BooksNotFound.vue'
import { getFavoriteBooks } from '@/api/books.js'
import { computed, ref } from 'vue'
import { useUserStore } from '@/stores/user.js'
import { useBooksStore } from '@/stores/books.js'

const books = ref([])

const user = computed(() => useUserStore().user)
const userBooks = computed(() => useBooksStore().books)

const getBooks = async () => {
  try {
    if (user.value) {
      const response = await getFavoriteBooks()
      books.value = response.data.items || null
    } else {
      alert('You logout, please login to see your books.')
    }
  } catch (e) {
    throw e.message
  }
}

await getBooks()
</script>
