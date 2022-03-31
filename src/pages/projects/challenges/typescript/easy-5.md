---
title: 获取元组长度
date: 2022-03-20 14:50:00
level: 1
levelTitle: Easy
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/18-easy-tuple-length/README.zh-CN.md)
### 问题
创建一个通用的`Length`，接受一个`readonly`的数组，返回这个数组的长度。

例如：

```ts
type tesla = ['tesla', 'model 3', 'model X', 'model Y']
type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

type teslaLength = Length<tesla> // expected 4
type spaceXLength = Length<spaceX> // expected 5
```

### 解答

```typescript
type Length<T extends readonly any[]> = T['length']
```

### 拆分
1. `T extends readonly any[]` 限制了 `T` 必须是元组
2. `T['length']` 返回 `T` 的长度
