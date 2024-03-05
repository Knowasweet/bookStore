<template>
  <div class="ml-[3px]">
    <h4 class="mb-[20px] text-3xl">{{ title }}</h4>
    <Swiper
      :modules="[Navigation, Keyboard, Mousewheel, Virtual]"
      :slidesPerView="2.5"
      :spaceBetween="40"
      :navigation="true"
      :keyboard="true"
      :mousewheel="true"
      virtual
    >
      <SwiperSlide
        v-for="(book, index) in requestedBooks"
        :key="index"
        :virtualIndex="index"
        class="rounded-[8px] border-[1px] border-transparent py-[14px] pl-[14px] pr-[19px] hover:border-b-lightgray hover:shadow-[0px_12.5px_10px_-10px] hover:shadow-gray"
      >
        <div class="flex gap-[40px]">
          <RouterLink :to="{ name: 'BookDetails', params: { id: book.id } }">
            <img
              :src="`https://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1`"
              :alt="`relevanceBook-${index}`"
              class="h-[250px] w-[180px] rounded-[5px]"
            />
          </RouterLink>
          <div class="mt-[66px] flex w-[219px] flex-col justify-between">
            <div class="space-y-[15px]">
              <RouterLink :to="{ name: 'BookDetails', params: { id: book.id } }">
                <h5 class="line-clamp-1">{{ book.volumeInfo.title }}</h5>
              </RouterLink>
              <div class="line-clamp-3 font-nunito text-xs opacity-[52%]">
                {{ book.volumeInfo.description }}
              </div>
            </div>
            <Button :hasSymmetry="false">Add to favorite</Button>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import Button from '@/components/Button.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Keyboard, Navigation, Mousewheel, Virtual } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

defineProps({
  title: {
    type: String,
    required: true,
  },
  requestedBooks: {
    type: Array,
    required: true,
  },
})
</script>

<style>
.swiper-button-prev,
.swiper-button-next {
  @apply !h-[38px] !w-[38px] !rounded-full bg-white !text-darkblue ring-1 ring-lightgray/90;
}

.swiper-button-prev {
  @apply !left-0;
}

.swiper-button-next {
  @apply !right-0;
}

.swiper-button-prev::after,
.swiper-button-next::after {
  @apply !text-[16px] font-bold;
}

.swiper-button-disabled {
  @apply !hidden;
}

.swiper-slide-visible {
  @apply hover:border-l-lightgray/90;
}

.swiper-slide-prev {
  @apply hover:border-r-lightgray/90;
}

.swiper-slide-active {
  @apply hover:border-x-lightgray/90;
}

.swiper-slide-next {
  @apply hover:border-l-lightgray/90;
}
</style>
