---
title: Get Required
date: 2022-5-2 23:29:56
level: 3
levelTitle: Hard
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/00057-hard-get-required/README.zh-CN.md)

### 问题

实现高级 util 类型 `GetRequired<T>`，该类型保留所有必填字段

例如

```typescript
type case1 = GetRequired<{ foo: number; bar?: string }> // { foo: number }
type case2 = GetRequired<{ foo: undefined; bar?: undefined }> // { foo: undefined }
```

### 解答

```typescript
type GetRequired<T> = {
  [K in keyof T as T[K] extends Required<T>[K]? K: never]: T[K]
}
```

### 拆分
1. 首先筛选出 `K` 不为可选参数的属性名
2. 拿出所有的属性名 `K` 和属性值 `T[K]`
3. 使用 `Require<T>` 把 `T` 所有属性转换为必选参数
4. 比较 `T[K]` 和 `Required<T>` 的属性值，如果相同则是需要的属性名，反之则不需要

