<template>
  <BooksCarousel title="Recommended for you" :books="books" />
</template>

<script setup>
import BooksCarousel from '@/components/uikit/BooksCarousel.vue'
import { getRelevantBooks } from '@/api/books.js'
import { ref } from 'vue'

const books = ref([])

try {
  const response = await getRelevantBooks()
  books.value = response.data.items || null
} catch (e) {
  throw e.message
}
</script>
