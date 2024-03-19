<template>
  <div class="mx-[100px] mb-[152px] mt-[76px]">
    <NewestBooks />
    <BooksCarousel title="Recommended for you" :books="relevantBooks" class="mb-[123px]" />
    <BooksCarousel title="Mystery - try something new" :books="booksByGenre" />
  </div>
</template>

<script setup>
import NewestBooks from '@/components/NewestBooks.vue'
import BooksCarousel from '@/components/BooksCarousel.vue'
import {getBooksByGenre, getBooksSample, getRelevantBooks} from '@/api/books.js'
import { ref } from 'vue'

const relevantBooks = ref([])
const booksByGenre = ref([])

getBooksSample(getRelevantBooks(), relevantBooks)
getBooksSample(getBooksByGenre(), booksByGenre)
</script>
