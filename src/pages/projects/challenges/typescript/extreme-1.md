---
title: 获取只读字段
date: 2022-6-1 09:57:18
level: 4
levelTitle: Extreme
---

[[toc]]

[题目来源(type-challenges)](https://github.com/FuBaooo/type-challenges/blob/master/questions/5-extreme-readonly-keys/README.zh-CN.md)

### 问题

```typescript
type case1 =  GetReadonlyKeys<Todo1> // 'title'
type case2 =  GetReadonlyKeys<Todo2> // 'title' | 'description'

interface Todo1 {
  readonly title: string
  description: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  readonly description: string
  completed?: boolean
}

```

### 解答

```typescript
export type Equal1<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false

type GetReadonlyKeys<T> = ({ [K in keyof T as Equal1<Pick<T, K>, Readonly<Pick<T, K>>> extends true ? K : never]: K }) extends infer T ? keyof T : never
```

### 拆分

- 先用把原来和转换为 `readonly` 的字段对比，对比之后看看是否相同
- 不可以直接用 `extends` 这样无法判断是否相同
- 如果不相同则直接过滤字段
- 把新对象的所有 `key` 返回

