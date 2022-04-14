---
title: FlattenDepth
date: 2022-4-14 10:48:16
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/3243-medium-flattendepth/README.md)

### 问题

递归拍平指定深度的数组

```typescript
type case1 = FlattenDepth<[]> // []
type case2 = FlattenDepth<[1, 2, 3, 4]> // [1, 2, 3, 4]
type case3 = FlattenDepth<[1, [2]]> // [1, 2]
type case4 = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2> // [1, 2, 3, 4, [5]]
type case5 = FlattenDepth<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, [[5]]]
type case6 = FlattenDepth<[1, [2, [3, [4, [5]]]]], 3> // [1, 2, 3, 4, [5]]
type case7 = FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817> // [1, 2, 3, 4, 5]
```

### 解答

```typescript
type FlattenDepth<T extends any[], C extends number = 1, U extends any[] = []> = 
T extends [infer F,...infer R]
? F extends any[]
  ? U['length'] extends C
    ? [F, ...FlattenDepth<R, C, U>]
    :[...FlattenDepth<F, C, [0,...U]>,...FlattenDepth<R, C, U>]
  :[F,...FlattenDepth<R, C, U>]
: T;

```

### 拆分
1. 首先利用 `T extends [infer F,...infer R]` 判断 `T` 是否为有内容的数组
2. 如果不是有内容的数组，则直接返回 `T`
3. 如果是有内容的数组，则利用 `F extends any[]` 判断第一个字元素 `F` 是否为数组
4. 如果一个不是数组，那么只需要处理后面的数组就行了
5. 如果第一个是数组，那么就需要看看累计的深度是否超过了指定的深度
6. 如果累计的深度等于指定的深度，无需再处理当前的数组，直跳过当前元素处理下一个元素
7. 如果没超过深度就要对两个数组进行处理拼接
8. 针对第一个元素是数组的情况下需要递归处理，所以需要累积深度，其余的元素不需要累积深度，直接处理
