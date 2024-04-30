import axios from 'axios'

export const googleAuthApiClient = axios.create({
  baseURL: 'https://oauth2.googleapis.com/token',
  timeout: 5000,
})
