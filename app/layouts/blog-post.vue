<script setup lang="ts">
import AppBar from '~/components/layout/AppBar.vue';
import Footer from '~/components/layout/Footer.vue';

</script>

<template>
  <div>
    <AppBar />
    <slot />
    <Footer />
  </div>
</template>
