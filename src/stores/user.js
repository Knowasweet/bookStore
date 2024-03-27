import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useUserStore = defineStore('userStore', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')) ?? null)

  const addUser = (accessToken, refreshToken, credential, books) => {
    user.value = {
      accessToken,
      refreshToken,
      email: credential.email,
      name: credential.name,
      picture: credential.picture,
      books: books || null,
    }
  }

  const removeUser = () => {
    user.value = null
  }

  const addFavoriteBook = (book) => {
    user.value.books.push(book)
  }

  const removeFavoriteBook = (book) => {
    const index = user.value.books.indexOf((favoriteBook) => favoriteBook.id === book.value.id)
    if (index !== -1) {
      user.value.books.splice(index, 1)
      if (user.value.books.length === 0) {
        user.value.books = null
      }
    }
  }

  watch(
    () => user.value,
    (user) => {
      localStorage.setItem('user', JSON.stringify(user))
    },
    {
      deep: true,
    },
  )

  return {
    user,
    addUser,
    removeUser,
    addFavoriteBook,
    removeFavoriteBook,
  }
})
