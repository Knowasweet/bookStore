import {googleBooksApiClient} from '@/services/network/googleBooksApiClient.js'
import {randomNumber} from '@/helpers/mathHelpers.js'
import {BOOK_GENRES} from '@/constants/books/genres.js'


export const getNewestBooks = () => {
    return googleBooksApiClient.get('', {
        params: {
            q: 'intitle:',
            orderBy: 'newest',
            maxResults: 3,
        },
    })
}

export const getRelevantBooks = () => {
    return googleBooksApiClient.get('', {
        params: {
            q: 'intitle:',
            orderBy: 'relevance',
            maxResults: 3,
        },
    })
}

export const getBooksByGenre = () => {
    return googleBooksApiClient.get('', {
        params: {
            q: `subject:${BOOK_GENRES[randomNumber(0, 2)]}`,
            orderBy: 'relevance',
            maxResults: 3,
        },
    })
}


export const getBooksSample = async (func, books) => {
    try {
        const response = await func
        if (response.data.totalItems > 0 && response.status === 200) {
            books.value = response.data.items
        }
    } catch (e) {
        throw e.message
    } finally {
        //
    }
}

export const getBookById = async (bookId, books) => {
    try {
        const response = await googleBooksApiClient.get(bookId)
        if (response.status === 200) {
            books.value.push(response.data)
        }
    } catch (e) {
        throw e.message
    } finally {
        //
    }
}

export const getBookDetails = async (id, book) => {
    try {
        const response = await googleBooksApiClient.get(id)
        if (response.status === 200) {
            response.data.volumeInfo.categories = new Set(response.data.volumeInfo.categories.map(category => category.split('/')[0]))
            book.value = response.data
        }
    } catch (e) {
        throw e.message
    } finally {
        //
    }
}


export const getSearchBooks = async (searchValue, start, end, books) => {
    try {
        const response = await googleBooksApiClient.get('', {
            params: {
                q: `${searchValue}+inauthor`,
                startIndex: start,
                maxResults: end,
            },
        })
        if (response.status === 200) {
            books.value = response.data.items
        }
        else {
            throw e.message
        }
    } catch (e) {
        throw e.message
    } finally {
        //
    }
}

export const getTotalBooks = async (searchValue, totalItems) => {
    try {
        const response = await googleBooksApiClient.get('', {
            params: {
                q: `${searchValue}+inauthor`,
                startIndex: 0,
                maxResults: 1,
            },
        })
        if (response.data.totalItems > 0) {
            totalItems.value = response.data.totalItems
        }
        else {
            throw e.message
        }
    } catch (e) {
        throw e.message
    } finally {
        //
    }
}