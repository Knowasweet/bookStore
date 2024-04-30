<template>
  <Paginate
    v-model="currentPage"
    :clickHandler="changePage"
    :pageCount="100"
    prevText="Prev"
    nextText="Next"
    :no-li-surround="true"
    container-class="flex gap-8 justify-center text-gray"
    page-link-class="hidden"
    :prev-link-class="currentPage > 1 ? 'paginationBtn' : 'hidden'"
    :next-link-class="numberOfBooks < 12 || lastPage === currentPage ? 'hidden' : 'paginationBtn'"
  />
</template>

<script setup>
import Paginate from 'vuejs-paginate-next'

const currentPage = defineModel({ required: true })

defineProps({
  numberOfBooks: {
    type: Number,
    required: true,
  },
  lastPage: {
    type: Number,
    required: true,
  },
})

const emits = defineEmits(['changeCurrentPage'])

const changePage = () => {
  emits('changeCurrentPage')
}
</script>

<style>
.paginationBtn {
  @apply flex h-8 w-16 cursor-pointer select-none items-center justify-center rounded-[4px] border-[1px] border-lightgray bg-transparent text-sm font-bold hover:bg-lightgray;
}
</style>
