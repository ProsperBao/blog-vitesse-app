---
title: Reverse
date: 2022-4-13 17:31:33
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/3192-medium-reverse/README.md)

### 问题

```typescript
type case1 = Reverse<['a', 'b']> // ['b', 'a']
type case2 = Reverse<['a', 'b', 'c']> // ['c', 'b', 'a']
```

### 解答

```typescript
type Reverse<T> = T extends [...infer Rest, infer L]  ? [L, ...Reverse<Rest>] : T
```

### 拆分
1. 利用 `infer` 拆分数组
