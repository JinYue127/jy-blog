---
title: 其他功能性方法(22个)
published: 2024-10-09
description: ''
image: ''
tags: [ JavaScript,array ]
category: Interview
draft: false
comments: true
lang: ''
---

## forEach 数组遍历

这个方法应该都非常熟悉了，为什么把他分为其他里面呢，因为他的作用只是遍历，其他什么作用都没有，接收一个回调函数，又三个参数，第一个当前元素，第二个为索引值，第三个为数组本身因为都比较熟悉了，就随便写个例子

```javascript
const arr = ["March", "Jan", 6, 2, "A", "a"];
//使用这中方法改变数组本身
arr.forEach((item, index) => {
  arr[arr.length - index - 1] = item;
});
//返回这种数据应为数组本身在遍历的时候被改变了
console.log(arr);//[ 'March', 'Jan', 6, 6, 'Jan', 'March' ]
```

## Array.from() 转换成数组

此方法可以将一些可迭代的以及为数组的数据转换成真正的数组，并返回一个那个新数组，比如字符串，dom伪数组等，接收两个参数，第一个为要转化的参数，第二个是一个回调函数（可选），回调函数有两个参数当前遍历的对象和索引

```javascript
const newArr = Array.from("March");
console.log(newArr);//[ 'M', 'a', 'r', 'c', 'h' ]

(function () {
//arguments为一个伪数组，转化成真正的数组,并经过第二个回调函数进行处理返回
  const arr = Array.from(arguments, (item, index) => item + index);
  console.log(arr, Array.isArray(arr));//[ 1, 4, 6, 8 ] true
})(1, 3, 4, 5);
```

## Array.fromAsync Array.from异步版本

`Array.fromAsync()` 迭代异步可迭代对象的方式与 `for await...of` 很相似。`Array.fromAsync()` 在行为上与 `Array.from()`
几乎等价

+ `Array.fromAsync()` 可以处理异步可迭代对象。
+ `Array.fromAsync()` 返回一个会兑现为数组实例的 `Promise`。
+ 如果使用非异步可迭代对象调用 `Array.fromAsync()`，则要添加到数组中的每个元素（无论是否为
  Promise）都会先[等待其兑现](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await)。
+ 如果提供了 `mapFn`，则其输入和输出会在内部等待兑现。

`Array.fromAsync()` 和 `Promise.all()` 都可以将一个 promise 可迭代对象转换为一个数组的 promise。然而，它们有两个关键区别：

+ `Array.fromAsync()` 会依次等待对象中产生的每个值兑现。`Promise.all()` 会并行等待所有值兑现。
+ `Array.fromAsync()` 惰性迭代可迭代对象，并且不会获取下一个值，直到当前值被兑现。`Promise.all()` 预先获取所有值并等待它们全部兑现。

```javascript
//我也没用过，凑合看吧  手动滑稽(≧∇≦)ﾉ
const asyncIterable = (async function* () {
  for (let i = 0; i < 5; i++) {
    await new Promise((resolve) => setTimeout(resolve, 10 * i));
    yield i;
  }
})();

Array.fromAsync(asyncIterable).then((array) => console.log(array));
// [0, 1, 2, 3, 4]
```

## Array.isArray 判断是不是数组

在类型判断的时候，我们通常使用`typeof` ，但是使用`typeof`的时候数组判断出来的就是`Object`类型，可以说数组是特殊的对象，使用
`typeof`判断不出数组，就可以使用`Array.isArray`方法

```javascript
(function () {
//在这可以看出arguments并不是一个数组
  console.log(Array.isArray(arguments));//false
})(1, 3, 4, 5);

const arr = ["March", "Jan", 6, 2, "A", "a"];
//看的出是可以识别出来的 但typeof却识别不出来
console.log(typeof arr, Array.isArray(arr));//object true
```

## includes 判断某个值数组中是否存在

在数组中查抄某一个值，返回一个布尔值，有两个参数，第一个你要查找的值，第二个从哪个索引位置开始找

```javascript
const arr = ["March", "Jan", 6, 2, "A", "a"];
const newArr = arr.includes(6);
console.log(newArr);//true

//也可以利用这一特性简化判断条件
let name = 'a'
//name是一个变量，可能有很多种可能，判断条件中就会非常冗余
if (name === 'a' || name === 'A' || name === 6...
)
{
  //...
}
//可以改成这种，看着也非常明了简便
if (['a', "A", 6, ...].includes(name)) {
  //...
}

```

