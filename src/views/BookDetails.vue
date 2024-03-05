<template>
  <div class="mb-[457.5px] ml-[91px] mr-[108px] mt-[84px]">
    <div v-if="!hasBookExists">
      <div class="text-red-800 text-center text-6xl">The book doesn't exist</div>
    </div>
    <div v-else class="flex gap-[79px]">
      <div class="flex flex-col items-center gap-[18px]">
        <img
          :src="`https://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1`"
          :alt="`book-${book.id}`"
          class="h-[477px] w-[343px] rounded-[3px]"
        />
        <button
          @click="openPreviewLink"
          class="bg-orange border-orange hover:text-orange w-full rounded-[5px] border-[1px] py-[15px] text-base-nunito font-semibold tracking-[.02em] text-white hover:bg-white"
        >
          Get now!
        </button>
      </div>
      <div class="flex w-[811px] flex-col gap-[50px]">
        <div class="flex justify-between">
          <div class="flex flex-col gap-[24px]">
            <h3 class="font-nunito text-4xl">{{ book.volumeInfo.title }}</h3>
            <div class="flex flex-wrap gap-[20px]">
              <div v-for="category in book.volumeInfo.categories" :key="category">
                <div
                  class="rounded-[8px] bg-yellow px-[16px] py-[12px] font-plex text-base-bold text-black"
                >
                  {{ category.split('/')[0] }}
                </div>
              </div>
            </div>
          </div>
          <div class="h-[54px] w-[54px]">
            <button
              class="group flex h-[54px] w-[54px] items-center justify-center rounded-full border-[1px] border-lightgray/90 bg-transparent"
            >
              <FontAwesomeIcon
                :icon="['fas', 'heart']"
                class="group-active:text-red-800 h-[27.08px] w-[31.6px] text-darkblue/60 group-hover:text-red"
              />
            </button>
          </div>
        </div>
        <div class="flex flex-col gap-[53px]">
          <div class="flex justify-between">
            <div class="font-nunito text-3xl-nunito">
              <div><span class="font-bold">Author:</span> {{ book.volumeInfo.authors[0] }}</div>
              <div><span class="font-bold">Publisher:</span> {{ book.volumeInfo.publisher }}</div>
              <div>
                <span class="font-bold">Year:</span>
                {{ book.volumeInfo.publishedDate.split('-')[0] }}
              </div>
              <div><span class="font-bold">Pages:</span> {{ book.volumeInfo.pageCount }}</div>
            </div>
            <div class="flex flex-row gap-[12.5px]">
              <div v-for="i in 5" :key="i">
                <FontAwesomeIcon
                  :icon="['fas', 'star']"
                  class="active:text-yellow-800 h-[34.17px] w-[32.11px] text-darkblue/60 hover:text-yellow"
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
            <div class="font-nunito text-3xl-nunito">
              {{ book.volumeInfo.description.replace(/<[^>]+>/g, '') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import axios from 'axios'

const hasBookExists = ref(true)

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const book = ref({})

const openPreviewLink = () => {
  window.open(
    `http://books.google.fi/books?id=${book.value.volumeInfo.previewLink}=&source=gbs_api`,
  )
}

onBeforeMount(() =>
  axios
    .get(`https://www.googleapis.com/books/v1/volumes/${props.id}`)
    .then((response) => (response.status === 200 ? (book.value = response.data) : ''))
    .catch((error) => {
      hasBookExists.value = false
      console.error('Error in book data:', error)
    }),
)
</script>
