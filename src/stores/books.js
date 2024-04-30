import { defineStore } from 'pinia'
import { ref, watchEffect } from 'vue'
import { addFavoriteBook, getFavoriteBooks, removeFavoriteBook } from '@/api/books.js'

export const useBooksStore = defineStore('booksStore', () => {
  const books = ref(JSON.parse(localStorage.getItem('books')) ?? [])

  const addBookToFavorites = async (bookId) => {
    try {
      await addFavoriteBook(bookId)
      books.value.push(bookId)
    } catch (e) {
      throw e.message
    }
  }

  const addFavoriteBooks = async () => {
    try {
      const response = await getFavoriteBooks()
      addBooks(response.data.items)
    } catch (e) {
      throw e.message
    }
  }

  const addBooks = (userBooks) => {
    if (userBooks) {
      books.value = userBooks.map((book) => book.id)
    }
  }

  const removeBook = async (bookId) => {
    try {
      await removeFavoriteBook(bookId)
      clearBook(bookId)
    } catch (e) {
      throw e.message
    }
  }

  const clearBook = (bookId) => {
    const index = books.value.indexOf(bookId)
    if (index !== -1) {
      books.value.splice(index, 1)
    }
  }

  const clearBooks = () => {
    books.value = []
  }

  watchEffect(() => {
    localStorage.setItem('books', JSON.stringify(books.value))
  })

  return {
    books,
    addBookToFavorites,
    addFavoriteBooks,
    removeBook,
    clearBooks,
  }
})
