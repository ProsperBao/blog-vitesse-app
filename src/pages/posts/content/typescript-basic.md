---
title: Typescript 基础
date: 2022-5-31 15:43:13
lang: zh-CN
duration: 15min
description: Typescript 基础。
tags: other
type: learn
---

[[toc]]

Typescript 的类型系统是**图灵完备**的，能描述各种可计算逻辑。

## 类型是什么

在 typescript 中，类型具体就是指 number 、boolean 、string 等基础类型和 Object 、Function 等复合类型。

它们是编程语言提供的对不同内容的抽象：

- 不同类型变量占据的内存大小不同：boolean 类型的变量只会分配 1 个字节的内存，而 number 类型的变量则会分配 8 个字节的内存，给变量声明了不同的类型就代表了会占据不同的内存空间
- 不同类型变量可做的操作不同：number 类型可以进行加减乘除等运算，而 boolean 则不行；复合类型中不同类型的对象可用的方法不同；变量的类型不同代表可以对该变量做的操作就不同

保证对某种类型只做该类型允许的操作，就是**类型安全**。

## 类型检查

类型检查是为了保证类型安全。

类型检查可以在运行时做，也可以在编译期做。前者叫做动态类型检查，后者叫做静态类型检查。

- 动态类型检查

  - 源码不保留类型信息，对变量赋什么值、做什么操作都是允许的，更灵活
  - 类型不安全，运行时才能被检查出，有隐患

- 静态类型检查

  - 源码保留类型信息，声明变量需指定类型，对变量的操作要和类型匹配，有专门的编译器在编译期做检查
  - 给开发增加了难度，除了代码本身的逻辑，还要考虑类型逻辑
  - 消除了类型不安全的隐患

## 类型系统

### 简单类型系统

变量、函数、类等都可以声明类型，编译器会基于声明的类型做类型检查，类型不匹配时会报错。

这是最基础的类型系统，能保证类型安全，但有些死板。

### 支持泛型的类型系统

泛型 ( Generic Type ) ，通用的类型，它可以代表任何一种类型，叫做**类型参数**。

它给类型系统增加了灵活性。

声明时把会变化的类型参数，声明成泛型，在调用的时候再确定类型。

### 支持类型编程的类型系统

对传入的类型参数 ( 泛型 ) 做各种逻辑运算，产生新的类型，就是类型编程。

## typescript 的类型

ts 支持以下这些类型：

- number
- boolean
- string
- object
- bigint
- symbol
- undefined
- null
- class
- array
- tuple
- interface
- enum

还有一些包装类型：

- Number
- Boolean
- String
- Object
- Symbol

### 元组

元组是元素个数和类型固定的数组

```ts
type Tuple = [number, string, boolean]
```

### 接口

接口用来描述函数、构造器、索引类型 ( 对象、class、数组 ) 等复合类型。

```ts
// 对象
interface IPerson {
  name: string
  age: number
}

// 类可以实现接口
// interface 在运行时会被消除，而类不会
class Person implements IPerson {
  name: string
  age: number
}

// 函数
interface Add {
  (a: number, b: number): number
}

// 函数重载
interface Add2 {
  (a: number, b: number): number
  (a: string, b: string): string
}

// 构造器
interface PersonClassConstructor {
  new (name: string, age: number): IPerson
}

function createPerson(ctor: PersonClassConstructor): IPerson {
  return new ctor("user", 18)
}
```

对象类型、class 类型在 TypeScript 中也叫做索引类型，也就是索引了多个元素的类型的意思。

对象可以动态添加属性，如果不确定有什么属性，可以使用索引签名：

```ts
interface IPerson {
  [prop: string]: string | number
}
```

### 枚举

枚举 ( Enum ) 是一系列值的复合

```ts
enum Direction {
  TOP = "top",
  BOTTOM = "bottom",
  LEFT = "left",
  RIGHT = "right",
}
```

### 字面量类型

```ts
type Str1 = "aaa"
type Num = 1
type Obj = { a: 1 }

// 字符串的第二种字面量类型 - 模板字面量
type Str2 = `#${string}`
```

### 特殊类型

- void：代表空，可以是 null 或者 undefined，一般用于函数返回值
- any：任意类型，任意类型都可以赋值给它，它也可以赋值给任何类型 ( 除了 never )
- unknown：未知类型，任何类型都可以赋值给它，但它不可以赋值给其它类型
- never：不可达，比如函数抛出异常的时候，返回值是 never

## 类型装饰

除了描述类型的结构，TypeScript 的类型系统还支持描述类型的属性，比如是否可选、是否只读等：

```ts
interface IPerson {
  // 只读
  readonly name: string
  // 可选
  age?: number
}
```

## 类型运算

### 条件类型

条件类型：`extends ? :` ，TypeScript 类型系统中的 `if else` ，进行动态的类型运算，即对类型参数的运算。

```ts
type IsTwo<T extends number> = T extends 2 ? true : false

type Res = isTwo<1> // false
type Res2 = isTwo<2> // true
```

形如 `IsTwo<T>` 这种类型也叫做**高级类型**。

高级类型的特点是传入类型参数，经过类型运算后，返回新的类型。

### 推导类型

TypeScript 使用 `infer` 进行类型的推导 / 提取。

```ts
// 提取元组类型的第一个元素
type First<T extends unknown[]> = T extends [infer T, ...infer Rest] ? T : never

type Res = First<[1, 2, 3]> // 1
```

注意：`T extends unknown[]` 的 `extends` 不是条件类型，而是类型约束 ( Type Constraint ) 。

### 联合类型

联合类型 ( Union ) 类似 JavaScript 的或运算符 `|` ，但是作用于类型，表明类型可以是几个类型之一。

```ts
type Nums = 1 | 2 | 3
```

### 交叉类型

交叉类型 ( Intersection ) 类似 JavaScript 中的与运算符 `&` ，但是作用于类型，表明对类型进行合并。

```ts
type Obj = { a: number } & { b: string } // { a: number, b: string }

// 不同类型无法合并
type res = "1" & 1 // never
```

### 映射类型

对象、class 在 TypeScript 对应的类型是索引类型 ( Index Type ) ，需要用映射类型来修改索引类型。

映射类型：把一个集合映射到另一个集合。

```ts
type MapType<T> = {
  [Key in keyof T]?: T[Key]
}
```

`keyof T` 是查询索引类型中所有的索引，叫做**索引查询**。

`T[Key]` 是取索引类型某个索引的值，叫做**索引访问**。

`in` 是用于遍历联合类型的运算符

```ts
// 值和索引都可以变化
type MapType<T> = {
  [Key in keyof T as `${Key & string}${Key & string}`]: [T[Key], T[Key]]
}
```

用 `as` 运算符改变索引被称为**重映射**。
