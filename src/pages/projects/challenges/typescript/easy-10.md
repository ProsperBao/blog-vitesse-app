---
title: Includes
date: 2022-03-22 09:35:00
level: 1
levelTitle: Easy
---

[[toc]]

[问题来源(https://github.com/type-challenges/type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/898-easy-includes/README.zh-CN.md)
### 问题
在类型系统里实现 JavaScript 的 `Array.includes` 方法，这个类型接受两个参数，返回的类型要么是 `true` 要么是 `false`。

举例来说，

```ts
type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`
```

### 解答

```typescript
type Includes<T extends unknown[], U> = T extends [infer first, ...infer rest] ? U extends first ? true : Includes<rest, U> : false
```

### 拆分
1. `T extends unknown[]` 限制 `T` 只能是数组类型
2. 通过解构和 `infer` 结合，每次拿出数组的第一个元素，然后和 `U` 比较，如果相等，返回 `true`，否则递归调用进行判断