<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { IgnoreCase, PostType, SearMode, getSearchParams, isDark, toggleDark } from '~/composables'

const { t, availableLocales, locale } = useI18n()

const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}

const toPosts = (type: PostType) => {
  return getSearchParams({
    keyword: '',
    mode: SearMode.ALL,
    ignoreCase: IgnoreCase.DISABLE,
    type,
  })
}
</script>

<template>
  <nav class="flex justify-center space-x-4 text-xl mt-2.1 pb-1 <md:space-x-3">
    <router-link to="/" :title="t('button.home')">
      <span class="text-base align-top <md:hidden">{{ t('button.home') }}</span>
      <carbon:home class="md:hidden icon-btn" />
    </router-link>
    <router-link :title="t('button.posts')" :to="toPosts(PostType.POST)">
      <span class="text-base align-top <md:hidden">{{ t('button.posts') }}</span>
      <carbon:notebook class="md:hidden icon-btn" />
    </router-link>
    <router-link :title="t('button.learn')" :to="toPosts(PostType.LEARN)">
      <span class="text-base align-top <md:hidden">{{ t('button.learn') }}</span>
      <carbon:microscope class="md:hidden icon-btn" />
    </router-link>
    <router-link to="/projects" :title="t('button.project')">
      <span class="text-base align-top <md:hidden">{{ t('button.project') }}</span>
      <carbon:direct-link class="md:hidden icon-btn" />
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
