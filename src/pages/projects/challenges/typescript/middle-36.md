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
type StartsWith<T extends string, U extends string> = 
  T extends `${infer TS}${infer TRest}`
  ? U extends `${infer US}${infer URest}`
    ? TS extends US
      ? StartsWith<TRest, URest>
      : false
    : true
  : false
```

### 拆分
1. 用 `infer` 拆分两个字符串的首字符判断是否相等
2. 如果 `U` 为 `''` 则直接返回 `true`
3. 如果 `U` 不为 `''` 则继续判断 `TS` 是否为 `US`
4. 如果 `TS` 为 `US` 则继续判断下一个字符
5. 如果 `TS` 不为 `US` 则返回 `false`
