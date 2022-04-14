---
title: Flip Arguments
date: 2022-4-14 10:11:32
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/3196-medium-flip-arguments/README.md)

### 问题
实现 `lodash` 里的 `_.flip` 函数的类型推断

类型 `FlipArguments<T>` 接受一个函数类型的泛型 `T` 返回一个新函数类型，和传入的函数有一样的返回类型，但是参数需要颠倒过来。

例如：

```typescript
type case1 = FlipArguments<() => boolean> // () => boolean
type case1 = FlipArguments<(foo: string) => number> // (foo: string) => number
type case1 = FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void> // (arg0: boolean, arg1: number, arg2: string) => void
```

### 解答

```typescript
type Reverse<T> = T extends [...infer Rest, infer L]  ? [L, ...Reverse<Rest>] : T
type FlipArguments<T extends Function> = T extends (...args: infer P) => infer R ? (...args: Reverse<P>) => R: never
```

### 拆分
1. 利用 `infer` 获取函数的返回值和参数
2. 利用 [Reverse](/projects/challenges/typescript/middle-45) 写好的数组颠倒函数把参数颠倒

