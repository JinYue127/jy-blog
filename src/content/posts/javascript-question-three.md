---
title: JavaScript 进阶问题列表3
published: 2024-09-18
description: 从基础到进阶，测试你有多了解 JavaScript
image: ''
tags: [ JavaScript,面试 ]
category: JavaScript
draft: false
comments: true
lang: ''
---

###### 61. 输出是什么？

```javascript
const person = {name: "Lydia"};

Object.defineProperty(person, "age", {value: 21});

console.log(person);
console.log(Object.keys(person));
```

- A: `{ name: "Lydia", age: 21 }`, `["name", "age"]`
- B: `{ name: "Lydia", age: 21 }`, `["name"]`
- C: `{ name: "Lydia"}`, `["name", "age"]`
- D: `{ name: "Lydia"}`, `["age"]`

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

通过`defineProperty`方法，我们可以给对象添加一个新属性，或者修改已经存在的属性。而我们使用`defineProperty`
方法给对象添加了一个属性之后，属性默认为 _不可枚举 (not enumerable)_. `Object.keys`方法仅返回对象中 _可枚举 (enumerable)_
的属性，因此只剩下了`"name"`.

用`defineProperty`方法添加的属性默认不可变。你可以通过`writable`, `configurable` 和 `enumerable`属性来改变这一行为。这样，
`defineProperty`方法可以让您更好地控制要添加到对象的属性。

</p>
</details>

---

###### 62. 输出是什么？

```javascript
const settings = {
  username: "lydiahallie",
  level: 19,
  health: 90
};

const data = JSON.stringify(settings, ["level", "health"]);
console.log(data);
```

- A: `"{"level":19, "health":90}"`
- B: `"{"username": "lydiahallie"}"`
- C: `"["level", "health"]"`
- D: `"{"username": "lydiahallie", "level":19, "health":90}"`

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

`JSON.stringify`的第二个参数是 _替代者 (replacer)_. 替代者 (replacer) 可以是个函数或数组，用以控制哪些值如何被转换为字符串。

如果替代者 (replacer) 是个 _数组_，那么就只有包含在数组中的属性将会被转化为字符串。在本例中，只有名为`"level"` 和
`"health"` 的属性被包括进来，`"username"`则被排除在外。`data` 就等于 `"{"level":19, "health":90}"`.

而如果替代者 (replacer) 是个 _函数_，这个函数将被对象的每个属性都调用一遍。
函数返回的值会成为这个属性的值，最终体现在转化后的 JSON 字符串中（译者注：Chrome
下，经过实验，如果所有属性均返回同一个值的时候有异常，会直接将返回值作为结果输出而不会输出 JSON 字符串），而如果返回值为
`undefined`，则该属性会被排除在外。

</p>
</details>

---

###### 63. 输出是什么？

```javascript
let num = 10;

const increaseNumber = () => num++;
const increasePassedNumber = number => number++;

const num1 = increaseNumber();
const num2 = increasePassedNumber(num1);

console.log(num1);
console.log(num2);
```

- A: `10`, `10`
- B: `10`, `11`
- C: `11`, `11`
- D: `11`, `12`

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

一元操作符 `++` _先返回_ 操作值，_再累加_ 操作值。`num1`的值是`10`，因为`increaseNumber`函数首先返回`num`的值，也就是`10`
，随后再进行 `num`的累加。

`num2`是`10`因为我们将 `num1`传入`increasePassedNumber`. `number`等于`10`（`num1`的值。同样道理，`++` _先返回_ 操作值，
_再累加_ 操作值。）`number`是`10`，所以`num2`也是`10`.

</p>
</details>

---

###### 64. 输出什么？

```javascript
const value = {number: 10};

const multiply = (x = {...value}) => {
  console.log(x.number *= 2);
};

multiply();
multiply();
multiply(value);
multiply(value);
```

- A: `20`, `40`, `80`, `160`
- B: `20`, `40`, `20`, `40`
- C: `20`, `20`, `20`, `40`
- D: `NaN`, `NaN`, `20`, `40`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

