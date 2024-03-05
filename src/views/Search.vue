<template>
  <div class="mb-[68px] mt-[79px]">
    <Swiper
      v-if="books.length > 0"
      :pagination="pagination"
      :modules="[Pagination]"
      class="mySwiper ml-[67px] mr-[65px]"
    >
      <SwiperSlide>
        <div class="grid grid-cols-3 grid-rows-4 gap-x-[10px] gap-y-[58px] pb-[96px]">
          <div
            v-for="(book, index) in books"
            :key="index"
            class="flex gap-[21.85px] rounded-[8px] border-[1px] border-transparent py-[9px] pl-[15.06px] pr-[15.63px] hover:border-x-lightgray hover:border-b-lightgray hover:shadow-[0px_12.5px_10px_-10px] hover:shadow-gray"
          >
            <RouterLink :to="{ name: 'BookDetails', params: { id: book.id } }">
              <img
                :src="`https://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1`"
                :alt="`book-${index}`"
                class="h-[209px] w-[170.87px] rounded-[5px]"
              />
            </RouterLink>
            <div class="mt-[50px] flex w-[203.92px] flex-col justify-between">
              <div class="space-y-[15px]">
                <RouterLink :to="{ name: 'BookDetails', params: { id: book.id } }">
                  <h5 class="line-clamp-1 text-xs-small">
                    {{ book.volumeInfo.title }}
                  </h5>
                </RouterLink>
                <div class="line-clamp-4 font-nunito text-xxs-small opacity-[52%]">
                  {{ book.volumeInfo.description }}
                </div>
              </div>
              <div class="mr-[32.7px] self-end">
                <button
                  class="group flex h-[40px] w-[40px] items-center justify-center rounded-full border-[1px] border-lightgray/90 bg-transparent"
                >
                  <FontAwesomeIcon
                    :icon="['fas', 'heart']"
                    class="group-active:text-red-800 h-[20.06px] w-[23.41px] text-darkblue/60 group-hover:text-red"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <!--copy-->
      <SwiperSlide>
        <div class="grid grid-cols-3 grid-rows-4 gap-x-[10px] gap-y-[58px]">
          <div
            v-for="(book, index) in books"
            :key="index"
            class="flex gap-[21.85px] rounded-[8px] border-[1px] border-transparent py-[9px] pl-[15.06px] pr-[15.63px] hover:border-x-lightgray hover:border-b-lightgray hover:shadow-[0px_12.5px_10px_-10px] hover:shadow-gray"
          >
            <RouterLink :to="{ name: 'BookDetails', params: { id: book.id } }">
              <img
                :src="`https://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1`"
                :alt="`book-${index}`"
                class="h-[209px] w-[170.87px] rounded-[5px]"
              />
            </RouterLink>
            <div class="mt-[50px] flex w-[203.92px] flex-col justify-between">
              <div class="space-y-[15px]">
                <RouterLink :to="{ name: 'BookDetails', params: { id: book.id } }">
                  <h5 class="line-clamp-1 text-xs-small">
                    {{ book.volumeInfo.title }}
                  </h5>
                </RouterLink>
                <div class="line-clamp-4 font-nunito text-xxs-small opacity-[52%]">
                  {{ book.volumeInfo.description }}
                </div>
              </div>
              <div class="mr-[32.7px] self-end">
                <button
                  class="group flex h-[40px] w-[40px] items-center justify-center rounded-full border-[1px] border-lightgray/90 bg-transparent"
                >
                  <FontAwesomeIcon
                    :icon="['fas', 'heart']"
                    class="group-active:text-red-800 h-[20.06px] w-[23.41px] text-darkblue/60 group-hover:text-red"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
    <div
      v-else
      class="mx-auto line-clamp-3 w-[500px] overflow-hidden text-center text-6xl text-yellow"
    >
      No books on request {{ searchQuery }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'

const props = defineProps({
  searchQuery: {
    type: String,
    required: true,
  },
})

const books = ref([])

const getSearchQuery = async (searchValue) => {
  axios
    .get(
      `https://www.googleapis.com/books/v1/volumes?q=${searchValue}+inauthor&startIndex=0&maxResults=12`,
    )
    .then((response) => (response.data.totalItems ? (books.value = response.data.items) : ''))
    .catch((error) => console.error('Error in search books data:', error))
}

watch(
  () => props.searchQuery,
  (updatedSearchQuery) => {
    getSearchQuery(updatedSearchQuery)
  },
)

onMounted(() => {
  getSearchQuery(props.searchQuery)
})

import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'

const pagination = {
  clickable: true,
  renderBullet: function (index, className) {
    return '<span class="' + className + '">' + (index + 1) + '</span>'
  },
}
</script>

<style>
.swiper-pagination-bullet {
  @apply text-orange border-orange h-[32px] w-[32px] rounded-none border-[1px] bg-transparent leading-[32px];
}

.swiper-pagination-fraction,
.swiper-pagination-custom,
.swiper-horizontal > .swiper-pagination-bullets,
.swiper-pagination-bullets.swiper-pagination-horizontal {
  @apply bottom-0;
}

.swiper-pagination-bullet-active {
  @apply bg-orange text-white;
}
</style>
