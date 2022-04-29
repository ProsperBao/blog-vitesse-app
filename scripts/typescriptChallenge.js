const fs = require('fs')
const path = require('path')

const current = 'hard'
const targetPath = path.resolve(__dirname, '../src/pages/projects/challenges/typescript')
// 获取目录下所有包含current的文件
const files = fs.readdirSync(targetPath)
// 过滤并提取其中的数字
const result = files.filter(file => file.includes(current)).map(file => file.match(/\d+/g)[0]).sort((a, b) => +b - +a)
// 新文件名
const newFileName = `${current}-${+result[0] + 1}.md`
const contentTemplate = `---
title: 
date: ${new Date().toLocaleString().replace(/\//g, '-')}
level: 3
levelTitle: ${current[0].toLocaleUpperCase()}${current.slice(1)}
---

[[toc]]

[题目来源(type-challenges)]()

### 问题

${'`' + '`' + '`'}typescript
${'`' + '`' + '`'}

### 解答

${'`' + '`' + '`'}typescript
${'`' + '`' + '`'}

### 拆分

`
fs.writeFileSync(path.resolve(targetPath, newFileName), contentTemplate)
