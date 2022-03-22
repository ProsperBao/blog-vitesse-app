---
title: Unshift
date: 2022-03-22 13:25:00
level: 1
levelTitle: Easy
---

[[toc]]

[问题来源(https://github.com/type-challenges/type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/3060-easy-unshift/README.zh-CN.md)
### 问题
实现类型版本的 ```Array.unshift```。

举例，

```typescript
type Result = Unshift<[1, 2], 0> // [0, 1, 2,]
```

### 解答

```typescript
type Unshift<T extends unknown[], U> = [U, ...T]
```

### 拆分
1. `T extends unknown[]` 限制 `T` 只能是数组类型
2. 通过解构加入 `U` 形成新的类型