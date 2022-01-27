extern crate image;
extern crate base64;
use image::DynamicImage;
use image::ImageFormat;
use std::io::{Cursor, Read, Seek, SeekFrom};
use std::panic;
use base64::{encode};
use wasm_bindgen::prelude::*;

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
pub fn grayscale(_array: &[u8]) -> String {
    let mut img = load_image_from_array(_array);
    img = img.grayscale();
    let base64_str = get_image_as_base64(img);
    return base64_str;
}
