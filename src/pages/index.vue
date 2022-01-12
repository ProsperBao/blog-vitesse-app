<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="prose m-auto">
    <h2>BabyFu</h2>
    <h4>{{ t('me.about') }}</h4>
    <p>
      {{ t('me.article') }}
      <a href="https://nodejs.org/zh-cn/" title="Node.js">Node.js</a>
      &
      <a href="https://www.rust-lang.org/" title="Rust.js">Rust</a>
    </p>
    <h4>{{ t('me.about_front') }}</h4>
    <p>
      {{ t('me.article_front') }}
      <ul>
        <li>
          <a href="https://v3.vuejs.org/" title="Vue.js">Vue.js</a>
          {{ t('me.article_about_vue') }}
        </li>
        <li>
          <a href="https://nuxtjs.org/" title="nuxt.js">nuxt.js</a>
          &
          <a href="https://v3.nuxtjs.org/" title="nuxt3.js">nuxt3.js</a>
          {{ t('me.article_about_nuxt') }}
        </li>
        <li>
          <a href="https://www.electronjs.org/" title="electron">Electron</a>
          {{ t('me.article_about_electron') }}
        </li>
        <li>
          <a href="https://react.docschina.org/" title="react">react</a>
          {{ t('me.article_about_react') }}
        </li>
        <li>
          {{ t('me.article_about_more') }}
        </li>
      </ul>
    </p>
    <h4>{{ t('me.about_front') }}</h4>
    <p>{{ t('me.article_about_future') }}</p>
  </div>
</template>

<route lang="yaml">
meta:
  layout: main
</route>
