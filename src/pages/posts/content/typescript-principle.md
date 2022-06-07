---
title: Typescript 原理
date: 2022-6-06 15:21:28
lang: zh-CN
duration: 5min
description: Typescript 原理
tags: other
type: learn
---

[[toc]]

## 类型安全和类型改变

TypeScript 给 JavaScript 添加了一套静态类型系统，目的是保证类型安全，也就是保证变量只能赋同类型的值，对象只能访问它有的属性和方法。

这是类型检查做的事情，遇到类型安全问题会在编译时报错。

但这种类型安全的限制不能过于死板，需要一些变通，比如子类型可以赋值给父类型的变量，可以完全当成父类型使用，也就是型变 `类型改变 variant`。

型变分为两种，一种是子类型可以赋值给父类型，叫做协变 `covariant`；一种是父类型可以赋值给子类型，叫做逆变 `contravariant`。

非父子类型不会发生型变，也就是不变 `invariant`。

### 协变

```ts
interface Person {
  name: string
  age: number
}

interface Guang {
  name: string
  age: number
  hobbies: string[]
}
```

`Guang` 是 `Person` 的子类型，更具体，所以 `Guang` 类型的变量可以赋值给 `Person` 类型。仍然类型安全。

这种子类型可以赋值给父类型的情况就是协变。

### 逆变

```ts
let printHobbies: (guang: Guang) => void

printHobbies = (guang) => {
  console.log(guang.hobbies)
}

let printName: (person: Person) => void

printName = (person) => {
  console.log(person.name)
}

printHobbies = printName

// 报错
printName = printHobbies
```

`printName` 调用时按照子类型 `Guang` 约束类型，但实际上只用到了父类型 `Person` 的属性和方法，类型依然安全。

这就是逆变，函数的参数具有逆变的性质，而返回值是协变的。

反回来，`printHobbies` 赋值给 `printName` 时，函数参数按照 `Person` 的类型进行约束，但是调用时，按照 `Guang` 的类型访问属性和方法，类型不安全，所以报错。

在 ts2.x 之前支持这种赋值，父类型可以赋值给子类型，子类型也可以赋值给父类型，既逆变又协变，叫做双向协变。

双向协变不能保证类型安全。

`tsconfig.json` 中的 `strictFunctionTypes` 为 `true` 时只支持函数参数的逆变，为 `false` 则支持双向协变。

### 不变

非父子类型不会发生型变，只要类型不一样就会报错。

### 父子类型判断

Java 里的类型是通过 extends 继承，如果 A extends B ，那 A 就是 B 的子类型。这种叫做名义类型系统 `nominal type`。

而在 TypeScript 中，只要结构上是一致的，那就可以确定父子关系，这种叫做结构类型系统 `structural type`。

## 条件类型

### 相等和相关

如果两个条件类型 `T1 extends U1 ? X1 : Y1` 和 `T2 extends U2 ? X2 : Y2` 相关的话，那 T1 和 T2 相关，X1 和 X2 相关，Y1 和 Y2 相关，而 U1 和 U2 **相等**。

如果是判断相关性，任意类型 extends any 都是 true ，但通过构造两个条件类型 判断相关性，就可以利用 extends 右边部分相等的性质来判断两个类型是否 equal 。

### 推导

类型编程中如果需要取类型参数做一些计算时，默认推导出的是约束的类型，如果没有类型约束，为 unknown 。

### 特殊情况

联合类型、any 、never 、boolean ：

1. 联合类型有分布式条件类型的特性，会分发传入
1. boolean 本质是 `true | false` 的联合类型
1. any 会直接返回 trueType 和 falseType 的联合类型
1. never 会直接返回 never ，严格来说也是分布式条件类型的一种情况
