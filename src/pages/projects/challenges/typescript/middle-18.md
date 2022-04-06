---
title: 获取字符串长度
date: 2022-3-31 09:35:45
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/298-medium-length-of-string/README.md)

### 问题
计算字符串类型的长度, 结果就像 `String#length`


### 解答
```typescript
type LengthOfString<S extends string, V extends string[] = []> = 
  S extends `${infer L}${infer Rest}`
    ? L extends ''
        ? V['length']
        : LengthOfString<Rest, [...V, '']>
    : V['length']
```

### 拆分
1. 利用数组的 `length` 属性, 结合 `infer` 的特性, 可以拆分字符串
2. 利用递归，把拆分的字符串放到数组中
3. 在最终结果返回数组的长度

### 具体执行过程
```typescript
LengthOfString<''>
```
|`执行`|`S`|`V`|`L`|`Rest`|`结果`|
| ---- | ---- | ---- | ---- | ---- | ---- |
|`1`|`""`|`[]`|`never`|`never`|`0`|

```typescript
LengthOfString<'kumiko'>
```
|`执行`|`S`|`V`|`L`|`Rest`|`结果`|
| ---- | ---- | ---- | ---- | ---- | ---- |
|`1`|`"kumiko"`|`[]`|`"k"`|`"umiko"`||
|`2`|`"umiko"`|`['']`|`"u"`|`"miko"`||
|`3`|`"miko"`|`['', '']`|`"m"`|`"iko"`||
|`4`|`"iko"`|`['', '', '']`|`"i"`|`"ko"`||
|`5`|`"ko"`|`['', '', '', '']`|`"k"`|`"o"`||
|`6`|`"o"`|`['', '', '', '', '']`|`"o"`|`never`||
|`7`|`""`|`['', '', '', '', '', '']`|`never`|`never`|6|

