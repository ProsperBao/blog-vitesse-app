---
title: DeepPick
date: 2022-5-7 14:08:43
level: 3
levelTitle: Hard
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/00956-hard-deeppick/README.md)

### 问题

实现一个类型 DeepPick，它扩展了实用程序类型 `Pick`。一个类型需要两个参数。

```typescript
type Obj = {
  a: number
  b: string
  c: boolean
  obj: {
    d: number
    e: string
    f: boolean
    obj2: {
      g: number
      h: string
      i: boolean
    }
  }
  obj3: {
    j: number
    k: string
    l: boolean
  }
}

type case1 = DeepPick<Obj, ''> // unknown
type case2 = DeepPick<Obj, 'a'> // { a: number }
type case3 = DeepPick<Obj, 'a' | 'obj.e'> // { a: number } & { obj: { e: string } }
type case4 = DeepPick<Obj, 'a' | 'obj.e' | 'obj.obj2.i'> // { a: number } & { obj: { e: string } } & { obj: { obj2: { i: boolean } } }
```

### 解答

```typescript
type UnionToIntersection<U> = (U extends unknown ? (_: U) => 0 : never) extends (_: infer R) => 0 ? R : never;

type Split<S extends string> = S extends `${infer F}.${infer Rest}` ? [F, ...Split<Rest>] : [S];

type Tail<P extends string[]> = P extends [unknown, ...infer T] ? T : [];

type PickByPath<O, Path extends string[]> =
Path extends []
? O
: Path[0] extends keyof O
  ? { [K in Path[0]]: PickByPath<O[Path[0]], Tail<Path>> }
  : unknown

type DeepPick<O, Keys extends string> = UnionToIntersection< Keys extends string ? PickByPath<O, Split<Keys>> : never>
```

### 拆分
* 首先是联合类型转为交叉类型需要用函数参数分发联合类型
* `1 | 2` 通过 `(_:1)=>0 & (_:2)=>0` 转换为 `1 & 2`
* 然后是根据字符串的 `.` 拆分路径，拆分为数组
* 然后就是递归形成新的对象 (以当前属性和剩余路径参数递归, 如果当前路径参数为空则直接传入的属性)
* 如果题目没有要求是变为交叉类型可以不需要进行交叉类型的处理
