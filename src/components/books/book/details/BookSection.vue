<template>
  <div class="w-[818px] space-y-[50px]">
    <div class="flex justify-between">
      <div class="space-y-6">
        <h3 class="w-[750px] font-nunito text-4xl">{{ book.title }}</h3>
        <div v-if="book.categories" class="flex flex-wrap gap-5">
          <BookCategory v-for="category in book.categories" :key="category" :category="category" />
        </div>
      </div>
      <FavoriteButton :bookId="id" class="scale-[1.35]" />
    </div>
    <div class="space-y-[53px]">
      <div class="flex justify-between">
        <BookDetailsInfo :book="book" />
        <div v-if="book.averageRating">
          <BookRating :rating="book.averageRating" />
        </div>
      </div>
      <BookDescription v-if="book.description" :description="book.description" />
    </div>
  </div>
</template>

<script setup>
import FavoriteButton from '@/components/uikit/buttons/FavoriteButton.vue'
import BookRating from '@/components/books/book/details/BookRating.vue'
import BookCategory from '@/components/books/book/details/BookCategory.vue'
import BookDescription from '@/components/books/book/details/BookDescription.vue'
import BookDetailsInfo from '@/components/books/book/details/BookDetailsInfo.vue'

defineProps({
  book: {
    type: Object,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
})
</script>
