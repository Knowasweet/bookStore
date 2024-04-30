<template>
  <BooksCarousel title="Mystery - try something new" :books="books" />
</template>

<script setup>
import BooksCarousel from '@/components/uikit/BooksCarousel.vue'
import { getCategoryBooks } from '@/api/books.js'
import { ref } from 'vue'

const books = ref([])

try {
  const response = await getCategoryBooks()
  books.value = response.data.items || null
} catch (e) {
  throw e.message
}
</script>
