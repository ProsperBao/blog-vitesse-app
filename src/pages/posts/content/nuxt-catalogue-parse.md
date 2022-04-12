---
title: Nuxt3 源码目录解析以及入口文件
date: 2022-04-12 10:00:00
lang: zh-CN
duration: 5min
description: Nuxt3 源码目录解析，针对每个文件夹的解析，提供了一个简单的描述。
tags: typescript, vue, nuxt3
type: post
---

[[toc]]

## `Nuxt3` 大致的目录结构
```bash
./
├── README.md
├── docs # 文档
├── examples # 事例
├── lerna.json # monorepo 的配置文件
├── package.json # 包的配置文件
├── packages # 包的目录(运行打包套件)
│   ├── bridge # nuxt/nuxt3 兼容包
│   ├── kit # nuxt3 工具包
│   ├── nuxi # nuxt3 命令行命令
│   ├── nuxt3 # nuxt3 核心
│   ├── schema # nuxt3 配置/类型定义
│   ├── test-utils # 测试工具
│   ├── vite # vite 运行包
│   └── webpack # webpack 运行包
├── playground # 测试目录
├── renovate.json # 打包套件的配置文件
├── scripts # 脚本
│   ├── bump-edge.ts # 更新所有依赖脚本
│   ├── nu # 使用 packages 中的 nuxi 包
│   ├── release-edge.sh # 发布脚本
│   └── update-examples.ts # 更新事例脚本
├── test # 测试目录
│   ├── basic.test.ts
│   ├── bridge.test.ts
│   ├── fixtures
│   └── utils.ts
├── tsconfig.json # 编译配置文件
└── vitest.config.ts # 测试配置文件
```

## 寻找 `Nuxt3` 项目入口
1. 如何初始化一个 `Nuxt3` 项目

   ```bash
   npx nuxi init nuxt3-app
   ```

2. 初始化完之后怎么启动？

   ```bash
   yarn dev -o
   ```

可以看到项目的入口就在这两句命令中，根据上面目录用途可以找到 `packages/nuxi` 这个包

## 寻找命令位置

`packages/nuxi` 目录结构

```bash
./
├── README.md
├── bin
│   └── nuxi.mjs
├── build.config.ts
├── node_modules
├── package.json
└── src
    ├── cli.ts
    ├── commands
    │   ├── add.ts
    │   ├── analyze.ts
    │   ├── build.ts
    │   ├── dev.ts
    │   ├── generate.ts
    │   ├── index.ts
    │   ├── info.ts
    │   ├── init.ts
    │   ├── prepare.ts
    │   ├── preview.ts
    │   ├── test.ts
    │   ├── typecheck.ts
    │   ├── upgrade.ts
    │   └── usage.ts
    ├── index.ts
    ├── run.ts
    └── utils
        ├── banner.ts
        ├── cjs.ts
        ├── diff.ts
        ├── engines.ts
        ├── fs.ts
        ├── help.ts
        ├── kit.ts
        ├── packageManagers.ts
        ├── prepare.ts
        └── templates.ts
```

可以很轻易看到 `commands/init.ts` 和 `commands/dev.ts` 这两个一个是项目初始化入口，另一个则是开发启动入口。

## 分析 `init` 命令是如何工作的

![image-20220412150955462](https://s2.loli.net/2022/04/12/bZVacyRvm8TUnre.png)

分发命令 `./src/run.ts`

![image-20220412151153260](https://s2.loli.net/2022/04/12/ScbIBFqwt7hRQkl.png)

命令 map `./src/commands/index.ts`

![image-20220412151307966](https://s2.loli.net/2022/04/12/OFhWxZb2JeYKGkI.png)

接下来就在 `./src/commands/init.ts` 中，基本流程和流程图类似

### `dev` 命令比较复杂咱不在这篇文章中解析

