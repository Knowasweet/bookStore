<template>
  <BooksCarousel title="Mystery - try something new" :books="books" />
</template>

<script setup>
import BooksCarousel from '@/components/BooksCarousel.vue'
import { getCategoryBooks } from '@/api/books.js'
import { ref } from 'vue'

const books = ref([])

const isLoading = ref(true)
const error = ref(null)

try {
  const response = await getCategoryBooks()
  books.value = response.data.items || null
} catch (e) {
  error.value = e.message
} finally {
  isLoading.value = false
}
</script>
