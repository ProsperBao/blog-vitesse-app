---
title: Typescript 数值运算
date: 2022-5-31 17:20:25
lang: zh-CN
duration: 5min
description: Typescript 数值运算
tags: other
type: learn
---

[[toc]]

TypeScript 虽然图灵完备，但没有加减乘除运算符，但可以通过构造不同的数组 (元组) ，然后取 `length` 的方式完成数值运算，把数值的加减乘除转化为对数组的提取和构造。

## 构造数组

```ts
type Tuple<
  T extends number,
  Res extends 1[] = [],
> = Res["length"] extends T ? Res : Tuple<T, [...Res, 1]>

type Res = Tuple<3> // [1, 1, 1]
```

## 加减乘除

### Sum

加法：分别构造对应加数长度的两个元组，然后合并成一个

```ts
type Sum<A extends number, B extends number> = [
  ...Tuple<A>,
  ...Tuple<B>,
]["length"]

type Res = Sum<1, 1> // 2
type Res1 = Sum<999, 999> // 1998

// @ts-expect-error
type Res2 = Sum<999, 1000> // 报错：类型实例化过深，且可能无限。ts(2589)
// @ts-expect-error
type Res3 = Sum<-1, 0> // 报错：类型实例化过深，且可能无限。ts(2589)
```

受限于 TypeScript 递归次数的限制，构造数组的最大长度为 999 ；受限于数组 ( 元组 ) 的定义，构造数组的最小长度为 0 ，无法处理负数。

### Subtract

减法：减数 = 被减数 + 差

减数构造数组的长度 = 被减数构造数组和差构造数组合并后构造数组的长度

```ts
// M => minuend 被减数, S => subtrahend 减数
type Subtract<M extends number, S extends number> = Tuple<M> extends [
  ...Tuple<S>,
  ...infer Res,
]
  ? Res["length"]
  : never

type Res = Subtract<2, 1> // 1
type Res1 = Subtract<0, 1> // never
type Res2 = Subtract<999, 998> // 1

// @ts-expect-error
type Res3 = Subtract<1000, 999> // 报错：类型实例化过深，且可能无限。ts(2589)
```

TypeScript 无法处理负数，当差为负数时，返回 never 。

### Multiply

乘法：

`2 x 5 = 10` 可以理解为 `2 + 2 + 2 + 2 + 2 = 10` 或 `5 + 5 = 10`

```ts
type Multiply<
  A extends number,
  B extends number,
  Res extends unknown[] = [],
> = A extends 0
  ? Res["length"]
  : Multiply<Subtract<A, 1>, B, [...Res, ...Tuple<B>]>

type Res = Multiply<2, 5> // 10
```

乘法运算同样收到递归次数限制，且大数乘法及其消耗性能，会很卡。

TypeScript 中的元组长度也有上限。

### Divide

除法：被除数不断减去减数，直到为 0 ，记录的次数就是商。

```ts
type Divide<
  A extends number,
  B extends number,
  Res extends unknown[] = [],
> = A extends 0 ? Res["length"] : Divide<Subtract<A, B>, B, [unknown, ...Res]>

type Res = Divide<30, 5> // 6
```

只能实现整除，且有边界条件没有判断。

## 数组长度实现计数

### StrLen

```ts
// 尾递归
type StrLen<
  S extends string,
  Res extends unknown[] = [],
> = S extends `${string}${infer R}`
  ? StrLen<R, [...Res, unknown]>
  : Res["length"]

type Res = StrLen<"hello">
```

### GreaterThan

```ts
type GreaterThan<
  A extends number,
  B extends number,
  Res extends unknown[] = [],
> = A extends B
  ? false
  : Res["length"] extends B
  ? true
  : Res["length"] extends A
  ? false
  : GreaterThan<A, B, [...Res, unknown]>

type Res = GreaterThan<2, 1> // true
type Res1 = GreaterThan<1, 2> // false
```
