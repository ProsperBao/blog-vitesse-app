---
title: printf
date: 2022-5-6 17:42:13
level: 3
levelTitle: Hard
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/00545-hard-printf/README.md)

### 问题

```typescript
type case1 = Format<'abc'> // string
type case2 = Format<'a%sbc'> // (s1: string) => string
type case3 = Format<'a%dbc'> // (d1: number) => string
type case4 = Format<'a%dbc%s'> // (d1: number) => (s1: string) => string
```

### 解答

```typescript
type ControlsMap = {
  d: number
  s: string
}

type Format<T extends string> = 
T extends `${infer _}%${infer C}${infer R}`
? C extends keyof ControlsMap
  ? (any: ControlsMap[C]) => Format<R>
  : never
: string
```

### 拆分
* 利用字符串模板的特性，将字符串拆分成两个部分：`C` 和 `R`。
* 利用 `C extends keyof ControlsMap` 的特性，判断 `C` 是否是 `ControlsMap` 的属性。
* 如果是，则返回一个函数，该函数接收一个 `ControlsMap[C]` 类型的参数，并返回一个 `Format<R>` 类型的值。
* 如果不是，则返回一个字符串类型。

