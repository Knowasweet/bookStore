<template>
  <div class="mb-[68px] mt-[79px] ml-[67px] mr-[65px]">
    <div class="space-y-[50px]">
      <div>
        <h3 v-if="user" class="text-4xl font-bold text-center">Liked Books</h3>
        <h3 v-else class="text-4xl font-bold text-center">Login In</h3>
      </div>

      <div v-if="books.length > 0" class="grid grid-cols-3 grid-rows-1 gap-x-[10px] gap-y-[58px] pb-[64px]">
        <LikedBookCard v-for="(book, index) in books"
                  :key="index" :book="book"/>
      </div>

      <div v-else>
        <h4 v-if="user" class="text-3xl font-bold text-center">No Liked Books</h4>
      </div>
    </div>
  </div>
</template>

<script setup>
import LikedBookCard from "@/components/LikedBookCard.vue";
import {useUsersStore} from "@/stores/users.js";
import {getBookById} from "@/api/books.js";
import {computed, onBeforeUpdate, ref} from "vue";


const user = computed(() => useUsersStore().activeUser)
const isBooksReceived = ref(false)
const books = ref([])


const getBooks = async () => {
  if (user.value && !isBooksReceived.value) {
    isBooksReceived.value = true
    for (const bookId of user.value.liked) {
      await getBookById(bookId, books);
    }
  }
}

await getBooks()

onBeforeUpdate(() => {
  getBooks()
})
</script>