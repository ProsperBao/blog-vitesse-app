---
title: CSS 路径动画
date: 2022-01-22 16:45:00
lang: zh-CN
duration: 5min
description: CSS 自定义路径动画
tags: css,svg
type: post
---

[[toc]]

# CSS 根据路径执行动画

朋友最近遇到个需求，给了两张图，如下：
<div style="text-align: center;">

![icons_login_arrow](https://s2.loli.net/2022/03/28/W5lbdVJqKSmT2Zr.png)

</div>

<div style="text-align: center;">[图1]</div>

![login_banner](https://s2.loli.net/2022/03/28/E4h9FJMdi7lNsXR.png)

<div style="text-align: center;">[图2]</div>

需求是根据 `图1` 根据 `图2` 中的虚线循环，虚线中断图片也要相应的中断。

如下是效果图：

![2022-01-22 10-36-29.2022-01-22 10_37_01](https://s2.loli.net/2022/03/28/UKv52sTnOj3HY6N.gif)

## 如何做？

一开始我是想定圆心用 `transform` 这个属性来做的，但是后面想了一下用 `transform` 来做会遇到以下问题：

1. 椭圆怎么解决
2. 怎么确定循环线路
3. 怎么解决循环箭头角度

后面我想该用 `position` 但是想了想还是不行，问题大致根上面类似。

但是我查到了一个属性 `offset-path` 这个属性是可以指定元素不规则的动画路径，粗略的看了一下 [offset-path | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/offset-path) 发现正好符合要求，和 SVG 的标签和属性很类似，那么就开始着手做了。

## 确定背景的虚线和大小

1. 首先要确定 `HTML` 结构

```html
<div class="banner">
    <div class="arrow"></div>
</div>
```

2. 确定 `CSS` 样式

```css
.banner {
      width: 579px;
      height: 400px;
      background: url(./login_banner.png) no-repeat;
      background-size: cover;
      background-position: center center;
      position: relative;
    }

    .arrow {
      width: 26px;
      height: 27.5px;
      background: url(./icons_login_arrow.png) no-repeat;
      background-size: cover;
    }
```

现在页面看起来是下面这样子的。

![image-20220122092954380](https://s2.loli.net/2022/03/28/941nek7GfNsCEiK.png)

## 确定 `offset-path` 路径

如何确定 `offset-path` 的路径呢，正如上门所述 `offset-path` 的参数和 `SVG` 的标签和属性很类似，所以我们可以用 `SVG` 的标签和属性来构造出一个椭圆的路径。

```html
<svg width="580" height="400" xmlns="http://www.w3.org/2000/svg">
      <ellipse stroke="#000" ry="125" rx="210" id="svg_4" cy="192.58335" cx="287.75002" fill-opacity="null" stroke-opacity="null" stroke-width="1.5" fill="none" />
</svg>
```

![image-20220122100344381](https://s2.loli.net/2022/03/28/W3Uv5GCLxHotmhI.png)

效果如图，椭圆完全覆盖背景图片的虚线椭圆，但是这里就出现了一个问题 `offset-path` 属性里仅 `path` 类型兼容性良好，其他属性兼容性待商榷。所以我们这边需要把 `ellipse` 转换为 `path` 。

这里直接贴上转换的 `js` 代码。

```javascript
function ellipse2path(cx, cy, rx, ry) {
      if (isNaN(cx - cy + rx - ry)) return;
      var path =
        'M' + (cx - rx) + ' ' + cy +
        'a' + rx + ' ' + ry + ' 0 1 0 ' + 2 * rx + ' 0' +
        'a' + rx + ' ' + ry + ' 0 1 0 ' + (-2 * rx) + ' 0' +
        'z';
      return path;
}
```

直接转换为 `path` 直接在 `.arrow` 样式里贴上路径，现在 `.arrow` 是如下样子：

```css
.arrow {
      width: 26px;
      height: 27.5px;
      background: url(./icons_login_arrow.png) no-repeat;
      background-size: cover;
      position: absolute;
      offset-path: path("M77.75002 192.58335a210 125 0 1 0 420 0a210 125 0 1 0 -420 0z");
}
```

效果如图：

![image-20220122101521250](https://s2.loli.net/2022/03/28/FkmXaLSMzD95s2P.png)

发现问题没有，这个图标是反的，那怎么处理呢，对添加一个 `transform` 属性让他旋转：

```css
.arrow {
      width: 26px;
      height: 27.5px;
      background: url(./icons_login_arrow.png) no-repeat;
      background-size: cover;
      position: absolute;
  		transform: rotate(180deg);
      offset-path: path("M77.75002 192.58335a210 125 0 1 0 420 0a210 125 0 1 0 -420 0z");
}
```

效果如下图：

![image-20220122101710962](https://s2.loli.net/2022/03/28/t5d6sRHW1TPjVeC.png)

箭头反转过来了，符合我们要求了，接下来就很简单了加上 `animation` 动画就可以动起来了。

## 加上点动画

```css
.arrow {
      width: 26px;
      height: 27.5px;
      background: url(./icons_login_arrow.png) no-repeat;
      background-size: cover;
      position: absolute;
  		transform: rotate(180deg);
      offset-path: path("M77.75002 192.58335a210 125 0 1 0 420 0a210 125 0 1 0 -420 0z");
 			animation: move 10s linear infinite;
}
@keyframes move {
  0% {
    offset-distance: -20%;
  }
  100% {
    offset-distance: -100%;
  }
}
```

效果如下：

![2022-01-22 10-22-17.2022-01-22 10_23_53](https://s2.loli.net/2022/03/28/2hgAGapDcwdxVUs.gif)

现在确实也是可以动了，但是6个间隙还是没有，这时候该咋办？

那就继续调整 `move` 动画。

```css
@keyframes move {
      0% {
        offset-distance: -20%;
      }
      20%{
        offset-distance: -30%;
      }
      20.01%{
        offset-distance: -37%;
      }
      40%{
        offset-distance: -43%;
      }
      40.01%{
        offset-distance: -50%;
      }
      60%{
        offset-distance: -56%;
      }
      60.01%{
        offset-distance: -64%;
      }
      80%{
        offset-distance: -83%;
      }
      80.01%{
        offset-distance: -90%;
      }
      100% {
        offset-distance: -100%;
      }
}
```

效果如图：

![2022-01-22 10-22-17.2022-01-22 10_23_53](https://s2.loli.net/2022/03/28/Dwel8TdnVMQKtIh.gif)

## 加上亿点点细节
过度太突兀了怎么办？那就继续给动画加亿点细节

```css
@keyframes move {
      0% {
        opacity: 0;
        offset-distance: -20%;
      }
      3% {
        opacity: 1;
      }

      17%{
        opacity: 1;
      }
      20%{
        opacity: 0;
        offset-distance: -30%;
      }
      20.01%{
        opacity: 0;
        offset-distance: -37%;
      }
      23%{
        opacity: 1;
      }

      37%{
        opacity: 1;
      }
      40%{
        opacity: 0;
        offset-distance: -43%;
      }
      40.01%{
        opacity: 0;
        offset-distance: -50%;
      }
      43%{
        opacity: 1;
      }

      57%{
        opacity: 1;
      }
      60%{
        opacity: 0;
        offset-distance: -56%;
      }
      60.01%{
        opacity: 0;
        offset-distance: -64%;
      }
      63%{
        opacity: 1;
      }

      77%{
        opacity: 1;
      }
      80%{
        opacity: 0;
        offset-distance: -83%;
      }
      80.01%{
        opacity: 0;
        offset-distance: -90%;
      }
      83%{
        opacity: 1;
      }

      97%{
        opacity: 1;
      }
      100% {
        opacity: 0;
        offset-distance: -100%;
      }
}
```
## 大功告成
最终效果：

![2022-01-22 10-36-29.2022-01-22 10_37_01](https://s2.loli.net/2022/03/28/UKv52sTnOj3HY6N.gif)

