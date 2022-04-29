---
title: Construct Tuple
date: 2022-4-27 15:15:21
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/07544-medium-construct-tuple/README.md)

### 问题
构造一个指定长度的元组

```typescript
type case1 = ConstructTuple<0> //  []
type case2 = ConstructTuple<2> //  [unknown, unknown]
type case3 = ConstructTuple<999>['length'] // 999
  // @ts-expect-error
type case4 = ConstructTuple<1000>['length'] // 1000
```

### 解答

```typescript
type ConstructTuple<L extends number, C extends unknown[] = []> = C['length'] extends L ? C : ConstructTuple<L, [...C, unknown]>
```

### 拆分

1. 递归数组
