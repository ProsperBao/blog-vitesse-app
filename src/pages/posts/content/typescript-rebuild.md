---
title: Typescript 重构
date: 2022-6-06 19:00:28
lang: zh-CN
duration: 8min
description: Typescript 重构
tags: other
type: learn
---

[[toc]]

# 重新构造

TypeScript 支持 type 、infer 、类型参数来保存任意类型，但它们是不可变的。想要变化就需要重新构造新的类型，并且可以在构造新类型的过程中对原类型做一些过滤和变换。

对于索引类型，这种操作叫做映射类型，对索引做修改的 `as` 叫做重映射。

## 数组类型

### Push

```ts
type Push<Arr extends unknown[], X> = [...Arr, X]

type Res = Push<[1, 2, 3], 4> // [1, 2, 3, 4]
```

### Unshift

```ts
type Unshift<Arr extends unknown[], X> = [X, ...Arr]

type Res = Unshift<[1, 2, 3], 4> // [4, 1, 2, 3]
```

### Zip

```ts
type Zip<A extends unknown[], B extends unknown[]> = A extends [
  infer AF,
  ...infer AR,
]
  ? B extends [infer BF, ...infer BR]
    ? [[AF, BF], ...Zip<AR, BR>]
    : []
  : []

// 尾递归
type Zip1<
  A extends unknown[],
  B extends unknown[],
  R extends unknown[][] = [],
> = A extends [infer AF, ...infer AR]
  ? B extends [infer BF, ...infer BR]
    ? Zip1<AR, BR, [...R, [AF, BF]]>
    : R
  : R

type Res = Zip<[1, 2], [3, 4]> // [[1, 3], [2, 4]]
type Res1 = Zip1<[1, 2], [3, 4]> // [[1, 3], [2, 4]]
```

## 字符串类型

### CapitalizeStr

```ts
type CapitalizeStr<S extends string> = S extends `${infer F}${infer R}`
  ? `${Uppercase<F>}${R}`
  : S

type Res = CapitalizeStr<"typeScript"> // TypeScript
```

TypeScript 内置了 `Capitalize` 实现上述功能

### CamelCase

```ts
type CamelCase<S extends string> = S extends `${infer F}-${infer R}`
  ? `${F}${Capitalize<CamelCase<R>>}`
  : S

type CamelCase1<S extends string> =
  S extends `${infer F}-${infer R}${infer Rest}`
    ? `${F}${Uppercase<R>}${CamelCase<Rest>}`
    : S

// 尾递归
type CamelCase2<
  S extends string,
  Res extends string = "",
> = S extends `${infer F}-${infer R}${infer Rest}`
  ? CamelCase2<Rest, `${Res}${F}${Uppercase<R>}`>
  : Res

type Res = CamelCase<"aa-bb-cc"> // aaBbCc
type Res1 = CamelCase1<"aa-bb-cc"> // aaBbCc
type Res2 = CamelCase1<"aa-bb-cc"> // aaBbCc
```

### DropSubStr

```ts
type DropSubStr<
  S extends string,
  SubStr extends string,
> = S extends `${infer F}${SubStr}${infer R}`
  ? `${F}${DropSubStr<R, SubStr>}`
  : S

// 尾递归
type DropSubStr1<
  S extends string,
  SubStr extends string,
  Res extends string = "",
> = S extends `${infer F}${SubStr}${infer R}`
  ? DropSubStr1<R, SubStr, `${Res}${F}`>
  : Res

// 尾递归
type DropSubStr2<
  S extends string,
  SubStr extends string,
> = S extends `${infer F}${SubStr}${infer R}`
  ? DropSubStr2<`${F}${R}`, SubStr>
  : S

type Res = DropSubStr<"hello~~~", "~"> // hello
type Res1 = DropSubStr1<"hello~~~", "~"> // hello
type Res2 = DropSubStr2<"hello~~~", "~"> // hello
```

## 函数类型

### AppendArgument

```ts
type AppendArgument<F extends (...args: any) => any, Arg> = F extends (
  ...args: infer Args
) => infer R
  ? (...args: [...Args, Arg]) => R
  : never

type Res = AppendArgument<(a: string) => boolean, number> // (args_0: string, args_1: number) => boolean
```

## 索引类型

索引类型是聚合多个元素的类型，class、对象等都是索引类型。

索引类型可以添加修饰符 readonly ( 只读 ) 、? ( 可选 ) 。

例如：

```ts
type Person = {
  name: string
  readonly age: number
  gender?: string
}
```

### Mapping

```ts
type Mapping<O extends Record<string, unknown>> = {
  [P in keyof O]: [O[P], O[P]]
}

type Res = Mapping<{ a: 1 }> // { a: [1, 1] }
```

### UppercaseKey

使用 as 对对象类型的 key 进行修改，叫做重映射。

```ts
type UppercaseKey<O extends Record<string, unknown>> = {
  [P in keyof O as Uppercase<P & string>]: O[P]
}

type Res = UppercaseKey<{ a: 1 }> // { A: 1 }
```

### MyRecord

```ts
type MyRecord<K extends string | number | symbol, V> = { [P in K]: V }
```

TypeScript 内置了 `Record` 完成上述功能。

### ToReadonly

```ts
type ToReadonly<T> = {
  readonly [P in keyof T]: T[P]
}

type Res = ToReadonly<{ a: 1 }> // { readonly a: 1 }
```

TypeScript 内置了 `Readonly` 完成上述功能。

### ToPartial

```ts
type ToPartial<T> = {
  [P in keyof T]?: T[P]
}

type Res = ToPartial<{ a: 1 }> // { a?: 1 | undefined }
```

TypeScript 内置了 `Partial` 完成上述功能。

### ToMutable

```ts
type ToMutable<T> = {
  -readonly [Key in keyof T]: T[Key]
}

type Res = ToMutable<{ readonly a: 1 }> // { a: 1 }
```

### ToRequired

```ts
type ToRequired<T> = {
  [Key in keyof T]-?: T[Key]
}

type Res = ToRequired<{ a?: 1 }> // { a: 1 }
```

TypeScript 内置了 `Required` 完成上述功能。

### FilterByValueType

```ts
type FilterByValueType<Obj extends Record<string, any>, ValueType> = {
  [Key in keyof Obj as ValueType extends Obj[Key] ? Key : never]: Obj[Key]
}

type Res = FilterByValueType<{ a: string; b: number }, string> // { a: string }
```
