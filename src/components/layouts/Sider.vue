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
  <section class="w-45 h-screen p-1 rounded-r flex flex-col justify-between text-center shadow duration-150">
    <div>
      <h1>MacBear</h1>
      <p class="text-xs m-2 text-gray-500">
        {{ t('intro.welcome') }}
      </p>
    </div>
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
