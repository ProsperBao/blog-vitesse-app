---
title: String to Number
date: 2022-5-6 13:34:41
level: 3
levelTitle: Hard
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/00300-hard-string-to-number/README.md)

### 问题

```typescript
type case1 = ToNumber<'0'> // 0
type case2 = ToNumber<'5'> // 5
type case3 = ToNumber<'12'> // 12
type case4 = ToNumber<'27'> // 27
```

### 解答

```typescript
type ToNumber<S extends string, A extends number[] = []> = `${A['length']}` extends S ? A['length'] : ToNumber<S, [...A, 1]>
```

### 拆分
* 利用数组来计算数字
* 利用数组长度转换字符串来判断是否达到目标

