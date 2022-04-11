---
title: EndsWith
date: 2022-4-11 16:41:32
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/2693-medium-endswith/README.md)

### 问题
实现 `StartsWith<T, U>` 它接受两种精确的字符串类型，并返回 `T` 是否以 `U` 结尾

```typescript
type case1 = EndsWith<'abc', 'bc'> // true
type case2 = EndsWith<'abc', 'abc'> // true
type case3 = EndsWith<'abc', 'd'> // false
```

### 解答
```typescript
type EndsWith<T extends string, U extends string> = T extends `${infer _F}${U}` ? true : false
```

### 拆分
1. 直接用 `ts` 字符串分配特性解决
