---
title: Remove Index Signature
date: 2022-4-9 12:12:52
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/1367-medium-remove-index-signature/README.md)

### 问题
实现一个 `RemoveIndexSignature<T>`，去除对象中的索引签名

```typescript
type Foo = {
  [key: string]: any;
  foo(): void;
}

type A = RemoveIndexSignature<Foo>  // expected { foo(): void }
```


### 解答
```typescript
type RemoveIndexSignature<T> = {
  [K in keyof T as string extends K 
    ? never
    : K extends number
      ? never
      : K
  ]:T[K]
}

```

### 拆分
1. 需要把索引签名看成几个部分
  1. `K in keyof T as string`
  2. `⬆️ extends K`
  3. 后面的判断分支
2. 索引类型 `K` 可以是字符串，也可以是数字，暂不考虑其他类型
