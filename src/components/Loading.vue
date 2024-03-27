<template>
  <div class="flex h-screen items-center justify-center">
    <FontAwesomeIcon :icon="['fas', 'spinner']" class="h-24 w-24 animate-spin text-darkblue/60" />
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>
