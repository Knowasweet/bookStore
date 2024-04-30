<template>
  <div class="mx-[100px] mb-[152px] mt-[76px]">
    <NewestBooks />
    <RelevantBooks class="mb-[123px]" />
    <CategoryBooks />
  </div>
</template>

<script setup>
import NewestBooks from '@/components/books/NewestBooks.vue'
import RelevantBooks from '@/components/books/RelevantBooks.vue'
import CategoryBooks from '@/components/books/CategoryBooks.vue'
</script>