在 ES6 中，我们可以使用默认值初始化参数。如果没有给函数传参，或者传的参值为 `"undefined"`，那么参数的值将是默认值。上述例子中，我们将
`value` 对象进行了解构并传到一个新对象中，因此 `x` 的默认值为 `{number：10}`。

默认参数在调用时才会进行计算，每次调用函数时，都会创建一个新的对象。我们前两次调用 `multiply` 函数且不传递值，那么每一次 `x`
的默认值都为 `{number：10}`，因此打印出该数字的乘积值为`20`。

第三次调用 `multiply` 时，我们传递了一个参数，即对象`value`。`*=`运算符实际上是`x.number = x.number * 2`的简写，我们修改了
`x.number`的值，并打印出值`20`。

第四次，我们再次传递`value`对象。`x.number`之前被修改为`20`，所以`x.number * = 2`打印为`40`。

</p>
</details>

---

###### 65. 输出什么？

```javascript
[1, 2, 3, 4].reduce((x, y) => console.log(x, y));
```

- A: `1` `2` and `3` `3` and `6` `4`
- B: `1` `2` and `2` `3` and `3` `4`
- C: `1` `undefined` and `2` `undefined` and `3` `undefined` and `4` `undefined`
- D: `1` `2` and `undefined` `3` and `undefined` `4`

<details><summary><b>答案</b></summary>
<p>

#### 答案：D

`reducer` 函数接收 4 个参数：

1. Accumulator (acc) (累计器)
2. Current Value (cur) (当前值)
3. Current Index (idx) (当前索引)
4. Source Array (src) (源数组)

`reducer` 函数的返回值将会分配给累计器，该返回值在数组的每个迭代中被记住，并最后成为最终的单个结果值。

`reducer` 函数还有一个可选参数`initialValue`，该参数将作为第一次调用回调函数时的第一个参数的值。如果没有提供`initialValue`
，则将使用数组中的第一个元素。

在上述例子，`reduce`方法接收的第一个参数 (Accumulator) 是`x`，第二个参数 (Current Value) 是`y`。

在第一次调用时，累加器`x`为`1`，当前值`“y”`为`2`，打印出累加器和当前值：`1`和`2`。

例子中我们的回调函数没有返回任何值，只是打印累加器的值和当前值。如果函数没有返回值，则默认返回`undefined`。在下一次调用时，累加器为
`undefined`，当前值为“3”，因此`undefined`和`3`被打印出。

在第四次调用时，回调函数依然没有返回值。累加器再次为 `undefined`，当前值为“4”。`undefined`和`4`被打印出。
</p>
</details>

---

###### 66. 使用哪个构造函数可以成功继承`Dog`类？

```javascript
class Dog {
  constructor(name) {
    this.name = name;
  }
};

class Labrador extends Dog {
  // 1 
  constructor(name, size) {
    this.size = size;
  }

  // 2
  constructor(name, size) {
    super(name);
    this.size = size;
  }

  // 3
  constructor(size) {
    super(name);
    this.size = size;
  }

  // 4 
  constructor(name, size) {
    this.name = name;
    this.size = size;
  }

};
```

- A: 1
- B: 2
- C: 3
- D: 4

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

在子类中，在调用`super`之前不能访问到`this`关键字。如果这样做，它将抛出一个`ReferenceError`：1 和 4 将引发一个引用错误。

使用`super`关键字，需要用给定的参数来调用父类的构造函数。父类的构造函数接收`name`参数，因此我们需要将`name`传递给`super`。

`Labrador`类接收两个参数，`name`参数是由于它继承了`Dog`，`size`作为`Labrador`类的额外属性，它们都需要传递给`Labrador`
的构造函数，因此使用构造函数 2 正确完成。
</p>
</details>

---

###### 67. 输出什么？

```javascript
// index.js
console.log('running index.js');
import {sum} from './sum.js';

console.log(sum(1, 2));

// sum.js
console.log('running sum.js');
export const sum = (a, b) => a + b;
```

