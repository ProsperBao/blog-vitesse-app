<script setup lang="ts">
import { isDark, toggleDark } from '~/composables'
const { t, availableLocales, locale } = useI18n()

const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
</script>

<template>
  <nav class="flex justify-center space-x-2 text-2xl mt-5">
    <a href="/" :title="t('button.home')" class="icon-btn">
      <carbon-home />
    </a>
    <a href="/posts" :title="t('button.posts')" class="icon-btn">
      <carbon-book />
    </a>
    <a class="icon-btn" :title="t('button.toggle_dark')" @click="toggleDark()">
      <carbon-moon v-if="isDark" />
      <carbon-sun v-else />
    </a>
    <a class="icon-btn" :title="t('button.toggle_langs')" @click="toggleLocales">
      <carbon-language />
    </a>
    <a class="icon-btn" rel="noreferrer" href="https://github.com/babyfu" target="_blank" title="GitHub">
      <carbon-logo-github />
    </a>
  </nav>
</template>
