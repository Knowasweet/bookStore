import {defineStore} from 'pinia'
import {computed, ref, watch} from 'vue'

export const useUsersStore = defineStore('usersStore', () => {
    const nextUserId = ref(localStorage.getItem('nextUserId') ?? 0)
    const users = ref(JSON.parse(localStorage.getItem('users')) ?? [])

    const activeUser = computed(() => {
        return users.value.find(user => user.active) || false
    })
    const addUser = (currentUser) => {
        users.value.push({
            id: nextUserId.value++,
            email: currentUser.email,
            name: currentUser.name,
            picture: currentUser.picture,
            liked: [],
            active: true
        })
    }

    const updateUser = (user) => {
        const currentUser = userExists(user)
        if (currentUser !== undefined) {
            currentUser.active = !currentUser.active
        } else {
            addUser(user)
        }
    }

    const userExists = (user) => {
        return users.value.find((currentUser) => currentUser.email === user.email)
    }

    const updateUserActive = () => {
        activeUser.value.active = !activeUser.value.active
    }

    const toggleLike = (userId, bookId) => {
        const user = users.value.find(user => user.id === userId)
        if (user !== undefined) {
            if (!user.liked.includes(bookId)) {
                user.liked.push(bookId)
            } else {
                const index = user.liked.indexOf(bookId)
                user.liked.splice(index, 1)
            }
        }
    }

    const toggleLikedBook = (user, bookId) => {
        if (user) {
            toggleLike(user.id, bookId)
        } else {
            alert('Login In')
        }
    }

    watch(
        () => nextUserId.value,
        (nextUserId) => {
            localStorage.setItem('nextUserId', JSON.stringify(nextUserId))
        },
    )

    watch(() => users.value, (users) => {
        localStorage.setItem('users', JSON.stringify(users))
    }, {deep: true})

    return {
        activeUser,
        users,
        updateUser,
        updateUserActive,
        toggleLikedBook,
    }
})
