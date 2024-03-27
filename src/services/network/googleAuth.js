import axios from 'axios'

export const googleAuth = axios.create({
  baseURL: 'https://oauth2.googleapis.com/token',
  timeout: 5000,
})
