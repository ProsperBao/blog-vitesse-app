---
title: Flatten
date: 2022-3-31 10:11:03
level: 2
levelTitle: Middle
---

[[toc]]

[问题来源(https://github.com/type-challenges/type-challenges)](https://github.com/FuBaooo/type-challenges/blob/master/questions/459-medium-flatten/README.zh-CN.md)

### 问题
在这个挑战中，您需要编写一个类型，该类型接受一个数组并发出扁平数组类型。

例如:
```typescript
type flatten = Flatten<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, 5]
```

### 解答
```typescript
type Flatten<T extends unknown[]> = 
  T extends [infer L, ...infer Rest]
    ? L extends unknown[]
      ? [...Flatten<L>, ...Flatten<Rest>]
      : [L, ...Flatten<Rest>]
    : T
```

### 拆分
1. 利用 `infer` 来拆分数组
2. 利用 `L extends unknown[]` 来判断第一个元素是否是数组
3. 如果第一个元素是数组就拍平，否则直接放入结果中
4. 利用 `...Flatten<Rest>` 来拆分剩余元素
5. 递归循环操作
