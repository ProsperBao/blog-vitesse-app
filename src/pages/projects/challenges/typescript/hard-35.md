---
title: ValidDate
date: 2022-5-31 17:31:17
level: 3
levelTitle: Hard
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/09155-hard-validdate/README.md)

### 问题

一个简单的日期校验

```typescript
type case1 = ValidDate<'0102'> // true 
type case2 = ValidDate<'0131'> // true 
type case3 = ValidDate<'1231'> // true 
type case4 = ValidDate<'0229'> // false 
type case5 = ValidDate<'0100'> // false 
type case6 = ValidDate<'0132'> // false 
type case7 = ValidDate<'1301'> // false 
```

### 解答

```typescript
type BasicNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type Month = `0${BasicNumber}` | `1${0 | 1 | 2}`;

type ValidDate<T extends string> = T extends (
  | `${Month}${`${1 | 0}${BasicNumber}` | `2${Exclude<BasicNumber, 9>}`}`
  | `${Exclude<Month, '02'>}${29 | 30}`
  | `${Exclude<Month, '02' | '04' | '06' | '09' | '11'>}31`
) ? true : false;

```

### 拆分
- 根据日历将所有日期集合成一个联合类型
- 再将判断传入的日期是否在新的联合类型里面

