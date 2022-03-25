---
title: 元组转合集 
date: 2022-03-24 10:25:00
level: 2
levelTitle: Middle
---

[[toc]]

[问题来源(https://github.com/type-challenges/type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/10-medium-tuple-to-union/README.zh-CN.md)
### 问题
实现泛型`TupleToUnion<T>`，它返回元组所有值的合集。

例如

```ts
type Arr = ['1', '2', '3']

type Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'
```

### 解答

```typescript
type TupleToUnion<T extends any[]> = T[number]
```

### 拆分
1. 根据题意限制 `T` 的类型为数组
2. `T[number]` 是签名索引，可通过属性或者属性类型推断出数据类型
[Indexed Access Types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)