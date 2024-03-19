<template>
  <div class="flex gap-[40px]">
    <RouterLink :to="{ name: 'BookDetails', params: { id: book.id } }">
      <BookImage :id="book.id" class="h-[250px] w-[180px] rounded-[5px]" />
    </RouterLink>
    <div class="mt-[66px] flex w-[219px] flex-col justify-between">
      <div class="space-y-[15px]">
        <RouterLink :to="{ name: 'BookDetails', params: { id: book.id } }">
          <h5 class="line-clamp-1">{{ book.volumeInfo.title }}</h5>
        </RouterLink>
        <div class="text-s line-clamp-3 font-nunito opacity-[52%]">
          {{ book.volumeInfo.description }}
        </div>
      </div>

      <div @click="toggleLike">
        <Button v-if="user && user.liked.includes(book.id)" class="w-[147px]">Disliked</Button>
        <Button v-else class="w-[147px]">Add to favorite</Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from '@/components/Button.vue'
import BookImage from '@/components/BookImage.vue'
import {useUsersStore} from "@/stores/users.js";
import {computed} from "vue";

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
})

const usersStore = useUsersStore()
const user = computed(() => usersStore.activeUser)

const toggleLike = () => {
  usersStore.toggleLikedBook(user.value, props.book.id)
}
</script>
