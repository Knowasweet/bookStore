<template>
  <div class="h-[800px]">
    <div class="flex flex-col items-center text-center">
      <img src="../assets/img/404.png" alt="404" class="mb-20 h-[325px] w-[844px]" />
      <div class="space-y-[30px]">
        <div class="text-5xl">No {{ title }}</div>
        <div class="text-3xl text-darkblue/60">{{ description }}</div>
      </div>
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