- A: `running index.js`, `running sum.js`, `3`
- B: `running sum.js`, `running index.js`, `3`
- C: `running sum.js`, `3`, `running index.js`
- D: `running index.js`, `undefined`, `running sum.js`

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

`import`命令是编译阶段执行的，在代码运行之前。因此这意味着被导入的模块会先运行，而导入模块的文件会后执行。

这是 CommonJS 中`require（）`和`import`之间的区别。使用`require()`，您可以在运行代码时根据需要加载依赖项。如果我们使用
`require`而不是`import`，`running index.js`，`running sum.js`，`3`会被依次打印。

</p>
</details>

---

###### 68. 输出什么？

```javascript
console.log(Number(2) === Number(2))
console.log(Boolean(false) === Boolean(false))
console.log(Symbol('foo') === Symbol('foo'))
```

- A: `true`, `true`, `false`
- B: `false`, `true`, `false`
- C: `true`, `false`, `true`
- D: `true`, `true`, `true`

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

每个`Symbol`都是完全唯一的。传递给`Symbol`的参数只是给`Symbol`的一个描述。`Symbol`的值不依赖于传递的参数。当我们测试相等时，我们创建了两个全新的符号：第一个
`Symbol（'foo'）`，第二个`Symbol（'foo'）`，这两个值是唯一的，彼此不相等，因此返回`false`。

</p>
</details>

---

###### 69. 输出什么？

```javascript
const name = "Lydia Hallie"
console.log(name.padStart(13))
console.log(name.padStart(2))
```

- A: `"Lydia Hallie"`, `"Lydia Hallie"`
- B: `"           Lydia Hallie"`, `"  Lydia Hallie"` (`"[13x whitespace]Lydia Hallie"`, `"[2x whitespace]Lydia Hallie"`)
- C: `" Lydia Hallie"`, `"Lydia Hallie"` (`"[1x whitespace]Lydia Hallie"`, `"Lydia Hallie"`)
- D: `"Lydia Hallie"`, `"Lyd"`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

使用`padStart`方法，我们可以在字符串的开头添加填充。传递给此方法的参数是字符串的总长度（包含填充）。字符串`Lydia Hallie`的长度为
`12`，因此`name.padStart（13）`在字符串的开头只会插入 1（`13 - 12 = 1`）个空格。

如果传递给`padStart`方法的参数小于字符串的长度，则不会添加填充。

</p>
</details>

---

###### 70. 输出什么？

```javascript
console.log("🥑" + "💻");
```

- A: `"🥑💻"`
- B: `257548`
- C: A string containing their code points
- D: Error

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

使用`+`运算符，您可以连接字符串。上述情况，我们将字符串`“🥑”`与字符串`”💻“`连接起来，产生`”🥑💻“`。

</p>
</details>

---

###### 71. 如何能打印出`console.log`语句后注释掉的值？

```javascript
function* startGame() {
  const 答案 = yield "Do you love JavaScript?";
  if (答案 !== "Yes") {
    return "Oh wow... Guess we're gone here";
  }
  return "JavaScript loves you back ❤️";
}

const game = startGame();
console.log(/* 1 */); // Do you love JavaScript?
console.log(/* 2 */); // JavaScript loves you back ❤️
```

- A: `game.next("Yes").value` and `game.next().value`
- B: `game.next.value("Yes")` and `game.next.value()`
- C: `game.next().value` and `game.next("Yes").value`
- D: `game.next.value()` and `game.next.value("Yes")`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

`generator`函数在遇到`yield`关键字时会“暂停”其执行。首先，我们需要让函数产生字符串`Do you love JavaScript?`，这可以通过调用
`game.next().value`来完成。上述函数的第一行就有一个`yield`关键字，那么运行立即停止了，`yield`表达式本身没有返回值，或者说总是返回
`undefined`，这意味着此时变量 `答案` 为`undefined`

`next`方法可以带一个参数，该参数会被当作上一个 `yield` 表达式的返回值。当我们调用`game.next("Yes").value`时，先前的 `yield`
的返回值将被替换为传递给`next()`函数的参数`"Yes"`。此时变量 `答案` 被赋值为 `"Yes"`，`if`语句返回`false`，所以
`JavaScript loves you back ❤️`被打印。

