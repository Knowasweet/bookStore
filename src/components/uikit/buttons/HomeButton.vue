<template>
  <RouterLink :to="{ name: 'Home' }">
    <button>
      <FontAwesomeIcon
        :icon="['fas', 'house']"
        class="h-5 w-5 text-darkblue/60 hover:text-darkblue/70 active:text-darkblue"
      />
    </button>
  </RouterLink>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>
