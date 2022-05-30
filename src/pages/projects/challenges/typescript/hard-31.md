---
title: Intersection
date: 2022-5-30 16:05:44
level: 3
levelTitle: Hard
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/05423-hard-intersection/README.md)

### 问题
实现 `Lodash.intersection` 的类型版本，但有一点不同，`Intersection` 接受一个包含多个数组或包含联合类型的任何类型元素的 `T[]`，返回一个包含所有传入数组交集元素的新数组。

```typescript
type case1 = Intersection<[[1, 2], [2, 3], [2, 2]]>; // expected to be 2
type case2 = Intersection<[[1, 2, 3], [2, 3, 4], [2, 2, 3]]>; // expected to be 2 | 3
type case3 = Intersection<[[1, 2], [3, 4], [5, 6]]>; // expected to be never
type case4 = Intersection<[[1, 2, 3], [2, 3, 4], 3]>; // expected to be 3
type case5 = Intersection<[[1, 2, 3], 2 | 3 | 4, 2 | 3]>; // expected to be 2 | 3
type case6 = Intersection<[[1, 2, 3], 2, 3]>; // expected to be never
```

### 解答

```typescript
type Intersection<T> = T extends [infer Head, ...infer Tail]
  ? (Head extends unknown[] ? Head[number] : Head) & Intersection<Tail>
  : unknown
```

### 拆分

- 联合类型的合并的结果是联合类型的交集
- `(1 | 2 | 3) & (2 | 3)` 的结果是 `(2 | 3)`
- 接下来就是看看参数是否是数组如果是数组则形成一个新的联合类型
