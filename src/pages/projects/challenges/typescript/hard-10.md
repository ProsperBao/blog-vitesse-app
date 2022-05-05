---
title: Vue 基础 Props
date: 2022-5-5 16:47:50
level: 3
levelTitle: Hard
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/00213-hard-vue-basic-props/README.md)

### 问题

除了简单的Vue，我们现在在选项中还有一个新的 `props` 字段。这是 Vue 的 `props` 简化版本。以下是一些规则。

`props` 是一个对象，包含每个字段，作为注入 `this` 的 `props` 属性。注入的 `props` 可以在所有上下文中访问，包括 `data`、`computed` 和 `methods`。

`props` 将由构造函数或包含构造函数的 `type` 字段的对象定义。

```javascript
props: {
  foo: Boolean
}
// or
props: {
  foo: { type: Boolean }
}
```
应该推断为 `type Props = { foo: boolean }`

当传递多个构造函数时，应该将类型推断为一个并集。

```typescript
props: {
  foo: { type: [Boolean, Number, String] }
}
// -->
type Props = { foo: boolean | number | string }
```

### 解答

```typescript
type ToUnion<T> = 
  T extends Array<infer A> // 
    ? ToUnion<A>
    : T extends () => infer A
      ? A
      : T extends abstract new (...args: any) => any
        ? InstanceType<T>
        : any

type VueReturn<P, D, C, M> = D & {
  [K in keyof C]: C[K] extends (...args: any) => infer R ? R : never
} & M & VueProps<P>

type VueOptions<P, D, C, M> = {
  props: P,
  data(this: VueProps<P>): D,
  computed: C,
  methods: M 
} & ThisType<VueReturn<P, D, C, M>>

type VueProps<T> = {
  [K in keyof T]: T[K] extends { type: infer A }
  ? ToUnion<A>
  : ToUnion<T[K]>
}

declare function VueBasicProps<P, D, C, M>(options: VueOptions<P, D, C, M>): VueReturn<P, D, C, M>
```

### 拆分
* 根据 [简单的 Vue 类型](/projects/challenges/typescript/hard-3) 的基础上进行修改。
* 增加 `props` 的泛型 `P`。
* 增加 `VueProps` 的泛型用于包装 `P`
* 为了支持多个构造函数，增加 `ToUnion` 的泛型。
* `ToUnion` 需要先确定是否是函数元组类型，如果是则需要拿出元组里的类型然后继续进行一次处理，确保在联合类型下，每个类型都是构造函数的实例类型
* `T extends abstract new (...args: any) => any` 可以判断是否是构造函数类型，可以通过 `InstanceType<T>` 来获取实例类型
* 首先 `data` 内部需要使用到 `props`，所以需要增加 `this` 的类型。
* 然后需要让 `computed` 和 `methods` 里的函数能够使用到 `props`，所以需要 `VueOptions` 里的 `this` 类型也需要添加包装后的 `VueProps`。
