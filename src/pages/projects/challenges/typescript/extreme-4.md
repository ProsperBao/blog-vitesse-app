---
title: Integers Comparator 
date: 2022-6-1 14:49:45
level: 4
levelTitle: Extreme
---

[[toc]]

[题目来源(type-challenges)](https://github.com/FuBaooo/type-challenges/blob/master/questions/274-extreme-integers-comparator/README.md)

### 问题

实现类型级整数比较器。 我们提供了一个枚举来指示比较结果, 例如:

- 如果 `a` 比 `b` 大, 则应该是 `Comparison.Greater`.
- 如果 `a` 和 `b` 相等, 则应该是 `Comparison.Equal`.
- 如果 `a` 比 `b` 小, 则应该是 `Comparison.Lower`.

**请注意 `a` 和 `b` 可以是正整数或者负数和0, 也可能一正一负.**

```typescript
type case1 = Comparator<5, 5>// Comparison.Equal
type case2 = Comparator<5, 6>// Comparison.Lower
type case3 = Comparator<5, 8>// Comparison.Lower
type case4 = Comparator<5, 0>// Comparison.Greater
type case5 = Comparator<-5, 0>// Comparison.Lower
type case6 = Comparator<0, 0>// Comparison.Equal
type case7 = Comparator<0, -5>// Comparison.Greater
type case8 = Comparator<5, -3>// Comparison.Greater
type case9 = Comparator<5, -7>// Comparison.Greater
type case10 = Comparator<-5, -7>// Comparison.Greater
type case11 = Comparator<-5, -3>// Comparison.Lower
type case12 = Comparator<-25, -30>// Comparison.Greater
type case13 = Comparator<15, -23>// Comparison.Greater
type case14 = Comparator<40, 37>// Comparison.Greater
type case15 = Comparator<-36, 36>// Comparison.Lower
type case16 = Comparator<27, 27>// Comparison.Equal
type case17 = Comparator<-38, -38>// Comparison.Equal
```

### 解答

```typescript
type Tuple<T extends string | number, Res extends unknown[] = []> = `${Res['length']}` extends `${T}` ? Res : Tuple<T, [...Res, 1]>
type Sub<A extends string | number, B extends string | number> = Tuple<A> extends [...Tuple<B>, ...infer Rest] ? Rest['length'] : false;

enum Comparison {
  Greater,
  Equal,
  Lower,
}

type Comparator<A extends number, B extends number> =
A extends B
? Comparison.Equal
:`${A}` extends `-${infer NA}`
  ? `${B}` extends `-${infer NB}`
    ? Sub<NA, NB> extends false ? Comparison.Greater : Comparison.Lower
    : Comparison.Lower
  : `${B}` extends `-${infer _}`
    ? Comparison.Greater
    : Sub<A, B> extends false ? Comparison.Lower : Comparison.Greater
```

### 拆分
- 判断是否相等
- 根据一正一负直接返回结果
- 接下来根据两数相减返回结果

