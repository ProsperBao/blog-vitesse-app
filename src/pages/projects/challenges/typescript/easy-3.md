---
title: 元组转换为对象
date: 2022-03-18 11:08:00
level: 1
levelTitle: Easy
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/11-easy-tuple-to-object/README.zh-CN.md)
### 问题
传入一个元组类型，将这个元组类型转换为对象类型，这个对象类型的键/值都是从元组中遍历出来。

例如：

```ts
const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

type result = TupleToObject<typeof tuple> // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
```

### 解答

```typescript
type TupleToObject<T extends readonly any[]> = {[key in T[number]]: key}
```

### 拆分
1. `['tesla', 'model 3', 'model X', 'model Y'] as const` 是把字符串数组转换为只读不可修改的元组
2. `readonly any[]` 是只读不可修改的元组，把 `T` 的范围限制在 `readonly ['tesla', 'model 3', 'model X', 'model Y']` 中
3. `T[number]` 是索引 `T` 中元组的的一项
4. 把元组中的每一项转换为对象的键并且用这个键作为值，构造一个新的对象类型并返回