</p>
</details>

---

###### 72. 输出什么？

```javascript
console.log(String.raw`Hello\nworld`);
```

- A: `Hello world!`
- B: `Hello` <br />&nbsp; &nbsp; &nbsp;`world`
- C: `Hello\nworld`
- D: `Hello\n` <br /> &nbsp; &nbsp; &nbsp;`world`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

`String.raw`函数是用来获取一个模板字符串的原始字符串的，它返回一个字符串，其中忽略了转义符（`\n`，`\v`，`\t`
等）。但反斜杠可能造成问题，因为你可能会遇到下面这种类似情况：

```javascript
const path = `C:\Documents\Projects\table.html`
String.raw`${path}`
```

这将导致：

`"C:DocumentsProjects able.html"`

直接使用`String.raw`

```javascript
String.raw`C:\Documents\Projects\table.html`
```

它会忽略转义字符并打印：`C:\Documents\Projects\table.html`

上述情况，字符串是`Hello\nworld`被打印出。

</p>
</details>

---

###### 73. 输出什么？

```javascript
async function getData() {
  return await Promise.resolve("I made it!");
}

const data = getData();
console.log(data);
```

- A: `"I made it!"`
- B: `Promise {<resolved>: "I made it!"}`
- C: `Promise {<pending>}`
- D: `undefined`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

异步函数始终返回一个 promise。`await`仍然需要等待 promise 的解决：当我们调用`getData()`并将其赋值给`data`，此时`data`为
`getData`方法返回的一个挂起的 promise，该 promise 并没有解决。

如果我们想要访问已解决的值`"I made it!"`，可以在`data`上使用`.then()`方法：

`data.then(res => console.log(res))`

这样将打印 `"I made it!"`

</p>
</details>

---

###### 74. 输出什么？

```javascript
function addToList(item, list) {
  return list.push(item);
}

const result = addToList("apple", ["banana"]);
console.log(result);
```

- A: `['apple', 'banana']`
- B: `2`
- C: `true`
- D: `undefined`

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

`push()`方法返回新数组的长度。一开始，数组包含一个元素（字符串`"banana"`），长度为 1。在数组中添加字符串`"apple"`后，长度变为
2，并将从`addToList`函数返回。

`push`方法修改原始数组，如果你想从函数返回数组而不是数组长度，那么应该在 push `item`之后返回`list`。

</p>
</details>

---

###### 75. 输出什么？

```javascript
const box = {x: 10, y: 20};

Object.freeze(box);

const shape = box;
shape.x = 100;
console.log(shape)
```

- A: `{ x: 100, y: 20 }`
- B: `{ x: 10, y: 20 }`
- C: `{ x: 100 }`
- D: `ReferenceError`

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

`Object.freeze`使得无法添加、删除或修改对象的属性（除非属性的值是另一个对象）。

当我们创建变量`shape`并将其设置为等于冻结对象`box`时，`shape`指向的也是冻结对象。你可以使用`Object.isFrozen`
检查一个对象是否被冻结，上述情况，`Object.isFrozen（shape）`将返回`true`。

由于`shape`被冻结，并且`x`的值不是对象，所以我们不能修改属性`x`。`x`仍然等于`10`，`{x：10，y：20}`被打印。

注意，上述例子我们对属性`x`进行修改，可能会导致抛出 TypeError 异常（最常见但不仅限于严格模式下时）。

</p>
</details>

---

###### 76. 输出什么？

```javascript
const {name: myName} = {name: "Lydia"};

console.log(name);
```

- A: `"Lydia"`
- B: `"myName"`
- C: `undefined`
- D: `ReferenceError`

<details><summary><b>答案</b></summary>
<p>

#### 答案：D

当我们从右侧的对象解构属性`name`时，我们将其值`Lydia`分配给名为`myName`的变量。

使用`{name：myName}`，我们是在告诉 JavaScript 我们要创建一个名为`myName`的新变量，并且其值是右侧对象的`name`属性的值。

当我们尝试打印`name`，一个未定义的变量时，就会引发`ReferenceError`。

