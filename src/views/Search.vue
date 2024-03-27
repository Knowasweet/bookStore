<template>
  <div v-if="totalItems > 0 && books" class="mx-16 mb-[68px] mt-20">
    <div class="grid grid-cols-3 grid-rows-4 gap-x-[10px] gap-y-[58px] pb-16">
      <BookCard v-for="book in books" :key="book.id" :book="book" />
    </div>
    <Paginate
      v-model="currentPage"
      :pageCount="totalPages"
      :clickHandler="changeCurrentPage"
      :pageRange="3"
      :marginPages="3"
      prevText="<"
      nextText=">"
      :noLiSurround="true"
      containerClass="flex gap-2 justify-center text-gray"
      pageLinkClass="w-8 h-8 !bg-transparent border-[1px] border-lightgray rounded-[4px] justify-center flex items-center font-bold text-s text-darkblue select-none cursor-pointer"
      prevLinkClass="w-8 h-8 bg-transparent border-[1px] border-lightgray rounded-[4px] justify-center flex items-center text-s font-bold select-none cursor-pointer"
      nextLinkClass="w-8 h-8 bg-transparent border-[1px] border-lightgray rounded-[4px] justify-center flex items-center text-s font-bold select-none cursor-pointer"
      activeClass="border-orange text-orange !cursor-default"
      disabledClass="!bg-lightgray rounded-[4px] !cursor-default"
    />
  </div>
  <BooksNotFound title="Search Books" description="Nothing found for your search query" v-else />
</template>

<script setup>
import BooksNotFound from '@/components/BooksNotFound.vue'
import BookCard from '@/components/BookCard.vue'
import { getSearchBooks } from '@/api/books.js'
import { computed, ref, watch } from 'vue'
import Paginate from 'vuejs-paginate-next'
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

const totalItems = ref(0)
const totalPages = computed(() => Math.ceil(totalItems.value / 12))

const isLoading = ref(true)
const error = ref(null)

const getBooksByPage = async () => {
  try {
    isLoading.value = true

    if (isNaN(currentPage.value) || currentPage.value < 1) {
      currentPage.value = 1
    }

    if (currentPage.value > totalPages.value) {
      currentPage.value = totalPages.value
    }

    const response = await getSearchBooks(props.searchQuery, (currentPage.value - 1) * 12, 12)
    books.value = response.data.items || null
  } catch (e) {
    error.value = e.message
  } finally {
    isLoading.value = false
  }
}

const getTotalBooks = async () => {
  try {
    isLoading.value = true
    const response = await getSearchBooks(props.searchQuery, 0, 1)
    totalItems.value = response.data.totalItems
  } catch (e) {
    error.value = e.message
  } finally {
    isLoading.value = false
  }
}

await getTotalBooks()
await getBooksByPage()

const changeCurrentPage = () => {
  router.push({
    path: '/books',
    query: { search_query: props.searchQuery, page: currentPage.value },
  })
  getBooksByPage()
}

watch(
  () => props.searchQuery,
  () => {
    currentPage.value = 1
    getTotalBooks()
    getBooksByPage()
  },
)
</script>
