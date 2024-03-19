import axios from 'axios'

export const googleBooksApiClient = axios.create({
  baseURL: 'https://www.googleapis.com/books/v1/volumes',
  timeout: 1000,
})
