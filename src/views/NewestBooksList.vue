<template>
  <div class="mx-16 mb-[68px] mt-20">
    <div class="grid grid-cols-3 grid-rows-4 gap-x-[10px] gap-y-[58px] pb-16">
      <BookCard v-for="(book, index) in books" :key="index" :book="book" />
    </div>
    <Paginate
      v-model="currentPage"
      :pageCount="totalPages"
      :clickHandler="changeCurrentPage"
      :pageRange="3"
      :marginPages="3"
      prevText="<"
      nextText=">"
      :no-li-surround="true"
      container-class="flex gap-2 justify-center text-gray"
      page-link-class="w-8 h-8 !bg-transparent border-[1px] border-lightgray rounded-[4px] justify-center flex items-center font-bold text-s text-darkblue select-none cursor-pointer"
      prev-link-class="w-8 h-8 bg-transparent border-[1px] border-lightgray rounded-[4px] justify-center flex items-center text-s font-bold select-none cursor-pointer"
      next-link-class="w-8 h-8 bg-transparent border-[1px] border-lightgray rounded-[4px] justify-center flex items-center text-s font-bold select-none cursor-pointer"
      active-class="border-orange text-orange !cursor-default"
      disabled-class="!bg-lightgray rounded-[4px] !cursor-default"
    />
  </div>
</template>

<script setup>
import BookCard from '@/components/BookCard.vue'
import { getNewestBooks } from '@/api/books.js'
import Paginate from 'vuejs-paginate-next'
import { computed, ref } from 'vue'
import router from '@/router/index.js'

const props = defineProps({
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

    const response = await getNewestBooks((currentPage.value - 1) * 12, 12)
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
    const response = await getNewestBooks(0, 1)
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
    path: '/newest',
    query: { page: currentPage.value },
  })
  getBooksByPage()
}
</script>
