---
title: 柯里化 2
date: 2022-6-1 18:02:37
level: 4
levelTitle: Extreme
---

[[toc]]

[题目来源(type-challenges)](https://github.com/FuBaooo/type-challenges/blob/master/questions/462-extreme-currying-2/README.zh-CN.md)

### 问题

[Currying](https://en.wikipedia.org/wiki/Currying) 是一种将带有多个参数的函数转换为每个带有一个参数的函数序列的技术。

但是在前端的日常开发中，柯里化函数参数个数动态化却是非常常见的，例如 `Function.bind(this, [...params])`

```ts
const func = (a: number, b: number, c: number) => {
  return a + b + c
}

const bindFunc = func(null, 1, 2)

const result = bindFunc(3) // result: 6
```

因此，在 `柯里化` 的基础上，我们更需要的是 `动态参数化的柯里化函数`

```ts
const add = (a: number, b: number, c: number) => a + b + c
const three = add(1, 1, 1) 

const curriedAdd = DynamicParamsCurrying(add)
const six = curriedAdd(1, 2, 3)
const seven = curriedAdd(1, 2)(4)
const eight = curriedAdd(2)(3)(4)
```

传递给 `DynamicParamsCurrying` 的函数可能有多个参数，您需要实现它的类型。

在此挑战中，curriedAdd函数每次可接受最少一个参数，但是所有参数个数总和及类型与原函数相同。分配完所有参数后，它应返回其结果。

```typescript
const curried1 = DynamicParamsCurrying((a: string, b: number, c: boolean) => true)
const curried2 = DynamicParamsCurrying((a: string, b: number, c: boolean, d: boolean, e: boolean, f: string, g: boolean) => true)
 
const curried1Return1 = curried1('123')(123)(true)
const curried1Return2 = curried1('123', 123)(false)
const curried1Return3 = curried1('123', 123, true)

const curried2Return1 = curried2('123')(123)(true)(false)(true)('123')(false)
const curried2Return2 = curried2('123', 123)(true, false)(true, '123')(false)
const curried2Return3 = curried2('123', 123)(true)(false)(true, '123', false)
const curried2Return4 = curried2('123', 123, true)(false, true, '123')(false)
const curried2Return5 = curried2('123', 123, true)(false)(true)('123')(false)
const curried2Return6 = curried2('123', 123, true, false)(true, '123', false)
const curried2Return7 = curried2('123', 123, true, false, true)('123', false)
const curried2Return8 = curried2('123', 123, true, false, true)('123')(false)
const curried2Return9 = curried2('123', 123, true, false, true, '123')(false)
const curried2Return10 = curried2('123', 123, true, false, true, '123', false)


type case1 = typeof curried1Return1 // boolean
type case2 = typeof curried1Return2 // boolean
type case3 = typeof curried1Return3 // boolean

type case4 = typeof curried2Return1 // boolean
type case5 = typeof curried2Return2 // boolean
type case6 = typeof curried2Return3 // boolean
type case7 = typeof curried2Return4 // boolean
type case8 = typeof curried2Return5 // boolean
type case9 = typeof curried2Return6 // boolean
type case10 = typeof curried2Return7 // boolean
type case11 = typeof curried2Return8 // boolean
type case12 = typeof curried2Return9 // boolean
type case13 = typeof curried2Return10 // boolean
```

### 解答

```typescript
declare function DynamicParamsCurrying<A extends unknown[], R>(fn: (...args: A) => R): Currying<A, R>

type Currying<A extends unknown[], R> = 
A['length'] extends 0
? R
: <T extends unknown[]>(...arg: T) => Currying<A extends [...T, ...infer Rest] ? Rest : never, R>
```

### 拆分
- 根据函数参数的泛型拿到参数和返回值
- 判断剩余参数长度是否为 0
- 如果为 0 直接返回拿到的返回值
- 如果不为零则返回一个新的函数包含泛型参数，通过不定长的泛型参数和剩余参数
- 包装下一个类型
