---
title: Trunc
date: 2022-4-24 11:33:04
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/05153-medium-indexof/README.md)

### 问题

实现一个类型 `Math.trunc` 接收一个字符串或者数字，返回整数部分

```typescript
type case1 = Trunc<0.1> //  '0'
type case1 = Trunc<1.234> //  '1'
type case1 = Trunc<12.345> //  '12'
type case1 = Trunc<-5.1> //  '-5'
type case1 = Trunc<'1.234'> //  '1'
type case1 = Trunc<'-10.234'> //  '-10'
type case1 = Trunc<10> //  '10'
```

### 解答

```typescript
type Trunc<T extends number | string> = `${T}` extends `${infer S}.${infer _}` ? S : `${T}`
```

### 拆分

1. 先将 T 转换为字符串
2. 再将字符串以小数点分割
