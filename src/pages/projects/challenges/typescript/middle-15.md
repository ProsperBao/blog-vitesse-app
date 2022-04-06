---
title: ReplaceAll
date: 2022-3-29 14:21:58
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/119-medium-replaceall/README.zh-CN.md)

### 问题
实现 `ReplaceAll<S, From, To>` 将一个字符串 `S` 中的所有子字符串 `From` 替换为 `To`。

例如

```ts
type replaced = ReplaceAll<'t y p e s', ' ', ''> // 期望是 'types'
```


### 解答
```typescript
type ReplaceAll<S extends string, FROM extends string, TO extends string> = FROM extends ''
  ? S
  : S extends `${infer T}${FROM}${infer U}`
    ? ReplaceAll<`${T}${TO}${U}`, FROM, TO>
    : S
```

### 拆分
1. 和 [Replace](/projects/challenges/typescript/middle-14) 类似
2. 需要递归调用然后替换，改动不大
