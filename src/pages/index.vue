<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="h-full flex justify-center items-center">
    <h1 class="mt-50 text-5xl text-shadow-sm opacity-50">
      {{ t('intro.welcome') }}
    </h1>
  </div>
  <BackgroundGalaxy />
</template>

<route lang="yaml">
meta:
  layout: main
</route>
