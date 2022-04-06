---
title: Merge
date: 2022-3-31 12:22:57
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/599-medium-merge/README.md)

### 问题
将两种类型合并为一种新类型。第二种类型的键将覆盖第一种类型的键。

```typescript
type Foo = {
  a: number;
  b: string;
};
type Bar = {
  b: number;
  c: boolean;
};
type Result = Merge<Foo, Bar> = {
	a: number;
	b: number;
	c: boolean;
}
```

### 解答
```typescript
type Merge<F extends object, S extends object> = {
  [K in keyof F| keyof S]: K extends keyof S ? S[K]: K extends keyof F ? F[K]: never
}
```

### 拆分
1. 利用联合类型把所有的 `key` 拿出来
2. 有限确定 `key` 是否是 `S` 的 `key` 返回 `S[K]`
3. 再确定 `key` 是否是 `F` 的 `key` 返回 `F[K]`
4. 都不是就返回 `never`
