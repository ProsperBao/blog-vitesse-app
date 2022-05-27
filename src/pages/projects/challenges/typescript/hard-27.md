---
title: IsRequiredKey
date: 2022-5-26 09:07:46
level: 3
levelTitle: Hard
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/02857-hard-isrequiredkey/README.md)

### 问题

```typescript
type case1 = IsRequiredKey<{ a: number; b?: string }, 'a'> // true
type case2 = IsRequiredKey<{ a: number; b?: string }, 'b'> // false
type case3 = IsRequiredKey<{ a: number; b?: string }, 'b' | 'a'> // false
```

### 解答

```typescript
type IsRequiredKey<T, K extends keyof T> = Record<K, T[K]> extends T ? true : false
```

### 拆分

- `keyof T` 会过只拿出允许访问的属性
- 利用 `Record<K, T[K]>` 构造一个参数必选的对象
- 再判断构造的对象是否是 `T` 的子集
