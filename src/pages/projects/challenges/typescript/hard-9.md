---
title: C-printf Parser
date: 2022-5-5 15:17:50
level: 3
levelTitle: Hard
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/00147-hard-c-printf-parser/README.md)

### 问题

这个是 C 语言的函数: `printf` 这个函数是用于格式化打印字符串。

例如: 

```c
printf("The result is %d.", 42);
```

这个挑战要求解析输入字符串并提取格式占位符如 `%d` 和 `%f` 等. 如输入了 `"The result is %d."` 则需要返回 `['dec']`.

字典如下:
```typescript
type ControlsMap = {
  c: 'char',
  s: 'string',
  d: 'dec',
  o: 'oct',
  h: 'hex',
  f: 'float',
  p: 'pointer',
}
type case1 = ParsePrintFormat<''> // []
type case2 = ParsePrintFormat<'Any string.'> // []
type case3 = ParsePrintFormat<'The result is %d.'> // ['dec']
type case4 = ParsePrintFormat<'The result is %%d.'> // []
type case5 = ParsePrintFormat<'The result is %%%d.'> // ['dec']
type case6 = ParsePrintFormat<'The result is %f.'> // ['float']
type case7 = ParsePrintFormat<'The result is %h.'> // ['hex']
type case8 = ParsePrintFormat<'The result is %q.'> // []
type case9 = ParsePrintFormat<'Hello %s: score is %d.'> // ['string', 'dec']
type case10 = ParsePrintFormat<'The result is %'> // []
```

### 解答

```typescript
type ParsePrintFormat<S extends string, Res extends string[] = []> = 
S extends `${infer _}%${infer R}`
? R extends `${infer C}${infer CR}`
  ? C extends keyof ControlsMap 
    ? ParsePrintFormat<CR, [...Res, ControlsMap[C]]>
    : ParsePrintFormat<CR, [...Res]>
  : Res
: Res
```

### 拆分

1. 首先根据 `%` 分割字符串
2. 剔除 `%` 前面的字符串，前面的字符串不涉及格式化
3. 拿取 `%` 的下一个字符，判断是否是在 `ControlsMap` 中
4. 如果在 `ControlsMap` 中，则根据字符填充 `Res`
5. 如果不在则直接跳过，继续下一个递归
6. 如果无法拆分字符串则直接返回 `Res`
