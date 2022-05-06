---
title: Typed Get
date: 2022-5-6 09:39:47
level: 3
levelTitle: Hard
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/00270-hard-typed-get/README.md)

### 问题

[lodash 的 `get`](https://lodash.com/docs/4.17.15#get) 实现一个 lodash 的 `get` 类型版本

```typescript
type Data = {
  foo: {
    bar: {
      value: 'foobar',
      count: 6,
    },
    included: true,
  },
  hello: 'world'
}
  
type A = Get<Data, 'hello'> // 'world'
type B = Get<Data, 'foo.bar.count'> // 6
type C = Get<Data, 'foo.bar'> // { value: 'foobar', count: 6 }
type D = Get<Data, 'no.existed'> // never
```

### 解答

```typescript
type Get<T, K> = K extends `${infer F}.${infer R}`
? F extends keyof T
  ? Get<T[F], R>
  : never
: K extends keyof T
  ? T[K]
  : never
```

### 拆分

* 利用字符串的特性，可以将 `F.R` 拆分成 `F` 和 `R`
* 然后利用 `F` 去 `T` 中查找是否存在
* 如果存在，则递归调用 `Get`，否则返回 `never`
* 如果无法拆分则直接当作属性去查找
* 如果无法找到，则返回 `never`
* 如果找到，则返回该属性的值
