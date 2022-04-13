---
title: Shift
date: 2022-4-13 17:07:01
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/3062-medium-shift/README.md)

### 问题
实现一个类型版本的 `Array.shift`

```typescript
type Result = Shift<[3, 2, 1]> // [2, 1]
```

### 解答

```typescript
type Shift<T> = T extends [infer _, ...infer Rest] ? Rest : never
```

### 拆分

1. 利用 `infer` 占位返回