## indexOf 判断数组中是否存在某个值，并返回索引

写法和includes类似，有两个参数第一个是要找的值，第二个为开始索引，indexOf会在查找到第一个符合条件的参数跳出循环并返回索引，没找到则返回-1

```javascript
const arr = ["March", "Jan", 6, 2, "A", 6, "a"];
const newArr = arr.indexOf(6);
//返回索引值
console.log(newArr);//2

//查找6，从索引为3的位置开始找
const newArr = arr.indexOf(6，3
)
;
console.log(newArr);//5
```

## lastIndexOf 判断数组中是否存在某个值，并返回最后的索引

与indexOf一致，只不过是返回最后的索引位置，也可以理解为他是从数组的右边开始往左找元素，并返回第一个找到的元素的索引，没找到则返回-1

```javascript
//所有的结果恰恰与indexOf反过来了
const arr = ["March", "Jan", 6, 2, "A", 6, "a"];
const newArr = arr.lastIndexOf(6);
//返回索引值
console.log(newArr);//5

//查找6，从索引为3的位置开始找
const newArr = arr.lastIndexOf(6，3
)
;
console.log(newArr);//2
```

## find 查找符合条件的元素

`find`查找符合条件的的一个元素并返回那个元素本身,没有则返回`undefined`，接收一个回调函数，回调函数有三个形参，第一个当前元素，第二个当前索引，第三个数组本身

```javascript
const arr = ["March", "Jan", 6, 2, "A", 6, "a"];
const newArr = arr.find((item, index) => {
  return item.length > index;
});
//只会返回符合条件的第一个值
console.log(newArr);//March

//也可以用在数组对象上
const arr = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}];
const newArr = arr.find((item, index) => {
  return item.id > index;
});
//返回对象元素本身
console.log(newArr);//{ id: 1 }
```

## findIndex 查找符合条件的元素，返回索引版

与`find`使用方法一致，`findIndex`查找符合条件的的一个元素并返回那个元素的索引值,没有则返回-1，接收一个回调函数，回调函数有三个形参，第一个当前元素，第二个当前索引，第三个数组本身

```javascript
const arr = ["March", "Jan", 6, 2, "A", 6, "a"];
const newArr = arr.findIndex((item, index) => {
  return item.length > index;
});
//只会返回符合条件的第一个索引
console.log(newArr);//0

//也可以用在数组对象上
const arr = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}];
const newArr = arr.findIndex((item, index) => {
  return item.id > index;
});
//返回对象元素所在位置的索引
console.log(newArr);//0
```

## findLast 从右向左查找符合条件的元素

**此方法兼容性不好，暂时不推荐使用，node版本需要18.0.0以上** 与`find`使用方法一致，`findLast`从右向左查找符合条件的的一个元素，并返回那个元素,没有则返回`undefined`，接收一个回调函数，回调函数有三个形参，第一个当前元素，第二个当前索引，第三个数组本身

```javascript
const arr = ["March", "Jan", 6, 2, "A", 6, "a"];
const newArr = arr.findLast((item, index) => {
  return item.length > index;
});
//返回Jan，从右向左第一个符合条件的就是Jan，索引值是不变的，例如arr数组，遍历的时候索引值是6、5、4、3、2、1、0
console.log(newArr);//Jan

//也可以用在数组对象上
const arr = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}];
const newArr = arr.findLast((item, index) => {
  return item.id > index;
});
//返回第一个符合条件的对象元素本身
console.log(newArr);//{ id: 5 }
```

## findLastIndex 从右向左查找符合条件的元素,返回索引版

**此方法兼容性不好，暂时不推荐使用，node版本需要18.0.0以上** 与`findLast`使用方法一致，`findLastIndex` 从右向左查找符合条件的的一个元素，并返回那个元素的索引值,没有则返回-1，接收一个回调函数，回调函数有三个形参，第一个当前元素，第二个当前索引，第三个数组本身

```javascript
const arr = ["March", "Jan", 6, 2, "A", 6, "a"];
const newArr = arr.findLastIndex((item, index) => {
  return item.length > index;
});
//从右向左查找，返回符合条件的第一个索引
console.log(newArr);//1

//也可以用在数组对象上
const arr = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}];
const newArr = arr.findLastIndex((item, index) => {
  return item.id > index;
});
//从右向左查找，返回对象元素所在位置的索引
console.log(newArr);//4
```

