<template>
  <nav class="prose m-auto">
    <SearchInput
      :keyword="filter.keyword"
      :reg="filter.mode === SearMode.REGEXP"
      :ignore-case="filter.ignoreCase === IgnoreCase.ENABLE"
    />
    <!-- <SearchFilter /> -->
    <ul>
      <router-link
        v-for="post in routes"
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
import { IgnoreCase, SearMode, formatDate, matchTitle, useSearchParams } from '~/composables'

import type { MatchTitleOptions } from '~/composables'

const props = defineProps<{ search: string }>()

const filter = reactive<Omit<MatchTitleOptions, 'title'>>(useSearchParams(props.search))

const router = useRouter()
const routes = router.getRoutes()
  .filter(i => i.path.startsWith('/posts/content') && i.meta.frontmatter?.date)
  .sort((a, b) => +new Date(b.meta.frontmatter.date) - +new Date(a.meta.frontmatter.date))
  .filter(i => matchTitle({ ...filter, title: i.meta.frontmatter.title }))
</script>
