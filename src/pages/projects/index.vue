<template>
  <div class="prose m-auto mb-8">
    <h1 class="mb-0">
      {{ t('button.project') }}
    </h1>
  </div>
  <article>
    <div class="prose m-auto">
      <template v-for="item in project" :key="item.title">
        <h4 class="mt-10 font-bold">
          {{ item.title() }}
        </h4>
        <div class="project-grid py-2 -mx-3 gap-2">
          <router-link
            v-for="child in item.children"
            :key="child.desc"
            :to="child.link"
            class="item relative flex items-top"
          >
            <div class="pt-2 pr-5">
              <teenyicons:typescript-outline
                v-if="child.icon === 'ts'"
                class="text-5xl opacity-50"
              />
              <carbon:cloud-services
                v-else-if="child.icon === 'dst'"
                class="text-5xl opacity-50"
              />
              <span v-else>ICON</span>
            </div>
            <div class="flex-auto">
              <div v-if="child.link">
                <router-link class="text-normal !inline-block" :to="child.link">
                  {{ child.name }}
                </router-link>
              </div>
              <div v-else class="text-normal">
                {{ child.name }}
              </div>
              <a class="flex items-center !inline-block mb-3" :href="child.github" target="_blank">
                <carbon:logo-github class="inline-block mr-2" />
                {{ child.githubTitle }}
              </a>
              <div class="desc text-sm opacity-50 font-normal" v-html="child.desc()" />
            </div>
          </router-link>
        </div>
      </template>
    </div>
  </article>
</template>

<script lang="ts" setup>
const { t } = useI18n()
const project = reactive([
  {
    title: () => t('button.challenges'),
    children: [
      {
        name: 'Typescript',
        icon: 'ts',
        desc: () => t('desc.typescript-challenges'),
        github: 'https://github.com/type-challenges/type-challenges',
        githubTitle: 'type-challenges',
        link: '/projects/challenges/typescript',
      },
    ],
  },
  {
    title: () => t('button.project'),
    children: [
      {
        name: 'DSTCloudManage',
        icon: 'dst',
        desc: () => t('desc.dst-cloud-manage'),
        github: 'https://github.com/FuBaooo/dst-cloud-manage',
        githubTitle: 'Dst-cloud-manage',
        link: 'https://github.com/FuBaooo/dst-cloud-manage',
      },
    ],
  },
])
</script>

<style scoped>
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
.project-grid a.item {
  padding: 0.8em 1em;
  background: transparent;
  font-size: 1.1rem;
}
.project-grid a.item:hover {
  background: #88888808;
}
</style>
