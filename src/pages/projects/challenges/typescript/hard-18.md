---
title: Length of String 2
date: 2022-5-7 10:57:42
level: 3
levelTitle: Hard
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/00651-hard-length-of-string-2/README.md)

### 问题

```typescript
type case1 = LengthOfString<''> // 0
type case2 = LengthOfString<'1'> // 1
type case3 = LengthOfString<'12'> // 2
type case4 = LengthOfString<'123'> // 3
type case5 = LengthOfString<'1234'> // 4
type case6 = LengthOfString<'12345'> // 5
type case7 = LengthOfString<'123456'> // 6
type case8 = LengthOfString<'1234567'> // 7
type case9 = LengthOfString<'12345678'> // 8
type case10 = LengthOfString<'123456789'> // 9
```

### 解答

```typescript
type LengthOfString<S extends string, Res extends unknown[] = []> =
  S extends `${infer _}${infer Tail}`
  ? LengthOfString<Tail, [...Res, unknown]>
  : Res['length']
```

### 拆分

* 拆分字后用数组统计长度
* 然后不能拆分返回长度
