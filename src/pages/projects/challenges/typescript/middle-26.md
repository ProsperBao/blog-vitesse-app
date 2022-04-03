---
title: Diff
date: 2022-4-3 14:29:14
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/FuBaooo/type-challenges/blob/master/questions/645-medium-diff/README.md)

### 问题
获取一个 `Object`，该对象是 `0` 和 `01` 之间的差异

### 解答
```typescript
type Diff<O, O1> = {
  [K in Exclude<keyof O, keyof O1> | Exclude<keyof O1, keyof O> ]: K extends keyof O ? O[K] : K extends keyof O1 ? O1[K]: never
}

type Foo = {
  name: string
  age: string
}
type Bar = {
  name: string
  age: string
  gender: number
}
type a = Diff<Foo, Bar>// { gender: number }
type b = Diff<Bar,Foo>// { gender: number }
```

### 拆分
1. 从 `O` 中挑出 `O1` 中没有的属性，从 `O1` 中挑出 `O` 中没有的属性形成一个新的联合类型
2. 再通过联合类型 + 索引类型，就可以形成一个类似循环一样去获取每个类型
3. 判断每个类型来自哪个对象
4. 形成新的联合类型返回

注：
1. 联合类型本身就可以被 `in` 索引，所以无需 `keyof`
2. `keyof` 本身就是把对象属性转换为联合类型，所以之前理解有误，在使用的时候造成误用
