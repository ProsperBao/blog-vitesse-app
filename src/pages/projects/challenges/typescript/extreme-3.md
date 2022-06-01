---
title: Slice
date: 2022-6-1 14:08:26
level: 4
levelTitle: Extreme
---

[[toc]]

[题目来源(type-challenges)](https://github.com/FuBaooo/type-challenges/blob/master/questions/216-extreme-slice/README.md)

### 问题
实现一个 `Array.slice` 的类型版本
```typescript
type Arr = [1, 2, 3, 4, 5]

// 基础
type case = Slice<Arr, 0, 1> // [1]
type case = Slice<Arr, 0, 0> // []
type case = Slice<Arr, 2, 4> // [3, 4]

// 可选参数
type case = Slice<[]> // []
type case = Slice<Arr> // Arr
type case = Slice<Arr, 0> // Arr
type case = Slice<Arr, 2> // [3, 4, 5]

// 负数索引
type case = Slice<Arr, 0, -1> // [1, 2, 3, 4]
type case = Slice<Arr, -3, -1> // [3, 4]

// 无效参数
type case = Slice<Arr, 10> // []
type case = Slice<Arr, 1, 0> // []
type case = Slice<Arr, 10, 20> // []
```

### 解答

```typescript
// 根据传入截取数值截取
type Do<A, Start, End, N extends 1[] = [], Res extends unknown[] = []> =
  N['length'] extends End
    ? Res // 递归结束条件，当截取的结束索引等于累计长度的时候结束递归
    : A extends [infer H, ...infer T] // 是否可以继续拆分
      ? Do<T, Start, End, 
          [...N, 1], // 累计长度
          N['length'] extends Start 
            ? [H] // 当累计结果等于初始长度的时候
            : Res extends [] 
              ? [] // 为了避免开始索引不为0的时候就开始计算
              : [...Res, H]
        >
      : Res // 不存在索引的情况，返回空对象

// 确保在范围内并且转换负数取之为正数取值
type Normalize<A extends unknown[], I extends number, N extends 1[] = []> =
  `${I}` extends `${N['length']}` // 正数从左边开始
    ? N['length'] // 正数从左边开始
    : `${I}` extends `-${N['length']}` // 负数从右边开始
      ? A['length'] // 负数从右边开始
      : A extends [unknown, ...infer T]
        ? Normalize<T, I, [...N, 1]> // 递归处理
        : N['length']; // 溢出则取传入数组得长度

type Slice<A extends unknown[], S extends number = 0, E extends number = A['length']> = Do<A, Normalize<A, S>, Normalize<A, E>>
```

### 拆分
- 根据传入的参数做可选化取值，根据开始索引和结束索引序列化数值之后根据索引取值
- 序列化数值保证传入整数和负数不存在的索引都可以返回一个正确的索引
  - 如果不存在索引则返回传入的数组长度
  - 如果是负数索引则根据截取后剩下的原数组长度返回
  - 如果是整数索引则返回累计长度
- 根据序列化后的两个索引去原数组取值
