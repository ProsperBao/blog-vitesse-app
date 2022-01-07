<template>
  <div>
    test server render
    <ul v-for="item in list.list" :key="item.date">
      <li>{{ item.title }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useDispatch } from '~/composables';
import { useListStore } from '~/stores/test'

const list = useListStore()

useDispatch(async () => {
  await list.dispatch()
})


</script>
<route lang="yaml">
meta:
  layout: main
</route>
