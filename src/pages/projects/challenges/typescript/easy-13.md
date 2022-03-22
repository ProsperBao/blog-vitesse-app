---
title: Parameters
date: 2022-03-22 14:25:00
level: 1
levelTitle: Easy
---

[[toc]]

[问题来源(https://github.com/type-challenges/type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/3060-easy-unshift/README.zh-CN.md)
### 问题
实现内置的 `Parameters<T>` 类型，而不是直接使用它，可参考[TypeScript官方文档](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype)。
```typescript
declare function f1(arg: { a: number; b: string }): void
type T0 = myParameters<() => string> // []
type T1 = myParameters<(s: string) => void>// [s: string]
type T2 = myParameters<<T>(arg: T) => T>// [arg: unknown]
type T3 = myParameters<typeof f1>// [arg: { a: number; b: string; }]
type T4 = myParameters<any>// unknown[]
type T5 = myParameters<never> // never
type T6 = myParameters<string>// never
type T7 = myParameters<Function>// never
```

### 解答

```typescript
type myParameters<T extends (...args: any) => any> = T extends (...args: infer U) => any ? U : never
```

### 拆分
1. 首先 `T` 得满足是个函数所以得限制`(...args: any) => any` 参数和返回值可以是任意值
2. 然后用 `infer U` 去占用函数参数的类型，如果有那就返回如果没有就返回 `never`