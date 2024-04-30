<template>
  <div class="mb-[127px] flex justify-between">
    <div class="mt-16 flex w-[450px] flex-col gap-[30px]">
      <h1 class="text-6xl">New Releases</h1>
      <div class="mb-[10px]">
        It's time to update your reading list with some of the latest and greatest releases in the
        literary world. From heart-pumping thrillers to captivating memoirs, this week's new
        releases offer something for everyone
      </div>
      <RouterLink :to="{ name: 'NewestBooksList', query: { page: 1 } }">
        <BaseButton
          class="ml-2 w-[155px] border-yellow bg-yellow text-white hover:bg-white hover:text-yellow/60 active:border-yellow active:text-yellow"
          >Explore
        </BaseButton>
      </RouterLink>
    </div>
    <div class="relative h-[378px] w-[487px]">
      <div
        v-for="(book, index) in newestBooks"
        :key="index"
        class="absolute rounded-[3px]"
        :class="{
          'z-[3] h-full w-[272px] bg-red shadow-[0px_20px_15px_-2.5px,-10px_10px_10px_-5px] shadow-red/10':
            index === 0,
          'left-[139px] top-2 z-[2] h-[342px] w-[246px] bg-cyan shadow-[0px_15px_15px_-7.5px] shadow-cyan/20':
            index === 1,
          'left-[273px] top-[25px] z-[1] h-[297px] w-[214px] bg-blue shadow-[0px_15px_15px_-7.5px] shadow-blue/20':
            index === 2,
        }"
      >
        <RouterLink :to="{ name: 'BookDetails', params: { id: book.id } }">
          <BookImage :id="book.id" class="h-full w-full object-cover" />
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseButton from '@/components/uikit/buttons/BaseButton.vue'
import BookImage from '@/components/books/book/BookImage.vue'
import { getNewestBooks } from '@/api/books.js'
import { ref } from 'vue'

const newestBooks = ref([])

try {
  const response = await getNewestBooks(0, 3)
  newestBooks.value = response.data.items || null
} catch (e) {
  throw e.message
}
</script>
