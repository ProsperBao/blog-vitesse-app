---
title: CamelCase
date: 2022-3-31 14:59:11
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/FuBaooo/type-challenges/blob/master/questions/610-medium-camelcase/README.md)

### 问题
`for-bar-baz` -> `forBarBaz`

### 解答
```typescript
type CamelCase<S extends string> = 
  S extends `${infer Pre}-${infer Sub}`
    ? Capitalize<Sub> extends Sub
      ? `${Pre}-${CamelCase<Sub>}`
      : CamelCase<`${Pre}${Capitalize<Sub>}`>
    : S
```

### 拆分
1. 利用 `infer` 获取 `-` 两端的值
2. 利用 `Capitalize` 转换为首字母大写的字符串和 `Sub` 对比
3. 如果对比成功则表示字符串不需要去掉 `-` 所以要补上然后把转换首字母大写的字符串当作 `Sub` 继续转换
4. 如果对比失败则表示字符串需要去掉 `-` 所以把 `Sub` 转换为首字母大写的字符串和 `Pre` 一起继续递归转换
5. 不满足条件则返回原字符


### 执行过程
```typescript
type C = Capitalize
type CA = CamelCase
```

```typescript
type result = CamelCase<'foo-bar-baz'> //'fooBarBaz'
```
|`执行`|`S`|`Pre`|`Sub`|`C<Sub> extends Sub`|`下一步`|
| ---- | ---- | ---- | ---- | ---- | ---- |
|`1`|`foo-bar-baz`|`foo`|`bar-baz`|`false`|`C<'fooBar-baz'>`|
|`2`|`fooBar-baz`|`fooBar`|`baz`|`false`|`C<'fooBarBaz'>`|
|`3`|`fooBarBaz`|`never`|`never`|`never`|`fooBarBaz`|

```typescript
type result = CamelCase<'foo-Bar-baz'> //'foo-BarBaz'
```
|`执行`|`S`|`Pre`|`Sub`|`C<Sub> extends Sub`|`下一步`|
| ---- | ---- | ---- | ---- | ---- | ---- |
|`1`|`foo-bar-baz`|`foo`|`Bar-baz`|`true`|`foo-${C<'Bar-baz'>}`|
|`2.1`|`Bar-baz`|`Bar`|`baz`|`false`|`C<'BarBaz'>`|
|`2.2`|`BarBaz`|`never`|`never`|`never`|`BarBaz`|
|`1.1`|`foo-bar-baz`|`foo`|`Bar-baz`|`true`|`foo-BarBaz`|
