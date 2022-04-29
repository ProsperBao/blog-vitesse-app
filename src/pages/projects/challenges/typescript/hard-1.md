---
title: 简单的 Vue 类型
date: 2022-4-29 17:06:40
level: 3
levelTitle: Hard
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/edit/main/questions/00006-hard-simple-vue/README.zh-CN.md)

### 问题

实现类似Vue的类型支持的简化版本。

通过提供一个函数`SimpleVue`（类似于`Vue.extend`或`defineComponent`），它应该正确地推断出 computed 和 methods 内部的`this`类型。

在此挑战中，我们假设`SimpleVue`接受只带有`data`，`computed`和`methods`字段的Object作为其唯一的参数，

-`data`是一个简单的函数，它返回一个提供上下文`this`的对象，但是你无法在`data`中获取其他的计算属性或方法。

-`computed`是将`this`作为上下文的函数的对象，进行一些计算并返回结果。在上下文中应暴露计算出的值而不是函数。

-`methods`是函数的对象，其上下文也为`this`。函数中可以访问`data`，`computed`以及其他`methods`中的暴露的字段。 `computed`与`methods`的不同之处在于`methods`在上下文中按原样暴露为函数。

`SimpleVue`的返回值类型可以是任意的。

```ts
const instance = SimpleVue({
  data() {
    return {
      firstname: 'Type',
      lastname: 'Challenges',
      amount: 10,
    }
  },
  computed: {
    fullname() {
      return this.firstname + ' ' + this.lastname
    }
  },
  methods: {
    hi() {
      alert(this.fullname.toLowerCase())
    }
  }
})
```

### 解答

```typescript
type SimpleReturn<D, C, M> = D & {
  [K in keyof C]: C[K] extends (...args: any) => infer R ? R : never
} & M

type IOptions<D, C, M> = {
  data: () => D,
  computed: C,
  methods: M
} & ThisType<SimpleReturn<D, C, M>>

declare function SimpleVue<D, C, M>(options: IOptions<D, C, M>): SimpleReturn<D, C, M>
```

### 拆分

1. 使用 `ThisType` 来提供上下文 `this`
2. 用泛型来定义每个属性的返回值类型
3. `computed` 计算属性需要拿到类型的返回值和 `data` 属性 `methods` 中的函数联合成新类型返回
