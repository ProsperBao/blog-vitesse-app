<template>
  <div>
    test server render
    <ul v-for="item in list.list" :key="item.date">
      <li>{{ item.title }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '~/stores/test'

const list = useStore()
onServerPrefetch(async() => {
  await list.dispatch()
})
if (list.list.length === 0) {
  (async() => {
    await list.dispatch()
  })()
}
</script>
<route lang="yaml">
meta:
  layout: main
</route>