</p>
</details>

---

###### 77. 以下是个纯函数么？

```javascript
function sum(a, b) {
  return a + b;
}
```

- A: Yes
- B: No

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

纯函数在相同的输入值时，需产生相同的输出，其输出的结果，与输入值以外的其他隐藏信息或状态无关，也和由 I/O 设备产生的外部输出无关。
纯函数不会产生副作用。

纯函数与副作用的定义可参考：
https://zh.wikipedia.org/wiki/%E5%89%AF%E4%BD%9C%E7%94%A8_(%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%A7%91%E5%AD%A6)

</p>
</details>

---

###### 78. 输出什么？

```javascript
const add = () => {
  const cache = {};
  return num => {
    if (num in cache) {
      return `From cache! ${cache[num]}`;
    } else {
      const result = num + 10;
      cache[num] = result;
      return `Calculated! ${result}`;
    }
  };
};

const addFunction = add();
console.log(addFunction(10));
console.log(addFunction(10));
console.log(addFunction(5 * 2));
```

- A: `Calculated! 20` `Calculated! 20` `Calculated! 20`
- B: `Calculated! 20` `From cache! 20` `Calculated! 20`
- C: `Calculated! 20` `From cache! 20` `From cache! 20`
- D: `Calculated! 20` `From cache! 20` `Error`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

`add`函数是一个记忆函数。通过记忆化，我们可以缓存函数的结果，以加快其执行速度。上述情况，我们创建一个`cache`对象，用于存储先前返回过的值。

如果我们使用相同的参数多次调用`addFunction`函数，它首先检查缓存中是否已有该值，如果有，则返回缓存值，这将节省执行时间。如果没有，那么它将计算该值，并存储在缓存中。

我们用相同的值三次调用了`addFunction`函数：

在第一次调用，`num`等于`10`时函数的值尚未缓存，if 语句`num in cache`返回`false`，else 块的代码被执行：`Calculated! 20`
，并且其结果被添加到缓存对象，`cache`现在看起来像`{10:20}`。

第二次，`cache`对象包含`10`的返回值。if 语句 `num in cache` 返回`true`，`From cache! 20`被打印。

第三次，我们将`5 * 2`(值为 10) 传递给函数。`cache`对象包含`10`的返回值。if 语句 `num in cache` 返回`true`，`From cache! 20`
被打印。

</p>
</details>

---

###### <a name=20190726></a>79. 输出什么？

```javascript
const myLifeSummedUp = ["☕", "💻", "🍷", "🍫"]

for (let item in myLifeSummedUp) {
  console.log(item)
}

for (let item of myLifeSummedUp) {
  console.log(item)
}
```

- A: `0` `1` `2` `3` and `"☕"` ` "💻"` `"🍷"` `"🍫"`
- B: `"☕"` ` "💻"` `"🍷"` `"🍫"` and `"☕"` ` "💻"` `"🍷"` `"🍫"`
- C: `"☕"` ` "💻"` `"🍷"` `"🍫"` and `0` `1` `2` `3`
- D:  `0` `1` `2` `3` and `{0: "☕", 1: "💻", 2: "🍷", 3: "🍫"}`

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

通过`for-in`循环，我们可以遍历一个对象**自有的**、**继承的**、**可枚举的**、**非 Symbol 的**
属性。在数组中，可枚举属性是数组元素的“键”，即它们的索引。类似于下面这个对象：

`{0: "☕", 1: "💻", 2: "🍷", 3: "🍫"}`

其中键则是可枚举属性，因此 `0`，`1`，`2`，`3`被记录。

通过`for-of`循环，我们可以迭代**可迭代对象**（包括 `Array`，`Map`，`Set`，`String`，`arguments`
等）。当我们迭代数组时，在每次迭代中，不同属性的值将被分配给变量`item`，因此`“☕”`，`“💻”`，`“🍷”`，`“🍫”`被打印。

</p>
</details>

---

###### 80. 输出什么？

```javascript
const list = [1 + 2, 1 * 2, 1 / 2]
console.log(list)
```

