---
title: Tuple Filter 
date: 2022-5-6 16:35:50
level: 3
levelTitle: Hard
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/00399-hard-tuple-filter/README.md)

### 问题

```typescript
type case1 = FilterOut<[], never> // []
type case2 = FilterOut<[never], never> // []
type case3 = FilterOut<['a', never], never> // ['a']
type case4 = FilterOut<[1, never, 'a'], never> // [1, 'a']
type case5 = FilterOut<[never, 1, 'a', undefined, false, null], never | null | undefined> // [1, 'a', false]
type case6 = FilterOut<[number | null | undefined, never], never | null | undefined> // [number | null | undefined]
```

### 解答

```typescript
type FilterOut<T extends any[], U> =
T extends [infer F, ...infer R]
? [F] extends [U]
  ? [...FilterOut<R, U>]
  : [F, ...FilterOut<R, U>]
: []
```

### 拆分
* 先拆分数组，然后用递归的方式拆分每一个元素
* 因为 `U` 可能是联合类型需要用 `[U]` 来分发每一个联合类型的元素
* 因为分发后是一个元组，所以对应的拆分的元素也要是一个元组才能对比
