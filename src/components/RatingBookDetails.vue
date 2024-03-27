<template>
  <div class="flex flex-row gap-[12.5px]">
    <template v-if="rating === 5">
      <div v-for="index in 5" :key="index">
        <FontAwesomeIcon :icon="['fas', 'star']" class="h-9 w-8 text-yellow-800" />
      </div>
    </template>
    <template v-else>
      <div v-for="rate in Math.floor(rating)" :key="rate">
        <FontAwesomeIcon :icon="['fas', 'star']" class="h-9 w-8 text-yellow-800" />
      </div>
      <template v-if="rating % 1 !== 0">
        <FontAwesomeIcon :icon="['fas', 'star-half-stroke']" class="h-9 w-8 text-yellow-800" />
      </template>
      <div v-for="rate in 5 - Math.ceil(rating)" :key="rate">
        <FontAwesomeIcon :icon="['far', 'star']" class="h-9 w-8 text-yellow-800" />
      </div>
    </template>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

defineProps({
  rating: {
    type: Number,
    required: true,
  },
})
</script>
