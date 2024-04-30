<template>
  <div class="flex justify-center">
    <div class="pointer-events-none absolute mr-6 flex h-14 w-64 items-center">
      <button
        v-if="user"
        @click="logout"
        class="group pointer-events-auto h-10 w-56 select-none rounded-md border-[1px] border-gray/25 bg-white hover:border-lightblue-800 active:bg-lightblue"
      >
        <span class="mx-2 flex items-center justify-between">
          <span class="flex items-center gap-2">
            <img :src="user.picture" alt="user-picture" class="w-5 rounded-full" />
            <span class="flex w-36 flex-col text-left font-roboto text-xs">
              <span class="line-clamp-1 text-[12px] font-medium">Logout as {{ user.name }}</span>
              <span class="line-clamp-1 text-[11px] text-darkblue/60">{{ user.email }}</span>
            </span>
          </span>
          <span>
            <FontAwesomeIcon
              :icon="['fas', 'arrow-right-from-bracket']"
              class="h-4 w-4 text-darkblue/60 hover:text-red group-active:text-red-800"
            />
          </span>
        </span>
      </button>

      <button v-else @click="login" class="pointer-events-auto">
        <GoogleLogin class="pointer-events-none" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { GoogleLogin } from 'vue3-google-login'
import { useUserStore } from '@/stores/user.js'
import { useBooksStore } from '@/stores/books.js'

const emit = defineEmits(['closeLogin'])

const bookStore = useBooksStore()
const userStore = useUserStore()
const user = userStore.user

const login = () => {
  try {
    userStore.initUser()
    emit('closeLogin')
  } catch (e) {
    throw e.message
  }
}

const logout = () => {
  userStore.clearUser()
  bookStore.clearBooks()
  emit('closeLogin')
}
</script>
