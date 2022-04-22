---
title: 
date: 2022-4-22 16:29:22
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)]()

### 问题

```typescript
type case1 = Chunk<[], 1> //  []
type case2 = Chunk<[1, 2, 3], 1> //  [[1], [2], [3]]
type case3 = Chunk<[1, 2, 3], 2> //  [[1, 2], [3]]
type case4 = Chunk<[1, 2, 3, 4], 2> //  [[1, 2], [3, 4]]
type case5 = Chunk<[1, 2, 3, 4], 5> //  [[1, 2, 3, 4]]
type case6 = Chunk<[1, true, 2, false], 2> //  [[1, true], [2, false]]
```

### 解答

```typescript
type Chunk<T extends any[], N extends number, S extends any[] = []> = 
  S['length'] extends N
    ? [S, ...Chunk<T, N>]
    : T extends [infer F, ...infer R]
      ? Chunk<R, N, [...S, F]>
      : S extends [] ? S : [S]
```

### 拆分
1. 首先判断分割数组的长度是否和目标长度相等
2. 如果相等则返回当前分割好的数组加上后续需要递归处理的数组
3. 然后拆分数组，如果可以拆分则递归处理
4. 如果不能拆分，看数组是否为空，如果为空则返回，如果不为空则标志数组就剩下一个，直接进行包裹处理

### 执行过程

```typescript
type case5 = Chunk<[1, 2, 3, 4], 5> //  [[1, 2, 3, 4]]
```

|T|N|S|`S['length']`|`infer F`|` ...infer R`|result|
| ---- | ---- | ---- | ---- | ---- | ---- | ---- |
|`[1, 2, 3, 4]`|`5`|`[]`|`0`|`1`|`[2, 3, 4]`|`Chunk<[2, 3, 4], 5, [1]>`|
|`[2, 3, 4]`|`5`|`[1]`|`1`|`2`|`[3, 4]`|`Chunk<[3, 4], 5, [1, 2]>`|
|`[3, 4]`|`5`|`[1, 2]`|`2`|`3`|`[4]`|`Chunk<[4], 5, [1, 2, 3]>`|
|`[4]`|`5`|`[1, 2, 3]`|`3`|`4`|`[]`|`Chunk<[], 5, [1, 2, 3, 4]>`|
|`[]`|`5`|`[1, 2, 3, 4]`|`4`|`never`|`never`|`[S]`|
|||||||`[[1, 2, 3, 4]]`|

```typescript
type case6 = Chunk<[1, true, 2, false], 2> //  [[1, true], [2, false]]
```
|T|N|S|`S['length']`|`infer F`|` ...infer R`|result|
| ---- | ---- | ---- | ---- | ---- | ---- | ---- |
|`[1, true, 2, false]`|`2`|`[]`|`0`|`1`|`[true, 2, false]`|`Chunk<[true, 2, false], 2, [1]>`|
|`[true, 2, false]`|`2`|`[1]`|`1`|`true`|`[ 2, false]`|`Chunk<[2, false], 2, [1, true]>`|
|`[2, false]`|`2`|`[1, true]`|`2`|`never`|`never`|`[S, ...Chunk<[2, false], 2>]`|
|`[2, false]`|`2`|`[]`|`0`|`2`|`[false]`|`Chunk<[false], 2, [2]>`|
|`[false]`|`2`|`[2]`|`1`|`false`|`[]`|`Chunk<[], 2, [2, false]>`|
|`[]`|`2`|`[2, false]`|`2`|`never`|`never`|`[S, ...Chunk<[], 2>]`|
|`[]`|`2`|`[]`|`0`|`never`|`never`|`S`|
