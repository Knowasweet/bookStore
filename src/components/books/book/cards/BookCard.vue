<template>
  <div
    class="flex gap-[22px] rounded-lg border-[1px] border-transparent py-[9px] pl-[15px] pr-4 hover:border-lightgray hover:shadow-[0px_12px_10px_-10px] hover:shadow-gray"
  >
    <RouterLink :to="{ name: 'BookDetails', params: { id: book.id } }">
      <BookImage :id="book.id" class="h-[209px] w-[171px] rounded-[5px]" />
    </RouterLink>
    <div class="mt-[50px] flex w-[204px] flex-col justify-between">
      <div class="space-y-[15px]">
        <RouterLink :to="{ name: 'BookDetails', params: { id: book.id } }">
          <h5 class="line-clamp-1 text-xs">
            {{ book.volumeInfo.title }}
          </h5>
        </RouterLink>
        <div class="line-clamp-4 font-nunito text-[12px] leading-4 opacity-50">
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
import BookImage from '@/components/books/book/BookImage.vue'
import FavoriteButton from '@/components/uikit/buttons/FavoriteButton.vue'

defineProps({
  book: {
    type: Object,
    required: true,
  },
})
</script>
