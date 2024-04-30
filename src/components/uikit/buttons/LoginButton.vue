<template>
  <div>
    <div ref="target">
      <button @click="showLogin">
        <img v-if="user" :src="user.picture" alt="user-picture" class="h-5 w-5 rounded-full" />
        <FontAwesomeIcon
          v-else
          :icon="['far', 'user']"
          class="h-5 w-5 text-darkblue/60 hover:text-darkblue/70 active:text-darkblue"
        />
      </button>
    </div>

    <Login v-if="isShowLogin" @closeLogin="closeLogin" />
  </div>
</template>

<script setup>
import Login from '@/components/auth/Login.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useUserStore } from '@/stores/user.js'
import { onClickOutside } from '@vueuse/core'
import { computed, ref } from 'vue'

const user = computed(() => useUserStore().user)

const isShowLogin = ref(false)

const target = ref(null)
onClickOutside(target, () => {
  closeLogin()
})

const showLogin = () => {
  isShowLogin.value = true
}

const closeLogin = () => {
  isShowLogin.value = false
}
</script>
