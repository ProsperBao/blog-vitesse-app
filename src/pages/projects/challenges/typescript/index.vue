<template>
  <nav class="prose m-auto">
    <template v-for="route in routes" :key="route.level">
      <h3 class="mt-10 font-bold">
        {{ route.title }}
      </h3>
      <ul class="ml-10">
        <router-link
          v-for="child in route.children"
          :key="child.path"
          class="item block font-normal mb-6 mt-2 no-underline"
          :to="child.path"
        >
          <li class="no-underline">
            <div class="title text-lg">
              {{ child.title }}
              <sup
                class="text-xs border border-current rounded px-1 pb-0.2"
              >中文</sup>
            </div>
            <div class="time opacity-50 text-sm -mt-1">
              {{ formatDate(child.date) }}
            </div>
          </li>
        </router-link>
      </ul>
    </template>
  </nav>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { formatDate } from '~/composables'

interface LevelListItem {
  title: string
  level: string
  children: {
    title: string
    date: string
    path: string
  }[]
}

const router = useRouter()
const routes = router.getRoutes()
  .filter((i) => {
    return i.path.startsWith('/projects/challenges/typescript') && i.meta.frontmatter?.date
  })
  .sort((a, b) => +new Date(b.meta.frontmatter.date) - +new Date(a.meta.frontmatter.date))
  .reduce((acc, cur) => {
    const { level, levelTitle, title, date } = cur.meta.frontmatter
    let levelIndex = acc.findIndex(i => level === i.level)
    if (levelIndex < 0) {
      acc.push({
        level,
        title: levelTitle,
        children: [],
      })
      levelIndex = acc.length - 1
    }
    acc[levelIndex].children.push({
      title,
      date,
      path: cur.path,
    })
    return acc
  }, [] as LevelListItem[])
</script>


