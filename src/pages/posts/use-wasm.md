---
title: Rust 和 WebAssembly 初探
date: 2022-1-24 10:00:00
lang: zh-CN
duration: 3min
description: Rust 和 WebAssembly 初探
tags: wasm,rust
type: post
---

[[toc]]

## 安装构建 WASM 的工具

使用 Rust 常用的包管理工具 Cargo 安装构建 wasm 需要的构建工具

```rust
cargo install wasm-pack
```

## 用 wasm-pack 初始化一个 Rust 包

```rust
cargo new --lib test-wasm
```

执行完上面的命令之后会看见生成了一个 Rust 项目

![image-20211015162523461](https://gitee.com/baiheee/learn-typora-img/raw/master/202110151625689.png)

```shell
+-- Cargo.toml
+-- src
    +-- lib.rs
```

生成了一个最基础的运行必要的项目结构

在 `lib.rs` 里有一些无用的测试代码，可以直接删掉

![image-20211015162849089](https://gitee.com/baiheee/learn-typora-img/raw/master/202110151628135.png)

```rust
extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern {
    pub fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}
```

![image-20211015163352693](https://gitee.com/baiheee/learn-typora-img/raw/master/202110151633740.png)

写上上面代码，可以看到编译器检查是不通过的，原因是引入了未安装的依赖包

到 `Cargo.toml` 文件里写上

```
[package]
name = "test-wasm"
version = "0.1.0"
edition = "2018"

[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "0.2.78"
```

接着命令行执行

```
cargo build
```



![image-20211015163738384](https://gitee.com/baiheee/learn-typora-img/raw/master/202110151637441.png)

之后就可以编译器就通过检测了

## 生成 WASM 包
接下来执行构建命令

```
wasm-pack build --scope test
```

![image-20211015164353189](https://gitee.com/baiheee/learn-typora-img/raw/master/202110151643242.png)

接下来，目录底下生成了一个 pkg 文件夹

![image-20211015164631567](https://gitee.com/baiheee/learn-typora-img/raw/master/202110151646612.png)

在项目里引入 pkg 文件夹就可以使用 wasm了

## 项目里引入 WASM 包

接下来初始化一个用 vite 初始化一个 vue 项目或者其他项目也行，把 pkg 放进 node_modules 里

![image-20211015165350372](https://gitee.com/baiheee/learn-typora-img/raw/master/202110151653421.png)

接下来就是安装 vite 的插件了

```
yarn add vite-plugin-rsw -D
```

接下来在 vite.config.js 里配置

接下来就是和使用正常的包一样

![image-20211015172546827](https://gitee.com/baiheee/learn-typora-img/raw/master/202110151725877.png)


<route lang="yaml">
meta:
  layout: main
</route>