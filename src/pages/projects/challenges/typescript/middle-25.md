---
title: KebabCase
date: 2022-3-31 16:27:23
level: 2
levelTitle: Middle
---

[[toc]]

[题目来源(type-challenges)](https://github.com/FuBaooo/type-challenges/blob/master/questions/612-medium-kebabcase/README.md)

### 问题
FooBarBaz -> foo-bar-baz


### 解答
```typescript
type KebabCase<S, T extends string = ""> = 
S extends `${infer First}${infer Rest}` 
  ? First extends Uncapitalize<First>
    ? KebabCase<Rest, `${T}${First}`>
    : T extends ""
      ? KebabCase<Rest, `${Uncapitalize<First>}`>
      : KebabCase<Rest, `${T}-${Uncapitalize<First>}`>
  : T;
```

### 拆分
1. 利用大写转换之后变成小写和原来的对比
2. 如果和原来一样就直接拼接
3. 如果和原来不一样就判断是否是首字
4. 根据判断结果添加 `-`

### 执行步骤
foo-bar
|S      |T     |First|Rest  |First=U<First>|T="" |result|
| ---- | ---- | ---- | ---- | ---- | ---- | ---- |
|foo-bar|      |f    |oo-bar|true          |never|KebabCase<oo-bar, f>|
|oo-bar |f     |o    |o-bar |true          |never|KebabCase<o-bar, fo>|
|o-bar  |fo    |o    |-bar  |true          |never|KebabCase<-bar, foo>|
|-bar   |foo   |-    |bar   |true          |never|KebabCase<bar, foo->|
|bar    |foo-  |b    |ar    |true          |never|KebabCase<ar, foo-b>|
|ar     |foo-b |a    |r     |true          |never|KebabCase<r, foo-ba>|
|r      |foo-ba|never|never |never         |never|r|

FooBarBaz
|S     |T      |First|Rest |First=U<First>|T="" |result|
| ---- | ---- | ---- | ---- | ---- | ---- | ---- |
|FooBar|       |F    |ooBar|false         |true |KebabCase<ooBar, f>|
|ooBar |f      |o    |oBar |true          |never|KebabCase<oBar, fo>|
|oBar  |fo     |o    |Bar  |true          |never|KebabCase<Bar, foo>|
|Bar   |foo    |B    |ar   |false         |never|KebabCase<ar, foo-b>|
|ar    |foo-b  |a    |r    |true          |never|KebabCase<r, foo-ba>|
|r     |foo-ba |r    |     |true          |never|KebabCase<never, foo-bar>|
|never |foo-bar|never|never|never         |never|foo-bar|
