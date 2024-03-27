<template>
  <header class="sticky top-0 z-10 w-full bg-white py-[30px]">
    <div class="mx-[100px]">
      <div class="flex items-center justify-between">
        <div>
          <div class="pointer-events-none absolute py-2 pl-4">
            <FontAwesomeIcon :icon="['fas', 'magnifying-glass']" class="h-4 w-4" />
          </div>
          <input
            @keyup.enter="goToSearchPage"
            v-model="inputValue"
            type="text"
            placeholder="What are you looking for ?"
            class="w-[296px] rounded-lg bg-lightgray py-[7px] pl-[46px] font-nunito leading-[22px] outline-darkblue/10"
          />
        </div>
        <div class="flex gap-6">
          <div ref="target">
            <button @click="toggleIsShowLogin">
              <img
                v-if="user"
                :src="user.picture"
                alt="user-picture"
                class="h-5 w-5 rounded-full"
              />
              <FontAwesomeIcon
                v-else
                :icon="['far', 'user']"
                class="h-5 w-5 text-darkblue/60 hover:text-darkblue/70 active:text-darkblue"
              />
            </button>
          </div>

          <button @click="goToFavoritesPage">
            <FontAwesomeIcon
              :icon="['far', 'heart']"
              class="h-5 w-5 text-darkblue/60 hover:text-red active:text-red-800"
            />
          </button>

          <RouterLink :to="{ name: 'Home' }">
            <button>
              <FontAwesomeIcon
                :icon="['fas', 'house']"
                class="h-5 w-5 text-darkblue/60 hover:text-darkblue/70 active:text-darkblue"
              />
            </button>
          </RouterLink>
        </div>
      </div>
      <Login v-if="isShowLogin" @closeLogin="toggleIsShowLogin" />
    </div>
  </header>
</template>

<script setup>
import Login from '@/components/Login.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { onClickOutside } from '@vueuse/core'
import { useUserStore } from '@/stores/user.js'
import { useRoute, useRouter } from 'vue-router'
import { computed, ref } from 'vue'

const isShowLogin = ref(false)
const user = computed(() => useUserStore().user)

const route = useRoute()
const router = useRouter()
const inputValue = ref(route.query.search_query)

const target = ref(null)
onClickOutside(target, () => {
  if (isShowLogin.value) {
    toggleIsShowLogin()
  }
})

const toggleIsShowLogin = () => {
  isShowLogin.value = !isShowLogin.value
}

const goToFavoritesPage = () => {
  if (user.value) {
    router.push({ name: 'FavoriteBooks' })
  } else {
    alert('Please create an account or login to get your favorite books and other content.')
    toggleIsShowLogin()
  }
}

const goToSearchPage = () => {
  router.push({ name: 'Search', query: { search_query: inputValue.value, page: 1 } })
  document.activeElement.blur()
}
</script>
