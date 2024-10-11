---
title: 数组去重⽅法总结
published: 2024-10-08
description: ''
image: ''
tags: [ JavaScript,array ]
category: Interview
draft: false
comments: true
lang: ''
---

## ⽅法1:利⽤ES6 Set去重（ES6中最常⽤）

```javascript
function unique1(arr) {
  return Array.from(new Set(arr))
}

arr = [1, 1, 'true', 'true', true, true, 15, 15, false, false, undefined, undefined]
console.log(unique1(arr))
```

## ⽅法2:利⽤for嵌套for，然后splice去重（ES5中最常⽤）

```javascript
function unique2(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        arr.splice(j, 1)
        j--
      }
    }
  }
  return arr
}

console.log(unique2(arr))
```

## ⽅法3:利⽤indexOf去重

```javascript
function unique3(arr) {
  const res = []
  for (let i = 0; i < arr.length; i++) {
    if (res.indexOf(arr[i]) === -1) {
      res.push(arr[i])
    }
  }
  return res
}

console.log(unique3(arr))
```

## ⽅法4:利⽤对象的属性不能相同的特点进⾏去重

```javascript
function unique4(arr) {
  const res = []
  const obj = {}
  for (let i = 0; i < arr.length; i++) {
    if (!obj[arr[i]]) {
      res.push(arr[i])
      obj[arr[i]] = 1
    }
  }
  return res
}

console.log(unique4(arr))
```

## ⽅法5:利⽤filter

```javascript
function unique5(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index)
}

console.log(unique5(arr))
```

## ⽅法6:利⽤⽤includes

```javascript
function unique6(arr) {
  const res = []
  arr.forEach(item => {
    if (!res.includes(item)) {
      res.push(item)
    }
  })
  return res
}

console.log(unique6(arr))
```

## ⽅法7:利⽤reduce+includes

```javascript
function unique7(arr) {
  return arr.reduce((acc, cur) => {
    return acc.includes(cur) ? acc : [...acc, cur]
  }, [])
}

console.log(unique7(arr))
```

## ⽅法8:利⽤Map数据结构去重

```javascript
function unique8(arr) {
  const map = new Map()
  const res = []
  arr.forEach(item => {
    if (!map.has(item)) {
      map.set(item, true)
      res.push(item)
    }
  })
  return res
}

console.log(unique8(arr))
```

## ⽅法9:[...new Set(arr)]

```javascript
[...new Set(arr)]
```
