<template>
  <div>
    test server render
    <ul v-for="item in list.list" :key="item.date">
      <li>{{ item.title }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useListStore } from '~/stores/test'

const list = useListStore()

onServerPrefetch(async() => {
  await list.dispatch()
})
</script>
<route lang="yaml">
meta:
  layout: main
</route>
