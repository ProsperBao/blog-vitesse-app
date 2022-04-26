---
title: Unique 
date: 2022-4-26 19:04:26
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/05360-medium-unique/README.md)

### 问题

实现 `Lodash.uniq` 的类型版本, `Unique` 接受一个数组 `T`，返回不带重复值的数组 `T`。

```typescript
type case1 = Unique<[1, 1, 2, 2, 3, 3]>//  [1, 2, 3]
type case2 = Unique<[1, 2, 3, 4, 4, 5, 6, 7]>//  [1, 2, 3, 4, 5, 6, 7]
type case3 = Unique<[1, 'a', 2, 'b', 2, 'a']>//  [1, 'a', 2, 'b']
type case4 = Unique<[string, number, 1, 'a', 1, string, 2, 'b', 2, number]>//  [string, number, 1, 'a', 2, 'b']
type case5 = Unique<[unknown, unknown, any, any, never, never]>//  [unknown, any, never]
```

### 解答

```typescript
export type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false

type HasArray<T extends unknown[], U> = T extends [infer F, ...infer R] ? Equal<F, U> extends true ? true : HasArray<R, U> : false

type Unique<T, C extends unknown[] = []> =
  T extends [infer F, ...infer R]
  ? HasArray<C, F> extends true
  ? Unique<R, C>
  : Unique<R, [...C, F]>
  : C
```

### 拆分
1. 需要拆分数组，然后一个一个比较
2. 每一个都需要和结果数组中的元素比较
3. 比较相等不可以直接用 `extends` 比较，会出现问题
4. 所以需要用数组的返回值断言来比较
