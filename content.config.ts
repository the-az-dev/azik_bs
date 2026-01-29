import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
    }),
    blog: defineCollection({
      type: 'page',
      // Вказуємо, що ця колекція бере файли ТІЛЬКИ з папки blog
      source: 'blog/*.md', 
      schema: z.object({
        date: z.string(),
        title: z.string(),
        description: z.string(),
      })
    })
  }
})
