<template>
  <div class="font-nunito text-3xl leading-[33px]">
    <div v-if="book.authors"><span class="font-bold">Author:</span> {{ book.authors[0] }}</div>
    <div v-if="book.publisher"><span class="font-bold">Publisher:</span> {{ book.publisher }}</div>
    <div v-if="book.publishedDate">
      <span class="font-bold">Year:</span>
      {{ book.publishedDate.split('-')[0] }}
    </div>
    <div v-if="book.pageCount"><span class="font-bold">Pages:</span> {{ book.pageCount }}</div>
  </div>
</template>

<script setup>
defineProps({
  book: {
    type: Object,
    required: true,
  },
})
</script>
