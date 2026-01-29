import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  debug: true,
  css: ['~/assets/css/tailwind.css', '@/assets/css/main.css'],
  image: {
    inject: true,
    quality: 80,
    format: ['webp'],
    dir: 'assets/images'
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  shadcn: {
    prefix: '',
    componentDir: '@/components/ui'
  },
  modules: [
    '@nuxt/content',
    '@nuxt/icon',
    '@nuxt/image',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    'nuxt-og-image',
  ],
  colorMode: {
    preference: 'system',
    fallback: 'light',   
    classSuffix: ''     
  },
  ogImage: {
    // Вказуємо шрифти, які Satori має завантажити
    fonts: [
      'Archivo Black:400', 
      'Inter:400', 
      'Inter:700',
      'Montserrat:900',
      'Montserrat:400'
    ],
    // Вмикаємо сумісність (іноді помагає з фільтрами)
    compatibility: {
      prerender: { chromium: false } 
    }
  },
})