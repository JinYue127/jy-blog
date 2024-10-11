---
title: 不改变原数组（11个）
published: 2024-10-09
description: ''
image: ''
tags: [ JavaScript,array ]
category: Interview
draft: false
comments: true
lang: ''
---

## filter 数据过滤
需要一定条件返回对应的数据，接收一个回调函数，有回调函数有三个参数，**第一个是当前遍历的元素，第二个为当前索引，第三个是数组本身**，需要一个返回值，filter方法会根据符合这个返回值条件的数据返回一个新数组

```javascript
const arr = ["March", "Jan", 6, 2, "A", "a"];
//这里是一个简单的例子，返回类型为string的元素
const newArr = arr.filter((item, index) => typeof item === "string");
console.log(newArr);//[ 'March', 'Jan', 'A', 'a' ]
```

## map
map方法只是单纯的返回一个新数组，可以是处理后的，也可以是原数组，接收一个回调函数，回调函数有三个参数**第一个是当前遍历的元素，第二个为当前索引，第三个是数组本身**，需要一个返回值，从map内部处理过后，回调函数的返回值返回一个新数组

```javascript
const arr = ["March", "Jan", 6, 2, "A", "a"];
//返回一个number的数组，不是number类型的就返回它们的字段长度
const newArr = arr.map((item, index) => (typeof item === "number" ? item : item.length);
console.log(newArr);//[ 5, 3, 6, 2, 1, 1 ]
```

## reduce 数据累加
`reduce`是一个功能非常强大的方法，但平常很少使用，因为他的功能他的方法都可以实现，它也能实现其他的一些方法，有时候合理的使用`reduce`会大大减少代码量。接收两个参数，**第一个为回调函数**，回调函数有四个参数，第一个参数为上一次回调函数`return`的结果，首次默认为第二个参数值，如果没有第二个参数值，则默认当前数组下标为0的参数，第二个参数为当前元素，第三个为当前索引值，第四个为数组本身，`reduce`的**第二个参数指定一个默认值，可选**

```javascript
//使用reduce实现filter方法
const arr = ["March", "Jan", 6, 2, "A", "a"];
//定义第二个参数的默认值为一个数组
const newArr = arr.reduce((acc, cur, index) => {
  typeof cur === "string" && acc.push(cur);
  return acc;
}, []);
console.log(newArr);//[ 'March', 'Jan', 'A', 'a' ]
//使用reduce实现数字的求和
//第二个参数默认定义0 number类型
const newArr = arr.reduce((acc, cur, index) => {
  typeof cur === "number" && (acc += cur);
  return acc;
}, 0);
console.log(newArr);//8
```

## reduceRight 从右开始 数据累加
这个是`reduce`的右边开始一种写法，运算时会从右向左执行，参数与使用方法和`reduce`一致。适用于当你想对一个数组进行反转加过滤等操作的时候，这个方法就完全突出了他的便携

```javascript
const arr = ["March", "Jan", 6, 2, "A", "a"];
const newArr = arr.reduceRight((acc, cur, index) => {
  typeof cur === "string" && acc.push(cur);
  return acc;
}, []);
//这里打印之后可以看出，毕竟过滤了非字符串的参数，还将数组反转了
console.log(newArr);//[ 'a', 'A', 'Jan', 'March' ]
```

## slice 数组截取
可以对一个数组进行浅拷贝，接收两个参数，第一个为截取的初始位置，第二个为终止位置（不包括此索引值），如果只填一个参数则从当前索引值截取到最后一位

```javascript
const arr = ["March", "Jan", 6, 2, "A", "a"];
const newArr = arr.slice(0, 3);
console.log(newArr);//[ 'March', 'Jan', 6 ]

const newArr = arr.slice(3);
console.log(newArr);//[ 2, 'A', 'a' ]

```

## concat 数组合并
需要两个或以上的数组合并的时候就可以使用`cancat`快速合并，当然在ES6之后大多都使用扩展运算符进行数组合并了，此方法接收一个或以上得任意类型参数

