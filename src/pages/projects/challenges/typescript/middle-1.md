---
title: 获取函数返回类型 
date: 2022-03-23 09:25:00
level: 2
levelTitle: Middle
---

[[toc]]

[问题来源(https://github.com/type-challenges/type-challenges)](https://github.com/type-challenges/type-challenges/blob/master/questions/2-medium-return-type/README.zh-CN.md)
### 问题

不使用 `ReturnType` 实现 TypeScript 的 `ReturnType<T>` 泛型。

例如：

```ts
const fn = (v: boolean) => {
  if (v)
    return 1
  else
    return 2
}

type a = MyReturnType<typeof fn> // 应推导出 "1 | 2"
```

### 解答

```typescript
type MyReturnType<T extends Function> = T extends (...args: any) => infer R ? R : never
```

### 拆分
1. `typeof fn` 拿到对应变量的类型数据
2. `T extends Function` 限制是个函数
3. 用 `infer R` 作为占位返回值