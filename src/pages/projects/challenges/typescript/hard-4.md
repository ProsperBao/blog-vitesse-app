---
title: Get Optional
date: 2022-5-5 11:41:53
level: 3
levelTitle: Hard
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/00059-hard-get-optional/README.zh-CN.md)

### 问题

实现高级util类型`GetOptional<T>`，该类型保留所有可选字段

例如

```typescript
type case1 = GetOptional<{ foo: number; bar?: string }> // { bar?: string }
type case2 = GetOptional<{ foo: undefined; bar?: undefined }> // { bar?: undefined }
```

### 解答

```typescript
type GetOptional<T> = {
  [K in keyof T as T[K] extends Required<T>[K] ? never : K]: T[K]
}
```

### 拆分

1. 和 [Get Required](/projects/challenges/typescript/hard-3) 类似