```javascript
const arr1 = ["March", "Jan"];
const arr2 = [6, 2, "A", "a"];
const arr3 = {
  name: "Tom",
  age: 18,
  sex: "男",
};
//如果参数是数组则会合并
const newArr = arr1.concat(arr2);
console.log(newArr);//[ 'March', 'Jan', 6, 2, 'A', 'a' ]
//一个以上的参数 如果是值类型 则会直接添加到数组得最后面
const newArr = arr1.concat(arr2,'Tom');
console.log(newArr);//[ 'March', 'Jan', 6, 2, 'A', 'a','Tom' ]
//一个以上的参数，为一个对象类型,会直接添加到对象中
const newArr = arr1.concat(arr2,arr3);
console.log(newArr);//[ 'March', 'Jan', 6, 2, 'A', 'a', { name: 'Tom', age: 18, sex: '男' } ]
```

## flatMap 扁平化map
flatMap与map相似，都是接收一个回调函数，进行处理后返回一个数组，但有一处差别就是flatMap可以对数组进行一层扁平化（仅数组）

```javascript
const arr1 = ["March", "Jan", 6, 2, "A", "a"];
const newArr = arr1.flatMap((item, index) => {
  return [item, index];
});
//可以看出本应该是双层数组的，却被扁平化了
console.log(newArr);//['March', 0,'Jan', 1,6,2,2,3,'A',4,'a', 5]

const newArr = arr1.flatMap((item, index) => {
  return [[item, index]];
});
//仅只能扁平化一层
console.log(newArr);//[[ 'March', 0 ],[ 'Jan', 1 ], [ 6, 2 ], [ 2, 3 ],[ 'A', 4 ],[ 'a', 5 ]]
```

## with 修改指定索引值得复制方法
**此方法兼容性不好，暂时不推荐使用，node版本需要20.0.0以上，浏览器就不用说了**

我们都知道，我们再修改数组中得某一个值得时候可以使用`arr[index]=xxx` 来进行修改，但是这样是改变了原数组,当我们既想使用索引值来改变某一个值，还不想改变原数组得时候就可以使用`with`方法，它接收两个参数，第一个为索引值，第二个是要修改成为数据

```javascript
const arr = ["March", "Jan", 6, 2, "A", "a"];
const newArr = arr.with(3, "Tom");

console.log(newArr);//[ 'March', 'Jan', 6, 'Tom', 'A', 'a' ]
```

## toReversed 反转数组的复制版
**此方法兼容性不好，暂时不推荐使用，node版本需要20.0.0以上，浏览器就不用说了**

使用`reverse`可以反转数组，但是会改变原数组，如果不想让原数组改变的并反转数组的话就可以使用它的复制版本`toReveresed`

```javascript
const arr1 = ["March", "Jan", 6, 2, "A", "a"];
const newArr = arr1.toReversed();

console.log(newArr);//[ 'a', 'A', 2, 6, 'Jan', 'March' ]
```

## toSorted 排序的复制版
**此方法兼容性不好，暂时不推荐使用，node版本需要20.0.0以上，浏览器就不用说了**

使用`sort`可以反转数组，但是会改变原数组，一样的可以使用`toSorted`，不会改变原数组，会返回一个排好序的数组，接受的参数和`sort`一致，参考`sort`

```javascript
const arr1 = ["March", "Jan", 6, 2, "A", "a"];
const newArr = arr1.toSorted();
console.log(newArr);//[ 2, 6, 'A', 'Jan', 'March', 'a' ]
```

## toSpliced 截取新增数组的复制版
**此方法兼容性不好，暂时不推荐使用，node版本需要20.0.0以上，浏览器就不用说了**

使用`splice`可以对数组进行截取和指定位置新增数据，但是会改变原数组，可以使用`toSpliced`，不会改变原数组，会返回一个新的数组，接受的参数使用方法和`splice`一致，参考`splice`

```javascript
const arr1 = ["March", "Jan", 6, 2, "A", "a"];
const newArr = arr1.toSpliced(0, 1, 4);
console.log(newArr);//[ 4, 'Jan', 6, 2, 'A', 'a' ]
```

