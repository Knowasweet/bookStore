<template>
  <div class="container mx-auto mb-[50px] flex flex-col items-center">
    <img src="@/assets/img/notFound.png" alt="404" class="mb-[11px] h-[324.37px] w-[843.21px]" />
    <div class="text-10xl text-yellow">404</div>
    <div class="text-5xl mb-[30px]">Looks like you’ve got lost...</div>
    <div class="mb-[20px] text-base-bold font-normal leading-[29.26px] text-darkblue/60">
      The book you’re looking for doesn’t exist
    </div>
    <button
      @click="$router.back()"
      class="active:bg-yellow-800 rounded-[5px] border-[1px] border-yellow bg-transparent px-[67px] py-[9px] text-yellow hover:bg-yellow hover:text-darkblue"
    >
      Go Home
    </button>
  </div>
</template>
