---
title: Trim
date: 2022-3-29 11:22:12
level: 2
levelTitle: Middle
---

[[toc]]

[问题来源(https://github.com/type-challenges/type-challenges)]()

### 问题
实现一个 `Trim<T>` 接收一个字符串，并去除两端空格，返回一个新的字符串。

例如：
```ts
type trimed = Trim<'  Hello World  '> // 输出是 'Hello World'
```

### 解答
```typescript
type Trim<S extends string> = S extends `${' '| '\n'|'\t'}${infer L}`
  ? Trim<L>
  : S extends `${infer R}${' '| '\n'|'\t'}`
    ? Trim<R>
    : S
```

### 拆分
1. 和 [TrimLeft](/projects/challenges/typescript/middle-11) 类似
