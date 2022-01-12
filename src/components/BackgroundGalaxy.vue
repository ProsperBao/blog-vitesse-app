<template>
  <div class="fixed top-0 bottom-0 left-0 right-0 pointer-events-none opacity-30" style="z-index: -1">
    <canvas ref="el" class="w-full h-full" />
  </div>
</template>

<script setup lang="ts">
import { StarField } from '~/composables'

let starfield: StarField
const el = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  if (el.value) {
    starfield = new StarField(Math.floor(window.innerWidth / 2), el.value)
    starfield.startRenderLoop()
  }
})
onUnmounted(() => {
  if (el.value) starfield.stopRenderLoop()
})
</script>
