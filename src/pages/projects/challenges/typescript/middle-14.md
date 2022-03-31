---
title: Replace
date: 2022-3-29 12:20:29
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/FuBaooo/type-challenges/blob/master/questions/116-medium-replace/README.zh-CN.md)

### 问题
实现 `Replace<S, From, To>` 将字符串 `S` 中的第一个子字符串 `From` 替换为 `To` 。

例如

```ts
type replaced = Replace<'types are fun!', 'fun', 'awesome'> // 期望是 'types are awesome!'
```


### 解答
```typescript
type Replace<S extends string, FROM extends string, TO extends string> = FROM extends '' ? S : S extends `${infer T}${FROM}${infer U}` ? `${T}${TO}${U}`: S
```

### 拆分
1. 需要限制三个泛型都为字符串
2. 如果 `FORM` 为空就是没有需要替换
3. 通过 `infer` 保存前后字符，去除 `FORM`
4. 使用 `TO` 实现替换效果
