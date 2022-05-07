---
title: Deep object to unique
date: 2022-5-7 10:45:34
level: 3
levelTitle: Hard
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/00553-hard-deep-object-to-unique/README.md)

### 问题

TypeScript具有结构化类型系统，但有时希望函数只接受一些以前定义良好的唯一对象（如在标准类型系统中），而不是任何具有所需字段的对象。

创建一个类型，该类型接受一个对象，并使其和其中所有深度嵌套的对象唯一，同时保留所有对象的字符串键和数字键，以及这些键上所有属性的值。

原始类型和生成的唯一类型必须可以相互分配，但不能完全相同。

```typescript
type Quz = { quz: 4 }

type Foo = { foo: 2; baz: Quz; bar: Quz }
type Bar = { foo: 2; baz: Quz; bar: Quz & { quzz?: 0 } }

type UniqFoo = DeepObjectToUniq<Foo>
type UniqBar = DeepObjectToUniq<Bar>

declare let foo: Foo
declare let uniqFoo: UniqFoo

uniqFoo = foo
foo = uniqFoo

type case1 = Equal<UniqFoo, Foo> // false
type case2 = Equal<UniqFoo['foo'], Foo['foo']> // true
type case3 = Equal<UniqFoo['bar']['quz'], Foo['bar']['quz']> // true
type case4 = Equal<UniqFoo['bar'], UniqFoo['baz']> // false
type case5 = Equal<UniqBar['baz'], UniqFoo['baz']> // false
type case6 = Equal<keyof UniqBar['baz'], keyof UniqFoo['baz']> // true
type case7 = Equal<keyof Foo, keyof UniqFoo & string> // true
```

### 解答

```typescript
type DeepObjectToUniq<O extends object> = {
  [K in keyof O]: O[K] extends object ? DeepObjectToUniq<O[K] & { _?: [O, K] }> : O[K]
}
```

### 拆分

* 首先就是一个深层递归，根据属性是否是对象，决定是否进递归复制
* 需要满足互相分配，即使是同一个对象，也不能相同，所以需要加一个不存在的可选参数
* 可选参数 `& { _?: [O, K] }` 根据当前顶层对象进行可选对象的路径添加
