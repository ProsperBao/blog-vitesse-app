<script setup lang="ts">
const { t } = useI18n()

const list = ref<{date: string; title: string}[]>([])
const loading = ref<boolean>(false)
loading.value = true
fetch('https://api.oick.cn/lishi/api.php')
  .then(res => res.text())
  .then((res) => {
    const content = JSON.parse(res.replace('\n', '')).result
    list.value = content
  })
  .finally(() => {
    loading.value = false
  })
</script>

<template>
  <div>
    {{ t('list.title') }}
    <div v-show="loading">
      {{ t('status.loading') }}
    </div>
    <ol>
      <li v-for="item in list" :key="item.date">
        {{ item.title }}
      </li>
    </ol>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
