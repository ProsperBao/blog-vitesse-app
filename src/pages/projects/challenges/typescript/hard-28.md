---
title: ObjectFromEntries 
date: 2022-5-30 13:58:56
level: 3
levelTitle: Hard
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/02949-hard-objectfromentries/README.md)

### 问题

实现一个类型版本的 `Object.fromEntries`

```typescript
interface Model {
  name: string
  age: number
  locations: string[] | null
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]

type case1 = ObjectFromEntries<ModelEntries> // Model
```

### 解答

```typescript
type ObjectFromEntries<T extends [string, unknown]> = { [K in T as K[0]]: K[1] }
```

### 拆分
1. 传入的的是一个元组的联合类型
2. 根据 `Object.fromEntries` 传入的值，可以确定元组的联合类型的元组第一个类型一定是 `string` 
3. 索引签名类是将联合类型拆开来
4. 这时候索引签名的 `K` 就是联合类型中的一项元组，可以直接用下标去获取
