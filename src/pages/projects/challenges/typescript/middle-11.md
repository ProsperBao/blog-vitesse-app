---
title: Trim Left
date: 2022-3-29 11:05:20
level: 2
levelTitle: Middle
---

[[toc]]

[问题来源(https://github.com/type-challenges/type-challenges)](https://github.com/FuBaooo/type-challenges/blob/master/questions/106-medium-trimleft/README.zh-CN.md)

### 问题
实现 `TrimLeft<T>` ，它接收确定的字符串类型并返回一个新的字符串，其中新返回的字符串删除了原字符串开头的空白字符串。

例如
```typescript
type trimed = TrimLeft<'  Hello World  '> // 应推导出 'Hello World  '
```

### 解答
```typescript
type TrimLeft<S extends string> = S extends `${' '| '\n'|'\t'}${infer R}` ? TrimLeft<R> : S
```

### 拆分
1. `S` 必须要为 `string` 类型
2. `S` 是否满足 `' '| '\n'|'\t'` 开头
3. 因为实际上包含一个联合的字符串类型
4. 所以因为联合类型会自动分配，所以实际上执行推断的时候会转化成
```typescript
  `${' '}${infer R}`  ? TrimLeft<R> : S |
  `${'\n'}${infer R}` ? TrimLeft<R> : S | 
  `${'\t'}${infer R}` ? TrimLeft<R> : S
```
5. 最终经过递归处理左边的空白字符串，返回正确的推断
