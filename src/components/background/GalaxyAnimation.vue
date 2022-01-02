<script setup lang="ts">
import { StarField } from '~/composables'

let starfield: StarField
onMounted(() => {
  starfield = new StarField(1000, document.getElementById('bgGalaxy') as HTMLCanvasElement)
  starfield.startRenderLoop()
})
onUnmounted(() => {
  starfield.stopRenderLoop()
})
</script>

<template>
  <canvas id="bgGalaxy" class="w-full h-full" />
</template>
