import { defineStore } from 'pinia'
import axios from 'axios'

export const useStore = defineStore('testList', {
  state: (): {list: {date: string;title: string}[]} => ({
    list: [],
  }),
  actions: {
    dispatch() {
      return axios.get('https://api.oick.cn/lishi/api.php').then((res) => {
        this.list = res.data.result
      })
    },
  },
})
