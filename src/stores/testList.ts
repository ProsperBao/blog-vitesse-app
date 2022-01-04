import { defineStore } from 'pinia'
import axios from 'axios'

export const useTestListStore = defineStore('testList', {
  state: (): {list: {date: string;title: string}[]} => ({
    list: [],
  }),
  actions: {
    getRequestData() {
      axios.get('https://api.oick.cn/lishi/api.php').then((res) => {
        this.list = res.data.result
      })
    },
  },
})
