<template>
  <div v-if="book" class="mx-[100px] mb-[458px] mt-[84px]">
    <div class="flex gap-[79px]">
      <div class="flex flex-col items-center gap-[18px]">
        <BookImage :id="book.id" class="w-[343px]" />
        <a
          :href="book.volumeInfo.previewLink"
          target="_blank"
          class="w-full rounded-[5px] border-[1px] border-orange bg-orange py-[15px] text-center font-nunito font-semibold leading-[22px] text-white hover:bg-white hover:text-orange/60 active:text-orange"
        >
          Get now!
        </a>
      </div>
      <div class="flex w-[818px] flex-col gap-[50px]">
        <div class="flex justify-between">
          <div class="flex flex-col gap-6">
            <h3 class="font-nunito text-4xl">{{ book.volumeInfo.title }}</h3>
            <div class="flex flex-wrap gap-5">
              <div v-for="category in book.volumeInfo.categories" :key="category">
                <div
                  class="rounded-lg bg-yellow px-4 py-3 font-plex font-bold leading-6 text-black"
                >
                  {{ category }}
                </div>
              </div>
            </div>
          </div>
          <div class="h-[54px] w-[54px]">
            <button
              @click="toggleFavorite"
              class="group flex h-[54px] w-[54px] items-center justify-center rounded-full border-[1px] border-lightgray/90 bg-transparent"
            >
              <FontAwesomeIcon
                :icon="['fas', 'heart']"
                class="h-[27px] w-[32px]"
                :class="
                  user && user.books && user.books.some((favoriteBook) => favoriteBook.id === id)
                    ? 'text-red group-hover:text-red-800 group-active:text-red-800'
                    : 'text-darkblue/60 group-hover:text-red group-active:text-red-800'
                "
              />
            </button>
          </div>
        </div>
        <div class="flex flex-col gap-[53px]">
          <div class="flex justify-between">
            <div class="font-nunito text-3xl leading-[33px]">
              <div><span class="font-bold">Author:</span> {{ book.volumeInfo.authors[0] }}</div>
              <div><span class="font-bold">Publisher:</span> {{ book.volumeInfo.publisher }}</div>
              <div>
                <span class="font-bold">Year:</span>
                {{ book.volumeInfo.publishedDate.split('-')[0] }}
              </div>
              <div><span class="font-bold">Pages:</span> {{ book.volumeInfo.pageCount }}</div>
            </div>
            <RatingBookDetails
              v-if="book.volumeInfo.averageRating !== undefined"
              :rating="book.volumeInfo.averageRating"
            />
          </div>
          <div>
            <div
              class="mb-[31px] border-b-2 border-yellow pb-[10px] font-nunito text-4xl leading-[44px]"
            >
              Description
            </div>
            <div class="font-nunito text-3xl leading-[33px]">
              {{ book.volumeInfo.description.replace(/<[^>]+>/g, '') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <NotFound v-else />
</template>

<script setup>
import RatingBookDetails from '@/components/RatingBookDetails.vue'
import BookImage from '@/components/BookImage.vue'
import NotFound from '@/views/NotFound.vue'
import { addFavoriteBook, getBookDetails, removeFavoriteBook } from '@/api/books.js'
import { refreshGoogleAccessToken } from '@/api/googleAuthTokens.js'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed, ref } from 'vue'
import { useUserStore } from '@/stores/user.js'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
})

const book = ref(null)

const userStore = useUserStore()
const user = computed(() => userStore.user)

const isLoading = ref(true)
const error = ref(null)

const getBookWithDetails = async () => {
  try {
    isLoading.value = true
    const response = await getBookDetails(props.id)
    response.data.volumeInfo.categories = new Set(
      response.data.volumeInfo.categories.map((category) => category.split('/')[0]),
    )
    book.value = response.data
  } catch (e) {
    error.value = e.message
  } finally {
    isLoading.value = false
  }
}

await getBookWithDetails()

const addBookToFavorites = async () => {
  try {
    isLoading.value = true
    await addFavoriteBook(props.book.id, user.value.accessToken)
  } catch (e) {
    isLoading.value = false
    if (e.request.status === 401) {
      await refreshAccessToken(addBookToFavorites)
    } else {
      error.value = e.message
    }
  } finally {
    isLoading.value = false
  }
}

const removeBookFromFavorites = async () => {
  try {
    isLoading.value = true
    await removeFavoriteBook(props.book.id, user.value.accessToken)
  } catch (e) {
    isLoading.value = false
    if (e.request.status === 401) {
      await refreshAccessToken(removeBookFromFavorites)
    } else {
      error.value = e.message
    }
  } finally {
    isLoading.value = false
  }
}

const refreshAccessToken = async (func) => {
  try {
    isLoading.value = true
    const accessTokenResponse = await refreshGoogleAccessToken(user.value.refreshToken)
    user.value.accessToken = accessTokenResponse.data.access_token
    await func()
  } catch (error) {
    error.value = error.message
  } finally {
    isLoading.value = false
  }
}

const toggleFavorite = async () => {
  if (user.value) {
    if (!user.value.books.some((favoriteBook) => favoriteBook.id === props.book.id)) {
      userStore.addFavoriteBook(props.book)
      await addBookToFavorites()
    } else {
      userStore.removeFavoriteBook(props.book)
      await removeBookFromFavorites()
    }
  } else {
    alert('Please login to manipulate with favorite books.')
  }
}
</script>
