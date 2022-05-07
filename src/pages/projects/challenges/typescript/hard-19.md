---
title: Union to Tuple
date: 2022-5-7 11:18:23
level: 3
levelTitle: Hard
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/00730-hard-union-to-tuple/README.md)

### 问题

实现类型版本的 `UnionToTuple` 把 `Union` 转换为 `Tuple`。

正如我们所知，并集是一种无序结构，但元组是一种有序结构，这意味着我们不应该预先假定在创建或转换并集时，在一个并集的术语之间会保留任何顺序。

因此，在这个挑战中，**输出元组中元素的任何排列都是可以接受的**。

您的类型应该解析为以下两种类型之一，但***不是***它们的联合体！

```typescript
UnionToTuple<1>           // [1], and correct
UnionToTuple<'any' | 'a'> // ['any','a'], and correct
```
或者 
```typescript
UnionToTuple<'any' | 'a'> // ['a','any'], and correct
```
它不应该是所有可接受的元组的联合...
```typescript
UnionToTuple<'any' | 'a'> // ['a','any'] | ['any','a'], which is incorrect
```

```typescript
type ExtractValuesOfTuple<T extends any[]> = T[keyof T & number];

type case1 = UnionToTuple<'a' | 'b'>['length'], 2
type case2 = ExtractValuesOfTuple<UnionToTuple<'a' | 'b'>> // 'a' | 'b'
type case3 = ExtractValuesOfTuple<UnionToTuple<'a'>> // 'a'
type case4 = ExtractValuesOfTuple<UnionToTuple<any>> // any
type case5 = ExtractValuesOfTuple<UnionToTuple<undefined | void | 1>> // void | 1
type case6 = ExtractValuesOfTuple<UnionToTuple<any | 1>> // any | 1
type case7 = ExtractValuesOfTuple<UnionToTuple<any | 1>> // any
type case8 = ExtractValuesOfTuple<UnionToTuple<'d' | 'f' | 1 | never>> // 'f' | 'd' | 1
type case9 = ExtractValuesOfTuple<UnionToTuple<[{ a: 1 }] | 1>> // [{ a: 1 }] | 1
type case10 = ExtractValuesOfTuple<UnionToTuple<never>> // never
type case11 = ExtractValuesOfTuple<UnionToTuple<'a' | 'b' | 'c' | 1 | 2 | 'd' | 'e' | 'f' | 'g'>> // 'f' | 'e' | 1 | 2 | 'g' | 'c' | 'd' | 'a' | 'b'
```

### 解答

```typescript
type UnionToIntersection<U> = (U extends unknown ? (_: U) => 0 : never) extends (_: infer R) => 0 ? R : never;
type LastOfUnion<U> = UnionToIntersection<U extends unknown ? (_: U) => 0 : never> extends (_: infer R) => 0 ? R : never;
type UnionToTuple<T, Last =  LastOfUnion<T>> = [T] extends [never] ? [] : [...UnionToTuple<Exclude<T, Last>>, Last]
```

### 拆分
* 首先需要把 `Union` 转换为 `Intersection` (交叉类型 `&`)，即把 `Union` 转换为 `Intersection`
* 然后需要取出 `Intersection` 中的最后一个元素
* 并递归处理

1. 从联合类型 `T` 中提取出联合类型的最后一个元素 `Last`
2. 如果 `T` 是 `never`，则返回空数组
3. 如果 `T` 不是 `never`，则返回一个数组由递归处理结果和 `Last` 组成
4. 递归处理的时候需要排除 `Last`
