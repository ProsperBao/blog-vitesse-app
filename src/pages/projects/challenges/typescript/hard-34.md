---
title: Two Sum
date: 2022-5-31 15:22:31
level: 3
levelTitle: Hard
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/08804-hard-two-sum/README.md)

### 问题

实现一个类型版的 `两数之和`

```typescript
type case1 = TwoSum<[3, 3], 6> // true
type case2 = TwoSum<[3, 2, 4], 6> // true
type case3 = TwoSum<[2, 7, 11, 15], 15> // false
type case4 = TwoSum<[2, 7, 11, 15], 9> // true
type case5 = TwoSum<[1, 2, 3], 0> // false
type case6 = TwoSum<[1, 2, 3], 1> // false
type case7 = TwoSum<[1, 2, 3], 2> // false
type case8 = TwoSum<[1, 2, 3], 3> // true
type case9 = TwoSum<[1, 2, 3], 4> // true
type case10 = TwoSum<[1, 2, 3], 5> // true
type case11 = TwoSum<[1, 2, 3], 6> // false
```

### 解答

```typescript
type ToArray<T extends number, Res extends unknown[] = []> = Res['length'] extends T ? Res : ToArray<T, [...Res, 1]>
type Sub<A extends number, B extends number> = ToArray<A> extends [...ToArray<B>, ...infer Rest] ? Rest['length'] : false;
type Tail<T extends unknown[]> = T extends [infer _, ...infer Rest] ? Rest : [];

type TwoSum<T extends number[], U extends number> = 
T['length'] extends 0
? false
: Sub<U, T[0]> extends Tail<T>[number]
  ? true
  : TwoSum<Tail<T>, U>
```

### 拆分

- 查找到长度为 0 则表示不存在结果
- 先看第一个元素和目标相减并且后续有元素等于差值
- 如果有则返回
- 如果没有则剔除第一个然后继续递归查找结果
