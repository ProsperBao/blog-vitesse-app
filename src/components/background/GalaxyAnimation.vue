<script setup lang="ts">
import { StarField } from '~/composables'

let starfield: StarField
onMounted(() => {
  if (window) {
    starfield = new StarField(1000, document.getElementById('bgGalaxy') as HTMLCanvasElement)
    starfield.startRenderLoop()
  }
})
onUnmounted(() => {
  if (window) starfield.stopRenderLoop()
})
</script>

<template>
  <canvas id="bgGalaxy" class="w-full h-full" />
</template>
