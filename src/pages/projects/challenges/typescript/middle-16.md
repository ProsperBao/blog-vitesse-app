---
title: 追加参数
date: 2022-3-29 15:43:13
level: 2
levelTitle: Middle
---

[[toc]]

[问题来源(https://github.com/type-challenges/type-challenges)]()

### 问题
实现一个泛型 `AppendArgument<Fn, A>`，对于给定的函数类型 `Fn`，以及一个任意类型 `A`，返回一个新的函数 `G`。`G` 拥有 `Fn` 的所有参数并在末尾追加类型为 `A` 的参数。

```typescript
type Fn = (a: number, b: string) => number

type Result = AppendArgument<Fn, boolean> 
// 期望是 (a: number, b: string, x: boolean) => number
```


### 解答
```typescript
type AppendArgument<Fn, A> = Fn extends (...args: infer R) => infer T 
  ? (...args: [...R, A]) => T 
  : never
```

### 拆分
1. 限定 `Fn` 为一个函数类型，参数为 `infer R` 和返回值为 `infer T`
2. 创建一个新的函数类型 `(...args: [...R, A]) => T`
