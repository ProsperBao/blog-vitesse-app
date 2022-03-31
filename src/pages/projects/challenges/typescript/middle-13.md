---
title: Capitalize
date: 2022-3-29 11:46:40
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/FuBaooo/type-challenges/blob/master/questions/110-medium-capitalize/README.md)

### 问题
Implement `Capitalize<T>` which converts the first letter of a string to uppercase and leave the rest as-is.

For example

```ts
type capitalized = Capitalize<'hello world'> // expected to be 'Hello world'
```

### 解答
```typescript
type MyCapitalize<S extends string> = S extends `${infer L}${infer R}`? `${Uppercase<L>}${R}` : S
```

### 拆分
1. `S` 只能为字符串
2. 使用 `infer L` 和 `infer R` 获取不同位置的字符串
3. 使用 `Uppercase<L>` 来获取首字母大写的字符串
4. 如果不允许使用 `Uppercase` 则可以写一个字符串映射的类型来获取大写
