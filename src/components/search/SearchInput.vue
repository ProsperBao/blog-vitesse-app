<template>
  <div class="relative h-12">
    <div class="absolute w-full">
      <input
        :value="keyword"
        type="text"
        class="a-input !pl-8"
        :placeholder="reg? t('input.search_input_placeholder_reg'):t('input.search_input_placeholder') "
        @change="(e)=>$emit('update:keyword', (e?.target as HTMLInputElement).value)"
      >
      <carbon-search class="absolute left-2 top-1.75" />
    </div>
    <div class="absolute right-1 top-0.93 flex gap-1">
      <button :class="['btn-link', { active: reg }]" :title="t('button.reg_exp')" @click="$emit('update:reg', !reg)">
        .*
      </button>
      <button :class="['btn-link', { active: ignoreCase }]" :title="t('button.ignore_case')" @click="$emit('update:ignoreCase', !ignoreCase)">
        Aa
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
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
defineEmits(['update:keyword', 'update:reg', 'update:ignoreCase'])
const { t } = useI18n()
</script>
