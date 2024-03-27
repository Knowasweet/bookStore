<template>
  <div class="flex justify-end">
    <div class="pointer-events-none absolute flex h-14 w-64 items-center justify-end">
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
      <button v-else @click="loggedIn" class="pointer-events-auto">
        <GoogleLogin class="pointer-events-none" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { GoogleLogin, googleSdkLoaded } from 'vue3-google-login'
import { getGoogleAccessToken } from '@/api/googleAuthTokens.js'
import { getFavoriteBooks } from '@/api/books.js'
import { jwtDecode } from 'jwt-decode'
import { useUserStore } from '@/stores/user.js'
import { ref } from 'vue'

const emits = defineEmits(['closeLogin'])

const userStore = useUserStore()
const user = userStore.user

const isLoading = ref(true)
const error = ref(null)

const loggedIn = () => {
  const scopes = [
    'https://www.googleapis.com/auth/books',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
  ]
  isLoading.value = true
  googleSdkLoaded(async (google) => {
    try {
      await google.accounts.oauth2
        .initCodeClient({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          scope: scopes.join(' '),
          callback: getAccessToken,
        })
        .requestCode()
    } catch (e) {
      error.value = e.message
    } finally {
      isLoading.value = false
    }
  })
}

const getAccessToken = async (response) => {
  isLoading.value = true
  try {
    const accessTokenResponse = await getGoogleAccessToken(response.code)
    const accessToken = accessTokenResponse.data.access_token
    const refreshToken = accessTokenResponse.data.refresh_token
    const credential = jwtDecode(accessTokenResponse.data.id_token)
    const userBooks = await getUserBooks(accessToken)
    userStore.addUser(accessToken, refreshToken, credential, userBooks)
    emits('closeLogin', false)
  } catch (e) {
    error.value = e.message
  } finally {
    isLoading.value = false
  }
}

const logout = () => {
  userStore.removeUser()
  emits('closeLogin', false)
}

const getUserBooks = async (accessToken) => {
  try {
    isLoading.value = true
    const response = await getFavoriteBooks(accessToken)
    return response.data.items
  } catch (e) {
    error.value = e.message
  } finally {
    isLoading.value = false
  }
}
</script>
