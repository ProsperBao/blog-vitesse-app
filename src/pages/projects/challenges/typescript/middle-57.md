---
title: Fill
date: 2022-4-22 16:56:16
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/04518-medium-fill/README.md)

### 问题

```typescript
type case1 = Fill<[], 0> //  []
type case2 = Fill<[], 0, 0, 3> //  []
type case3 = Fill<[1, 2, 3], 0, 0, 0> //  [1, 2, 3]
type case4 = Fill<[1, 2, 3], 0, 2, 2> //  [1, 2, 3]
type case5 = Fill<[1, 2, 3], 0> //  [0, 0, 0]
type case6 = Fill<[1, 2, 3], true> //  [true, true, true]
type case7 = Fill<[1, 2, 3], true, 0, 1> //  [true, 2, 3]
type case8 = Fill<[1, 2, 3], true, 1, 3> //  [1, true, true]
type case9 = Fill<[1, 2, 3], true, 10, 0> //  [1, 2, 3]
type case10 = Fill<[1, 2, 3], true, 0, 10> //  [true, true, true]
```

### 解答

```typescript
type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T['length'],
  Count extends number[] = []
  > = Count['length'] extends End
  ? T
  : T extends [infer F, ...infer R]
    ? Count['length'] extends Start
      ? [N, ...Fill<R, N, [...Count, 1]['length'] & number, End, [...Count, 1]>]
      : [F, ...Fill<R, N, Start, End, [...Count, 1]>]
    : []

```

### 拆分
1. 首先判断累计的长度是否等于结束的长度，如果是直接返回 `T`
2. 如果不等于，则拆分数组
3. 判断累计的长度是否等于开始的长度，如果是则替换为 `N`，然后解构递归调用
4. 开始位置需要累加，因为需要继续累加开始位置
5. 如果累计长度不等于开始长度则保持 `F` 然后解构递归调用
