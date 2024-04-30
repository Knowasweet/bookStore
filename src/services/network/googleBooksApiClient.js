import axios from 'axios'
import { useUserStore } from '@/stores/user.js'
import { refreshGoogleAccessToken } from '@/api/googleAuthTokens.js'

const googleBooksApiClient = axios.create({
  baseURL: 'https://www.googleapis.com/books/v1',
  timeout: 5000,
})

googleBooksApiClient.interceptors.request.use(
  (config) => {
    const user = useUserStore().user

    if (user) {
      config.headers.Authorization = `Bearer ${user.accessToken}`
    }

    return config
  },
  (error) => Promise.reject(error),
)

googleBooksApiClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const userStore = useUserStore()
    const user = userStore.user

    if (error.response.status === 401 && user) {
      try {
        const refreshResponse = await refreshGoogleAccessToken(user.refreshToken)
        userStore.user.accessToken = refreshResponse.data.access_token

        return axios({
          ...error.config,
          headers: {
            ...error.config.headers,
            Authorization: `Bearer ${userStore.user.accessToken}`,
          },
        })
      } catch (refreshError) {
        userStore.clearUser()
        throw refreshError.message
      }
    }
    return Promise.reject(error)
  },
)

export { googleBooksApiClient }
