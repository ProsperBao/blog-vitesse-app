---
title: 实现 Pick
date: 2022-03-02 11:08:00
level: 1
levelTitle: Easy
---

[[toc]]

[问题来源(https://github.com/type-challenges/type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/4-easy-pick/README.zh-CN.md)
### 问题
实现 TS 内置的 `Pick<T, K>`，但不可以使用它。

**从类型 `T` 中选择出属性 `K`，构造成一个新的类型**。

例如：

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

type TodoPreview = MyPick<Todo, 'title' | 'completed'>

const todo: TodoPreview = {
    title: 'Clean room',
    completed: false,
}
```

### 解答

```typescript
type MyPick<T, K extends keyof T> = { [P in K]: T[P]}
```

### 拆分

1. 首先确保传入的 `K` 是存在于 `T` 上的键
2. `keyof T` 拿到的数据是 `"title" | "description" | "completed"`
3. `K extends` 把 `K` 的范围限制在某个范围内
4. 合起来就是 `K` 的范围限制在 `"title" | "description" | "completed"` 中
5. 通过对象索引的方式把限制的函数组成一个新的类型