<template>
<div class="flex justify-end">
  <div
      class="mr-[100px] h-[60px] w-[240px] bg-white rounded-[8px] border-gray border-[1px] flex justify-center items-center absolute">
    <div v-if="user" class="flex gap-2 items-center">
      <img :src="user.picture" class="rounded-full w-[40px] h-[40px]">
      <div class="flex flex-col text-xs font-nunito font-bold gap-1">
        <div>{{ user.email }}</div>
        <button @click="logout"
                class=" rounded-[8px] border-[1px] border-yellow bg-yellow hover:bg-white hover:text-yellow">Logout
        </button>
      </div>
    </div>
    <GoogleLogin v-else :callback="loggedIn"/>
  </div>
</div>

</template>

<script setup>
import {decodeCredential, GoogleLogin} from "vue3-google-login";
import {useUsersStore} from "@/stores/users.js";
import {computed} from "vue";

const emits = defineEmits(['closeLogin'])

const usersStore = useUsersStore()
const user = computed(() => usersStore.activeUser)
const loggedIn = (response) => {
  usersStore.updateUser( decodeCredential(response.credential) )
  emits('closeLogin', false)
}

const logout = () => {
  usersStore.updateUserActive()
  emits('closeLogin', false)
}
</script>