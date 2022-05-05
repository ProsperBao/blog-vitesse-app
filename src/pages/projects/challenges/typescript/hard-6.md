---
title: Optional Keys 
date: 2022-5-5 11:51:25
level: 3
levelTitle: Hard
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/00090-hard-optional-keys/README.zh-CN.md)

### 问题

实现高级util类型`OptionalKeys<T>`，该类型将所有可选键合并为一个并集。

例如: 

```typescript
type case1 = OptionalKeys<{ a: number; b?: string }> // 'b'
type case2 = OptionalKeys<{ a: undefined; b?: undefined }> // 'b'
type case3 = OptionalKeys<{ a: undefined; b?: undefined; c?: string; d?: null }> // 'b' | 'c' | 'd'
type case4 = OptionalKeys<{}> // never
```

### 解答

```typescript
type OptionalKeys<T> = keyof {
  [K in keyof T as T[K] extends Required<T>[K] ? never : K]: T[K]
}
```

### 拆分
1. 和 [Get Optional](/projects/challenges/typescript/hard-4) [Required Keys](/projects/challenges/typescript/hard-5) 类似
