---
title: 最后一个元素
date: 2022-03-28 16:53:00
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/12-medium-chainable-options/README.zh-CN.md)
### 问题
实现一个通用`Last<T>`，它接受一个数组`T`并返回其最后一个元素的类型。

例如

```ts
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type tail1 = Last<arr1> // expected to be 'c'
type tail2 = Last<arr2> // expected to be 1
```

### 解答

```typescript
type Last<T extends unknown[]> = T extends [...any, infer L ] ? L : never
```

### 拆分
1. `T extends unknown[]` 是一个类型断言，确保 `T` 是一个数组
2. 利用结构和 `infer` 来拿到最后一个值
3. 利用 `L` 来确认 `L` 是否是 `T` 的最后一个元素
