---
title: LastIndexOf
date: 2022-4-25 17:45:51
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/05317-medium-lastindexof/README.md)

### 问题

实现 的类型版本 `Array.lastIndexOf`，`LastIndexOf<T, U>` 接受一个 Array `T`，返回 `U` 在 Array 中最后一个的索引，如果没有找到，返回 -1。

```typescript
type case1 = LastIndexOf<[1, 2, 3, 2, 1], 2> // 3
type case2 = LastIndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3> // 7
type case3 = LastIndexOf<[0, 0, 0], 2> // -1
```

### 解答

```typescript
type LastIndexOf<T extends any[], U> = 
T extends [...infer R, infer L]
? L extends U
  ? R['length']
  : LastIndexOf<R, U>
: -1
```

### 拆分
1. 拆分数组
2. 判断相等
