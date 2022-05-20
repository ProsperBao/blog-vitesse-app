---
title: Split 
date: 2022-5-20 19:03:47
level: 3
levelTitle: Hard
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/02822-hard-split/README.md)

### 问题

```typescript
type case1 = Split<'Hi! How are you?', 'z'> // ['Hi! How are you?']
type case2 = Split<'Hi! How are you?', ' '> // ['Hi!', 'How', 'are', 'you?']
type case3 = Split<'Hi! How are you?', ''> // ['H', 'i', '!', ' ', 'H', 'o', 'w', ' ', 'a', 'r', 'e', ' ', 'y', 'o', 'u', '?']
type case4 = Split<'', ''> // []
type case5 = Split<'', 'z'> // ['']
type case6 = Split<string, 'whatever'> // string[]
```

### 解答

```typescript
type Split<S extends string, SEP extends string> =
string extends S
? string[]
: S extends `${infer A}${SEP}${infer B}`
  ? [A, ...Split<B, SEP>]
  : S extends ''
    ? SEP extends '' ? [] : [S]
    : [S]
```

### 拆分
1. `string extends S` `S extends ''` `SEP extends ''` 是为了通过测试用例没必要算上去
2. 正常核心代码就 `S extends `${infer A}${SEP}${infer B}``

