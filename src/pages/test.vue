<template>
  <div>
    test server render
    <suspense>
      <ul v-for="item in list.list" :key="item.date">
        <li>{{ item.title }}</li>
      </ul>
    </suspense>
  </div>
</template>

<script setup lang="ts">
import { useListStore } from '~/stores/test'

const list = useListStore()

const dispatch = list.dispatch

import.meta.env.DEV ? dispatch() : onServerPrefetch(dispatch)

</script>

<route lang="yaml">
meta:
  layout: main
</route>
