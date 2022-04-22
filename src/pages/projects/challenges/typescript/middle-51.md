---
title: 斐波那契序列
date: 2022-4-22 10:05:18
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/04182-medium-fibonacci-sequence/README.zh-CN.md)

### 问题

1. 实现一个类型的斐波那契序列，给定一个序列索引找到该序列索引的位置的数字

```typescript
type Result1 = Fibonacci<3> // 2
type Result2 = Fibonacci<8> // 21
```

### 解答

```typescript
type Arr<T extends number, A extends number[] = []> = A['length'] extends T ? A : Arr<T, [...A, number]>
type Add<T extends number, U extends number> = [...Arr<T>, ...Arr<U>]['length']& number

type Fibonacci<T extends number, L extends number = 0, R extends number = 0, I extends number = 0> = 
  T extends I
    ? Add<L, R>
    : L extends 0
      ? Fibonacci<T, 1, Add<L, R>, Add<I, 1>>
      : Fibonacci<T, R, Add<L, R>, Add<I, 1>>
```

### 拆分

1. 需要定义一个 `Add` 类型，用来拼接两个数组
2. 需要一个 `Arr` 用来转换数字变成数组，`A['length'] extends T` 一定要 `A['length']` 在前面，否则会报错
3. 需要一个 `Fibonacci` 类型，用来实现斐波那契序列
4. 需要一个 `T extends I` 用来判断是否到达结束的索引，如果结束索引，那就相加获取当前值
5. 需要一个 `L extends 0` 用来判断第一个数字是否为 0
6. 如果为 0 则，`L` 变为1
7. 递归调用
