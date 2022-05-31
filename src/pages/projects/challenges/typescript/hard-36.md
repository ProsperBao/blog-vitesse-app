---
title: Assign 
date: 2022-5-31 18:15:03
level: 3
levelTitle: Hard
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/09160-hard-assign/README.md)

### 问题

实现一个类型的 `Object.assign`

```typescript
// case1
type Case1Target = {}

type Case1Origin1 = {
  a: 'a'
}

type Case1Origin2 = {
  b: 'b'
}

type Case1Origin3 = {
  c: 'c'
}

type Case1Answer = {
  a: 'a'
  b: 'b'
  c: 'c'
}

// case2
type Case2Target = {
  a: [1, 2, 3]
}

type Case2Origin1 = {
  a: {
    a1: 'a1'
  }
}

type Case2Origin2 = {
  b: [2, 3, 3]
}

type Case2Answer = {
  a: {
    a1: 'a1'
  }
  b: [2, 3, 3]
}

// case3

type Case3Target = {
  a: 1
  b: ['b']
}

type Case3Origin1 = {
  a: 2
  b: {
    b: 'b'
  }
  c: 'c1'
}

type Case3Origin2 = {
  a: 3
  c: 'c2'
  d: true
}

type Case3Answer = {
  a: 3
  b: {
    b: 'b'
  }
  c: 'c2'
  d: true
}

// case 4
type Case4Target = {
  a: 1
  b: ['b']
}

type Case4Answer = {
  a: 1
  b: ['b']
}
```

### 解答

```typescript
type AssignObject<Target extends object, Source> = 
Source extends object
? {
  [K in keyof Target | keyof Source]: 
    K extends keyof Source 
    ? Source[K] 
    : K extends keyof Target 
    ? Target[K]: never
}
: Target

type Assign<T extends Record<string, unknown>, U extends unknown[]> = 
U extends [infer Head, ...infer Tail]
? Assign<AssignObject<T, Head>, Tail>
: T
```

### 拆分

- 递归合并
- Source 优先因为要覆盖原属性
