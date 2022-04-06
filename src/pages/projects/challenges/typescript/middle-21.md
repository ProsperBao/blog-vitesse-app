---
title: Absolute
date: 2022-3-31 11:23:56
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/529-medium-absolute/README.md)

### 问题
实现一个绝对值类型，接收一个字符串, `number` or `bigint` , 输出应该是正数字符串
```typescript
type Test = -100;
type Result = Absolute<Test>; // expected to be "100"
```

### 解答
```typescript
type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer U}`? U :`${T}`
```

### 拆分
1. 首先统一转换为字符串进行比较
2. 判断转换过后的字符串首字符是 `-` 并使用 `infer U` 获取剩下的字符串
3. 如果是比对成功则 `U` 为结果，否则 `T` 包装成字符串后为结果
