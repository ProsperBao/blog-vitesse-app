---
title: ObjectEntries
date: 2022-4-13 16:33:57
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/2946-medium-objectentries/README.md)

### 问题

```typescript
interface Model {
  name: string;
  age: number;
  locations: string[] | null;
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null];

type case1 = ObjectEntries<Model> // ModelEntries
type case2 = ObjectEntries<Partial<Model>> // ModelEntries
type case3 = ObjectEntries<{ key?: undefined }> // ['key', undefined]
type case4 = ObjectEntries<{ key: undefined }> // ['key', undefined
```

### 解答

```typescript
type ObjectEntries<T, K = keyof T> = K extends keyof T ? [K, T[K] extends undefined ? undefined : Required<T>[K]] : never;
```

### 拆分
1. `K` 为 `T` 的所有键
2. 因为 `keyof T` 产生的是一个联合类型
3. 联合类型会自动分配后面的处理
4. 所以结果也是联合类型长度和 `keyof T` 产生的联合类型一致
5. 接下来就可以利用产生的联合类型返回 `[xx, xx]`格式
6. 判断 `T[K]` 类型是否为单个 `undefined` 如果是需要保留
7. 其他情况全部变为必须
