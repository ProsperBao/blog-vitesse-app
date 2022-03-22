---
title: If
date: 2022-03-22 09:30:00
level: 1
levelTitle: Easy
---

[[toc]]

[问题来源(https://github.com/type-challenges/type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/268-easy-if/README.zh-CN.md)
### 问题
实现一个 `IF` 类型，它接收一个条件类型 `C` ，一个判断为真时的返回类型 `T` ，以及一个判断为假时的返回类型 `F`。 `C` 只能是 `true` 或者 `false`， `T` 和 `F` 可以是任意类型。

举例:

```ts
type A = If<true, 'a', 'b'>  // expected to be 'a'
type B = If<false, 'a', 'b'> // expected to be 'b'
```

### 解答

```typescript
type If<C extends boolean, T, F> = C extends true ? T : F
```

### 拆分
1. `C extends boolean` 限制 `C` 只能是 `true` 或者 `false`
2. `C extends true` 判断 `C` 是 `true`
3. 根据结果返回传入值