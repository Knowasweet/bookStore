<template>
  <div class="flex h-screen flex-col items-center text-center">
    <img src="../../assets/img/404.png" alt="404" class="mb-40 h-[325px] w-[844px]" />
    <div class="w-1/3 space-y-[30px]">
      <div class="text-5xl">No {{ title }}</div>
      <div class="text-3xl text-darkblue/60">{{ description }}</div>
      <button
        @click="$router.back()"
        class="rounded-[5px] border-[1px] border-yellow bg-transparent px-[67px] py-[9px] text-lg text-yellow hover:bg-yellow hover:text-white active:bg-yellow-800"
      >
        Go Back
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Books',
  },
  description: {
    type: String,
    default: "These books don't exist",
  },
})
</script>
