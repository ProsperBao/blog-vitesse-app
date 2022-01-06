import { acceptHMRUpdate, defineStore } from 'pinia'
import axios from 'axios'

export const useListStore = defineStore('testList',
  () => {
    const saveList = ref<{date: string;title: string}[]>()

    const list = computed(() => saveList.value)

    async function dispatch() {
      const res = await axios.get('https://api.oick.cn/lishi/api.php')
      saveList.value = res.data.result
    }

    return {
      list,
      dispatch,
    }
  },
)

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useListStore, import.meta.hot))
