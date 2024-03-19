<template>
  <header class="sticky top-0 z-10 w-full bg-white pb-[9px] pt-[35px]">
    <div class="mx-[100px] flex items-center justify-between">
      <div>
        <div class="pointer-events-none absolute py-[8px] pl-[15px]">
          <FontAwesomeIcon :icon="['fas', 'magnifying-glass']" class="h-[16px] w-[16px]"/>
        </div>
        <input
            @keyup.enter=" redirectToSearch"
            v-model="inputValue"
            type="text"
            placeholder="What are you looking for ?"
            class="w-[296px] rounded-[8px] bg-lightgray py-[7px] pl-[46px] font-nunito leading-[21.82px] outline-darkblue/10"
        />
      </div>
      <div class="flex gap-[24px]">
        <button @click="toggleShowLogin">
          <img v-if="user" :src="user.picture" class="h-[22px] w-[22px] rounded-full" alt="profile">
          <FontAwesomeIcon v-else :icon="['far', 'user']" class="h-[22px] w-[18px]"/>
        </button>

        <RouterLink :to="{ name: 'LikedBooks' }">
          <button>
            <FontAwesomeIcon :icon="['far', 'heart']"
                             class="h-[22.5px] w-[25px] text-darkblue/60 hover:text-red active:text-red-800"/>
          </button>
        </RouterLink>
      </div>
    </div>
    <Login v-if="showLogin" @closeLogin="toggleShowLogin"/>
  </header>

</template>

<script setup>
import Login from "@/components/Login.vue";

import {computed, ref} from 'vue'
import {useRouter} from 'vue-router'
import {useUsersStore} from "@/stores/users.js";

const router = useRouter()
const inputValue = ref('')
const showLogin = ref(false)

const user = computed(() => useUsersStore().activeUser)

const toggleShowLogin = () => {
  showLogin.value = !showLogin.value
}

const redirectToSearch = () => {
  router.push({name: 'Search', query: {search_query: inputValue.value, page: 1}})
  document.activeElement.blur()
}
</script>
