import { googleBooksApiClient } from '@/services/network/googleBooksApiClient.js'
import { getRandomInteger } from '@/helpers/mathHelpers.js'
import { BOOK_CATEGORIES } from '@/constants/books/categories.js'

export const getNewestBooks = (start, end) => {
  return googleBooksApiClient.get('/volumes', {
    params: {
      q: `intitle:`,
      orderBy: 'newest',
      startIndex: start,
      maxResults: end,
    },
  })
}

export const getRelevantBooks = () => {
  return googleBooksApiClient.get('/volumes', {
    params: {
      q: 'intitle:',
      orderBy: 'relevance',
      maxResults: 3,
    },
  })
}

export const getCategoryBooks = () => {
  return googleBooksApiClient.get('/volumes', {
    params: {
      q: `subject:${BOOK_CATEGORIES[getRandomInteger(0, 2)]}`,
      orderBy: 'relevance',
      maxResults: 3,
    },
  })
}

export const getBookDetails = (id) => {
  return googleBooksApiClient.get(`/volumes/${id}`)
}

export const getSearchBooks = (searchValue, start, end) => {
  return googleBooksApiClient.get('/volumes', {
    params: {
      q: `${searchValue}+intitle`,
      startIndex: start,
      maxResults: end,
    },
  })
}

export const getFavoriteBooks = (accessToken) => {
  return googleBooksApiClient.get('/mylibrary/bookshelves/0/volumes', {
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  })
}

export const addFavoriteBook = (bookId, accessToken) => {
  return googleBooksApiClient.post(
    '/mylibrary/bookshelves/0/addVolume',
    {
      volumeId: bookId,
    },
    {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    },
  )
}

export const removeFavoriteBook = (bookId, accessToken) => {
  return googleBooksApiClient.post(
    '/mylibrary/bookshelves/0/removeVolume',
    {
      volumeId: bookId,
    },
    {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    },
  )
}
