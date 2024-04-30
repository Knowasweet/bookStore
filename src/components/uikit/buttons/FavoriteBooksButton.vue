<template>
  <button @click="goToFavoritesPage">
    <FontAwesomeIcon
      :icon="['far', 'heart']"
      class="h-5 w-5 text-darkblue/60 hover:text-red active:text-red-800"
    />
  </button>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed } from 'vue'
import { useUserStore } from '@/stores/user.js'
import router from '@/router/index.js'

const user = computed(() => useUserStore().user)

const goToFavoritesPage = () => {
  if (user.value) {
    router.push({ name: 'FavoriteBooks' })
  } else {
    alert('Please create an account or login to get your favorite books and other content.')
  }
}
</script>
