<template>
  <div class="relative h-12">
    <div class="absolute w-full">
      <input
        :value="keyword"
        type="text"
        class="a-input !pl-8"
        :placeholder="reg? t('input.search_input_placeholder_reg'):t('input.search_input_placeholder') "
        @keypress.enter="toSearch"
      >
      <carbon-search class="absolute left-2 top-1.75" />
    </div>
    <div class="absolute right-1 top-0.93 flex gap-1">
      <button :class="['btn-link', { active: re }]" :title="t('button.reg_exp')" @click="re = !re">
        .*
      </button>
      <button :class="['btn-link', { active: ic }]" :title="t('button.ignore_case')" @click="ic = !ic">
        Aa
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">import { IgnoreCase, SearMode } from '~/composables'

const props = defineProps({
  keyword: {
    type: String,
    default: '',
  },
  reg: {
    type: Boolean,
    default: false,
  },
  ignoreCase: {
    type: Boolean,
    default: false,
  },
})
const { t } = useI18n()

const re = ref<boolean>(props.reg)
const ic = ref<boolean>(props.ignoreCase)

const toSearch = (e: Event) => {
  const keyword = (e?.target as HTMLInputElement).value
  location.href = `/posts/${encodeURIComponent(`${
    re.value ? SearMode.REGEXP : keyword === '' ? SearMode.ALL : SearMode.KEYWORD
  }!${
    ic.value ? IgnoreCase.ENABLE : keyword === '' ? IgnoreCase.DISABLE : IgnoreCase.DISABLE
  }!${
    keyword
  }`)}`
}
</script>
