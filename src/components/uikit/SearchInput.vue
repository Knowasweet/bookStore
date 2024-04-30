<template>
  <div>
    <div class="pointer-events-none absolute py-2 pl-4">
      <FontAwesomeIcon :icon="['fas', 'magnifying-glass']" class="h-4 w-4" />
    </div>
    <input
      @keyup.enter="goToSearchPage"
      v-model="inputValue"
      type="text"
      placeholder="What are you looking for ?"
      class="w-[296px] rounded-lg bg-lightgray py-[7px] pl-[46px] font-nunito leading-[22px] outline-darkblue/10"
    />
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useRoute, useRouter } from 'vue-router'
import { computed, ref, watch } from 'vue'

const route = useRoute()
const router = useRouter()
const inputValue = ref(route.query.search_query)
const currentRoute = computed(() => route.name)

const goToSearchPage = () => {
  router.push({ name: 'Search', query: { search_query: inputValue.value, page: 1 } })
  document.activeElement.blur()
}

watch(currentRoute, (newRoute) => {
  if (newRoute === 'Search') {
    inputValue.value = route.query.search_query
  } else {
    inputValue.value = ''
  }
})
</script>
