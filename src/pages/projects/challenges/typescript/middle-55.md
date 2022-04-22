---
title: IsTuple 
date: 2022-4-22 16:00:03
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/04484-medium-istuple/README.md)

### 问题

实现一个类型 `IsTuple`，它接受输入类型 `T` 并返回 `T` 是否为元组类型。

```typescript
type case1 = IsTuple<[]> //  true
type case2 = IsTuple<[number]> //  true
type case3 = IsTuple<readonly [1]> //  true
type case4 = IsTuple<{ length: 1 }> //  false
type case5 = IsTuple<number[]> //  false
```

### 解答

```typescript
type IsTuple<T> = 
  T extends readonly any[]?
    number extends T['length']?false:true
  :false
```

### 拆分
1. 先判断是否是只读数组或者是数组
2. 元组不带长度

