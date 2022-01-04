<template>
  <div>
    test server render
    <ul v-for="item in list" :key="item.date">
      <li>{{ item.title }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useTestListStore } from '~/stores/testList'

const store = useTestListStore()
const list = computed(() => store.list)

onServerPrefetch(async() => {
  await store.getRequestData()
})

onMounted(async() => {
  if (!list.value.length)
    await store.getRequestData()
})
</script>
<route lang="yaml">
meta:
  layout: main
</route>
