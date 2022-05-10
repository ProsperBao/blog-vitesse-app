---
title: Pinia
date: 2022-5-10 19:05:06
level: 3
levelTitle: Hard
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/01290-hard-pinia/README.md)

### 问题

#### 概述

此函数只接收一个类型为对象的参数。该对象包含4个属性：

-`id` - 只是一个字符串（必需）

-`state` - 一个函数，它将返回一个对象作为存储的状态（必需）

-`getters` - 一个对象，其方法类似于Vue的计算值或Vuex的getters，详细信息如下（可选）

-`actions` - 一个对象，其方法可以产生副作用和改变状态，详细信息如下（可选）


实现一个简化版本的的 `Pinia` 类型。

创建一个类型级函数，其类型类似于 [Pinia](https://github.com/posva/pinia)   library。实际上，不需要实现函数，只需要添加类型。

```typescript
const store = defineStore({
  id: '',
  state: () => ({
    num: 0,
    str: '',
  }),
  getters: {
    stringifiedNum() {
      this.num += 1

      return this.num.toString()
    },
    parsedNum() {
      return parseInt(this.stringifiedNum)
    },
  },
  actions: {
    init() {
      this.reset()
      this.increment()
    },
    increment(step = 1) {
      this.num += step
    },
    reset() {
      this.num = 0

      this.parsedNum = 0

      return true
    },
    setNum(value: number) {
      this.num = value
    },
  },
})

// @ts-expect-error
store.nopeStateProp
// @ts-expect-error
store.nopeGetter
// @ts-expect-error
store.stringifiedNum()
store.init()
// @ts-expect-error
store.init(0)
store.increment()
store.increment(2)
// @ts-expect-error
store.setNum()
// @ts-expect-error
store.setNum('3')
store.setNum(3)
const r = store.reset()

type case1 = typeof store.num // number
type case2 = typeof store.str // string
type case3 = typeof store.stringifiedNum // string
type case4 = typeof store.parsedNum // number
type case5 = typeof r // true

```

### 解答

```typescript
type PiniaReturn<S, G, A> = {
  [K in keyof G]: G[K] extends (...args: any) => infer R ? R : never
} & A & S

type Pinia<S, G, A> = {
  id: string,
  state: () => S,
  getters?: G,
  actions?: A
} & ThisType<PiniaReturn<S, G, A>>

declare function defineStore<S, G, A>(store: Pinia<S, G, A>): PiniaReturn<S, G, A>
```

### 拆分

* 和 [简单的 Vue 类型](/projects/challenges/typescript/hard-1) 类似
* `state` 的占用类型发生了变化
* `getters` 和 `actions` 变成了可选
