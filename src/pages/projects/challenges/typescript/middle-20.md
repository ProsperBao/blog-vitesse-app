---
title: Append to object
date: 2022-3-31 11:02:51
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/FuBaooo/type-challenges/blob/master/questions/527-medium-append-to-object/README.md)

### 问题
实现向接口添加新字段的类型。类型接受三个参数。输出应该是具有新字段的对象。

```typescript
type Test = { id: '1' }
type Result = AppendToObject<Test, 'value', 4> // expected to be { id: '1', value: 4 }
`

### 解答
```typescript
type AppendToObject<T extends object, U extends string, V> = { 
  [K in keyof T|U]: K extends keyof T ? T[K] : V
}
```

### 拆分
1. 首先利用 `keyof T` 获取到所有的 `key` 然后和 `U` 形成联合类型
2. `K in keyof T` 为新对象类型的索引
3. `K extends keyof T` 为判断 `K` 是否是 `T` 的索引如果不是则就是需要新添加的字段
