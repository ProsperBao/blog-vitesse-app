---
title: PartialByKeys
date: 2022-4-13 11:24:39
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/2757-medium-partialbykeys/README.md)

### 问题
实现一个通用的 `PartialByKeys<T，K>` 它接受两种类型的参数 `T` 和 `K`。

`K` 为 `T` 的属性，将该属性设置为可选，如果没有提供 `K` 则将 `T` 的所有属性设置为可选。

```typescript
type case1 = PartialByKeys<{ name: string, age: number, address: string }, 'name'> // { name?: string, age: number, address: string }
type case2 = PartialByKeys<{ name: string, age: number, address: string }, 'name' | 'unknown'> // { name?: string, age: number, address: string }
type case3 = PartialByKeys<{ name: string, age: number, address: string }, 'name' | 'age'> // { name?: string, age?: number, address: string }
type case4 = PartialByKeys<{ name: string, age: number, address: string }> // Partial<User>
```

### 解答
```typescript
type PartialByKeys<T, K = keyof T> = (
  { [I in Extract<keyof T, K>]?: T[I] } &
  { [I in Exclude<keyof T, K>]: T[I] }
) extends infer O ? { [I in keyof O]: O[I] } : never
```

### 拆分
1. `Extract` 的作用是提取出指定泛型里的属性。
2. `Exclude` 的作用是排除出指定泛型里的属性。
3. 整合 `Extract` 和 `Exclude` 的后的结果，可以得到 `O`。
