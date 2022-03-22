---
title: Awaited
date: 2022-03-21 09:11:00
level: 1
levelTitle: Easy
---

[[toc]]

[问题来源(https://github.com/type-challenges/type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/189-easy-awaited/README.zh-CN.md)
### 问题
假如我们有一个 Promise 对象，这个 Promise 对象会返回一个类型。在 TS 中，我们用 Promise<T> 中的 T 来描述这个 Promise 返回的类型。请你实现一个类型，可以获取这个类型。

比如：`Promise<ExampleType>`，请你返回 ExampleType 类型。

> 这个挑战来自于 [@maciejsikora](https://github.com/maciejsikora) 的文章：[original article](https://dev.to/macsikora/advanced-typescript-exercises-question-1-45k4)

``` typescript
type X = Promise<string>
type Y = Promise<{ field: number }>

type ResultX = Awaited<X>; // string
type ResultY = Awaited<Y>; // { field: number }

type Awaited<A> = /** 答案 **/
```

### 解答

```typescript
type Awaited<T> = T extends Promise<infer U> 
    ? U extends Promise<infer F>
        ? Awaited<F> 
        : U
    : T
```

### 拆分
1. `Promise<T>` 可能是多层嵌套的，所以需要递归处理拿到最里层的值
2. 结合 `inter U` 占位嵌套，用三元表达式推断内层是否存在嵌套