---
title: Push
date: 2022-03-22 12:35:00
level: 1
levelTitle: Easy
---

[[toc]]

[问题来源(https://github.com/type-challenges/type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/898-easy-includes/README.zh-CN.md)
### 问题
在类型系统里实现通用的 `Array.push` 。

举例如下，

```typescript
type Result = Push<[1, 2], '3'> // [1, 2, '3']
```

### 解答

```typescript
type Push<T extends unknown[], U> = [...T, U]
```

### 拆分
1. `T extends unknown[]` 限制 `T` 只能是数组类型
2. 通过解构加入 `U` 形成新的类型