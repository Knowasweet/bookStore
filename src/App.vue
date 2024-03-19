<template>
  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <Suspense>
        <div>
          <div class="container mx-auto">
            <Header/>
            <component :is="Component"/>
          </div>
          <Footer/>
        </div>
        <template #fallback>
          <NotFound v-if="error" :title="error"/>
          <Loading v-else/>
        </template>
      </Suspense>
    </template>
  </RouterView>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Loading from "@/components/Loading.vue";
import NotFound from "@/views/NotFound.vue";

import {onErrorCaptured, ref} from "vue";


const error = ref(null)

onErrorCaptured((err) => {
  error.value = "Sorry, something went wrong"
})
</script>
