---
title: 可串联构造器
date: 2022-03-28 16:42:00
level: 2
levelTitle: Middle
---

[[toc]]

[问题来源(https://github.com/type-challenges/type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/12-medium-chainable-options/README.zh-CN.md)
### 问题
在 JavaScript 中我们很常会使用可串联（Chainable/Pipeline）的函数构造一个对象，但在 TypeScript 中，你能合理的给他附上类型吗？

在这个挑战中，你可以使用任意你喜欢的方式实现这个类型 - Interface, Type 或 Class 都行。你需要提供两个函数 `option(key, value)` 和 `get()`。在 `option` 中你需要使用提供的 key 和 value 扩展当前的对象类型，通过 `get` 获取最终结果。

例如

```ts
declare const config: Chainable

const result = config
  .option('foo', 123)
  .option('name', 'type-challenges')
  .option('bar', { value: 'Hello World' })
  .get()

// 期望 result 的类型是：
interface Result {
  foo: number
  name: string
  bar: {
    value: string
  }
}
```

你只需要在类型层面实现这个功能 - 不需要实现任何 TS/JS 的实际逻辑。

你可以假设 `key` 只接受字符串而 `value` 接受任何类型，你只需要暴露它传递的类型而不需要进行任何处理。同样的 `key` 只会被使用一次。

### 解答

```typescript
type Chainable<Options = {}> = {
  option<K extends string, V>(key: K, value: V): Chainable<{ [P in K]: V } & Options>
  get(): { [k in keyof Options]: Options[k] }
}
```

### 拆分
1. 因为最终可以通过不断调用 `option` 给自己添加属性，所以 `option` 需要返回自己，这样可以进行递归调用。
2. 因为需要保存最终结果，所以需要一个 `Options` 类型，这样可以保存所有的属性，初始化为空对象。
3. `option` 需要返回当前属性和保存的历史属性形成交集
4. `get` 如果直接返回 `Options` 会返回带有交集标识的几个对象
5. 需要通过索引属性对应每个属性和值然后形成一个新对象类型
