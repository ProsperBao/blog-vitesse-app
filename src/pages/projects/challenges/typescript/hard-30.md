---
title: Mutable Keys
date: 2022-5-30 15:14:44
level: 3
levelTitle: Hard
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/05181-hard-mutable-keys/README.md)

### 问题

实现一个排除只读的高级类型 `MutableKeys`

```typescript
type case1 = MutableKeys<{ a: number; readonly b: string }> // 'a'
type case2 = MutableKeys<{ a: undefined; readonly b: undefined }> // 'a'
type case3 = MutableKeys<{ a: undefined; readonly b?: undefined; c: string; d: null }> // 'a' | 'c' | 'd'
type case4 = MutableKeys<{}> // never
```

### 解答

```typescript
type MutableKeys<T, K = keyof T> = K extends keyof T 
  ? Equal<Pick<T, K>, Readonly<Pick<T, K>>> extends true
    ? never
    : K
  : never
```

### 拆分
- 从源对象根据键拿出值，形成一个新的对象1
- 新的对象2把所有的键包装成只读，和新的对象1比较
- 如果一样则需要排除
