<template>
  <header class="sticky top-0 z-10 w-full bg-white py-[30px]">
    <div class="mx-[100px]">
      <div class="flex items-center justify-between">
        <SearchInput />
        <div class="flex gap-6">
          <LoginButton />
          <FavoriteBooksButton />
          <HomeButton />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import SearchInput from '@/components/uikit/SearchInput.vue'
import LoginButton from '@/components/uikit/buttons/LoginButton.vue'
import FavoriteBooksButton from '@/components/uikit/buttons/FavoriteBooksButton.vue'
import HomeButton from '@/components/uikit/buttons/HomeButton.vue'
</script>
