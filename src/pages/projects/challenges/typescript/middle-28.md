---
title: IsNever
date: 2022-4-6 15:18:03
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/1042-medium-isnever/README.md)

### 问题
实现一个类型 `IsNever`，它接受输入类型 `T`。如果类型解析为 `never`，则返回 `true`，否则返回 `false`。

```typescript
type A = IsNever<never>  // expected to be true
type B = IsNever<undefined> // expected to be false
type C = IsNever<null> // expected to be false
type D = IsNever<[]> // expected to be false
type E = IsNever<number> // expected to be false
```

### 解答
```typescript
type IsNever<T> = [T] extends [never] ? true : false
```

### 拆分
1. 用到了之前的一个小技巧 [Permutation](/projects/challenges/typescript/middle-17)
2. 如果直接用 `never extends never` 判断，则永远都是 `false`
3. 所以需要用数组包裹看成元组类型，然后再用 `[T] extends [never]`判断
