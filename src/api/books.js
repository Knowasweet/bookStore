import { googleBooksApiClient } from '@/services/network/googleBooksApiClient.js'
import { getRandomInteger } from '@/helpers/mathHelpers.js'
import { BOOK_CATEGORIES } from '@/constants/books/categories.js'

export const getNewestBooks = (start, end) => {
  return googleBooksApiClient.get('/volumes', {
    params: {
      q: 'intitle:',
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

export const getSearchBooks = (searchValue, start, end) => {
  return googleBooksApiClient.get('/volumes', {
    params: {
      q: `${searchValue}+intitle:`,
      startIndex: start,
      maxResults: end,
    },
  })
}

export const getBookDetails = (id) => {
  return googleBooksApiClient.get(`/volumes/${id}`)
}

export const getFavoriteBooks = () => {
  return googleBooksApiClient.get('/mylibrary/bookshelves/0/volumes')
}

export const addFavoriteBook = (bookId) => {
  return googleBooksApiClient.post('/mylibrary/bookshelves/0/addVolume', {
    volumeId: bookId,
  })
}

export const removeFavoriteBook = (bookId) => {
  return googleBooksApiClient.post('/mylibrary/bookshelves/0/removeVolume', {
    volumeId: bookId,
  })
}
