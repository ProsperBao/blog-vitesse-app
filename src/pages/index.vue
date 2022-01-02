<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="relative h-full flex justify-center items-center">
    <GalaxyAnimation class="absolute" />
    <h1 class="text-5xl text-shadow-sm opacity-50">
      {{ t('intro.welcome') }}
    </h1>
  </div>
</template>

<route lang="yaml">
meta:
  layout: main
</route>
