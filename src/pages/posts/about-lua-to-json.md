---
title: 关于小工具需要 Lua 解析成 JSON 的那些事
date: 2022-02-23 15:23:00
lang: zh-CN
duration: 10min
description: 关于小工具需要 Lua 解析成 JSON 的那些事
tags: typescript,javascript,lua,json
type: post
---

[[toc]]

# 关于小工具需要 Lua 解析成 JSON 的那些事

## 背景

最近在开发一个饥荒服务器管理工具，需要对饥荒的 mod 进行管理/配置，有的 mod 是有 modinfo.lua 这个文件的，但是js并没有办法直接读取 lua 并执行，所以找到了一个 luaparse 解析成 ast 树，然后通过对 ast 的处理，处理成 json 文件。

![image-20220228091747660](https://gitee.com/baiheee/learn-typora-img/raw/master/202202280917893.png)

## 着手尝试

首先明确定义，一开始并不清楚 ast 节点有多少 type 所以，就硬解析，后面才发现有声明库，直接安装。

```bash
> pnpm i @types/luaparse -D
```

直接安装，上面有附带 luaparse 解析出来的 ast 各种节点 type。

![image-20220228092110604](https://gitee.com/baiheee/learn-typora-img/raw/master/202202280921643.png)

### 处理第一步，先从 Chunk 开始

通过阅读 `@types/luaparse` 和解析出来的真实 ast 树开始实行第一步。

![image-20220228100042425](https://gitee.com/baiheee/learn-typora-img/raw/master/202202281000507.png)

![image-20220228100102956](https://gitee.com/baiheee/learn-typora-img/raw/master/202202281001996.png)

通过上面两张图可以看出，如果要处理 ast 树变成需要的 json 需要递归处理，我们这里并不需要局部作用域，我们的目标仅仅是为了读取最终的 `configuration_options`，所以直接使用全局作用域保存最终的结果即可。

所以第一步先处理 `type` 为 `Chunk` 的节点	

```typescript
import type { Chunk } from 'luaparse'

import { map } from 'lodash'

class Lua2json {
  handleAst(ast: Node): any {
    switch (ast.type) {
      case 'Chunk': return this.handleChunk(ast)
      default: return `can't parse ${ast.type}`
    }
  }
  handleChunk(ast: Chunk): any {
    return map(ast.body, ast => this.handleAst(ast))
  }
}
```

### 处理 `LocalStatement` 节点

`LocalStatement` 类似于变量声明。

上面说过，咱们的目标是处理成 json 仅需要全局作用域，实际使用更为复杂，所以不进行过多的处理。

首先处理需要赋值给变量的结果值，也就是右值，递归处理拿到最终结果。

```typescript
  function handleLocalStatement(ast: LocalStatement): any {
    const values = ast.init.map(ast => this.handleAst(ast))
    ast.variables.forEach((ast, idx) => {
      const name = this.handleAst(ast)
      this.variables[name] = values[idx]
    })
  }
```

注：在实际执行环境下，饥荒服务器会注入一些关于服务器的信息，其中有 `locale` 这一个字段，这个字段会根据语言环境和版本环境注入 `en` `zh` `zhr` 等标志语言环境的值，所以在初始化处理类的时候需要往全局作用域添加一些默认的标志值

### 处理 `LogicalExpression` 节点

`LogicalExpression` 的操作符可以通过定义文件判断出只会存在两个 `or ` `and ` 。

`LogicalExpression` 类似 `||` `&&`，所以以相同的逻辑判断操作符，解析好左右各执行相应的操作即可。

```typescript
  function handleLogicalExpression(ast: LogicalExpression): any {
    const left = this.handleAst(ast.left)
    const right = this.handleAst(ast.right)
    return ast.operator === 'or' ? left || right : left && right
  }
```

### 处理 `BinaryExpression` 节点

`BinaryExpression` 二元表达式。处理好左右值，按照操作符实现即可，还有 `~` 一个应该不常用的表达式。

`left` / `right` 有可能是变量所以如果 `type` 为 `Identifier` 需要到全局作用域下获取相应的数据。

```typescript
function handleBinaryExpression(ast: BinaryExpression): any {
    let left = this.handleAst(ast.left)
    let right = this.handleAst(ast.right)
    if (ast.left.type === 'Identifier')
      left = this.variables[left]
    if (ast.right.type === 'Identifier')
      right = this.variables[right]

    switch (ast.operator) {
      case '+' : return left + right
      case '-' : return left - right
      case '*' : return left * right
      case '%' : return left % right
      case '/' : return left / right
      case '^' : return left ^ right
      case '&' : return left & right
      case '|' : return left | right
      case '<<' : return left << right
      case '>>' : return left >> right
      case '~=' : return left !== right
      case '==' : return left === right
      case '<' : return left < right
      case '<=' : return left <= right
      case '>' : return left > right
      case '>=' : return left >= right
      case '..': return left + right
      case '//': return Math.floor(left / right)
      default: return `can't parse operator ${ast.operator}`
    }
  }
```

### 处理 `Identifier` 节点

这里的 `Identifier` 类似获取变量的意思，一开始我是想直接通过 name 直接去全局作用域拿数据返回的，但是涉及到赋值取值，按取值来说这样是正确的，但是赋值就稍显不对了，所以这里仅返回对应的 name

```typescript
function handleIdentifier(ast: Identifier): any {
    return ast.name
}
```

### 处理 `StringLiteral` `NilLiteral` `BooleanLiteral` `NumericLiteral` 等数据节点

除了 `StringLiteral` `NilLiteral` 这两个节点，需要特殊处理外，其余直接返回

`StringLiteral` 节点带的数据存在 value 或者 raw 上，并且会带有 `"" ` 不符合最终结果，要去掉。

`NilLiteral` 节点的值 `nil` 在 js 中并不存在，所以用 `null` 代替

```typescript
function handleNilLiteral(): null {
  return null
}

function handleBooleanLiteral(ast: BooleanLiteral): boolean {
  return ast.value
}

function handleNumericLiteral(ast: NumericLiteral): number {
  return ast.value
}

function handleStringLiteral(ast: StringLiteral): string {
  const result = (ast.value || ast.raw)
  return result.replace(/\"/g, '').trim()
}
```

### 处理 `TableConstructorExpression` `TableKey ` `TableKeyString` `TableValue` 等节点

Lua 中的 table 是一个关联数组，数组的索引可以是数字、字符串或表类型。

```typescript
  function handleTableConstructorExpression(ast: TableConstructorExpression): any {
    // TableKey || TableKeyString
    if (ast.fields[0] && (ast.fields[0] as TableKey | TableKeyString).key) {
      const object = fromPairs(
        map(ast.fields, (field) => {
          const { key, value } = this.handleAst(field)
          return [key, value]
        }),
      )
      return isEmpty(object) ? [] : object
    }
    // TableValue
    return map(ast.fields, field => this.handleAst(field))
  }

  function handleTableValue(ast: TableValue): any {
    return this.handleAst(ast.value)
  }

  function handleTableKey(ast: TableKey | TableKeyString): any {
    const value = this.handleAst(ast.value)
    return { key: this.handleAst(ast.key), value: this.variables[value] || value }
  }
```

## 完整代码

```typescript
import type { AssignmentStatement, BinaryExpression, BooleanLiteral, Chunk, ForNumericStatement, Identifier, IndexExpression, LocalStatement, LogicalExpression, MemberExpression, Node, NumericLiteral, ReturnStatement, StringLiteral, TableConstructorExpression, TableKey, TableKeyString, TableValue, UnaryExpression } from 'luaparse'
import { fromPairs, get, isEmpty, map, set } from 'lodash'

class Lua2json {
  variables: any
  constructor(variable: any) {
    this.variables = variable
  }

  handleAst(ast: Node): any {
    switch (ast.type) {
      case 'Chunk': return this.handleChunk(ast)
      case 'LogicalExpression': return this.handleLogicalExpression(ast)
      case 'IndexExpression': return this.handleIndexExpression(ast)
      case 'Identifier': return this.handleIdentifier(ast)
      case 'NilLiteral': return this.handleNilLiteral()
      case 'BooleanLiteral': return this.handleBooleanLiteral(ast)
      case 'NumericLiteral':return this.handleNumericLiteral(ast)
      case 'StringLiteral': return this.handleStringLiteral(ast)
      case 'UnaryExpression' : return this.handleUnaryExpression(ast)
      case 'TableKey':
      case 'TableKeyString': return this.handleTableKey(ast)
      case 'TableValue': return this.handleTableValue(ast)
      case 'TableConstructorExpression': return this.handleTableConstructorExpression(ast)
      case 'LocalStatement': return this.handleLocalStatement(ast)
      case 'ReturnStatement': return this.handleReturnStatement(ast)
      case 'BinaryExpression':return this.handleBinaryExpression(ast)
      case 'AssignmentStatement': return this.handleAssignmentStatement(ast)
      case 'ForNumericStatement': return this.handleForNumericStatement(ast)
      case 'MemberExpression': return this.handleMemberExpression(ast)
      default:
        console.log(`can't parse ${ast.type}`)
        return `can't parse ${ast.type}`
    }
  }

  handleMemberExpression(ast: MemberExpression): any {
    if (ast.indexer === '.')
      return get(get(this.variables, this.handleAst(ast.base)), this.handleAst(ast.identifier))
  }

  handleIndexExpression(ast: IndexExpression): any {
    return `${this.handleAst(ast.base)}[${this.variables[this.handleAst(ast.index)]}]`
  }

  handleForNumericStatement(ast: ForNumericStatement): any {
    const start = this.handleAst(ast.start) - 1
    const end = this.handleAst(ast.end).length
    const step = ast.step ? this.handleAst(ast.step) : 1
    for (let i = start; i < end; i += step) {
      this.variables[this.handleAst(ast.variable)] = i
      ast.body.forEach(ast => this.handleAst(ast))
    }
    delete this.variables[this.handleAst(ast.variable)]
  }

  handleAssignmentStatement(ast: AssignmentStatement): any {
    const temp: any[] = []
    for (let i = 0; i < ast.variables.length; ++i) {
      const variable = ast.variables[i]
      if (variable.type === 'Identifier')
        this.variables[variable.name] = this.handleAst(ast.init[i])
      else if (variable.type === 'IndexExpression')
        set(this.variables, this.handleAst(variable), this.handleAst(ast.init[i]))
    }
    return temp
  }

  handleBinaryExpression(ast: BinaryExpression): any {
    let left = this.handleAst(ast.left)
    let right = this.handleAst(ast.right)
    if (ast.left.type === 'Identifier')
      left = this.variables[left]
    if (ast.right.type === 'Identifier')
      right = this.variables[right]

    switch (ast.operator) {
      case '+' : return left + right
      case '-' : return left - right
      case '*' : return left * right
      case '%' : return left % right
      case '/' : return left / right
      case '^' : return left ^ right
      case '&' : return left & right
      case '|' : return left | right
      case '<<' : return left << right
      case '>>' : return left >> right
      case '~=' : return left !== right
      case '==' : return left === right
      case '<' : return left < right
      case '<=' : return left <= right
      case '>' : return left > right
      case '>=' : return left >= right
      case '..': return left + right
      case '//': return Math.floor(left / right)
      default: return `can't parse operator ${ast.operator}`
    }
  }

  handleLogicalExpression(ast: LogicalExpression): any {
    const left = this.handleAst(ast.left)
    const right = this.handleAst(ast.right)
    return ast.operator === 'or' ? left || right : left && right
  }

  handleReturnStatement(ast: ReturnStatement): any {
    const values = ast.arguments.map(this.handleAst)
    return values.length === 1 ? values[0] : values
  }

  handleLocalStatement(ast: LocalStatement): any {
    const values = ast.init.map(ast => this.handleAst(ast))
    ast.variables.forEach((ast, idx) => {
      const name = this.handleAst(ast)
      this.variables[name] = values[idx]
    })
  }

  handleTableConstructorExpression(ast: TableConstructorExpression): any {
    // TableKey || TableKeyString
    if (ast.fields[0] && (ast.fields[0] as TableKey | TableKeyString).key) {
      const object = fromPairs(
        map(ast.fields, (field) => {
          const { key, value } = this.handleAst(field)
          return [key, value]
        }),
      )
      return isEmpty(object) ? [] : object
    }
    // TableValue
    return map(ast.fields, field => this.handleAst(field))
  }

  handleTableValue(ast: TableValue): any {
    return this.handleAst(ast.value)
  }

  handleTableKey(ast: TableKey | TableKeyString): any {
    const value = this.handleAst(ast.value)
    return { key: this.handleAst(ast.key), value: this.variables[value] || value }
  }

  handleUnaryExpression(ast: UnaryExpression): any {
    if (ast.operator === '-')
      return -this.handleAst(ast.argument)

    else if (ast.operator === '#')
      return this.variables[this.handleAst(ast.argument)]

    else
      return `can't parse ${ast.operator}`
  }

  handleChunk(ast: Chunk): any {
    return map(ast.body, ast => this.handleAst(ast))
  }

  handleIdentifier(ast: Identifier): any {
    return ast.name
  }

  handleNilLiteral(): null {
    return null
  }

  handleBooleanLiteral(ast: BooleanLiteral): boolean {
    return ast.value
  }

  handleNumericLiteral(ast: NumericLiteral): number {
    return ast.value
  }

  handleStringLiteral(ast: StringLiteral): string {
    const result = (ast.value || ast.raw)
    return result.replace(/\"/g, '').trim()
  }
}

```

## Lua文件和对应效果

### Lua文件

```lua
local Ch = locale == "zh" or locale == "zhr"

name =
Ch and
[[ 卡尼猫]] or
[[ Carney]]

description =
Ch and
[[V1.4.7
旅行中的卡尼猫，
拥有灵活的战斗技能，按键RZC
走路和吃鱼类升级，没有极限
就算死了，也不能阻止走路升级
容易获得更多的采集倍率和击杀掉落倍率
可以制作方便实用的帽子、短剑和背包
]] or
[[V 1.4.7
Carney is on her trip
has flexible combat skills
walking and eating fish make her upgrade,
no upper limit
can craft useful hat,dagger and backpack
——Even I died,the Death can't stop me from upgrading
]]

author = "柴柴"
version = "1.4.7"
forumthread = ""
api_version = 10
dst_compatible = true
dont_starve_compatible = false
reign_of_giants_compatible = false
all_clients_require_mod = true

icon_atlas = "modicon.xml"
icon = "modicon.tex"

server_filter_tags = {
        "character",
}

local alpha = 
{
    {description = "B", key = 98},
    {description = "C", key = 99},
    {description = "G", key = 103},
    {description = "J", key = 106},
    {description = "R", key = 114},
    {description = "T", key = 116},
    {description = "V", key = 118},
    {description = "X", key = 120},
    {description = "Z", key = 122},
    {description = "LAlt", key = 308},
    {description = "LCtrl", key = 306},
    {description = "LShift", key = 304},
    {description = "Space", key = 32},
}
local keyslist = {}
for i = 1,#alpha do keyslist[i] = {description = alpha[i].description, data = alpha[i].key} end

configuration_options =
Ch and
{
    {
        name = "Language",
        label = "语言",
        options =   {
                        {description = "English", data = false},
                        {description = "简体中文", data = true},
                    },
        default = Ch,
    },
    {
        name = "DodgeKey",
        label = "闪避按键",
        options = keyslist,
        default = 114,
    },
    {
        name = "ChargeKey",
        label = "蓄力按键",
        options = keyslist,
        default = 122,
    },
    {
        name = "IcicleKey",
        label = "冰柱按键",
        options = keyslist,
        default = 99,
    },
    {
        name = "CheckKey",
        label = "自我检查按键",
        options = keyslist,
        default = 106,
    },
    {
        name = "DaggerLimit",
        label = "短剑限制",
        options =   {
                        {description = "有上限", data = true},
                        {description = "无上限", data = false},
                    },
        default = false,
    },
    {
        name = "CrossEdge",
        label = "闪避穿越边缘",
        options =   {
                        {description = "是", data = true},
                        {description = "否", data = false},
                    },
        default = false,
    },
} or
{
    {
        name = "Language",
        label = "Language",
        options =   {
                        {description = "English", data = false},
                        {description = "Chinese", data = true},
                    },
        default = Ch,
    },
    {
        name = "DodgeKey",
        label = "DodgeKey",
        options = keyslist,
        default = 114,
    },
    {
        name = "ChargeKey",
        label = "ChargeKey",
        options = keyslist,
        default = 122,
    },
    {
        name = "IcicleKey",
        label = "IcicleKey",
        options = keyslist,
        default = 99,
    },
    {
        name = "CheckKey",
        label = "CheckKey",
        options = keyslist,
        default = 106,
    },
    {
        name = "DaggerLimit",
        label = "DaggerLimit",
        options =   {
                        {description = "true", data = true},
                        {description = "false", data = false},
                    },
        default = false,
    },
    {
        name = "CrossEdge",
        label = "CrossEdge",
        options =   {
                        {description = "true", data = true},
                        {description = "false", data = false},
                    },
        default = false,
    },
}
```

### 解析结果

```JSON
{
  "local": "en",
  "Ch": false,
  "name": "[[ 卡尼猫]]",
  "description": "[[V1.4.7\r\n旅行中的卡尼猫，\r\n拥有灵活的战斗技能，按键RZC\r\n走路和吃鱼类升级，没有极限\r\n就算死了，也不能阻止走路升级\r\n容易获得更多的采集倍率和击杀掉落倍率\r\n可以制作方便实用的帽子、短剑和背包\r\n]]",
  "author": "柴柴",
  "version": "1.4.7",
  "forumthread": "",
  "api_version": 10,
  "dst_compatible": true,
  "dont_starve_compatible": false,
  "reign_of_giants_compatible": false,
  "all_clients_require_mod": true,
  "icon_atlas": "modicon.xml",
  "icon": "modicon.tex",
  "server_filter_tags": [
    "character"
  ],
  "alpha": [
    { "description": "B", "key": 98 },
    { "description": "C", "key": 99 },
    { "description": "G", "key": 103 },
    { "description": "J", "key": 106 },
    { "description": "R", "key": 114 },
    { "description": "T", "key": 116 },
    { "description": "V", "key": 118 },
    { "description": "X", "key": 120 },
    { "description": "Z", "key": 122 },
    { "description": "LAlt", "key": 308 },
    { "description": "LCtrl", "key": 306 },
    { "description": "LShift", "key": 304 },
    { "description": "Space", "key": 32  }
  ],
  "keyslist": [
    { "description": "B", "data": 98 },
    { "description": "C", "data": 99 },
    { "description": "G", "data": 103 },
    { "description": "J", "data": 106 },
    { "description": "R", "data": 114 },
    { "description": "T", "data": 116 },
    { "description": "V", "data": 118 },
    { "description": "X", "data": 120 },
    { "description": "Z", "data": 122 },
    { "description": "LAlt", "data": 308 },
    { "description": "LCtrl", "data": 306 },
    { "description": "LShift", "data": 304 },
    { "description": "Space", "data": 32  }
  ],
  "configuration_options": [
    {
      "name": "Language",
      "label": "语言",
      "options": [
        { "description": "English", "data": false },
        { "description": "简体中文", "data": true }
      ],
      "default": "Ch"
    },
    {
      "name": "DodgeKey",
      "label": "闪避按键",
      "options": [
        { "description": "B", "data": 98 },
        { "description": "C", "data": 99 },
        { "description": "G", "data": 103 },
        { "description": "J", "data": 106 },
        { "description": "R", "data": 114 },
        { "description": "T", "data": 116 },
        { "description": "V", "data": 118 },
        { "description": "X", "data": 120 },
        { "description": "Z", "data": 122 },
        { "description": "LAlt", "data": 308 },
        { "description": "LCtrl", "data": 306 },
        { "description": "LShift", "data": 304 },
        { "description": "Space", "data": 32 }
      ],
      "default": 114
    },
    {
      "name": "ChargeKey",
      "label": "蓄力按键",
      "options": [
        { "description": "B", "data": 98 },
        { "description": "C", "data": 99 },
        { "description": "G", "data": 103 },
        { "description": "J", "data": 106 },
        { "description": "R", "data": 114 },
        { "description": "T", "data": 116 },
        { "description": "V", "data": 118 },
        { "description": "X", "data": 120 },
        { "description": "Z", "data": 122 },
        { "description": "LAlt", "data": 308 },
        { "description": "LCtrl", "data": 306 },
        { "description": "LShift", "data": 304 },
        { "description": "Space", "data": 32 }
      ],
      "default": 122
    },
    {
      "name": "IcicleKey",
      "label": "冰柱按键",
      "options": [
        { "description": "B", "data": 98 },
        { "description": "C", "data": 99 },
        { "description": "G", "data": 103 },
        { "description": "J", "data": 106 },
        { "description": "R", "data": 114 },
        { "description": "T", "data": 116 },
        { "description": "V", "data": 118 },
        { "description": "X", "data": 120 },
        { "description": "Z", "data": 122 },
        { "description": "LAlt", "data": 308 },
        { "description": "LCtrl", "data": 306 },
        { "description": "LShift", "data": 304 },
        { "description": "Space", "data": 32 }
      ],
      "default": 99
    },
    {
      "name": "CheckKey",
      "label": "自我检查按键",
      "options": [
        { "description": "B", "data": 98 },
        { "description": "C", "data": 99 },
        { "description": "G", "data": 103 },
        { "description": "J", "data": 106 },
        { "description": "R", "data": 114 },
        { "description": "T", "data": 116 },
        { "description": "V", "data": 118 },
        { "description": "X", "data": 120 },
        { "description": "Z", "data": 122 },
        { "description": "LAlt", "data": 308 },
        { "description": "LCtrl", "data": 306 },
        { "description": "LShift", "data": 304 },
        { "description": "Space", "data": 32 }
      ],
      "default": 106
    },
    {
      "name": "DaggerLimit",
      "label": "短剑限制",
      "options": [
        { "description": "有上限", "data": true },
        { "description": "无上限", "data": false }
      ],
      "default": false
    },
    {
      "name": "CrossEdge",
      "label": "闪避穿越边缘",
      "options": [
        { "description": "是", "data": true },
        { "description": "否", "data": false }
      ],
      "default": false
    }
  ]
}
```

## 结尾

针对大部分 mod 的配置文件解析是成功且效果不错的，但是小部分 mod 有使用函数等额外情况，因为个人知识以及能力有限，所以最终的结果是放弃这个 Lua 解析 JSON 的方案，转为直接使用 `fengari-web` 这个方案直接加载一个 Lua 的运行器，并把结果解析返回。