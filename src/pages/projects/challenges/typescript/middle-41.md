---
title: OmitByType
date: 2022-4-13 16:10:32
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/2852-medium-omitbytype/README.md)

### 问题
从 `T` 中，选择一组类型不可分配给 `U` 的属性。

```typescript
interface Model {
  name: string
  count: number
  isReadonly: boolean
  isEnable: boolean
}

type case1 = OmitByType<Model, boolean> // { name: string; count: number }
type case1 = OmitByType<Model, string> // { count: number; isReadonly: boolean; isEnable: boolean }
type case1 = OmitByType<Model, number> // { name: string; isReadonly: boolean; isEnable: boolean }
```

### 解答

```typescript
type OmitByType<T, U> = { [ K in keyof T as T[K] extends U ? never : K ]: T[K] }
```

### 拆分
1. 利用断言 `T[K] extends U` 来排除 `U` 类型

