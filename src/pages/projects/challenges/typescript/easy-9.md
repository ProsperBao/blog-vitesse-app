---
title: Concat
date: 2022-03-22 09:32:00
level: 1
levelTitle: Easy
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/533-easy-concat/README.zh-CN.md)
### 问题
在类型系统里实现 JavaScript 内置的 `Array.concat` 方法，这个类型接受两个参数，返回的新数组类型应该按照输入参数从左到右的顺序合并为一个新的数组。

举例，

```ts
type Result = Concat<[1], [2]> // expected to be [1, 2]
```

### 解答

```typescript
type Concat<T extends unknown[], U extends unknown[]> = [...T, ...U]
```

### 拆分
1. `T extends unknown[], U extends unknown[]` 限制 `T` 和 `U` 都只能是数组类型
2. 通过解构形成新的数组类型
3. `unknown` 可以替换为 `any` 但是 `unknown` 的目的是未知类型，所用 `unknown` 取代 `any` 较为稳妥
