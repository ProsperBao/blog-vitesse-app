---
title: Trim Right
date: 2022-4-22 17:31:15
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/type-challenges/type-challenges/blob/main/questions/04803-medium-trim-right/README.zh-CN.md)

### 问题
实现 `TrimRight<T>` ，它接收确定的字符串类型并返回一个新的字符串，其中新返回的字符串删除了原字符串结尾的空白字符串。

例如

```typescript
type Trimed = TrimLeft<'  Hello World  '> // 应推导出 '  Hello World'
```

### 解答

```typescript
type TrimRight<S extends string> = S extends `${infer Sub}${' ' | '\n\t'}` ? TrimRight<Sub> : S
```

### 拆分
1. 递归调用，递归判断右边是否为空白字符
