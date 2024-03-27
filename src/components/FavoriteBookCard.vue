<template>
  <div
    v-if="
      user.value.books && user.value.books.some((favoriteBook) => favoriteBook.id === props.book.id)
    "
    class="flex gap-[22px] rounded-lg border-[1px] border-transparent py-[9px] pl-[15px] pr-4 hover:border-lightgray hover:shadow-[0px_12px_10px_-10px] hover:shadow-gray"
  >
    <RouterLink :to="{ name: 'BookDetails', params: { id: book.id } }">
      <BookImage :id="book.id" class="h-[209px] w-[171px] rounded-[5px]" />
    </RouterLink>
    <div class="mt-[50px] flex w-[204px] flex-col justify-between">
      <div class="space-y-[15px]">
        <RouterLink :to="{ name: 'BookDetails', params: { id: book.id } }">
          <h5 class="line-clamp-1 text-xs">
            {{ book.volumeInfo.title }}
          </h5>
        </RouterLink>
        <div class="line-clamp-4 font-nunito text-[12px] leading-4 opacity-50">
          {{ book.volumeInfo.description }}
        </div>
      </div>
      <div class="mr-8 self-end">
        <button
          @click="toggleFavorite"
          class="group flex h-10 w-10 items-center justify-center rounded-full border-[1px] border-lightgray/90 bg-transparent"
        >
          <FontAwesomeIcon
            :icon="['fas', 'heart']"
            class="h-5 w-6"
            :class="
              user.books.some((favoriteBook) => favoriteBook.id === book.id)
                ? 'text-red group-hover:text-red-800/60 group-active:text-red-800'
                : 'text-darkblue/60 group-hover:text-red group-active:text-red-800'
            "
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import BookImage from '@/components/BookImage.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { addFavoriteBook, removeFavoriteBook } from '@/api/books.js'
import { refreshGoogleAccessToken } from '@/api/googleAuthTokens.js'
import { useUserStore } from '@/stores/user.js'
import { computed, ref } from 'vue'

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
})

const userStore = useUserStore()
const user = computed(() => userStore.user)

const isLoading = ref(true)
const error = ref(null)

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
