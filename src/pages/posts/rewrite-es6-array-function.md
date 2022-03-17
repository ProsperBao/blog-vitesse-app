---
title: 重写 ES6 数组扩展方法
date: 2022-02-22 13:25:00
lang: zh-CN
duration: 5min
description: 重写 ES6 数组扩展方法
tags: javascript
type: learn
---

[[toc]]

### ForEach
```javascript
Array.prototype.overwriteForEach = function (cb) {
  var _arr = this;
  var _len = _arr.length;
  var _arg2 = arguments[1] || window;
  for (var i = 0; i < _len; i++) {
    cb.apply(_arg2, [_arr[i], i, _arr]);
  }
}
```

### Map
```javascript
Array.prototype.overwriteMap = function (cb) {
  var _arr = this;
  var _len = _arr.length;
  var _arg2 = arguments[1] || window;
  var _newArr = [];
  var _item;
  var _res;
  for (var i = 0; i < _len; i++) {
    _item = deepClone(_arr[i]);
    _res = cb.apply(_arg2, [_item, i, _arr]);
    _newArr.push(_res);
  }
  return _newArr;
}
```

### Filter
```javascript
Array.prototype.overwriteFilter = function (cb) {
  var _arr = this;
  var _len = _arr.length;
  var _arg2 = arguments[1] || window;
  var _newArr = [];
  var _item;
  var _res;
  for (var i = 0; i < _len; i++) {
    _item = deepClone(_arr[i]);
    _res = cb.apply(_arg2, [_item, i, _arr]);
    _res && _newArr.push(_item);
  }
  return _newArr;
}

```

### Every
```javascript
Array.prototype.overwriteEvery = function (cb) {
  var _arr = this;
  var _len = _arr.length;
  var _arg2 = arguments[1] || window;
  var _res = true;
  for (var i = 0; i < _len; i++) {
    if (!cb.apply(_arg2, [_arr[i], i, _arr])) {
      res = false;
      break;
    }
  }
  return _res;
}

```

### Some
```javascript
Array.prototype.overwriteSome = function (cb) {
  var _arr = this;
  var _len = _arr.length;
  var _arg2 = arguments[1] || window;
  var _res = false;
  for (var i = 0; i < _len; i++) {
    if (cb.apply(_arg2, [_arr[i], i, _arr])) {
      res = true;
      break;
    }
  }
  return _res;
}
```

### Reduce
```javascript
Array.prototype.overwriteReduce = function (cb, initalValue) {
  var _arr = this;
  var _len = _arr.length;
  var _arg3 = arguments[2] || window;
  var _item;

  for (let i = 0; i < _len; i++) {
    _item = deepClone(_arr[i]);
    initalValue = cb.apply(_arg3, [initalValue, _item, i, _arr])
  }
  return initalValue;
}

```

### ReduceRight
```javascript
Array.prototype.overwriteReduceRight = function (cb, initalValue) {
  var _arr = this;
  var _len = _arr.length;
  var _arg3 = arguments[2] || window;
  var _item;

  for (let i = _len; i >= 0; i--) {
    _item = deepClone(_arr[i]);
    initalValue = cb.apply(_arg3, [initalValue, _item, i, _arr])
  }
  return initalValue;
}
```

<route lang="yaml">
meta:
  layout: main
</route>