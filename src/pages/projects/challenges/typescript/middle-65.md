---
title: MapTypes 
date: 2022-4-27 14:55:48
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/05821-medium-maptypes/README.md)

### 问题

实现 `MapTypes<T，R>`，它将对象 `T` 中的类型转换为类型 `R` 定义的不同类型，类型 `R` 具有以下结构。

```typescript
type case1 = MapTypes<{ stringToArray: string }, { mapFrom: string; mapTo: [] }> // { stringToArray: [] }
type case2 = MapTypes<{ stringToNumber: string }, { mapFrom: string; mapTo: number }> // { stringToNumber: number }
type case3 = MapTypes<{ stringToNumber: string; skipParsingMe: boolean }, { mapFrom: string; mapTo: number }> // { stringToNumber: number; skipParsingMe: boolean }
type case4 = MapTypes<{ date: string }, { mapFrom: string; mapTo: Date } | { mapFrom: string; mapTo: null }> // { date: null | Date }
type case5 = MapTypes<{ date: string }, { mapFrom: string; mapTo: Date | null }> // { date: null | Date }
type case6 = MapTypes<{ fields: Record<string, boolean> }, { mapFrom: Record<string, boolean>; mapTo: string[] }> // { fields: string[] }
type case7 = MapTypes<{ name: string }, { mapFrom: boolean; mapTo: never }> // { name: string }
type case8 = MapTypes<{ name: string; date: Date }, { mapFrom: string; mapTo: boolean } | { mapFrom: Date; mapTo: string }> // { name: boolean; date: string }
```

### 解答

```typescript
type MapTypes<T, R extends MapConfig> = {
  [K in keyof T]: T[K] extends R['mapFrom'] ? R extends { mapFrom: T[K] } ? R['mapTo'] : never : T[K]
}
```

### 拆分

1. 遍历对象，然后一个个属性值比较
2. 因为 `R` 会是联合类型，所以要用 `R extends { mapFrom: T[K] }` 限制类型分发

