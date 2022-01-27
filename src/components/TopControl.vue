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
  <nav class="flex justify-center space-x-2 text-2xl mt-2.1">
    <router-link to="/" :title="t('button.home')" class="icon-btn">
      <carbon-home />
    </router-link>
    <router-link to="/posts?type=post" :title="t('button.posts')" class="icon-btn">
      <carbon-book />
    </router-link>
    <router-link to="/posts?type=demo" :title="t('button.demos')" class="icon-btn">
      <carbon:navaid-vortac />
    </router-link>
    <a class="icon-btn" :title="t('button.toggle_dark')" @click="toggleDark()">
      <carbon-moon v-if="isDark" />
      <carbon-sun v-else />
    </a>
    <a class="icon-btn" :title="t('button.toggle_langs')" @click="toggleLocales">
      <carbon-language />
    </a>
    <a class="icon-btn" rel="noreferrer" href="https://github.com/FuBaooo" target="_blank" title="GitHub">
      <carbon-logo-github />
    </a>
  </nav>
</template>
