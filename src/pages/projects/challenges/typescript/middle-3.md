---
title: Readonly 2
date: 2022-03-24 10:25:00
level: 2
levelTitle: Middle
---

[[toc]]

[问题来源(https://github.com/type-challenges/type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/8-medium-readonly-2/README.zh-CN.md)
### 问题
实现一个通用 `MyReadonly2<T, K>`，它带有两种类型的参数 `T` 和 `K`。

`K` 指定应设置为Readonly的 `T` 的属性集。如果未提供 `K`，则应使所有属性都变为只读，就像普通的 `Readonly<T>` 一样。

例如

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
}

const todo: MyReadonly2<Todo, 'title' | 'description'> = {
  title: "Hey",
  description: "foobar",
  completed: false,
}

todo.title = "Hello" // Error: cannot reassign a readonly property
todo.description = "barFoo" // Error: cannot reassign a readonly property
todo.completed = true // OK
```

### 解答

```typescript
type MyExclude<T, U> = T extends U ? never : T
type MyOmit<T, K extends keyof T> = { [P in MyExclude<keyof T, K>]: T[P] }
type MyReadonly2<T, K extends keyof T = keyof T> = {
  readonly [P in K]: T[P]
} & MyOmit<T, K>
```

### 拆分
1. `K` 是要限制在 `T` 中的属性，所以需要确认 `T` 中的属性是否在 `K` 中，使用 `K extends keyof T` 确认
2. `K` 有可能没有指定，所以需要使用 `K extends keyof T = keyof T` 来确认
3. `K extends keyof T = keyof T` 在 `K` 没有指定时，等价于 `keyof T` 换句话说相当于赋一个默认值
4. `&` 是取交集的意思，后面覆盖前面
5. `{ readonly [P in K]: T[P] }` 把 `K` 中的属性名称对应的属性变为只读
6. 需要从 `T` 中拿到不在 `K` 中的属性
7. 并把这些属性恢复为原来的类型