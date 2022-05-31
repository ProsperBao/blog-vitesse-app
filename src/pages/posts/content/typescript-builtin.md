---
title: Typescript 内置的高级类型。
date: 2022-5-31 16:35:11
lang: zh-CN
duration: 10min
description: Typescript 内置的高级类型。
tags: other
type: learn
---

[[toc]]

TypeScript 内置的高级类型。

### Parameters

提取函数类型的参数类型。

```ts
type Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never
```

### ReturnType

提取函数类型的返回值类型。

```ts
type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : never
```

### ConsturctorParameters

提取构造器参数的类型。

```ts
type ConstructorParameters<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: infer P) => any ? P : never
```

### InstanceType

提取构造器返回值的类型。

```ts
type InstanceType<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: any) => infer R ? R : never
```

### ThisParameterType

提取 this 的类型。

```ts
type ThisParameterType<T> = T extends (this: infer U, ...args: any) => any
  ? U
  : never
```

### OmitThisParameter

删除 this 的类型。

```ts
type OmitThisParameter<T> = unknown extends ThisParameterType<T>
  ? T
  : T extends (...args: infer A) => infer R
  ? (...args: A) => R
  : T
```

### Partial

变为可选索引。

```ts
type Partial<T> = {
  [P in keyof T]?: T[P]
}
```

### Required

去掉索引的可选 ( 必填 ) 。

```ts
type Required<T> = {
  [P in keyof T]-?: T[P]
}
```

### Readonly

变为只读索引。

```ts
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}
```

### Pick

过滤出对象类型中需要的索引。

```ts
type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

### Record

创建索引类型。

```ts
type Record<K extends keyof any, T> = {
  [P in K]: T
}
```

`keyof any` 的结果是 `string | number | symbol`

### Exclude

从联合类型中去掉一部分类型。

```ts
type Exclude<T, U> = T extends U ? never : T
```

### Extract

从联合类型中过滤出想要的类型。

```ts
type Extract<T, U> = T extends U ? T : never
```

### Omit

删除对象类型中不需要的索引。

```ts
type Omit<T, K extends keyof any> = {
  [P in Exclude<keyof T, K>]: T[P]
}
```

### Awaited

```ts
type Awaited<T> = T extends null | undefined
  ? T
  : T extends object & { then(onfulfilled: infer F): any }
  ? F extends (value: infer V, ...args: any) => any
    ? Awaited<V>
    : never
  : T
```

兼容了 thenable 的写法，且不再限制必须传入 Promise 类型，只要是对象且有 then 方法就可以。

### NonNullable

判断是否为非空类型。

```ts
type NonNullable<T> = T extends null | undefined ? never : T
```

### 其他

Uppercase 、Lowercase 、Capitalize 、Uncapitalize

```ts
type Uppercase<S extends string> = intrinsic

type Lowercase<S extends string> = intrinsic

type Capitalize<S extends string> = intrinsic

type Uncapitalize<S extends string> = intrinsic
```

`intrinsic` 是固有的意思，类似 JavaScript 中有些方法打印会显示 `[native code]` 。其不是在 TypeScript 中实现的，而是编译过程中由 JavaScript 实现。
