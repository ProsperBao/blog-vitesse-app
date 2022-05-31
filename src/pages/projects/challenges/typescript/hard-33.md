---
title: Object Key Paths
date: 2022-5-31 10:52:41
level: 3
levelTitle: Hard
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/07258-hard-object-key-paths/README.md)

### 问题

实现一个 [_.get](https://lodash.com/docs/4.17.15#get) 拿到所有索引的路径

```typescript
const ref = {
  count: 1,
  person: {
    name: 'cattchen',
    age: 22,
    books: ['book1', 'book2'],
    pets: [
      {
        type: 'cat',
      },
    ],
  },
}
ObjectKeyPaths<{ name: string; age: number }> // 'name' | 'age'
ObjectKeyPaths<{
  refCount: number
  person: { name: string; age: number }
}>,
// 'refCount' | 'person' | 'person.name' | 'person.age'
ObjectKeyPaths<typeof ref> // 'count'
ObjectKeyPaths<typeof ref> // 'person'
ObjectKeyPaths<typeof ref> // 'person.name'
ObjectKeyPaths<typeof ref> // 'person.age'
ObjectKeyPaths<typeof ref> // 'person.books'
ObjectKeyPaths<typeof ref> // 'person.pets'
ObjectKeyPaths<typeof ref> // 'person.books.0'
ObjectKeyPaths<typeof ref> // 'person.books.1'
ObjectKeyPaths<typeof ref> // 'person.books[0]'
ObjectKeyPaths<typeof ref> // 'person.books.[0]'
ObjectKeyPaths<typeof ref> // 'person.pets.0.type'
```

### 解答

```typescript
type ObjectKeyPaths<T extends object, K  = keyof T> = 
K extends keyof T
? T[K] extends object
  ? T[K] extends unknown[]
    ? `${string}`
    : K & string | `${K & string}.${ObjectKeyPaths<T[K]>}`
  : K & string
: '';
```

### 拆分

1. 递归根据对象的每个 `K` 然后联合
2. 如果是对象则进一步递归
3. 如果是数组则用字符串索引