## at 返回索引位置的值

**此方法兼容性一般，暂时不推荐使用，node版本需要16.6.0以上** at 接收一个number的参数，可以为负数，正数时获取到索引为的值，当参数为负数时，从右向左查找对应的值

```javascript
const arr = ["March", "Jan", 6, 2, "A", "a"];
//正数与直接索引取值无异
const newArr = arr.at(2);
console.log(newArr);//6
//从右向左找 可以简化代码量，有些情况下效果很明显
const newArr = arr.at(-2);
//等价于  const newArr = arr.at(arr.length - 2);
console.log(newArr);//A
```

## Array.of 创建可变的数组

使用静态方法创建一个可变的数组，可以接收任意类型，任意个数的参数

```javascript
const newArr = Array.of("March", "Jan", 6, 2, "A", "a");
console.log(newArr);//[ 'March', 'Jan', 6, 2, 'A', 'a' ]

//使用of创建数组和直接使用Array实例创建数组有所不同
const newArr = Array.of(6);
const arr = Array(6);
//传入6 of则创建一个只包含6得数组，Array传入6则创建有六个空位置得数组
console.log(newArr, arr);
[6] [<6 emptyitems >]
```

## flat 扁平化数组

通常在扁平化数组的时候都要使用递归函数，flat方法避免了页面中写递归函数造成大量的代码冗余，flat本身也是使用递归方法来达到数组扁平化的，接收一个number类型的参数，参数是几就可以扁平几层，在不确定有几维数组的情况下，参数为Infinity（无限大），可以扁平任意层次的数组

```javascript
const arr = [[[[["March"]]]], [[["Jan"]]], [[6]], [[2]], "A", ["a"]];
//扁平参数对等的层数
const newArr = arr.flat(2);
console.log(newArr);//[ [ [ 'March' ] ], [ 'Jan' ], 6, 2, 'A', 'a' ]
//使用Infinity关键字 可以扁平化任意层数数组
const newArr = arr.flat(Infinity);
console.log(newArr);//[ 'March', 'Jan', 6, 2, 'A', 'a' ]

```

## every 所有元素是否通过测试