- A: `["1 + 2", "1 * 2", "1 / 2"]`
- B: `["12", 2, 0.5]`
- C: `[3, 2, 0.5]`
- D:  `[1, 1, 1]`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

数组元素可以包含任何值。数字，字符串，布尔值，对象，数组，`null`，`undefined`，以及其他表达式，如日期，函数和计算。

元素将等于返回的值。`1 + 2`返回`3`，`1 * 2`返回'2`，'1 / 2`返回`0.5`。

</p>
</details>

---

###### 81. 输出什么？

```javascript
function sayHi(name) {
  return `Hi there, ${name}`
}

console.log(sayHi())
```

- A: `Hi there, `
- B: `Hi there, undefined`
- C: `Hi there, null`
- D:  `ReferenceError`

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

默认情况下，如果不给函数传参，参数的值将为`undefined`。上述情况，我们没有给参数`name`传值。`name`等于`undefined`，并被打印。

在 ES6 中，我们可以使用默认参数覆盖此默认的`undefined`值。例如：

`function sayHi (name =“Lydia”){...}`

在这种情况下，如果我们没有传递值或者如果我们传递`undefined`，`name`总是等于字符串`Lydia`

</p>
</details>

---

###### 82. 输出什么？

```javascript
var status = "😎"

setTimeout(() => {
  const status = "😍"

  const data = {
    status: "🥑",
    getStatus() {
      return this.status
    }
  }

  console.log(data.getStatus())
  console.log(data.getStatus.call(this))
}, 0)
```

- A: `"🥑"` and `"😍"`
- B: `"🥑"` and `"😎"`
- C: `"😍"` and `"😎"`
- D: `"😎"` and `"😎"`

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

`this`关键字的指向取决于使用它的位置。在**函数**中，比如`getStatus`，`this`指向的是调用它的对象，上述例子中`data`对象调用了
`getStatus`，因此`this`指向的就是`data`对象。当我们打印`this.status`时，`data`对象的`status`属性被打印，即`"🥑"`。

使用`call`方法，可以更改`this`指向的对象。`data.getStatus.call(this)`是将`this`的指向由`data`对象更改为全局对象。在全局对象上，有一个名为
`status`的变量，其值为`”😎“`。因此打印`this.status`时，会打印`“😎”`。
</p>
</details>

---

###### 83. 输出什么？

```javascript
const person = {
  name: "Lydia",
  age: 21
}

let city = person.city
city = "Amsterdam"

console.log(person)
```

- A: `{ name: "Lydia", age: 21 }`
- B: `{ name: "Lydia", age: 21, city: "Amsterdam" }`
- C: `{ name: "Lydia", age: 21, city: undefined }`
- D: `"Amsterdam"`

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

我们将变量`city`设置为等于`person`对象上名为`city`的属性的值。这个对象上没有名为`city`的属性，因此变量`city`的值为
`undefined`。

请注意，我们没有引用`person`对象本身，只是将变量`city`设置为等于`person`对象上`city`属性的当前值。

然后，我们将`city`设置为等于字符串`“Amsterdam”`。这不会更改 person 对象：没有对该对象的引用。

因此打印`person`对象时，会返回未修改的对象。

</p>
</details>

---

###### 84. 输出什么？

```javascript
function checkAge(age) {
  if (age < 18) {
    const message = "Sorry, you're too young."
  } else {
    const message = "Yay! You're old enough!"
  }

  return message
}

console.log(checkAge(21))
```

- A: `"Sorry, you're too young."`
- B: `"Yay! You're old enough!"`
- C: `ReferenceError`
- D: `undefined`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

`const`和`let`声明的变量是具有**块级作用域**的，块是大括号（`{}`）之间的任何东西，即上述情况`if / else`
语句的花括号。由于块级作用域，我们无法在声明的块之外引用变量，因此抛出`ReferenceError`。

</p>
</details>

---

###### 85. 什么样的信息将被打印？

```javascript
fetch('https://www.website.com/api/user/1')
  .then(res => res.json())
  .then(res => console.log(res))
