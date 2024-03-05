<template>
  <div class="container mx-auto">
    <Header />
    <RouterView />
  </div>
  <Footer />
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>
