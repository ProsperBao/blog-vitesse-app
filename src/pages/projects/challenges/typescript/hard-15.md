---
title: Tuple to Enum Object
date: 2022-5-6 16:49:09
level: 3
levelTitle: Hard
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/00472-hard-tuple-to-enum-object/README.md)

### 问题

enum是TypeScript的原始语法（它在JavaScript中不存在）。因此，它被转换成像下面的形式，作为一个透明的结果

```javascript
let OperatingSystem;
(function (OperatingSystem) {
    OperatingSystem[OperatingSystem["MacOS"] = 0] = "MacOS";
    OperatingSystem[OperatingSystem["Windows"] = 1] = "Windows";
    OperatingSystem[OperatingSystem["Linux"] = 2] = "Linux";
})(OperatingSystem || (OperatingSystem = {}));
```
在这个问题中，类型应该将给定的字符串元组转换为行为类似于枚举的对象。

此外，枚举的属性最好是驼峰命名。

```typescript
Enum<["macOS", "Windows", "Linux"]>
// -> { readonly MacOS: "macOS", readonly Windows: "Windows", readonly Linux: "Linux" }
```

如果第二个参数中给出了 `true`，则该值应为数字文字。

```typescript
  Enum<["macOS", "Windows", "Linux"], true>
  // -> { readonly MacOS: 0, readonly Windows: 1, readonly Linux: 2 }
```

```typescript
const OperatingSystem = ['macOS', 'Windows', 'Linux'] as const
const Command = ['echo', 'grep', 'sed', 'awk', 'cut', 'uniq', 'head', 'tail', 'xargs', 'shift'] as const

type case1 = Enum<[]> // {}
type case2 = Enum<typeof OperatingSystem>,
// {
//   readonly MacOS: 'macOS'
//   readonly Windows: 'Windows'
//   readonly Linux: 'Linux'
// }
type case3 = Enum<typeof OperatingSystem, true>,
// {
//   readonly MacOS: 0
//   readonly Windows: 1
//   readonly Linux: 2
// }
type case4 = Enum<typeof Command>,
// {
//   readonly Echo: 'echo'
//   readonly Grep: 'grep'
//   readonly Sed: 'sed'
//   readonly Awk: 'awk'
//   readonly Cut: 'cut'
//   readonly Uniq: 'uniq'
//   readonly Head: 'head'
//   readonly Tail: 'tail'
//   readonly Xargs: 'xargs'
//   readonly Shift: 'shift'
// }
type case5 = Enum<typeof Command, true>,
// {
//   readonly Echo: 0
//   readonly Grep: 1
//   readonly Sed: 2
//   readonly Awk: 3
//   readonly Cut: 4
//   readonly Uniq: 5
//   readonly Head: 6
//   readonly Tail: 7
//   readonly Xargs: 8
//   readonly Shift: 9
// }

```

### 解答

```typescript
type TupleKeys<T extends readonly unknown[]> = T extends readonly [infer _, ...infer Tail] ? TupleKeys<Tail> | Tail['length'] : never;


type Enum<T extends readonly string[], N extends boolean = false> = {
  readonly [K in TupleKeys<T> as Capitalize<T[K]>]: N extends true ? K : T[K]
}
```

### 拆分
* `in` 是用来遍历联合类型
* 所以需要把数组下标转换为联合类型
* 因为 `enum` 是只读得，所以需要使用 `readonly`
* 需要驼峰命名的 `key` 所以要用 `Capitalize`
* 如果 `N` 为 `true`，则 `key` 为数字

