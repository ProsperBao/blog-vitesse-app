---
title: Permutation
date: 2022-3-29 16:15:52
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/296-medium-permutation/README.md)

### 问题
实现置换类型，将联合类型转换为包含联合置换的数组。

```typescript
type perm = Permutation<'A' | 'B' | 'C'>; 
// ['A', 'B', 'C'] | ['A', 'C', 'B'] |
// ['B', 'A', 'C'] | ['B', 'C', 'A'] |
// ['C', 'A', 'B'] | ['C', 'B', 'A']
```

### 解答
```typescript
type Permutation<T, K = T> =
  [T] extends [never]
    ? []
    : K extends K
      ? [K, ...Permutation<Exclude<T, K>>]
      : never
```

### 拆分
1. 分解联合类型，获取类型的所有组合
2. `[T] extends [never]` 是为了判断传入的泛型是不是为空，如果用 `T extends never ? true : false` 这样来判断会返回一个 `never` 类型，并不会返回 `true` 或者 `false`，所以利用 `[T]` 类型来判断是否为空。
3. `K extends K` 是判断是否有传入泛型，利用 2 中提到的 `T extends never ? true : false` 永远会返回 `never` 的方法判断是否还有传入的类型
4. 利用 `Exclude` 从 `T` 中 排除掉已经使用过的类型


### 具体执行
``` typescript 
type P = Permutation;
type X = Exclude
```

|`执行`|`T`|`K in K extends K`|`X<T, K>`|`[K, ...P<X<T, K>>]`|`结果`|
| ---- | ---- | :----: | ---- | ---- | :----: |
|`1`|`A｜B｜C`|`A`|`B｜C`|`[A, ...P<B｜C>]`|  |
|`1.1`|`B｜C`|`B`|`C`|`[A, B, ...P<C>]`|  |
|`1.1.1`|`C`|`C`|`never`|`[A, B, C, ...[]`|`[A, B, C`|
|`1.2`|`B｜C`|`B`|`C`|`[A, B, ...P<C>]`|  |
|`1.2.1`|`C`|`C`|`never`|`[A, B, C, ...[]]`|`[A, C, B]`|
|`2`|`A｜B｜C`|`B`|`A｜C`|`[B, ...P<A｜C>]`|  |
|`2.1`|`A｜C`|`A`|`C`|`[B, A, ...P<C>]`|  |
|`2.1.1`|`C`|`C`|`never`|`[B, A, C, ...[]]`| `[B, A, C]` |
|`2.2`|`A｜C`|`C`|`A`|`[B, C, ...P<A>]`||
|`2.2.1`|`A`|`A`|`never`|`[B, C, A, ...[]]`| `[B, C, A]` |
|`3`|`A｜B｜C`|`C`|`A｜B`|`[C, ...P<A｜B>]`|  |
|`3.1`|`A｜B`|`A`|`B`|`[C, A, ...P<B>]`|  |
|`3.1.1`|`B`|`B`|`never`|`[C, A, B, ...[]]`| `[C, A, B]` |
|`3.2`|`A｜C`|`B`|`A`|`[C, B, ...P<A>]`||
|`3.2.1`|`A`|`A`|`never`|`[C, B, A, ...[]]`| `[C, B, A]` |
