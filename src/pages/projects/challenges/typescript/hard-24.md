---
title: Drop String
date: 2022-5-20 16:35:40
level: 3
levelTitle: Hard
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/02059-hard-drop-string/README.md)

### 问题
剔除在指定字符串里的字符

```typescript
type case1 = DropString<'butter fly!', ''> // 'butter fly!'
type case2 = DropString<'butter fly!', ' '> // 'butterfly!'
type case3 = DropString<'butter fly!', 'but'> // 'er fly!'
type case4 = DropString<' b u t t e r f l y ! ', 'but'> // '     e r f l y ! '
type case5 = DropString<'    butter fly!        ', ' '> // 'butterfly!'
type case6 = DropString<' b u t t e r f l y ! ', ' '> // 'butterfly!'
type case7 = DropString<' b u t t e r f l y ! ', 'but'> // '     e r f l y ! '
type case8 = DropString<' b u t t e r f l y ! ', 'tub'> // '     e r f l y ! '
type case9 = DropString<' b u t t e r f l y ! ', 'b'> // '  u t t e r f l y ! '
type case10 = DropString<' b u t t e r f l y ! ', 't'> // ' b u   e r f l y ! '
```

### 解答

```typescript
type IncludeString<T extends string, K extends string> = T extends `${infer F}${infer Rest}` ? F extends K ? true: IncludeString<Rest, K> : false;
type DropString<S extends string, R extends string> =
  R extends ''
  ? S
  : S extends `${infer H}${infer Rest}`
    ? IncludeString<R, H> extends true
      ? DropString<Rest, R>
      : `${H}${DropString<Rest, R>}`
    : S
```

### 拆分
1. 只要看拆分后的字符在不在特定的字符串里就行了
