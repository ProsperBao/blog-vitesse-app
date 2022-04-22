---
title: Zip
date: 2022-4-22 15:49:54
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/04471-medium-zip/README.md)

### 问题
在这个挑战中，应该实现一个类型 `Zip<T，U>`，`T` 和 `U` 必须是 `Tuple`

```typescript
type case1 = Zip<[], []> //  []
type case2 = Zip<[1, 2], [true, false]> //  [[1, true], [2, false]]
type case3 = Zip<[1, 2, 3], ['1', '2']> //  [[1, '1'], [2, '2']]
type case4 = Zip<[], [1, 2, 3]> //  []
type case5 = Zip<[[1, 2]], [3]> //  [[[1, 2], 3]]
```

### 解答

```typescript
type Zip<T extends any[], U extends any[]> = 
    T extends [infer TF,...infer TR]?
    U extends [infer UF,...infer UR]?
      [[TF,UF],...Zip<TR,UR>]
    :[]
  :[]
```

### 拆分
1. 逐个拆分数组然后递归调用

