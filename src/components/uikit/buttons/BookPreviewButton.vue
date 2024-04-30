<template>
  <a
    :href="previewLink"
    target="_blank"
    class="w-full rounded-[5px] border-[1px] border-orange bg-orange py-[15px] text-center font-nunito font-semibold leading-[22px] text-white hover:bg-white hover:text-orange/60 active:text-orange"
  >
    Get now!
  </a>
</template>

<script setup>
defineProps({
  previewLink: {
    type: String,
    required: true,
  },
})
</script>
