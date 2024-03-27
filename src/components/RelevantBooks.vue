<template>
  <BooksCarousel title="Recommended for you" :books="books" />
</template>

<script setup>
import BooksCarousel from '@/components/BooksCarousel.vue'
import { getRelevantBooks } from '@/api/books.js'
import { ref } from 'vue'

const books = ref([])

const isLoading = ref(true)
const error = ref(null)

try {
  const response = await getRelevantBooks()
  books.value = response.data.items || null
} catch (e) {
  error.value = e.message
} finally {
  isLoading.value = false
}
</script>
