---
title: Type Lookup
date: 2022-3-29 10:37:49
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)]()

### 问题
有时，您可能希望根据其属性在并集中查找类型。

在此挑战中，我们想通过在联合 `Cat | Dog` 中搜索公共type字段来获取相应的类型。换句话说，在以下示例中，我们期望 `LookUp<Dog | Cat, 'dog'>` 获得Dog，LookUp `<Dog | Cat, 'cat'>` 获得Cat。

```typescript
interface Cat {
  type: 'cat'
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
}

interface Dog {
  type: 'dog'
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
  color: 'brown' | 'white' | 'black'
}

type MyDog = LookUp<Cat | Dog, 'dog'> // expected to be `Dog`
```

### 解答
```typescript
type LookUp<U, T extends string> = U extends {type: T} ? U : never
```

### 拆分
1. 联合类型会自动分配所以 `Cat | Dog` 的类型。
2. 会变成 `Cat extends { type: T } ? Cat : never | Dog extends { type: T } ? Dog : never`
3. `T extends string` 传入的是 `dog` 所以实际上自动分配后的类型是
4. `Cat extends { type: 'dog' } ? Cat : never | Dog extends { type: 'dog' } ? Dog : never`
5. 结果是 `never ｜ Dog`
