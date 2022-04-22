---
title: 去除数组指定元素
date: 2022-4-22 17:40:00
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/05117-medium-without/README.zh-CN.md)

### 问题
实现一个像 Lodash.without 函数一样的泛型 Without<T, U>，它接收数组类型的 T 和数字或数组类型的 U 为参数，会返回一个去除 U 中元素的数组 T。

例如：
```typescript
type case1 = Without<[1, 2], 1> // [2]
type case2 = Without<[1, 2, 4, 1, 5], [1, 2]> // [4, 5]
type case3 = Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]> // []
```

### 解答

```typescript
type Without<T, U, Res extends unknown[] = []> = 
  T extends [infer F, ...infer R]
    ? F extends (U extends unknown[]? U[number] : U)
      ? Without<R, U, Res>
      : Without<R, U, [...Res, F]>
    : Res
```

### 拆分

