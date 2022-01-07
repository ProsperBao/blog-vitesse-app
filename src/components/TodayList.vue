<template>
  <ul v-for="item in list.list" :key="item.date">
    <li>{{ item.title }}</li>
  </ul>
</template>

<script setup lang="ts">
import { useListStore } from '~/stores/test'

const list = useListStore()

await list.dispatch()
</script>
