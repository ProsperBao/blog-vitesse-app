---
title: Sum
date: 2022-6-2 10:47:18
level: 4
levelTitle: Extreme
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/00476-extreme-sum/README.md)

### 问题

实现类型的大数加法

```typescript
Sum<2, 3> // '5'
Sum<'13', '21'> // '34'
Sum<'328', 7> // '335'
Sum<1_000_000_000_000n, '123'> // '1000000000123'
Sum<9999, 1> // '10000'
Sum<4325234, '39532'> // '4364766'
Sum<728, 0> // '728'
Sum<'0', 213> // '213'
Sum<0, '0'> // '0'
```

### 解答

```typescript
type Join<T> = T extends [infer F, ...infer R] ? R extends [] ? F : F extends string ? `${F}${Join<R>}` : '' : ''
type SplitNum<A extends string, Res extends string[] = []> = `${A}` extends `${infer Head}${infer Tail}` ? SplitNum<Tail, [...Res, Head]> : Res;
type Tuple<T extends string, Res extends 1[] = []> = `${Res['length']}` extends `${T}` ? Res : Tuple<T, [...Res, 1]>;
type Add<A extends string, B extends string> = `${[...Tuple<A>, ...Tuple<B>]['length'] & number}` extends infer C ? C extends '' ? '0' : C : '0';
type PopResult<T extends unknown[]> = T extends [...infer Rest, infer _] ? Rest : [];
type Pop<T extends unknown[]> = T extends [...infer _, infer Last] ? Last : '0';
type LoopAdd<T extends unknown[]> = 
T['length'] extends 1
? T[0] extends `1${infer R}`
  ? ['1', R]
  : [T[0]]
: T extends [...infer Rest, infer Two, infer One]
  ? One extends `1${infer R}`
    ? R extends ''
      ? [...LoopAdd<[...Rest, Two]>, One]
      : [...LoopAdd<[...Rest, Add<Two & string , "1">]>, R]
    : [...LoopAdd<[...Rest, Two]>, One]
  : []

type Sum<
  A extends string | number | bigint,
  B extends string | number | bigint,
  SA extends unknown[] = SplitNum<`${A}`>,
  SB extends unknown[] = SplitNum<`${B}`>,
  Res extends unknown[] = [],
> = 
SA['length'] extends 0
? Join<LoopAdd<[...SB, ...Res]>> 
: SB['length'] extends 0
  ? Join<LoopAdd<[...SA, ...Res]>>
  : Sum<A, B, PopResult<SA>, PopResult<SB>, [Add<Pop<SA>, Pop<SB>>, ...Res]>

```

### 拆分

- 通过把数字统一成字符串然后拆分单个成数组
- 再通过数组每一位相加
- 然后通过统一进位
