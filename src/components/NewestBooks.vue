<template>
  <div class="mb-[127px] flex justify-between">
    <div class="mt-[64px] flex w-[450px] flex-col gap-[30px]">
      <h1 class="text-6xl">New Releases</h1>
      <div class="mb-[10px]">
        It's time to update your reading list with some of the latest and greatest releases in the
        literary world. From heart-pumping thrillers to captivating memoirs, this week's new
        releases offer something for everyone
      </div>
      <Button class="ml-[8px] shadow-[-2.5px_2.5px_10px_0px] shadow-yellow/20">Explore</Button>
    </div>
    <div class="relative h-[378px] w-[487px]">
      <div
        v-for="(newestBook, index) in newestBooks"
        :key="index"
        class="absolute rounded-[3px]"
        :class="
          index
            ? index === 1
              ? 'left-[139px] top-[8px] z-[2] h-[342px] w-[246px] bg-cyan shadow-[0px_15px_15px_-7.5px] shadow-cyan/20'
              : 'left-[273px] top-[25px] z-[1] h-[297.5px] w-[214px] bg-blue shadow-[0px_15px_15px_-7.5px] shadow-blue/20'
            : 'z-[3]  h-full w-[272px] bg-red shadow-[0px_20px_15px_-2.5px,-10px_10px_10px_-5px] shadow-red/10'
        "
      >
        <RouterLink :to="{ name: 'BookDetails', params: { id: newestBook.id } }">
          <img
            :src="`https://books.google.com/books/content?id=${newestBook.id}&printsec=frontcover&img=1`"
            :alt="`newestBook-${index}`"
            class="h-full w-full rounded-[3px]"
          />
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from '@/components/Button.vue'
import { onMounted, ref } from 'vue'
import axios from 'axios'

const newestBooks = ref([])

onMounted(() =>
  axios
    .get(`https://www.googleapis.com/books/v1/volumes?q=intitle:&orderBy=newest&maxResults=3`)
    .then((response) => (newestBooks.value = response.data.items))
    .catch((error) => console.error('Error in newest books data:', error)),
)
</script>
