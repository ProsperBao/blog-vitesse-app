---
title: ReplaceKeys
date: 2022-4-9 09:47:50
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/1130-medium-replacekeys/README.md)

### 问题
实现一个类型ReplaceKeys，替换联合类型中的键，如果某个类型没有这个键，只需跳过替换，一个类型接受三个参数。
```typescript
type NodeA = {
  type: 'A'
  name: string
  flag: number
}

type NodeB = {
  type: 'B'
  id: number
  flag: number
}

type NodeC = {
  type: 'C'
  name: string
  flag: number
}


type Nodes = NodeA | NodeB | NodeC

type ReplacedNodes = ReplaceKeys<Nodes, 'name' | 'flag', {name: number, flag: string}> // {type: 'A', name: number, flag: string} | {type: 'B', id: number, flag: string} | {type: 'C', name: number, flag: string} // would replace name from string to number, replace flag from number to string.

type ReplacedNotExistKeys = ReplaceKeys<Nodes, 'name', {aa: number}> // {type: 'A', name: never, flag: number} | NodeB | {type: 'C', name: never, flag: number} // would replace name to never
```

### 解答
```typescript
type ReplaceKeys<U, T, Y> = {
  [K in keyof U ]: K extends T ? K extends keyof Y ? Y[K] : never : U[K]
}
```

### 拆分
1. 联合类型可以直接用 `extends` 来判断是否是在联合类型里
2. 如果在联合类型里就必须判断是否在传入的新类型来源对象里
3. 如果不在就用 `never` 作为类型
