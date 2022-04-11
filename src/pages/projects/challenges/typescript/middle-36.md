---
title: StartsWith
date: 2022-4-11 16:11:50
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/2688-medium-startswith/README.md)

### 问题
实现 `StartsWith<T, U>` 它接受两种精确的字符串类型，并返回 `T` 是否以 `U` 开头

```typescript
type case1 = StartsWith<'abc', 'ac'> // false
type case2 = StartsWith<'abc', 'ab'> // true
type case3 = StartsWith<'abc', 'abcd'> // false
type case4 = StartsWith<'', 'abcd'> // false
type case5 = StartsWith<'abc', 'a'> // true
type case6 = StartsWith<'abc', ''> // true
```

### 解答
```typescript
type StartsWith<T extends string, U extends string> = T extends `${U}${infer _R}` ? true : false
```

### 拆分
1. 直接用 `ts` 字符串分配特性解决
