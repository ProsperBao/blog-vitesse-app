---
title: AnyOf
date: 2022-4-4 22:59:02
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/949-medium-anyof/README.md)

### 问题
实现类型系统中的 `any` 函数。类型接受数组，如果数组中的任何元素为 `true`，则返回 `true`。如果数组为空，则返回 false。
```typescript
type Sample1 = AnyOf<[1, "", false, [], {}]>; // expected to be true.
type Sample2 = AnyOf<[0, "", false, [], {}]>; // expected to be false.
```

### 解答
```typescript
type IsEmpty<T> = T extends 0 | '' | false | [] 
  ? true
  : T extends object
    ? keyof T extends never
      ? true
      : false
    : false
type AnyOf<T extends readonly any[]> =  
  T extends [infer First, ...infer Rest]
    ? IsEmpty<First> extends false
      ? true
      : AnyOf<Rest>
    : false;

type test1 = AnyOf<[1, 'test', true, [1], {name: 'test'}, {1: 'test'}]> // true
type test2 = AnyOf<[1, '', false, [], {}]> // true
type test3 = AnyOf<[0, 'test', false, [], {}]> // true
type test4 = AnyOf<[0, '', true, [], {}]> // true
type test5 = AnyOf<[0, '', false, [1], {}]> // true
type test6 = AnyOf<[0, '', false, [], {name: 'test'}]> // true
type test7 = AnyOf<[0, '', false, [], {1: 'test'}]> // true
type test8 = AnyOf<[0, '', false, [], {name: 'test'}, {1: 'test'}]> // true
type test9 = AnyOf<[0, '', false, [], {}]> // false
type test10 = AnyOf<[]> // false
```

### 拆分
1. 首先拆分数组逐个判断是不是为是不是为 `false` 值
2. `IsEmpty` 为 `true` 表示是空值为 `false` 则不是
3. 如果当前值的 `IsEmpty<First>` 为 `false` 表示不是空值，直接返回 `true` 即可 
4. 如果当前值为 `false` 则递归判断下一个，直到全部完成返回 `false`
