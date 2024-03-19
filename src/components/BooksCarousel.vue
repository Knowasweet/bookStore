<template>
  <div class="ml-[3px]">
    <h4 class="mb-[20px] text-3xl">{{ title }}</h4>
    <Swiper
      :modules="[Navigation, Mousewheel, Virtual]"
      :slidesPerView="2.5"
      :spaceBetween="40"
      :navigation="true"
      :mousewheel="true"
      virtual
    >
      <SwiperSlide
        v-for="(book, index) in books"
        :key="index"
        :virtualIndex="index"
        class="rounded-[8px] border-[1px] border-transparent py-[14px] pl-[14px] pr-[19px] hover:border-b-lightgray hover:shadow-[0px_12.5px_10px_-10px] hover:shadow-gray"
      >
        <SlideCard :book="book" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import SlideCard from '@/components/SlideCard.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Mousewheel, Virtual } from 'swiper/modules'
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
