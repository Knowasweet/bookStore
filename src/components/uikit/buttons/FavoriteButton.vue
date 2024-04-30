<template>
  <button
    @click="toggleFavorite(bookId)"
    class="group flex h-10 w-10 items-center justify-center rounded-full border-[1px] border-lightgray/90 bg-transparent"
  >
    <FontAwesomeIcon
      :icon="['fas', 'heart']"
      class="h-5 w-6"
      :class="
        books.includes(bookId)
          ? 'text-red group-hover:text-red-800/60 group-active:text-red-800'
          : 'text-darkblue/60 group-hover:text-red group-active:text-red-800'
      "
    />
  </button>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useUserStore } from '@/stores/user.js'
import { useBooksStore } from '@/stores/books.js'
import { computed } from 'vue'

const booksStore = useBooksStore()
const books = computed(() => booksStore.books)

const user = computed(() => useUserStore().user)

defineProps({
  bookId: {
    type: String,
    required: true,
  },
})

const toggleFavorite = async (bookId) => {
  if (user.value) {
    if (books.value.includes(bookId)) {
      await booksStore.removeBook(bookId)
    } else {
      await booksStore.addBookToFavorites(bookId)
    }
  } else {
    alert('Please login to manipulate with favorite books.')
  }
}
</script>
