---
title: RequiredByKeys
date: 2022-4-13 15:32:11
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/2759-medium-requiredbykeys/README.md)

### 问题

实现一个通用的 `RequiredByKeys<T，K>`，它接受两个类型参数 `T` 和 `K`。

`K` 指定应设置为必需的 `T` 的属性集。如果未提供 `K`，则应使所有所需的属性为必须。

```typescript
type case1 = RequiredByKeys<User, 'name'> // { name?: string, age?: number, address?: string}
type case2 = RequiredByKeys<User, 'name' | 'unknown'> // { name: string, age?: number, address?: string}
type case3 = RequiredByKeys<User, 'name' | 'age'> // { name: string, age: number, address?: string}
type case4 = RequiredByKeys<User> // Required<{ name?: string, age?: number, address?: string}>
```

### 解答

```typescript
type RequiredByKeys<T , K = keyof T> = (
  { [I in Extract<keyof T, K>]: Exclude<T[I], undefined> } & 
  { [I in Exclude<keyof T, K>]?: T[I] }
) extends infer O ? { [I in keyof O]: O[I] } : never
```

### 拆分
1. `Extract` 的作用是提取出指定泛型里的属性, 并且用 `Exclude` 排除 `undefined` 类型。
2. `Exclude` 的作用是排除出指定泛型里的属性。
3. 整合 `Extract` 和 `Exclude` 的后的结果，可以得到 `O`。
