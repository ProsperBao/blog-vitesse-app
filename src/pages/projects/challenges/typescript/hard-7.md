---
title: Capitalize Words
date: 2022-5-5 14:01:02
level: 3
levelTitle: Hard
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/00112-hard-capitalizewords/README.md)

### 问题

实现 `CapitalizeWords<T>` 将字符串中 **每个单词** 的第一个首字母变成大写。

```typescript
type case1 = CapitalizeWords<'foobar'> // 'Foobar'
type case2 = CapitalizeWords<'FOOBAR'> // 'FOOBAR'
type case3 = CapitalizeWords<'foo bar'> // 'Foo Bar'
type case4 = CapitalizeWords<'foo bar hello world'> // 'Foo Bar Hello World'
type case5 = CapitalizeWords<'foo bar.hello,world'> // 'Foo Bar.Hello,World'
type case6 = CapitalizeWords<''> // ''
```

### 解答

```typescript
type CapitalizeWords<S extends string, Flag extends boolean = true> =
  S extends `${infer F}${infer R}`
  ? Lowercase<F> extends Uppercase<F>
    ? `${F}${CapitalizeWords<Capitalize<R>, false>}`
    : `${Flag extends true ? Capitalize<F> : F}${CapitalizeWords<R, false>}`
  : S
```

### 拆分
1. 首先拆分字符串分为第一个字符 `F` 和剩下所有的字符 `R`
2. 如果拆分不了则直接返回原字符串，如果可以拆分则判断是否是特殊字符
3. 如果是特殊字符 `Lowercase<F>` 和 `Uppercase<F>` 是返回原字符串的
4. 如果是特殊字符则需要跳过当前字符，然后把后续的字符串的第一个字符变成大写
5. 如果不是特殊字符则判断 `FLAG` 是否为 `true`，如果是则将第一个字符变成大写，如果不是则不变
6. 将剩下的字符串再次拆分，然后将结果连接起来
