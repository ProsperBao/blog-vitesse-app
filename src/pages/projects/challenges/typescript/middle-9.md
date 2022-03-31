---
title: Promise.all
date: 2022-03-28 17:03:00
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/16-medium-pop/README.zh-CN.md)
### 问题
键入函数`PromiseAll`，它接受PromiseLike对象数组，返回值应为`Promise<T>`，其中`T`是解析的结果数组。

```ts
const promiseAllTest1 = PromiseAll([1, 2, 3] as const) // Promise<[1, 2, 3]>
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const) // Promise<[1, 2, number]>
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)]) // Promise<[number, number, number]>

```

### 解答

```typescript
declare function PromiseAll<T extends any[]>(values: readonly [...T]): Promise<{
  [K in keyof T]: T[K] extends Promise<infer R>? R: T[K]
}>
```

### 拆分
1. 首先定义一个函数参数限定为数组 `T extends any[]`
2. 因为需要接受只读的数组，需要用 `readonly [...T]` 标记
3. 返回的是一个 `Promise` 包裹的对象
4. 需要确认属性值是否是 `Promise` 包裹后的对象
5. 如果是 `Promise` 包裹后的对象需要拆包，用 `Promise<infer R>` 获取类型
6. 然后用索引签名来获取一个新的类型对象
