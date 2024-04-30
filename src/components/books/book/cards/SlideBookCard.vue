<template>
  <div class="flex gap-10">
    <RouterLink :to="{ name: 'BookDetails', params: { id: book.id } }">
      <BookImage :id="book.id" class="h-[250px] w-[180px] rounded-[5px]" />
    </RouterLink>
    <div class="mt-[66px] flex w-[219px] flex-col justify-between">
      <div class="space-y-[15px]">
        <RouterLink :to="{ name: 'BookDetails', params: { id: book.id } }">
          <h5 class="line-clamp-1">{{ book.volumeInfo.title }}</h5>
        </RouterLink>
        <div class="line-clamp-3 font-nunito text-sm opacity-50">
          {{ book.volumeInfo.description }}
        </div>
      </div>
      <div class="mr-8 self-end">
        <FavoriteButton :bookId="book.id" />
      </div>
    </div>
  </div>
</template>

<script setup>
import FavoriteButton from '@/components/uikit/buttons/FavoriteButton.vue'
import BookImage from '@/components/books/book/BookImage.vue'

defineProps({
  book: {
    type: Object,
    required: true,
  },
})
</script>
