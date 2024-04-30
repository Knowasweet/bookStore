<template>
  <div>
    <h4 class="mb-5 ml-[3px] text-3xl">{{ title }}</h4>
    <Swiper
      :modules="[Navigation, Virtual]"
      :slidesPerView="2.5"
      :spaceBetween="40"
      :navigation="true"
      :touchStartPreventDefault="false"
      virtual
    >
      <SwiperSlide
        v-for="book in books"
        :key="book.id"
        :virtualIndex="book.id"
        class="rounded-lg border-[1px] border-transparent py-[14px] pl-[14px] pr-[19px] hover:border-lightgray hover:shadow-[0px_12.5px_10px_-10px] hover:shadow-gray"
      >
        <SlideBookCard :book="book" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import SlideBookCard from '@/components/books/book/cards/SlideBookCard.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Virtual } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

defineProps({
  title: {
    type: String,
    required: true,
  },
  books: {
    type: Array,
    required: true,
  },
})
</script>

<style>
.swiper-button-prev,
.swiper-button-next {
  @apply h-9 w-9 rounded-full bg-white text-darkblue ring-1 ring-lightgray/90;
}

.swiper-button-prev::after,
.swiper-button-next::after {
  @apply text-base font-bold;
}

.swiper-button-prev {
  @apply left-0;
}

.swiper-button-next {
  @apply right-0;
}

.swiper-button-disabled {
  @apply hidden;
}
</style>
