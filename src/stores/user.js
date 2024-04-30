import { defineStore } from 'pinia'
import { ref, watchEffect } from 'vue'
import { getGoogleAccessToken } from '@/api/googleAuthTokens.js'
import { jwtDecode } from 'jwt-decode'
import { googleSdkLoaded } from 'vue3-google-login'
import { useBooksStore } from '@/stores/books.js'

export const useUserStore = defineStore('userStore', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')) ?? null)

  const initUser = () => {
    googleSdkLoaded((google) => {
      google.accounts.oauth2
        .initCodeClient({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          scope: 'https://www.googleapis.com/auth/books',
          callback: async (codeResponse) => {
            try {
              const { data: dataResponse } = await getGoogleAccessToken(codeResponse.code)
              const { access_token: accessToken, refresh_token: refreshToken } = dataResponse
              const { email, name, picture } = jwtDecode(dataResponse.id_token)

              addUser({
                accessToken,
                refreshToken,
                email: email,
                name: name,
                picture: picture,
              })

              await useBooksStore().addFavoriteBooks()
            } catch (e) {
              throw e.message
            }
          },
        })
        .requestCode()
    })
  }

  const addUser = (newUser) => {
    user.value = newUser
  }

  const clearUser = () => {
    user.value = null
  }

  watchEffect(() => {
    localStorage.setItem('user', JSON.stringify(user.value))
  })

  return {
    user,
    initUser,
    clearUser,
  }
})
