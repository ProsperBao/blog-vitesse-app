---
title: IsUnion
date: 2022-4-6 15:33:54
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/1097-medium-isunion/README.md)

### 问题
实现一个类型 `IsUnion`，它接受输入类型 `T` 并返回 `T` 是否解析为联合类型。
```typescript
  type case1 = IsUnion<string> // false
  type case1 = IsUnion<string|number> // true
  type case1 = IsUnion<'a'|'b'|'c'|'d'> // true
  type case1 = IsUnion<undefined|null|void|''> // true
  type case1 = IsUnion<{a: string}|{a: number}> // true
  type case1 = IsUnion<{a: string|number}> // false
  type case1 = IsUnion<[string|number]> // false
  // Cases where T resolves to a non-union type.
  type case1 = IsUnion<string|never> // false
  type case1 = IsUnion<string|unknown> // false
  type case1 = IsUnion<string|any> // false
  type case1 = IsUnion<string|'a'> // false
```

### 解答
```typescript
type IsUnion<T, U = T> = T extends U ? [U] extends [T] ? false: true : never
```

### 拆分
1. 利用联合类型会自动分配的特性将联合类型拆开然后再集合判断
2. `string|number`联合类型自动分配之后 `[string] extends [string]|[string] extends [string]|[number] extends [number]|[number] extends [string]`
3. 如果不是联合类型 `[string] extends[string]` 则永远都是 ` 则永远为 `true`
