<template>
  <div class="rounded-lg bg-yellow px-4 py-3 font-plex font-bold leading-6 text-black">
    {{ category }}
  </div>
</template>

<script setup>
defineProps({
  category: {
    type: String,
    required: true,
  },
})
</script>
