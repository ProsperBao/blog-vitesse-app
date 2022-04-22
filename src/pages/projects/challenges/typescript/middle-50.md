---
title: Flip
date: 2022-4-22 09:25:25
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/04179-medium-flip/README.md)

### 问题

实现一个类型的 `just-flip-object`

```typescript
Flip<{ a: "x", b: "y", c: "z" }>; // {x: 'a', y: 'b', z: 'c'}
Flip<{ a: 1, b: 2, c: 3 }>; // {1: 'a', 2: 'b', 3: 'c'}
flip<{ a: false, b: true }>; // {false: 'a', true: 'b'}
```

### 解答

```typescript
type Flip<T> = {
  [K in keyof T as 
    T[K] extends string | number | symbol 
    ? T[K] 
    : T[K] extends boolean 
      ? `${T[K]}` .
      : never]: K
}
```

### 拆分

1. [Flip Arguments](/projects/challenges/typescript/middle-46) 类似
