---
title: IsPalindrome 
date: 2022-5-30 14:34:25
level: 3
levelTitle: Hard
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/04037-hard-ispalindrome/README.md)

### 问题

```typescript
type case1 = IsPalindrome<'abc'> // false
type case2 = IsPalindrome<'b'> // true
type case3 = IsPalindrome<'abca'> // false
type case4 = IsPalindrome<121> // true
type case5 = IsPalindrome<19260817> // false
```

### 解答

```typescript
type Count<T extends string> = T extends `${infer Head}${infer Tail}` ? [Head, ...Count<Tail>] : []
type IsPalindrome1<T extends string | number> = 
Count<`${T}`>['length'] extends 1
? true
: `${T}` extends `${infer Head}${infer C}${infer Tail}`
  ? Head extends Tail
    ? IsPalindrome<C>
    : false
  : false

type Reverse<T extends string> = T extends `${infer Head}${infer Tail}` ? `${Reverse<Tail>}${Head}` : T;

type IsPalindrome<T extends string | number> = `${T}` extends Reverse<`${T}`> ? true : false
```

### 拆分

1. 数字拆分
  - 拿出头尾字符进行比较
  - 如果相等就拿剩下的字符递归比较
  - 直到剩余长度为 1 返回结果
2. 倒转对比
  - 把字符字符串反转
  - 对比反转后的字符串
