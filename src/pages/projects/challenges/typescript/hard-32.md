---
title: Binary to Decimal
date: 2022-5-30 17:00:41
level: 3
levelTitle: Hard
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/06141-hard-binary-to-decimal/README.md)

### 问题

把字符串二进制转换为数字

```typescript
type case1 = BinaryToDecimal<'10'> // 2
type case2 = BinaryToDecimal<'0011'> // 3
type case3 = BinaryToDecimal<'00000000'> // 0
type case4 = BinaryToDecimal<'11111111'> // 255
type case5 = BinaryToDecimal<'10101010'> // 170
```

### 解答

```typescript
type BinaryToDecimal<S extends string, R extends unknown[] = []> = S extends `${infer F}${infer L}`
  ? F extends '0'
    ? BinaryToDecimal<L, [...R, ...R]>
    : BinaryToDecimal<L, [...R, ...R, 1]>
  : R['length']

```

### 拆分
- 从左往右左边的数字是右边的两倍如果余数是1则+1
