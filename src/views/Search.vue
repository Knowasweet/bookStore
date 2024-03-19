<template>
  <div class="mb-[68px] mt-[79px] ml-[67px] mr-[65px]">
    <div class="grid grid-cols-3 grid-rows-4 gap-x-[10px] gap-y-[58px] pb-[64px]">
        <BookCard v-for="(book, index) in books"
                        :key="index" :book="book"/>
    </div>
    <Paginate
        v-model="currentPage"
        :pageCount="totalPages"
        :page-range="3"
        :margin-pages="3"
        :clickHandler="changeCurrentPage"
        :prevText="'<'"
        :nextText="'>'"
        :container-class="'flex gap-[8px] justify-center text-lightgray'"
        :page-class="'w-[32px] h-[32px] !bg-transparent border-[1px] border-lightgray rounded-[4px] justify-center flex items-center font-bold text-s text-darkblue'"
        :prev-link-class="'w-[32px] h-[32px] bg-transparent border-[1px] border-lightgray rounded-[4px] justify-center flex items-center text-s font-bold  '"
        :next-link-class="'w-[32px] h-[32px] bg-transparent border-[1px] border-lightgray rounded-[4px] justify-center flex items-center text-s font-bold'"
        :active-class="'!border-orange !text-orange'"
        :disabled-class="'bg-lightgray rounded-[4px] text-white'"
    />
  </div>
</template>

<script setup>
import BookCard from "@/components/BookCard.vue";
import {computed, ref, watch} from 'vue'
import {getSearchBooks, getTotalBooks} from "@/api/books.js";
import router from "@/router/index.js";

const props = defineProps({
  searchQuery: {
    type: String,
    required: true,
  },
  page: {
    type: Number,
    required: true,
  }
})


const books = ref([])
const currentPage = ref(parseInt(props.page))
const pageSize = 12
const totalItems = ref(0)
const totalPages = computed(() => Math.ceil(totalItems.value / 12))

const getBooksByPage = (page) => getSearchBooks(props.searchQuery, (page - 1) * 12, pageSize, books)

const changeCurrentPage = () => {
  router.push({path: '/books', query: {search_query: props.searchQuery, page: currentPage.value}})
  getBooksByPage(currentPage.value)
}

await getTotalBooks(props.searchQuery, totalItems)
await getBooksByPage(currentPage.value)

watch(
    () => props.searchQuery,
    (updatedSearchQuery) => {
      currentPage.value = 1
      getBooksByPage(currentPage.value)
    },
)

</script>