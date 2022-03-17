<template>
  <nav class="prose m-auto">
    <SearchInput
      v-model:keyword="filter.keyword"
      v-model:reg="filter.isRegExp"
      v-model:ignoreCase="filter.ignoreCase"
    />
    <!-- <SearchFilter /> -->
    <ul>
      <router-link
        v-for="post in posts"
        :key="post.path"
        class="item block font-normal mb-6 mt-2 no-underline"
        :to="post.path"
      >
        <li class="no-underline">
          <div class="title text-lg">
            {{ post.meta.frontmatter.title }}
            <sup
              v-if="post.meta.frontmatter.lang === 'zh-CN'"
              class="text-xs border border-current rounded px-1 pb-0.2"
            >中文</sup>
          </div>
          <div class="time opacity-50 text-sm -mt-1">
            {{ formatDate(post.meta.frontmatter.date) }} <span v-if="post.meta.frontmatter.duration" class="opacity-50">· {{ post.meta.frontmatter.duration }}</span>
          </div>
        </li>
      </router-link>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { formatDate, matchTitle } from '~/composables'

import type { MatchTitleOptions } from '~/composables'

const filter = reactive<Omit<MatchTitleOptions, 'title'>>({
  keyword: '',
  isRegExp: false,
  ignoreCase: false,
})

const route = useRoute()
const router = useRouter()
const routes = router.getRoutes()
  .filter((i) => {
    return i.path.startsWith('/posts') && i.meta.frontmatter?.date
  })
  .sort((a, b) => +new Date(b.meta.frontmatter.date) - +new Date(a.meta.frontmatter.date))

const posts = computed(() => routes.filter(i => i.meta.frontmatter.type === route.query.type && matchTitle({ ...filter, title: i.meta.frontmatter.title })))
</script>
