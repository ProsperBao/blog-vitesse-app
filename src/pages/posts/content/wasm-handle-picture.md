---
title: 用 Rust 制作一个 WASM 的图片处理
date: 2022-1-26 10:00:00
lang: zh-CN
duration: 3min
description: 用 Rust 制作一个 WASM 的图片处理
tags: wasm,rust
type: post
---

[[toc]]

## 初始化一个项目

![image-20211027180750608](https://s2.loli.net/2022/03/28/QCsba4WYUjVOA6g.png)

## 添加使用到的 crate

![image-20211028091333828](https://s2.loli.net/2022/03/28/szvaV95rO3PuWw2.png)

## 在 lib.rs 里编写好处理代码

```rust
extern crate image;
extern crate base64;
use image::DynamicImage;
use image::ImageFormat;
use std::io::{Cursor, Read, Seek, SeekFrom};
use std::panic;
use base64::{encode};
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}


fn load_image_from_array(_array: &[u8]) -> DynamicImage {
    let img = match image::load_from_memory_with_format(_array, ImageFormat::Png) {
        Ok(img) => img,
        Err(error) => {
            panic!("图片有点问题: {:?}", error)
        }
    };
    return img;
}

fn get_image_as_base64(_img: DynamicImage) -> String {
    let mut c = Cursor::new(Vec::new());
    match _img.write_to(&mut c, ImageFormat::Png) {
        Ok(c) => c,
        Err(error) => {
            panic!(
                "写入字节出现问题: {:?}",
                error
            )
        }
    };
    c.seek(SeekFrom::Start(0)).unwrap();

    let mut out = Vec::new();
    c.read_to_end(&mut out).unwrap();
    let stt = encode(&mut out);
    let together = format!("{}{}", "data:image/png;base64,", stt);
    return together;
}

#[wasm_bindgen]
pub fn grayscale(_array: &[u8]) -> Result<(), JsValue> {
    let mut img = load_image_from_array(_array);
    img = img.grayscale();
    let base64_str = get_image_as_base64(img);
    return append_img(base64_str);
}

pub fn append_img(image_src: String) -> Result<(), JsValue> {
    let window = web_sys::window().expect("window 不存在");
    let document = window.document().expect("document ");
    let body = document.body().expect("body 不存在");

    let val = document.create_element("img")?;
    val.set_attribute("src", &image_src)?;
    body.append_child(&val)?;

    Ok(())
}
```

## 执行构建 WASM

![image-20211028092200170](https://s2.loli.net/2022/03/28/zfy5TZrj48WhLFH.png)

构建执行完之后目录会多一个 pkg 目录，之后直接引用就行了

![image-20211028093010043](https://s2.loli.net/2022/03/28/epNxZuab5wkl6Eo.png)

## 使用构建好的 WASM

![image-20211028094204703](https://s2.loli.net/2022/03/28/EWpUmPdLtzJ9jcg.png)

在 vite 项目中，安装好 wasm 插件

![image-20211028095618582](https://s2.loli.net/2022/03/28/K3Rl5aTkw8xioIf.png)

![image-20211028095641571](https://s2.loli.net/2022/03/28/BuhVzExyJT23MDK.png)

![image-20211028104012437](https://s2.loli.net/2022/03/28/r85ABPDawyfjdnk.png)

效果

![image-20211028105935168](https://s2.loli.net/2022/03/28/XcMNSUhtOwy8pum.png)

![image-20211028110005268](https://s2.loli.net/2022/03/28/joYp3MRUXtc6JDN.png)


