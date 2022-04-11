---
title: PickByType
date: 2022-4-11 15:43:09
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/2595-medium-pickbytype/README.md)

### 问题
从对象中挑选出指定类型的属性

```typescript
interface Model {
  name: string
  count: number
  isReadonly: boolean
  isEnable: boolean
}

type case1 = PickByType<Model, boolean> // { isReadonly: boolean; isEnable: boolean }
type case2 = PickByType<Model, string> // { name: string }
type case3 = PickByType<Model, number> // { count: number }
```

### 解答
```typescript
type PickByType<T, U> = {
  [ K in keyof T as T[K] extends U ? K : never ]: U
}
```

### 拆分
1. 可以把索引签名看成两个部分
  1. `K in keyof T`
  2. `T[K] extends U ? K : never`
2. `1.1` 是用来索引泛型 `T`
3. `as` 用来断言 `K` 是 `T[K]` 的索引签名
4. `1.2` 是用来确认 `T[K]` 是 `U` 的类型
5. 不是 `U` 类型的直接用 `never` 过滤掉
