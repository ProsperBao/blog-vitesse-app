---
title: Percentage Parser
date: 2022-4-9 15:22:32
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/1978-medium-percentage-parser/README.md)

### 问题
实现PercentageParser。根据 `/^(\+|\-)?(\d*)?(\%)?$/` 规律性匹配T并获得三个匹配。

结构应该是：[`加号或减号`, `数字`, `单位`]如果未捕获，则默认为空字符串。
```typescript
type Case1 = PercentageParser<''> // ['', '', '']
type Case2 = PercentageParser<'+'> // ['+', '', '']
type Case3 = PercentageParser<'+1'> // ['+', '1', '']
type Case4 = PercentageParser<'+100%'> // ['+', '100', '%']
type Case5 = PercentageParser<'10%'> // ['', '10', '%']
type Case6 = PercentageParser<'-99%'> // ['-', '99', '%']
type Case7 = PercentageParser<'-9a9%'> // ['-', '', '%']
```

### 解答
```typescript
type Num = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0';
type FilterCase<T extends string> = 
  T extends `${infer F}${infer Rest}`
    ? F extends Num
      ? FilterCase<Rest>
      : `${F}${FilterCase<Rest>}`
    : '';
type IsNumber<T extends string> = FilterCase<T> extends '' ? true : false;

type CheckPrefix<T> = T extends '+' | '-' ? T : false;
type CheckSuffix<T extends string> = T extends `${infer N}%` ?  [IsNumber<N> extends true ? N : '', '%']: [IsNumber<T> extends true ? T : '', ''];
type PercentageParser<A extends string> = A extends `${CheckPrefix<infer P>}${infer Rest}` ? [P, ...CheckSuffix<Rest>] : ['', ...CheckSuffix<A>];
```

### 拆分
1. 需要拆分成两种情况看待
  1. 第一个字符是 `+/-` 两个其中一个
  2. 第一个字符不是 `+/-` 两个其中一个
2. ```A extends '${CheckPrefix<infer P>}${infer Rest}' ``` 使表达式成立的条件
  1. 字符串满足包括子表达式中的条件也成立
  2. `CheckPrefix<infer P>` 内部的 `T extends '+' | '-'` 为 `true`
  3. ```A extends '${CheckPrefix<infer P>}${infer Rest}' ``` 成立就相当于 `CheckPrefix<infer P>` 成立
  4. 也就是说 `infer P` 要在 `+/-` 两个其中一个
3. 如果 `2.` 中不满足就相当于符号位为 `""`
4. 接下来就是检查字符串是否以 `%` 结尾
5. 在原题中明确的要求数组的第二个是数字，所以必须检查合法性，避免数字中混杂着非数字
