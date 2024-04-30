<template>
  <div v-if="!isLoading">
    <div v-if="books" class="mx-16 mb-[68px] mt-20">
      <div class="grid grid-cols-3 grid-rows-4 gap-x-[10px] gap-y-[58px] pb-16">
        <BookCard v-for="(book, index) in books" :key="index" :book="book" />
      </div>
      <PageNavigation
        v-model="currentPage"
        :numberOfBooks="books.length"
        :lastPage="lastPage"
        @changeCurrentPage="changeCurrentPage"
      />
    </div>
    <BooksNotFound
      v-else
      title="Newest Books"
      description="There are no books on the page. Please go back to other pages."
    />
  </div>
  <Loader v-else />
</template>

<script setup>
import PageNavigation from '@/components/uikit/PageNavigation.vue'
import BooksNotFound from '@/components/uikit/BooksNotFound.vue'
import BookCard from '@/components/books/book/cards/BookCard.vue'
import Loader from '@/components/uikit/Loader.vue'
import { scrollToTop } from '@/helpers/scrollHelpers.js'
import { getSearchBooks } from '@/api/books.js'
import { ref, watch } from 'vue'
import router from '@/router/index.js'

const props = defineProps({
  searchQuery: {
    type: String,
    required: true,
  },
  page: {
    type: [String, Number],
    required: true,
  },
})

const books = ref([])
const currentPage = ref(parseInt(props.page))
const lastPage = ref(0)

const isLoading = ref(true)

const getBooksByPage = async () => {
  try {
    isLoading.value = true
    const response = await getSearchBooks(props.searchQuery, (currentPage.value - 1) * 12, 12)
    books.value = response.data.items || null
  } catch (e) {
    throw e.message
  } finally {
    isLoading.value = false
  }
}

await getBooksByPage()

const changeCurrentPage = async () => {
  await getBooksByPage()
  if (!books.value) {
    currentPage.value -= 1
    lastPage.value = currentPage.value
    await getBooksByPage()
  }
  await router.push({
    path: '/books',
    query: { search_query: props.searchQuery, page: currentPage.value },
  })
  scrollToTop()
}

watch(props.searchQuery, async () => {
  currentPage.value = 1
  await getBooksByPage()
})
</script>
