---
title: String Join
date: 2022-5-7 11:53:52
level: 3
levelTitle: Hard
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/00847-hard-string-join/README.md)

### 问题

实现一个拼接函数的定义。

```typescript
// Edge cases
const noCharsOutput = join('-')()
const oneCharOutput = join('-')('a')
const noDelimiterOutput = join('')('a', 'b', 'c')

// Regular cases
const hyphenOutput = join('-')('a', 'b', 'c')
const hashOutput = join('#')('a', 'b', 'c')
const twoCharOutput = join('-')('a', 'b')
const longOutput = join('-')('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h')

type case1 = typeof noCharsOutput // ''
type case2 = typeof oneCharOutput // 'a'
type case3 = typeof noDelimiterOutput // 'abc'
type case4 = typeof twoCharOutput // 'a-b'
type case5 = typeof hyphenOutput // 'a-b-c'
type case6 = typeof hashOutput // 'a#b#c'
type case7 = typeof longOutput // 'a-b-c-d-e-f-g-h'
```

### 解答

```typescript
type Join<T, U extends string | number> =
  T extends [infer F, ...infer R]
  ? R extends []
    ? F
    : F extends string | number
      ? `${F}${U}${Join<R, U>}`
      : ''
  : ''

declare function join<D extends string>(delimiter: D): <T extends string[]>(...parts: T) => Join<T, D>

```

### 拆分
* 每个函数的开头加上泛型，不能跨函数声明泛型

