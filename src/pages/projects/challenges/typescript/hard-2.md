---
title: 柯里化 1
date: 2022-5-2 14:12:50
level: 3
levelTitle: Hard
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/00017-hard-currying-1/README.zh-CN.md)

### 问题
[Currying]（https://en.wikipedia.org/wiki/Currying）是一种将带有多个参数的函数转换为每个带有一个参数的函数序列的技术。

例如：

```ts
const add = (a: number, b: number) => a + b
const three = add(1, 2)

const curriedAdd = Currying(add)
const five = curriedAdd(2)(3)
```

传递给`Currying`的函数可能有多个参数，您需要正确键入它。

在此挑战中，curried函数一次仅接受一个参数。分配完所有参数后，它应返回其结果。

### 解答

```typescript
type Curry<F> = 
  F extends (...args: infer A) => infer R ?
    (
    A extends [infer Head, ...infer Tail] ?
      (arg: Head) => Curry<(...arg: Tail) => R> :
      ReturnType<F>
    ) :
    never;

declare function Currying<F>(fn: F): Curry<F>
```

### 拆分
1. 首先需要获取函数的参数然后拆分参数递归调用自身将拆分后的剩余参数传递给自身
2. 如果无法拆分直接获取传入函数的返回值然后返回

