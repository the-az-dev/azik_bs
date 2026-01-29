<script setup lang="ts">
import ModeToggle from "../ModeToggle.vue";
</script>

<template>
  <div
    class="flex flex-row justify-between items-center h-[5rem] pl-[1.5rem] pr-[1.5rem]"
  >
    <h1 class="text-effect grunge-effect text-[2rem]" data-text="a3ik">a3ik</h1>
    <div class="flex flex-row gap-[1.5rem]">
      <h1 class="text-effect grunge-effect text-[1.2rem]" data-text="TEST">головна</h1>
      <h1 class="text-effect grunge-effect text-[1.2rem]" data-text="TEST">блог</h1>
      <h1 class="text-effect grunge-effect text-[1.2rem]" data-text="TEST">проекти</h1>
      <h1 class="text-effect grunge-effect text-[1.2rem]" data-text="TEST">про мене</h1>
    </div>
    <ModeToggle />
  </div>
</template>
