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
  <section class="w-30 h-screen p-1 flex flex-col justify-between text-center shadow duration-150 bg-light-50 dark:bg-dark-500">
    <div>
      <h1>MacBear</h1>
      <p class="text-xs m-2 text-gray-500">
        {{ t('intro.welcome') }}
      </p>
    </div>
    <nav class="nav flex flex-col">
      <router-link to="/" class="opacity-50 hover:opacity-75">
        <carbon:home class="md align-text-top" />
        <span class="lt-md ml-2">{{ t('nav.home') }}</span>
      </router-link>
      <router-link to="/posts" class="opacity-50 hover:opacity-75">
        <ri-article-line class="md align-text-top" />
        <span class="lt-md ml-2">{{ t('nav.article') }}</span>
      </router-link>
      <router-link to="/test" class="opacity-50 hover:opacity-75">
        <ri-article-line class="md align-text-top" />
        <span class="lt-md ml-2">{{ t('nav.article') }}</span>
      </router-link>
    </nav>
    <div>
      <button class="icon-btn mx-2 !outline-none" :title="t('button.toggle_dark')" @click="toggleDark()">
        <carbon-moon v-if="isDark" />
        <carbon-sun v-else />
      </button>
      <a class="icon-btn mx-2" :title="t('button.toggle_langs')" @click="toggleLocales">
        <carbon-language />
      </a>
      <a class="icon-btn mx-2" rel="noreferrer" href="https://github.com/baiheeeeeee" target="_blank" title="GitHub">
        <carbon-logo-github />
      </a>
    </div>
  </section>
</template>

<style scoped>
.router-link-active {
  opacity: 1;
}
</style>
