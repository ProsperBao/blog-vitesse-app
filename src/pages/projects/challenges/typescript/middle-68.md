---
title: Subsequence  
date: 2022-4-29 16:00:44
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/08987-medium-subsequence/README.md)

### 问题

```typescript
type case1 = Subsequence<[1, 2]> // [] | [1] | [2] | [1, 2]
type case2 = Subsequence<[1, 2, 3]> // [] | [1] | [2] | [1, 2] | [3] | [1, 3] | [2, 3] | [1, 2, 3] 
```

### 解答

```typescript
type Subsequence<T> = T extends [infer One, ...infer Rest] ? [One] | [...Subsequence<Rest>] | [One, ...Subsequence<Rest>] : []
```
### 拆分
1. 通过拆分数组得到第一个元素和剩下所有的元素
2. 通过组合第一个单独元素和递归拆分剩下的元素和包含当前元素且也递归拆分剩下的元素
3. 组成成子序列，是有顺序的
