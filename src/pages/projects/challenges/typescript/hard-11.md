---
title: IsAny
date: 2022-5-5 17:29:31
level: 3
levelTitle: Hard
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/00223-hard-isany/README.md)

### 问题

```typescript
type case1 = IsAny<any> //  true
type case2 = IsAny<undefined> //  false
type case3 = IsAny<unknown> //  false
type case4 = IsAny<never> //  false
type case5 = IsAny<string> //  false
```

### 解答

```typescript
type IsAny<X, Y = any> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false
```

### 拆分
* 当用一些类型代替 `X` 和 `Y` 时，第二个 `extends` 关键字所做的基本上是问一个问题。
* `<T>() => (T extends X ? 1 : 2)` 类型的变量是否可以赋值给 `(<T>() => (T extends Y ? 1 : 2))` 类型变量？
``` typescript
declare let x: <T>() => (T extends /*1st*/ number ? 1 : 2)
declare let y: <T>() => (T extends /*3rd*/ number ? 1 : 2)
y = x // 正确不会报错

declare let x: <T>() => (T extends /*1st*/ any ? 1 : 2)
declare let y: <T>() => (T extends /*3rd*/ number ? 1 : 2)
y = x // 报错了
```
* 条件类型的可赋值规则 `<…>` 要求扩展后的类型与检查器定义的类型 **相同/一模一样**。
* 在解答里第三个 `extends` 和第一个 `extends` 里只有当 `X` 和 `Y` 相同时，才会赋值成功。比如两个都为 `number` 类型。
``` typescript
declare let x: <T>() => (T extends /*1st*/ number ? 1 : 2)
declare let y: <T>() => (T extends /*3rd*/ number ? 1 : 2)
y = x // 正确不会报错
```
* 如果用 `string` 替换其中一个 `number`，则会报错。
``` typescript
declare let x: <T>() => (T extends /*1st*/ number ? 1 : 2)
declare let y: <T>() => (T extends /*3rd*/ string ? 1 : 2)
y = x // 报错了
```
* 现在扩展后的类型不相同，因此会出现错误。
``` typescript
declare let x: <T>() => (T extends number ? 1 : 2)
declare let y: <T>() => (T extends string ? 1 : 2)

const a = x<string>() // "a" 是 "2" 因为 string 不能分配给 number
const b = x<number>() // "b" 是 "1"

const c = y<string>() // "c" 是 "1" 因为 string 可以分配给 string
const d = y<number>() // "d" 是 "2"

y = x // 报错了
// 根据 "y" 的类型声明，我们知道 "e" 应该是 "1" 类型
// 但我们只是把 "x" 分配给 "y"，我们知道在这个场景中 "x" 返回 "2"
// 这是不对的
const e = y<string>() 
// 这里也一样，根据 "y" 类型，这应该是 "2" ，但因为 "y" 现在是 "x",
// 这里应该是 "1"
const f = y<number>()
```
* 利用 `<…>` 来达到判断是否完全相等的目的。
