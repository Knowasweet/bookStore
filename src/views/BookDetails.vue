<template>
  <div v-if="'id' in book" class="mx-[100px] mb-[457.5px] mt-[84px]">
    <div class="flex gap-[79px]">
      <div class="flex flex-col items-center gap-[18px]">
        <BookImage :id="book.id" class="h-[477px] w-[343px]"/>
        <a
            :href="`http://books.google.fi/books?id=${book.volumeInfo.previewLink}=&source=gbs_api`"
            target="_blank"
            class="w-full rounded-[5px] border-[1px] border-orange bg-orange py-[15px] text-center font-nunito font-semibold leading-[21.82px] tracking-[.02em] text-white hover:bg-white hover:text-orange active:text-orange-800"
        >
          Get now!
        </a>
      </div>
      <div class="flex w-[818px] flex-col gap-[50px]">
        <div class="flex justify-between">
          <div class="flex flex-col gap-[24px]">
            <h3 class="font-nunito text-4xl">{{ book.volumeInfo.title }}</h3>
            <div class="flex flex-wrap gap-[20px]">
              <div v-for="category in book.volumeInfo.categories" :key="category">
                <div
                    class="rounded-[8px] bg-yellow px-[16px] py-[12px] font-plex font-bold leading-[24px] tracking-[0.05em] text-black"
                >
                  {{ category }}
                </div>
              </div>
            </div>
          </div>
          <div class="h-[54px] w-[54px]">
            <button
                @click="toggleLike"
                class="group flex h-[54px] w-[54px] items-center justify-center rounded-full border-[1px] border-lightgray/90 bg-transparent"
            >
                <FontAwesomeIcon
                    :icon="['fas', 'heart']"
                    class="h-[27.08px] w-[31.6px] "
                    :class="user && user.liked.includes(id) ? 'text-red group-hover:text-red-800 group-active:text-red-800' : 'text-darkblue/60 group-hover:text-red group-active:text-red-800'"
                />

            </button>
          </div>
        </div>
        <div class="flex flex-col gap-[53px]">
          <div class="flex justify-between">
            <div class="font-nunito text-3xl leading-[32.74px]">
              <div><span class="font-bold">Author:</span> {{ book.volumeInfo.authors[0] }}</div>
              <div><span class="font-bold">Publisher:</span> {{ book.volumeInfo.publisher }}</div>
              <div>
                <span class="font-bold">Year:</span>
                {{ book.volumeInfo.publishedDate.split('-')[0] }}
              </div>
              <div><span class="font-bold">Pages:</span> {{ book.volumeInfo.pageCount }}</div>
            </div>
            <div class="flex flex-row gap-[12.5px]">
              <div v-for="index in 5" :key="index">
                <FontAwesomeIcon
                    :icon="['fas', 'star']"
                    class="h-[34.17px] w-[32.11px] text-darkblue/60 hover:text-yellow active:text-yellow-800"
                />
              </div>
            </div>
          </div>
          <div>
            <div
                class="mb-[31px] border-b-[1.6px] border-yellow pb-[10px] font-nunito text-4xl leading-[43.65px]"
            >
              Description
            </div>
            <div class="font-nunito text-3xl leading-[32.74px]">
              {{ book.volumeInfo.description.replace(/<[^>]+>/g, '') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BookImage from '@/components/BookImage.vue'
import {computed, ref} from 'vue'
import {getBookDetails} from '@/api/books.js'
import {useUsersStore} from "@/stores/users.js";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const book = ref({})

const usersStore = useUsersStore()
const user = computed(() => usersStore.activeUser)

const toggleLike = () => {
  usersStore.toggleLikedBook(user.value, props.id)
}

await getBookDetails(props.id, book)
</script>
