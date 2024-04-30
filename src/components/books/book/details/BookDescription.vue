<template>
  <div>
    <div class="mb-[31px] border-b-2 border-yellow pb-[10px] font-nunito text-4xl leading-[44px]">
      Description
    </div>
    <div class="font-nunito text-3xl leading-[33px]">
      {{ description.replace(/<[^>]+>/g, '') }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  description: {
    type: String,
    required: true,
  },
})
</script>
