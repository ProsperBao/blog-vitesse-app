---
title: Query String Parser
date: 2022-6-1 10:56:51
level: 4
levelTitle: Extreme
---

[[toc]]

[题目来源(type-challenges)](https://github.com/FuBaooo/type-challenges/blob/master/questions/151-extreme-query-string-parser/README.md)

### 问题

实现解析 URL 中的 query 参数

```typescript
type case1 = ParseQueryString<''> // {}
type case2 = ParseQueryString<'k1'> // { k1: true }
type case3 = ParseQueryString<'k1&k1'> // { k1: true }
type case4 = ParseQueryString<'k1&k2'> // { k1: true; k2: true }
type case5 = ParseQueryString<'k1=v1'> // { k1: 'v1' }
type case6 = ParseQueryString<'k1=v1&k1=v2'> // { k1: ['v1', 'v2'] }
type case7 = ParseQueryString<'k1=v1&k2=v2'> // { k1: 'v1'; k2: 'v2' }
type case8 = ParseQueryString<'k1=v1&k2=v2&k1=v2'> // { k1: ['v1', 'v2']; k2: 'v2' }
type case9 = ParseQueryString<'k1=v1&k2'> // { k1: 'v1'; k2: true }
type case10 = ParseQueryString<'k1=v1&k1=v1'> // { k1: 'v1' }
```

### 解答

```typescript
type Merge<A extends object, B extends object> = {
  [K in keyof A | keyof B]: K extends keyof A 
    ? K extends keyof B 
      ? A[K] extends B[K] 
        ? A[K] 
        : [A[K], B[K]]
      : A[K] 
    : K extends keyof B 
      ? B[K]
      : never
};
type KeyValue<T extends string> = T extends `${infer Key}=${infer Value}` ? { [K in Key]: Value } : { [K in T]: true }

type ParseQueryString<T extends string, R extends object = {}> =
  T extends `${infer Key}&${infer Tail}`
  ? ParseQueryString<Tail, Merge<R, KeyValue<Key>>>
  : T extends ''
    ? R
    : Merge<R, KeyValue<T>>
```

### 拆分
- 首先按不同的参数递归拆分
- 拆分不了按照一个单独的参数先判断是否为空如果为空则把结果返回
- 如果不为空则单独拆分合并
