---
title: Camelize 
date: 2022-5-10 20:37:43
level: 3
levelTitle: Hard
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/01383-hard-camelize/README.md)

### 问题

实现一个 `Camelize` 的类型版本，用于递归转换蛇命名

```typescript
type case1 = Camelize<{
  some_prop: string
  prop: { another_prop: string }
  array: [{ snake_case: string }]
}>
// {
//   someProp: string
//   prop: { anotherProp: string }
//   array: [{ snakeCase: string }]
// }
```

### 解答

```typescript
type StringCamelize<T extends string> = T extends `${infer Head}_${infer Tail}` ? `${Head}${Capitalize<StringCamelize<Tail>>}` : T;
type ArrayCamelize<T extends unknown[]> = T extends [infer Head, ...infer Tail] ? [Camelize<Head>, ...ArrayCamelize<Tail>] : [];
type Camelize<T> = {
  [K in keyof T as StringCamelize<K & string>]: T[K] extends Record<string, unknown> ? Camelize<T[K]> : T[K] extends unknown[] ? ArrayCamelize<T[K]> : T[K]
}
```

### 拆分

* 首先，实现 `StringCamelize` 用于转换蛇形命名的字符串
* 其次，实现 `ArrayCamelize` 用于递归转换
* 需要判断数组和对象然后递归转换
