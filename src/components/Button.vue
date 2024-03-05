<template>
  <button
    class="rounded-[8px] border-[1px] border-yellow bg-yellow py-[6px] font-nunito text-base-nunito font-bold text-white hover:bg-white hover:text-yellow"
    :class="hasSymmetry ? 'w-[155px]' : 'w-[147px] pl-[10px] pr-[15px]'"
  >
    <slot>Button</slot>
  </button>
</template>

<script setup>
defineProps({
  hasSymmetry: {
    type: Boolean,
    default: true,
  },
})
</script>
