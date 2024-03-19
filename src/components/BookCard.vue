<template>
  <div class="flex gap-[21.85px] rounded-[8px] border-[1px] border-transparent py-[9px] pl-[15.06px] pr-[15.63px] hover:border-x-lightgray hover:border-b-lightgray hover:shadow-[0px_12.5px_10px_-10px] hover:shadow-gray">
    <RouterLink :to="{ name: 'BookDetails', params: { id: book.id } }">
      <BookImage :id="book.id" class="h-[209px] w-[170.87px] rounded-[5px]"/>
    </RouterLink>
    <div class="mt-[50px] flex w-[203.92px] flex-col justify-between">
      <div class="space-y-[15px]">
        <RouterLink :to="{ name: 'BookDetails', params: { id: book.id } }">
          <h5 class="line-clamp-1 text-xs">
            {{ book.volumeInfo.title }}
          </h5>
        </RouterLink>
        <div class="line-clamp-4 font-nunito text-[12px] leading-[16.37px] opacity-[52%]">
          {{ book.volumeInfo.description }}
        </div>
      </div>
      <div class="mr-[32.7px] self-end">
        <button
            @click="toggleLike"
            class="group flex h-[40px] w-[40px] items-center justify-center rounded-full border-[1px] border-lightgray/90 bg-transparent"
        >
          <FontAwesomeIcon
              :icon="['fas', 'heart']"
              class="h-[20.06px] w-[23.41px]"
              :class="user && user.liked.includes(book.id) ? 'text-red group-hover:text-red-800 group-active:text-red-800' : 'text-darkblue/60 group-hover:text-red group-active:text-red-800'"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import BookImage from "@/components/BookImage.vue";
import {useUsersStore} from "@/stores/users.js";
import {computed} from "vue";

const props = defineProps({
  book: {
    type: Object,
    required: true
  }
})

const usersStore = useUsersStore()
const user = computed(() => usersStore.activeUser)

const toggleLike = () => {
  usersStore.toggleLikedBook(user.value, props.book.id)
}
</script>
