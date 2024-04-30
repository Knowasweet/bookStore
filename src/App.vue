<template>
  <RouterView #default="{ Component }">
    <template v-if="Component">
      <Suspense>
        <div>
          <div class="container mx-auto">
            <Header />
            <component :is="Component" />
          </div>
          <Footer />
        </div>
        <template #fallback>
          <NotFound v-if="error" :title="error" />
          <Loading v-else />
        </template>
      </Suspense>
    </template>
  </RouterView>
</template>

<script setup>
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import NotFound from '@/components/pages/NotFound.vue'
import Loading from '@/components/uikit/Loader.vue'

import { onErrorCaptured, ref } from 'vue'

const error = ref(null)

onErrorCaptured((e) => {
  error.value = e
})
</script>
