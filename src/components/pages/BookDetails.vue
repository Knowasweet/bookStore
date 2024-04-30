<template>
  <div v-if="book" class="mx-[100px] mb-[458px] mt-[84px]">
    <div class="flex gap-[79px]">
      <div class="flex flex-col items-center gap-[18px]">
        <BookImage :id="book.id" class="w-[343px]" />
        <BookPreviewButton :previewLink="book.volumeInfo.previewLink" />
      </div>
      <BookSection :book="book.volumeInfo" :id="book.id" />
    </div>
  </div>
  <NotFound v-else />
</template>

<script setup>
import NotFound from '@/components/pages/NotFound.vue'
import BookImage from '@/components/books/book/BookImage.vue'
import BookPreviewButton from '@/components/uikit/buttons/BookPreviewButton.vue'
import BookSection from '@/components/books/book/details/BookSection.vue'
import { getBookDetails } from '@/api/books.js'
import { ref } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const book = ref(null)

const getBookWithDetails = async () => {
  try {
    const response = await getBookDetails(props.id)
    const volumeInfo = response.data.volumeInfo
    if (volumeInfo.categories) {
      volumeInfo.categories = new Set(
        volumeInfo.categories.map((category) => category.split('/')[0]),
      )
    }
    book.value = response.data
  } catch (e) {
    throw e.message
  }
}

await getBookWithDetails()
</script>
