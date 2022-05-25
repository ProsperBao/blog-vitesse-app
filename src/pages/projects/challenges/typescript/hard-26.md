---
title: ClassPublicKeys 
date: 2022-5-25 18:06:25
level: 3
levelTitle: Hard
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/02828-hard-classpublickeys/README.md)

### 问题

实现 `ClassPublicKeys<T>` 拿出类中允许访问的属性

```typescript
class A {
  public str: string
  protected num: number
  private bool: boolean
  constructor() {
    this.str = 'naive'
    this.num = 19260917
    this.bool = true
  }

  getNum() {
    return Math.random()
  }
}

type case1 = ClassPublicKeys<A> // 'str' | 'getNum'
```

### 解答

```typescript
type ClassPublicKeys<T, K = keyof T> = K extends keyof T ? K : never
```

### 拆分
1. `keyof T` 会过只拿出允许访问的属性

