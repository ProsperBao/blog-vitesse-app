---
title: Required Keys
date: 2022-5-5 11:46:44
level: 3
levelTitle: Hard
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/00089-hard-required-keys/README.zh-CN.md)

### 问题

实现高级util类型`RequiredKeys<T>`，该类型将所有必需的键都选择为一个并集。

例如

```typescript
type case1 = RequiredKeys<{ a: number; b?: string }> // 'a'
type case2 = RequiredKeys<{ a: undefined; b?: undefined }> // 'a'
type case3 = RequiredKeys<{ a: undefined; b?: undefined; c: string; d: null }> // 'a' | 'c' | 'd'
type case4 = RequiredKeys<{}> // never
```

### 解答

```typescript
type RequiredKeys<T> = keyof {
  [K in keyof T as T[K] extends Required<T>[K] ? K : never]: T[K]
}
```

### 拆分

1. 和 [Get Required](/projects/challenges/typescript/hard-3) 类似
2. 只需要对结果对象多加一个 `keyof` 获取
