---
title: 丢弃字符
date: 2022-4-11 11:53:33
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/2070-medium-drop-char/README.md)

### 问题
从字符串中删除指定的字符。

举个🌰
```typescript
type case1 = DropChar<'butter fly!', ''> // 'butterfly!'
type case2 = DropChar<'butter fly!', ' '> // 'butterfly!'
type case3 = DropChar<'butter fly!', '!'> // 'butter fly'
type case4 = DropChar<'    butter fly!        ', ' '> // 'butterfly!'
type case5 = DropChar<' b u t t e r f l y ! ', ' '> // 'butterfly!'
type case6 = DropChar<' b u t t e r f l y ! ', 'b'> // '  u t t e r f l y ! '
type case7 = DropChar<' b u t t e r f l y ! ', 't'> // ' b u   e r f l y ! '
```

### 解答
```typescript
type DropChar<S extends string, C extends string = " "> = 
  S extends `${infer F}${infer Rest}`
  ? F extends C
    ? DropChar<Rest, C>
    : `${F}${DropChar<Rest, C>}`
  : S
```

### 拆分
1. 用 `infer` 拆分字符串
2. 判断是否和指定的字符相等
3. 如果不相等，则拼接到结果字符串中
4. 如果相等，则继续拆分，并过滤字符串
