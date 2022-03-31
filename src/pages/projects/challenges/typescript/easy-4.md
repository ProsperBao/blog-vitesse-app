---
title: 第一个元素
date: 2022-03-19 11:08:00
level: 1
levelTitle: Easy
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/14-easy-first/README.zh-CN.md)
### 问题
实现一个通用`First<T>`，它接受一个数组`T`并返回它的第一个元素的类型。

例如：

```ts
type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type head1 = First<arr1> // expected to be 'a'
type head2 = First<arr2> // expected to be 3
```

### 解答

```typescript
type First<T extends any[]> = T extends [infer F, ...any] ? F : never
```

### 拆分
1. `T extends any[]` 限制了 `T` 必须是数组
2. `T extends []` 限制之后使用 `infer F` 待推断的范围，使用 `infer F` 来给第一个元素占位
3. 可能第一个元素 `F` 不存在，所以需要使用 `never` 来指定类型