`every`用于所有元素是否都能通过测试，返回一个布尔值，只有当所有元素都通过了测试，才会返回`true`，接收一个回调函数，回调函数有三个形参，第一个为当前元素，第二个为当前索引，第三个为数组本身，**另外，当数组为空的时候使用every，条件不论是怎么样的，都会返回true（这种情况属于**[无条件正确](https://en.wikipedia.org/wiki/Vacuous_truth)**，因为**[空集](https://zh.wikipedia.org/wiki/%E7%A9%BA%E9%9B%86)**的所有元素都符合给定的条件。）**

```javascript
const arr = ["March", "Jan", 6, 2, "A", "a"];
const newArr = arr.every((item) => typeof item === "string");
//并不是所有的元素都符合条件 所以返回false
console.log(newArr);//false
//只要是数组是空数组，后面的条件不管跟什么返回的永远为true
console.log([].every((item) => item > 10));//true
```

## some 数组中至少有一个元素通过测试

some用于数组中参数其中一个或多个通过了测试，返回一个布尔值，如果有一个或以上通过测试就返回true，一个都没通过返回false，接收一个回调函数，有三个形参，第一个为当前元素，第二个为当前索引，第三个为数组本身，
**另外，当数组为空时使用some，不论判断条件如何，都会返回false，并且他不会改变数组**

```javascript
const arr = ["March", "Jan", 6, 2, "A", "a"];
const newArr = arr.some((item) => typeof item === "string");
//其中一个或以上的元素符合条件就返回true
console.log(newArr);//true
//只要是数组是空数组，后面的条件不管跟什么返回的永远为false
console.log([].some((item) => item == undefined));//false
```

## join 选定格式转换成字符串

join用于将数组转换成字符串的方法，接收一个参数（**可以为任意类型，但引用类型则会默认转换成** **[****object Object****]** **等**），为数组元素转换成字符串的间隔符，不传参数默认以 ‘，’号隔开

```javascript
const arr = ["March", "Jan", 6, 2, "A", "a"];
const newArr = arr.join();
console.log(newArr);//March,Jan,6,2,A,a
//可以是number类型
const newArr = arr.join(3);
console.log(newArr);//March3Jan36323A3a
//也可以是引用类型，但会自动转换
const newArr = arr.join({id: 1});
console.log(newArr);//March[object Object]Jan[object Object]6[object Object]2[object Object]A[object Object]a
```

## toString 转换成字符串

`toString`是几乎所有数据类型都有的一个方法，就是单纯的转换成字符串，数组中转换成字符串默认以‘，’号隔开，**有一个小技巧，如果多维数组的类型都是值类型的，可以使用toString进行扁平化**

```javascript
//简单的数组转字符串
const arr = ["March", "Jan", 6, 2, "A", "a"];
const newArr = arr.toString();
console.log(newArr);//March,Jan,6,2,A,a

//不论是几维数组，在toString的时候都会转化成字符串，在使用字符串方法转成数据就可以了
//弊端是因为转的时候是toString转换成了字符串，任意值类型到最后都是字符串形式，undefined和null则会转换成空字符串
const arr = [[["March"]], [[[["Jan"]]]], [[[6]]], [[2]], [[["A"]]], [[["a"]]]];
const newArr = arr.toString().split(",");
console.log(newArr);//[ 'March', 'Jan', '6', '2', 'A', 'a' ]
```

## toLocaleString

此方法用于格式转换，最后返回字符串代表数组中所有的元素，接收两个参数第一个带有 BCP 47 语言标签的字符串，或者此类字符串的数组。对于
`locales` 参数的一般形式和说明，可以参见`Intl`[ 主页面的参数说明](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_%E5%8F%82%E6%95%B0)。第二个，一个具有配置属性的对象。对于数字，请参见 `Number.prototype.toLocaleString()`；对于日期，请参见`Date.prototype.toLocaleString()`。
此方法的使用方法记得东西比较多，详细使用方法可以点击上面的链接查看

```javascript
const arr = ["￥7", 500, 8123, 12];
const newArr = arr.toLocaleString("ja-JP", {style: "currency", currency: "JPY"});
console.log(newArr);//￥7,￥500,￥8,123,￥12
//如果不传参数，则效果于toString一样
const newArr = arr.toLocaleString();
console.log(newArr);//￥7,500,8,123,12
```

## entries 返回数组迭代器的对象，包含键和值

返回一个数组迭代器对象，[数组迭代器](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/@@iterator)（ array[Symbol.iterator]）,如果不太清楚的可以看一下Symbol篇章，或者点击数组迭代器查看

```javascript
const arr = ["March", "Jan", 6, 2, "A", "a"];
//返回迭代器对象，有一个next方法，使用next方法会返回一个对象，里面value值就是我们想要的值
const newArr = arr.entries();
//查看的时候需要使用next，value为我们想要的值，done是否结束
console.log(newArr.next());//{ value: [ 0, 'March' ], done: false }
console.log(newArr.next());//{ value: [ 1, 'Jan' ], done: false }
console.log(newArr.next());//{ value: [ 2, 6 ], done: false }
console.log(newArr.next());//{ value: [ 3, 2 ], done: false }
console.log(newArr.next());//{ value: [ 4, 'A' ], done: false }
console.log(newArr.next());//{ value: [ 5, 'a' ], done: false }
//已经没有值了，并且done变成了true
console.log(newArr.next());//{ value: undefined, done: true }

//entries返回一个迭代器对象，所以可以被for...of..遍历
for (const iterator of newArr) {
  console.log(iterator);
}
//[ 0, 'March' ]
//[ 1, 'Jan' ]
//[ 2, 6 ]
//[ 3, 2 ]
//[ 4, 'A' ]
//[ 5, 'a' ]
```

## keys 返回数组迭代对象，键

返回一个只包含键的迭代对象，使用方法与entries一致

```javascript
const arr = ["March", "Jan", 6, 2, "A", "a"];
//返回只包含键的可迭代对象，数组中的键也就是索引
const newArr = arr.keys();
//使用for...of..遍历打印
for (const iterator of newArr) {
  console.log(iterator);
}
//0
//1
//2
//3
//4
//5
```

## values 返回数组迭代对象，值

返回一个只包含值得可迭代对象，使用方法与entries一致

```javascript
const arr = ["March", "Jan", 6, 2, "A", "a"];
//返回只包含键的可迭代对象，数组中的键也就是索引
const newArr = arr.values();
//使用for...of..遍历打印
for (const iterator of newArr) {
  console.log(iterator);
}
//March
//Jan
//6
//2
//A
//a
```

