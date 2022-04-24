---
title: IndexOf 
date: 2022-4-24 11:35:46
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/05153-medium-indexof/README.md)

### 问题

实现一个类型的 `Array.indexOf`，`indexOf<T, U>` 接收一个数组和一个值，返回数组中第一个值与给定值相等的元素的索引，如果没有找到则返回 -1

```typescript
type case1 = IndexOf<[1, 2, 3], 2> //  1
type case2 = IndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3> //  2
type case3 = IndexOf<[0, 0, 0], 2> //  -1
```

### 解答

```typescript
type IndexOf<T extends unknown[], U, Count extends unknown[] = []> = 
  T extends [infer F, ...infer R] 
  ? F extends U 
    ? Count['length']
    : IndexOf<R, U, [...Count, 1]> 
  :-1
```

### 拆分

1. 拆分数组
2. 判断相等
3. 递归判断
4. 返回结果
