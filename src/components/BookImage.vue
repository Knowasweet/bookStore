<template>
  <img
    :src="`https://books.google.com/books/content?id=${id}&printsec=frontcover&img=1`"
    :alt="`book-${id}`"
    class="rounded-[3px]"
  />
</template>

<script setup>
defineProps({
  id: {
    type: String,
    required: true,
  },
})
</script>
