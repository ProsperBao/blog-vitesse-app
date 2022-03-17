---
title: 实现 Readonly
date: 2022-02-02 11:08:00
level: 1
levelTitle: Easy
---

[[toc]]

[问题来源(https://github.com/type-challenges/type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/7-easy-readonly/README.zh-CN.md)

### 问题

不要使用内置的`Readonly<T>`，自己实现一个。

该 `Readonly` 会接收一个 _泛型参数_，并返回一个完全一样的类型，只是所有属性都会被 `readonly` 所修饰。

也就是不可以再对该对象的属性赋值。

例如：

```ts
interface Todo {
  title: string
  description: string
}

const todo: MyReadonly<Todo> = {
  title: "Hey",
  description: "foobar"
}

todo.title = "Hello" // Error: cannot reassign a readonly property
todo.description = "barFoo" // Error: cannot reassign a readonly property
```

### 解答

```typescript
type MyReadonly<T> = { readonly [K in keyof T]: T[K] }
```

### 拆分

1. 和 [实现 Pick](/projects/challenges/typescript/easy-1) 相似 `keyof T` 是 `"title" | "description"` 用来限制 `T` 的范围
2. `K in` 逐个拿取 `"title" | "description"` 通过索引对象包装
3. 返回包装后的对象
4. 这个并没有递归处理所以是属于浅只读
