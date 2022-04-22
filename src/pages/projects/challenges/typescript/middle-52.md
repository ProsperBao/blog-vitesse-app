---
title: AllCombinations 
date: 2022-4-22 14:14:40
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/04260-medium-nomiwase/README.md)

### 问题

实现类型的 `AllCombinations<S>` 返回 `S` 拆分后所有的可能。

```typescript
type case1 = AllCombinations<''> //  ''
type case2 = AllCombinations<'A'> //  '' | 'A'
type case3 = AllCombinations<'AB'> //  '' | 'A' | 'B' | 'AB' | 'BA'
type case4 = AllCombinations<'ABC'> //  '' | 'A' | 'B' | 'C' | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB' | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'
type case5 = AllCombinations<'ABCD'> //  '' | 'A' | 'B' | 'C' | 'D' | 'AB' | 'AC' | 'AD' | 'BA' | 'BC' | 'BD' | 'CA' | 'CB' | 'CD' | 'DA' | 'DB' | 'DC' | 'ABC' | 'ABD' | 'ACB' | 'ACD' | 'ADB' | 'ADC' | 'BAC' | 'BAD' | 'BCA' | 'BCD' | 'BDA' | 'BDC' | 'CAB' | 'CAD' | 'CBA' | 'CBD' | 'CDA' | 'CDB' | 'DAB' | 'DAC' | 'DBA' | 'DBC' | 'DCA' | 'DCB' | 'ABCD' | 'ABDC' | 'ACBD' | 'ACDB' | 'ADBC' | 'ADCB' | 'BACD' | 'BADC' | 'BCAD' | 'BCDA' | 'BDAC' | 'BDCA' | 'CABD' | 'CADB' | 'CBAD' | 'CBDA' | 'CDAB' | 'CDBA' | 'DABC' | 'DACB' | 'DBAC' | 'DBCA' | 'DCAB' | 'DCBA'

```

### 解答

```typescript
type Split<S extends string> = S extends `${infer F}${infer Rest}` ? F | Split<Rest> : ''
type AllCombinations<
  Str extends string,
  S extends string = Split<Str>
> = 
  [S] extends [never]
  ? ''
  : '' | {[K in S]: `${K}${AllCombinations<never, Exclude<S, K>>}`}[S]
```

### 拆分
1. 首先利用 `Split` 函数拆分字符串，让字符串变成每个字符的联合类型
2. 判断 `S` 是否是 `never` 如果是 `never` 则返回 `''`
3. 否则则递归处理联合类型
4. `{[K in S] }[S]` 可以利用联合类型的自动分配来处理所有的情况
5. 下次递归的时候排除 `S` 中已经使用的字符
6. 继续递归处理

