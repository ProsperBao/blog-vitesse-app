---
title: Mutable
date: 2022-4-13 15:50:17
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/2793-medium-mutable/README.md)

### 问题
实现一个通用的 `Mutable<T>` 类型，其中 `T` 可以是任意类型(不是只读)。

```typescript
interface Todo {
  readonly title: string
  readonly description: string
  readonly completed: boolean
}

type MutableTodo = Mutable<Todo> // { title: string; description: string; completed: boolean; }
```

### 解答

```typescript
type Mutable<T> = { -readonly [K in keyof T]: T[K] }
```

### 拆分

1. 可以通过 `+/-` 移除添加修饰符
2. 可以通过 `-readonly` 移除 `readonly`
