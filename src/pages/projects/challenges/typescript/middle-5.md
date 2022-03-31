---
title: 深度 Readonly
date: 2022-03-27 13:42:00
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/9-medium-deep-readonly/README.zh-CN.md)
### 问题
实现一个通用的`DeepReadonly<T>`，它将对象的每个参数及其子对象递归地设为只读。

您可以假设在此挑战中我们仅处理对象。数组，函数，类等都无需考虑。但是，您仍然可以通过覆盖尽可能多的不同案例来挑战自己。

例如

```ts
type X = { 
  x: { 
    a: 1
    b: 'hi'
  }
  y: 'hey'
}

type Expected = { 
  readonly x: { 
    readonly a: 1
    readonly b: 'hi'
  }
  readonly y: 'hey' 
}

type Todo = DeepReadonly<X> // should be same as `Expected`
```

### 解答

```typescript
type DeepReadonly<T> = { readonly [Key in keyof T]: T[Key] extends Object ? DeepReadonly<T[Key]>: T[Key] }
```

### 拆分
1. 递归包装每一个属性，如果是对象，则递归调用DeepReadonly
