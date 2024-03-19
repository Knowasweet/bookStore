<template>
  <div class="absolute top-0 bg-white z-10 w-full left-0 h-full">
    <div class="flex flex-col items-center text-center">
      <img src="../assets/img/404.png" alt="404" class="mb-[11px] h-[324.37px] w-[843.21px]"/>
      <div class="text-10xl text-yellow">404</div>
      <div class="space-y-[30px] mb-[20px]">
        <div class="text-5xl">{{ title }}</div>
        <div class=" text-3xl text-darkblue/60">
          {{ description }}
        </div>
      </div>
      <button
          @click="$router.back()"
          class="active:bg-yellow-800 text-lg rounded-[5px] border-[1px] border-yellow bg-transparent px-[67px] py-[9px] text-yellow hover:bg-yellow hover:text-white"
      >
        Go Home
      </button>
    </div>
  </div>
</template>

<script setup>
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
</script>
