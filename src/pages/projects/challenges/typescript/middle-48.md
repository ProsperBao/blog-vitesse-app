---
title: 
date: 2022-4-14 12:15:04
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)]()

### 问题

```typescript
type case1 = BEM<'btn', ['price'], []> // 'btn__price'
type case2 = BEM<'btn', ['price'], ['warning', 'success']> // 'btn__price--warning' | 'btn__price--success'
type case3 = BEM<'btn', [], ['small', 'medium', 'large']> // 'btn--small' | 'btn--medium' | 'btn--large'
```

### 解答

```typescript
type BEM<B extends string, E extends string[], M extends string[]> = `${B extends '' ? '' : B}${E['length'] extends 0 ? '' : `__${E[number]}`}${M['length'] extends 0 ? '' : `--${M[number]}`}`
```

### 拆分

1. 利用 `[number]` 用来索引数组

2. 用 `${B}` 和 `${E}` 和 `${M}` 分别拼接
