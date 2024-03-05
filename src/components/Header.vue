<template>
  <header class="sticky top-0 z-10 w-full bg-white pb-[9px] pt-[35px]">
    <div class="ml-[91px] mr-[106px] flex items-center justify-between">
      <div>
        <div class="pointer-events-none absolute py-[8px] pl-[15px]">
          <FontAwesomeIcon :icon="['fas', 'magnifying-glass']" class="h-[16px] w-[16px]" />
        </div>
        <input
          @keyup.enter="redirectToSearch"
          v-model="inputValue"
          type="text"
          placeholder="What are you looking for ?"
          class="w-[296px] rounded-[8px] bg-lightgray py-[7px] pl-[46px] font-nunito text-base-nunito outline-darkblue/10"
        />
      </div>
      <div class="flex gap-[24px]">
        <button>
          <FontAwesomeIcon :icon="['far', 'user']" class="h-[22px] w-[18px]" />
        </button>
        <button>
          <FontAwesomeIcon :icon="['far', 'heart']" class="h-[20px] w-[25px]" />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const router = useRouter()
const inputValue = ref('')

const redirectToSearch = () => {
  router.push({ name: 'Search', query: { search_query: inputValue.value } })
  document.activeElement.blur()
}
</script>
