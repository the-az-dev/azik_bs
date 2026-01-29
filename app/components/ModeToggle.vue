<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Button } from '@/components/ui/button'
const colorMode = useColorMode()

const toggleColorMode = () => {
  const modes = ['light', 'dark']
  const currentIndex = modes.indexOf(colorMode.preference)
  const nextIndex = (currentIndex + 1) % modes.length
  colorMode.preference = modes[nextIndex]
}
</script>

<template>
  <Button variant="secondary" @click="toggleColorMode" class="border-4 border-[solid] grunge-effect">
        <Icon 
      v-if="colorMode.value === 'dark'" 
      icon="radix-icons:sun" 
      class="h-[2rem] w-[2rem] grunge-effect" 
    />
    
    <Icon 
      v-else-if="colorMode.value === 'light'" 
      icon="radix-icons:moon" 
      class="h-[2rem] w-[2rem] grunge-effect" 
    />
    <span class="sr-only">Toggle theme</span>
    </Button>
</template>
