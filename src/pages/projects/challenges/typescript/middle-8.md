---
title: 出堆
date: 2022-03-28 17:03:00
level: 2
levelTitle: Middle
---

[[toc]]

[问题来源(https://github.com/type-challenges/type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/16-medium-pop/README.zh-CN.md)
### 问题
实现一个通用`Last<T>`，它接受一个数组`T`并返回其最后一个元素的类型。

例如
实现一个通用`Pop<T>`，它接受一个数组`T`并返回一个没有最后一个元素的数组。

例如

```ts
type arr1 = ['a', 'b', 'c', 'd']
type arr2 = [3, 2, 1]

type re1 = Pop<arr1> // expected to be ['a', 'b', 'c']
type re2 = Pop<arr2> // expected to be [3, 2]
type re3 = Shift<arr1> // expected to be ['b', 'c', 'd']
type re4 = Shift<arr2> // expected to be [2, 1]
type re5 = Push<arr1, 'e'> // expected to be ['a', 'b', 'c', 'd', 'e']
type re6 = Push<arr2, 0> // expected to be [3, 2, 1, 0]
type re7 = Unshift<arr1, 'z'> // expected to be ['z', 'a', 'b', 'c', 'd'
type re8 = Unshift<arr2, 4> // expected to be [4, 3, 2, 1]
```

**额外**：同样，您也可以实现`Shift`，`Push`和`Unshift`吗？

### 解答

```typescript
type Pop<T extends unknown[]> = T extends [...infer rest, any] ? rest : never
type Shift<T extends unknown[]> = T extends [any, ...infer rest] ? rest : never
type Push<T extends unknown[], V> = [...T, V]
type Unshift<T extends unknown[], V> = [V, ...T]
```

### 拆分
1. 和 [最后一个元素](/projects/challenges/typescript/middle-7) 类似
