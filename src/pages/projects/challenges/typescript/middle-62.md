---
title: Join 
date: 2022-4-25 17:21:13
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/05310-medium-join/README.md)

### 问题

```typescript
type case1 = Join<['a', 'p', 'p', 'l', 'e'], '-'> //  'a-p-p-l-e'
type case2 = Join<['Hello', 'World'], ' '> //  'Hello World'
type case3 = Join<['2', '2', '2'], 1> //  '21212'
type case4 = Join<['o'], 'u'> //  'o'
```

### 解答

```typescript
type Join<T, U extends string | number> =
  T extends [infer F, ...infer R]
  ? R extends []
    ? F
    : F extends string | number
      ? `${F}${U}${Join<R, U>}`
      : ''
  : ''
```

### 拆分
1. 拆分数组
2. 递归拼接
