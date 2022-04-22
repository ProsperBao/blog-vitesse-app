---
title: Greater Than
date: 2022-4-22 15:36:34
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)]https://github.com/type-challenges/type-challenges/blob/main/questions/04425-medium-greater-than/README.md()

### 问题
实现一个 `T` > `U` 的比较函数。

```typescript
type case1 = GreaterThan<1, 0> // true
type case2 = GreaterThan<5, 4> // true
type case3 = GreaterThan<4, 5> // false
type case4 = GreaterThan<0, 0> // false
type case5 = GreaterThan<20, 20> // false
```

### 解答

```typescript
type Arr<T extends number, A extends number[] = []> = A['length'] extends T ? A : Arr<T, [...A, number]>
type GreaterThan<T extends number, U extends number> = T extends U ? false : Arr<T> extends [...Arr<U>, ...infer _Rest] ? true : false
```

### 拆分

1. 用减法判断是否大于