```

- A: `fetch`方法的结果
- B: 第二次调用`fetch`方法的结果
- C: 前一个`.then()`中回调方法返回的结果
- D: 总是`undefined`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

第二个`.then`中`res`的值等于前一个`.then`中的回调函数返回的值。你可以像这样继续链接`.then`，将值传递给下一个处理程序。

</p>
</details>

---

###### 86. 哪个选项是将`hasName`设置为`true`的方法，前提是不能将`true`作为参数传递？

```javascript
function getName(name) {
  const hasName = //
}
```

- A: `!!name`
- B: `name`
- C: `new Boolean(name)`
- D: `name.length`

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

使用逻辑非运算符`!`，将返回一个布尔值，使用`!! name`，我们可以确定`name`的值是真的还是假的。如果`name`是真实的，那么`!name`返回
`false`。`!false`返回`true`。

通过将`hasName`设置为`name`，可以将`hasName`设置为等于传递给`getName`函数的值，而不是布尔值`true`。

`new Boolean（true）`返回一个对象包装器，而不是布尔值本身。

`name.length`返回传递的参数的长度，而不是布尔值`true`。

</p>
</details>

###### 87. 输出什么？

```javascript
console.log("I want pizza"[0])
```

- A: `"""`
- B: `"I"`
- C: `SyntaxError`
- D: `undefined`

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

可以使用方括号表示法获取字符串中特定索引的字符，字符串中的第一个字符具有索引 0，依此类推。在这种情况下，我们想要得到索引为 0
的元素，字符`'I'`被记录。

请注意，IE7 及更低版本不支持此方法。在这种情况下，应该使用`.charAt（）`

</p>
</details>

---

###### 88. 输出什么？

```javascript
function sum(num1, num2 = num1) {
  console.log(num1 + num2)
}

sum(10)
```

- A: `NaN`
- B: `20`
- C: `ReferenceError`
- D: `undefined`

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

您可以将默认参数的值设置为函数的另一个参数，只要另一个参数定义在其之前即可。我们将值`10`传递给`sum`函数。如果`sum`函数只接收
1 个参数，则意味着没有传递`num2`的值，这种情况下，`num1`的值等于传递的值`10`。`num2`的默认值是`num1`的值，即`10`。
```num1 + num2```返回`20`。

如果您尝试将默认参数的值设置为后面定义的参数，则可能导致参数的值尚未初始化，从而引发错误。比如：

```js
function test(m = n, n = 2) {
  console.log(m, n)
}

test() // Uncaught ReferenceError: Cannot access 'n' before initialization
test(3) // 3 2
test(3, 4) // 3 4
```

</p>
</details>

---

###### 89. 输出什么？

```javascript
// module.js 
export default () => "Hello world"
export const name = "Lydia"

// index.js 
import * as data from "./module"

console.log(data)
```

- A: `{ default: function default(), name: "Lydia" }`
- B: `{ default: function default() }`
- C: `{ default: "Hello world", name: "Lydia" }`
- D: Global object of `module.js`

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

使用`import * as name`语法，我们将`module.js`文件中所有`export`导入到`index.js`文件中，并且创建了一个名为`data`的新对象。在
`module.js`文件中，有两个导出：默认导出和命名导出。默认导出是一个返回字符串“Hello World”的函数，命名导出是一个名为`name`
的变量，其值为字符串`“Lydia”`。

`data`对象具有默认导出的`default`属性，其他属性具有指定 exports 的名称及其对应的值。

</p>
</details>

---

###### 90. 输出什么？

```javascript
class Person {
  constructor(name) {
    this.name = name
  }
}

const member = new Person("John")
console.log(typeof member)
```

- A: `"class"`
- B: `"function"`
- C: `"object"`
- D: `"string"`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

类是构造函数的语法糖，如果用构造函数的方式来重写`Person`类则将是：

```javascript
function Person() {
  this.name = name
}
```

通过`new`来调用构造函数，将会生成构造函数`Person`的实例，对实例执行`typeof`关键字将返回`"object"`，上述情况打印出
`"object"`。

</p>
</details>

---
