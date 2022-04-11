---
title: 连续赋值执行顺序以及结果
date: 2022-04-11 10:40:00
lang: zh-CN
duration: 5min
description: 烧脑问题反思和思考
tags: javascript
type: post
---

[[toc]]

## 烧脑问题
```javascript
var a = {n:1}
var b = a
a.x = (a = {n:2})
console.log(a.x) // undefined
console.log(b.x) // {n: 2}
```

## 反思
第一眼看到问题的时候大概想了一下，得出的结果是 `{n: 2}, undefined`，但是结果出乎我的意料
接下来我就在想为什么

1. 首先两个变量的声明没有任何异议 `a = {n: 1}, b = a`

    ![image-20220411104643199](https://s2.loli.net/2022/04/11/kloghecqR3NQ1bJ.png)

2. `a.x = a = {n:2}` 问题就出现在这一个语句之中
  1. 实际上可以把这一个语句看成 `a.x = (a = {n:2})` 更容易理解一点
  2. 我们都知道赋值是从右往左执行那么在这一个语句中优先执行的
  3. 优先执行的是括号内的内容这点没有问题，问题出在 `a.x` 这个地方
  4. 这个时候还没执行括号内的内容，所以这里的 `a` 还是指向原先的内存也就是 `{n: 1}` 也就是和 `b` 公用的一个内存空间，这时候 `.x` 是 `undefined`
    ![image-20220411104643200](https://s2.loli.net/2022/04/11/GlsbkMHX1tzE8yP.png)

  5. 所以现在 `a.x` 已经是确定指向 `a/b` 公用的一指向了
  6. `a = {n: 2}` 的执行结果在内存中是这样的
    ![image-20220411104643201](https://s2.loli.net/2022/04/11/2VLGigywr3xNtmo.png)

  7. `a.x = (a = {n: 2}) -> a.x = a` 最后在内存中看起来是这样子
    ![image-20220411104643202](https://s2.loli.net/2022/04/11/QOiXBuAyjhcdLRK.png)

  8. 所以可以看到结果和预想的不太一样

### 疑问？
为什么先确定 `a.x` 呢，可以看看 [运算符优先级- JavaScript - MDN Web Docs](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)

![image-20220411104643203](https://s2.loli.net/2022/04/11/E6cNgrI3y8pwdQG.png)

可以看到 ` '.'(成员访问)` 的优先级是远比 `=` 要高出不少
这一点在 `AST树` 中也可以看到

![image-20220411104643204](https://s2.loli.net/2022/04/11/gMfPzIAqwk7SE1N.png)

所以在执行 `a.x = a = {n:2}` 的时候是最先去获取 `a.x`，这个时候 `a` 的索引地址就已经确定了

