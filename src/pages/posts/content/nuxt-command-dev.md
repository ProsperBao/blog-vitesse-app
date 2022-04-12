---
title: Nuxt3 dev 命令解析
date: 2022-04-12 14:00:00
lang: zh-CN
duration: 10min
description: Nuxt3 dev 命令解析。解析 Nuxt3 如何启动一个开发项目。
tags: typescript, vue, nuxt3
type: post
---

[[toc]]

## `dev` 命令大致流程

![image-20220412152951398](https://s2.loli.net/2022/04/12/7JVImpC18MihezO.png)

## 拆解执行过程

-  首先导入一个包 [`listhen`](https://www.npmjs.com/package/listhen) 用于启动一个 `HTTP 服务` 

- 利用 `listhen` 传入 `serverHandler` 之后启动一个 `HTTP 服务`

- `currentHandler` 的来源是来自于预先定义好的一个空变量, 在启动 `listhen` 的过程中还是为 `null` 的, 所以会在页面中展示 `@nuxt/ui-templates`  的 loading 动画, 等待服务启动完成

   ```typescript
    const serverHandler = (req, res) => {
      return currentHandler ? currentHandler(req, res) : loadingHandler(req, res)
    }
   ```

- 用 `loadKit` 从 `packages/kit` 中加载需要用到的套件 
  
- `loadNuxt` 加载 Nuxt  `buildNuxt` 构建 Nuxt
  
   ```typescript
    const rootDir = resolve(args._[0] || '.')
    const { loadNuxt, buildNuxt } = await loadKit(rootDir)
   ```
   
- 接下来会保存一个 `currentNuxt` 作为当前 Nuxt 的实例

- 定义一个 `load` 函数，主要用来启动/重启 Nuxt 实例

- 在 `load` 函数内部主要干的几件事

   -  利用 `currentHandler` 设置为 `null` 来实现 `HTTP` 服务未加载完成的 Loading
   -  如果当前 `currentNuxt` 实例存在，则关闭当前实例
   -  利用 `loadNuxt` 重启 Nuxt 服务
   -  确保 Nuxt 生成文件成功之后，用 `buildNuxt` 构建 Nuxt 代码
   -  重新设置 `currentHandler` 来重启服务
   -  输出修改页面的 URL
   -  **错误处理：**如果有错误则执行以下逻辑
   -  输出错误信息
   -  设置 `currentHandler` 设置为 `null` 
   -  提示修改页面

- 接下来定义了一个 `dLoad` 避免同个文件多次保存引起多次重启

- 初始化监听器，跳过初始化的时候执行，并且只监听一层目录，目录下所有的改动都会有反馈

- 针对不同的修改 `File/Dir` 都会执行不同的更新方式

- 手动执行一次 `load`

- 然后调用 `currentNuxt` 里的  `listen`  钩子，触发相关方法

