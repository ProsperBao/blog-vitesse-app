<template>
  <div>
    test server render
    <ul v-for="item in list" :key="item.date">
      <li>{{ item.title }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '~/stores/test'

const { list } = useStore()

</script>
<route lang="yaml">
meta:
  layout: main
</route>
