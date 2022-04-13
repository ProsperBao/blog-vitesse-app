---
title: Tuple to Nested Object
date: 2022-4-13 17:11:12
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/3188-medium-tuple-to-nested-object/README.md)

### 问题
给定一个只包含字符串类型的元组类型 `T` 和一个类型 `U`，递归地构建一个对象。


```typescript
type TupleToNestedObject<T, U> = T extends [infer F, ...infer Rest]
  ? { [K in F & string]: TupleToNestedObject<Rest, U> }
  : T extends [infer F]
    ? { [K in F & string]: U }
    : U
```

### 解答

```typescript
type case1 = TupleToNestedObject<['a'], string> // { a: string }
type case1 = TupleToNestedObject<['a', 'b'], number> // { a: { b: number } }
type case1 = TupleToNestedObject<['a', 'b', 'c'], boolean> // { a: { b: { c: boolean } } }
type case1 = TupleToNestedObject<[], boolean> // boolean
```

### 拆分

1. 使用 `infer` 拆分元组类型
2. 根据是否可以拆分元组，划分结果，如果还存在可以递归的情况则递归创建
3. 如果不能拆分则返回属性和对象
4. 如果为空则直接返回类型
