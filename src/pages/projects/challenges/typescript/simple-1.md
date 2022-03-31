---
title: 热身挑战
date: 2022-03-01 11:05:00
level: 0
levelTitle: Simple
---

[[toc]]

## Hello World
[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/13-warm-hello-world/README.zh-CN.md)
### 问题

在这个挑战中，你需要修改下方的代码使得测试通过（使其没有类型错误）。

```ts
// 期望是一个 string 类型
type HelloWorld = any
```

```ts
// 你需要使得如下这行不会抛出异常
type test = Expect<Equal<HelloWorld, string>>
```

### 解答

```typescript
type HelloWorld = string
```

