---
title: Subtract
date: 2022-6-6 18:05:14
level: 4
levelTitle: Extreme
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/07561-extreme-subtract/README.md)

### 问题

实现一个减法

```typescript
type case1 = Subtract<1, 1> // 0
type case2 = Subtract<2, 1> // 1
type case3 = Subtract<1, 2> // never
type case4 = Subtract<1000, 999> // 1
```

### 解答

```typescript
type Tuple<T, Res extends 1[] = [], O extends boolean = false> = O extends true ? Res : Res['length'] extends T ? Res : Tuple<T, [...Res, 1]>

type Subtract<M extends number, S extends number> = Tuple<M> extends [...Tuple<S>, ...infer Rest] ? Rest['length'] : never
```

### 拆分
- 和 [Inclusive Range](/projects/challenges/typescript/extreme-7) 类似
- 利用非条件结束递归尾延长递归深度
