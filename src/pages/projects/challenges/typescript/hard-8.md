---
title: CamelCase
date: 2022-5-5 14:50:43
level: 3
levelTitle: Hard
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/00114-hard-camelcase/README.md)

### 问题

```typescript
type case1 = CamelCase<'foobar'> // 'foobar'
type case2 = CamelCase<'FOOBAR'> // 'foobar'
type case3 = CamelCase<'foo_bar'> // 'fooBar'
type case4 = CamelCase<'foo_bar_hello_world'> // 'fooBarHelloWorld'
type case5 = CamelCase<'HELLO_WORLD_WITH_TYPES'> // 'helloWorldWithTypes'
type case6 = CamelCase<'-'> // '-'
type case7 = CamelCase<''> // ''
type case8 = CamelCase<'😎'> // '😎'
```

### 解答

```typescript
type CamelCase<S extends string> = 
S extends `${infer F}${infer R}`
? F extends '_'
  ? Capitalize<CamelCase<R>>
  : `${Lowercase<F>}${CamelCase<R>}`
: S
```

### 拆分

1. 首先拆分字符串分为第一个字符 `F` 和剩下所有的字符 `R`, 拆分不了则直接返回原字符串
2. 判断 `F` 是否为 `_` 如果是则递归处理字符串，然后把处理好的字符串首字母变成大写
3. 如果不是 `_` 则把 `F` 变成小写，然后递归处理字符串
