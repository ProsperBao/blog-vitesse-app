import { acceptHMRUpdate, defineStore } from 'pinia'
import axios from 'axios'

export const useStore = defineStore('testList', {
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
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
