<template>
  <div>
    <button @change="onChange">
      {{ t('button.choose_picture') }}
    </button>
    <input type="file" @change="onChange">
    <div>
      <h2>After</h2>
      <img :src="after" :class="{'loading': loading}">
    </div>
    <div>
      <h2>Before</h2>
      <img :src="before">
    </div>
  </div>
</template>

<script setup lang="ts">
import init, { grayscale } from '~/assets/wasm/image-handle/wasm_image'
const { t } = useI18n()
const after = ref('')
const before = ref('')
const loading = ref(false)

const onChange = (e: Event) => {
  const ele = e.target as HTMLInputElement
  const file = ele.files?.[0]
  if (file) {
    const reader = new FileReader()
    const reader1 = new FileReader()

    reader.onload = function() {
      loading.value = true
      // 可以用 worker 进行优化
      setTimeout(() => {
        const result = this.result as ArrayBuffer
        const uint8Array = new Uint8Array(result)
        init().then(() => {
          after.value = grayscale(uint8Array) as unknown as string
          loading.value = false
        })
          .catch(() => {
            alert('仅支持png')
          })
          .finally(() => {
            loading.value = false
          })
      })
    }
    reader1.onload = function() {
      before.value = this.result as string
    }

    reader.readAsArrayBuffer(file)
    reader1.readAsDataURL(file)
  }
}

</script>

<style>
.loading {
  position: relative;
  min-width: 50px;
  min-height: 50px;
  display: inline-block;
}
.loading::after {
  content: 'loading...';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.3);
  z-index: 1;
}
.loading::after {
  content: 'loading...';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  z-index: 2;
  display: inline-block;
  text-align: center;
}
</style>
