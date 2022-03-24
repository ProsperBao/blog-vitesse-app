---
title: 实现 Omit 
date: 2022-03-24 10:25:00
level: 2
levelTitle: Middle
---

[[toc]]

[问题来源(https://github.com/type-challenges/type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/3-medium-omit/README.zh-CN.md)
### 问题
不使用 `Omit` 实现 TypeScript 的 `Omit<T, K>` 泛型。

`Omit` 会创建一个省略 `K` 中字段的 `T` 对象。

例如：

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyOmit<Todo, 'description' | 'title'>

const todo: TodoPreview = {
  completed: false,
}
```

### 解答

```typescript
type MyExclude<T, U> = T extends U ? never : T
type MyOmit<T, K extends keyof T> = { [P in MyExclude<keyof T, K>]: T[P] }
```

### 拆分
1. `Omit` 和 `Pick` 类似，但是又不一样
2. 首先需要先从 `T` 中排除 `K` 中的字段，所以需要确认 `T` 中的字段是否在 `K` 中，使用 `K extends keyof T` 确认
3. 获取 `T` 中不在 `K` 中的字段，使用 `Exclude<keyof T, K>` 获取
4. `Keyof T` 解析出来的结果是 `title|description|completed`，然后用 `Exclude<keyof T, K>` 排除 `K` 中的字段，得到 `completed`
5. 所以相当于 `{ [P in completed]: T[P] }`