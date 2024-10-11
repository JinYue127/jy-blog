---
title: 改变数组本身 （9个）
published: 2024-10-09
description: ''
image: ''
tags: [ JavaScript,array ]
category: Interview
draft: false
comments: true
lang: ''
---

## pop和push尾部删除添加

这两个方法用于数组结尾的删除和添加

```javascript
const arr = [1, 2, 3, 4, 5]
//添加到数组的尾端
arr.push(6) //[1,2,3,4,5,6]
//再次调用pop方法就删除了最后一位
arr.pop()//[1,2,3,4,5]
```

## unshift和shift头部删除添加

用于在数组的首位进行删除和添加

```javascript
const arr = [1, 2, 3, 4, 5]
//添加到数组的前端
arr.unshift(6) //[6,1,2,3,4,5]
//再次调用shift方法就删除了第一位
arr.shift()//[1,2,3,4,5]
```

## sort 排序

进行对数组就地排序，不会复制或返回一个新数组，接收可选参数，一个回调函数，有a,b两个参数，当返回a<b时返回-1从小到大排序，当返回a>b时返回1从大到小排序，a==b时返回0，保持原来的排序（默认排序是将元素转换为字符串，然后按照它们的 UTF-16 码元值升序排序。）

```javascript
const arr = ["March", "Jan", "Feb", "Dec", 6, 2, "A", "a"];
arr.sort(function (a, b) {
  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  } else {
    return 0;
  }
});
console.log(arr);//['A','Dec', 'Feb','Jan','March',2, 6,'a']
```

## reverse 反转

对数组进行就地反转，顺序颠倒

```javascript
const arr = ["March", "Jan", 6, 2, "A", "a"];
arr.reverse();
console.log(arr);//[ 'a', 'A', 2, 6, 'Jan', 'March' ]
```

## splice 截取新增数据

可以选择删除数组中的某一个值，也可以在数组中的某个位置添加一些数据，接收可选参数，**三个或以上的参数，第一个为截取的索引位置，number类型，第二个截取的个数，number类型，第三个或更多实在截取位置添加的参数**，可以是任何类型

```javascript
const arr = ["March", "Jan", 6, 2, "A", "a"];
//在索引为2的位置截取一个，并在索引2的位置后添加8
arr.splice(2, 1, 8);
console.log(arr);//[ 'March', 'Jan', 8, 2, 'A', 'a' ]
//截取位数不够，就将有的全部且去掉
arr.splice(2, 6);
console.log(arr);//[ 'March', 'Jan' ]
```

## copyWithin 将数组得一部分赋值到另一个位置

`copyWithin`是一种移动[数组](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)
数据的高性能方法，`copyWithin()`方法是[通用的](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array#%E9%80%9A%E7%94%A8%E6%95%B0%E7%BB%84%E6%96%B9%E6%B3%95)。它只期望 `this` 值具有 `length`
属性和整数键属性。虽然字符串也是类似数组的，但这种方法不适用于它们，因为字符串是不可变的。`copyWithin`不会改变数组的长度，只会修改内容，它接收三个参数，第一个为复制到的目标位置（索引值），第二个是复制的起始位置（可选），如果为负数，则相当于从后往前数，第三个为结束位置，不包含此索引的位置（可选），起始位置不可小于结束位置，否者方法无效。并返回这个数组。

```javascript
const arr1 = ["March", "Jan", 6, 2, "A", "a"];
//从索引为三个位置开始复制，到索引为5的位置，但不包含5，从索引为1的位置粘贴并覆盖
const newArr = arr1.copyWithin(1, 3, 5);
console.log(arr1, newArr);//[ 'March', 2, 'A', 2, 'A', 'a' ] [ 'March', 2, 'A', 2, 'A', 'a' ]

//为负数时从后往前数-2从A的位置到-1不包括-1的位置，也就是将A赋值并覆盖到了索引为0的位置
const newArr = arr1.copyWithin(0, -2, -1);
console.log(newArr);//[ 'A', 'Jan', 6, 2, 'A', 'a' ]

//这种结束索引位置在开始索引位置之前的都不生效
const newArr = arr1.copyWithin(0, -2, 2);
const newArr = arr1.copyWithin(0, -2, -4);
console.log(newArr);//[ 'March', 'Jan', 6, 2, 'A', 'a' ]

```

## fill 填充

对数组内容进行覆盖填充，有三个参数，第一个为填充的值，第二个为起始位置（可选），第三个为结束位置，不包含此索引位置（可选）。与`copyWithin`比较类似，只不过一个是移动数组内的元素，一个填充数组的内的元素，不会改变数组的长度。并返回这个数组

```javascript
const arr1 = ["March", "Jan", 6, 2, "A", "a"];
//将666填充到1-4不包括4索引的位置
const newArr = arr1.fill(666, 1, 4);
console.log(newArr);//[ 'March', 666, 666, 666, 'A', 'a' ]
```

