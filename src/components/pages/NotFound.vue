<template>
  <div class="absolute left-0 top-0 z-10 h-full w-full bg-white">
    <div class="flex flex-col items-center text-center">
      <img src="../../assets/img/404.png" alt="404" class="mb-3 h-[325px] w-[844px]" />
      <div class="text-10xl text-yellow">404</div>
      <div class="mb-5 space-y-[30px]">
        <div class="text-5xl">{{ title }}</div>
        <div class="text-3xl text-darkblue/60">
          {{ description }}
        </div>
      </div>
      <button
        @click="goHome"
        class="rounded-[5px] border-[1px] border-yellow bg-transparent px-[67px] py-[9px] text-lg text-yellow hover:bg-yellow hover:text-white active:bg-yellow-800"
      >
        Go Home
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

defineProps({
  title: {
    type: String,
    default: 'Looks like you’ve got lost...',
  },
  description: {
    type: String,
    default: 'The book or books you’re looking for don’t exist',
  },
})

const router = useRouter()

const goHome = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push({ name: 'Home' })
  }
}
</script>
