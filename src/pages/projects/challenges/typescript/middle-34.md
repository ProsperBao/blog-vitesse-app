---
title: 减1
date: 2022-4-11 14:27:51
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/2257-medium-minusone/README.md)

### 问题
给定一个数字（总是正数）作为类型。你的类型应该返回减少1的数字。
```typescript
type case1 = MinusOne<1> //  0
type case2 = MinusOne<55> //  54
type case3 = MinusOne<3> //  2
type case4 = MinusOne<100> //  99
```

### 解答
有点小问题，超过 1000 就没用了，其他参考答案是超过 9999 也没用了。

```typescript
type MinusOne<T extends number,Result extends number[] = []> = T extends Result['length'] 
? Result extends [infer _F,...infer R] 
  ? R['length'] 
  : 0 
: MinusOne<T, [...Result, 1]>
```

### 拆分
1. 利用数组的 `length` 来计算长度
2. 大部分方法都无法做到返回数字的 `-1`
3. 所以这道题不做深究，满足基础的测试用例就行了
