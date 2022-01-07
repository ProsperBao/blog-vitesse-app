import axios from 'axios'
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useListStore = defineStore('testList', {
  state: (): {list: {date: string;title: string}[]} => ({
    list: [],
  }),
  actions: {
    async dispatch() {
      const res = await axios.get('https://api.oick.cn/lishi/api.php')
      this.list = (res).data.result
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useListStore, import.meta.hot))
