<template>
  <main class="mx-[100px] mb-[152px] mt-[76px]">
    <NewestBooks />
    <Carousel title="Recommended for you" :requestedBooks="relevanceBooks" class="mb-[123px]" />
    <Carousel title="Mystery - try something new" :requestedBooks="subjectBooks" />
  </main>
</template>

<script setup>
import NewestBooks from '@/components/NewestBooks.vue'
import Carousel from '@/components/Carousel.vue'
import axios from 'axios'
import { randomIntBetweenZeroAndTwo } from '@/helpers/mathHelpers.js'
import { onMounted, ref } from 'vue'

const relevanceBooks = ref([])
const subjectBooks = ref([])

onMounted(() => {
  axios
    .get('https://www.googleapis.com/books/v1/volumes?q=intitle:&orderBy=relevance&maxResults=3')
    .then((response) => (relevanceBooks.value = response.data.items))
    .catch((error) => console.error('Error in relevance books data:', error))

  switch (randomIntBetweenZeroAndTwo()) {
    case 0:
      axios
        .get(
          'https://www.googleapis.com/books/v1/volumes?q=subject:thriller&maxResults=3&orderBy=relevance',
        )
        .then((response) => (subjectBooks.value = response.data.items))
        .catch((error) => console.error('Error in subject books data:', error))
      break
    case 1:
      axios
        .get(
          'https://www.googleapis.com/books/v1/volumes?q=subject:romance&maxResults=3&orderBy=relevance',
        )
        .then((response) => (subjectBooks.value = response.data.items))
        .catch((error) => console.error('Error in subject books data:', error))
      break
    case 2:
      axios
        .get(
          'https://www.googleapis.com/books/v1/volumes?q=subject:fantasy&maxResults=3&orderBy=relevance',
        )
        .then((response) => (subjectBooks.value = response.data.items))
        .catch((error) => console.error('Error in subject books data:', error))
      break
  }
})
</script>
