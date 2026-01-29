<script setup lant="ts">
import Gen from './gen.vue';

const route = useRoute()
const slug = route.params.slug
console.log(slug);
const { data: post, pending } = await useAsyncData(`blog-${slug}`, () => {
  return queryCollection('blog').path(`/blog/${slug}`).first()
})

definePageMeta({
  layout: 'blog-post'
})
</script>

<template>
  <main>
    <div v-if="post">
      <ContentRenderer :value="post" />
    </div>

    <div v-else-if="pending" class="w-full h-[50rem] flex flex-col items-center justify-center gap-[2rem]">
      <p class="header-effect grunge-effect text-[2rem]">Завантаження...</p>
    </div>

    <div v-else class="w-full h-[50rem] flex flex-col items-center justify-center gap-[2rem]">
      <h1 class="l-header-effect grunge-effect text-[8rem]">404</h1>
      <p class="header-effect grunge-effect text-[2rem]">Post not found</p>
    </div>
    <Gen :title="post.title" :date="post.date"></Gen>

  </main>
</template>
