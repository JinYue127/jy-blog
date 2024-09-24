---
title: JavaScript 进阶问题列表2
published: 2024-09-18
description: 从基础到进阶，测试你有多了解 JavaScript
image: ''
tags: [ JavaScript,面试 ]
category: JavaScript
draft: false
comments: true
lang: ''
---

###### 31. 当点击按钮时，event.target 是什么？

```html
<div onclick="console.log('first div')">
  <div onclick="console.log('second div')">
    <button onclick="console.log('button')">Click!</button>
  </div>
</div>
```

- A: Outer `div`
- B: Inner `div`
- C: `button`
- D: 一个包含所有嵌套元素的数组。

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

导致事件的最深嵌套的元素是事件的 target。你可以通过 `event.stopPropagation` 来停止冒泡。

</p>
</details>

---

###### 32. 当您单击该段落时，日志输出是什么？

```html
<div onclick="console.log('div')">
  <p onclick="console.log('p')">Click here!</p>
</div>
```

- A: `p` `div`
- B: `div` `p`
- C: `p`
- D: `div`

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

如果我们点击 `p`，我们会看到两个日志：`p` 和 `div`。在事件传播期间，有三个阶段：捕获、目标和冒泡。默认情况下，事件处理程序在冒泡阶段执行（除非将
`useCapture` 设置为 `true`）。它从嵌套最深的元素向外传播。

</p>
</details>

---

###### 33. 输出是什么？

```javascript
const person = { name: "Lydia" };

function sayHi(age) {
  console.log(`${this.name} is ${age}`);
}

sayHi.call(person, 21);
sayHi.bind(person, 21);
```

- A: `undefined is 21` `Lydia is 21`
- B: `function` `function`
- C: `Lydia is 21` `Lydia is 21`
- D: `Lydia is 21` `function`

<details><summary><b>答案</b></summary>
<p>

#### 答案：D

使用这两种方法，我们都可以传递我们希望 `this` 关键字引用的对象。但是，`.call` 是**立即执行**的。

`.bind` 返回函数的**副本**，但带有绑定上下文！它不是立即执行的。

</p>
</details>

---

###### 34. 输出是什么？

```javascript
function sayHi() {
  return (() => 0)();
}

typeof sayHi();
```

- A: `"object"`
- B: `"number"`
- C: `"function"`
- D: `"undefined"`

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

`sayHi` 方法返回的是立即执行函数 (IIFE) 的返回值。此立即执行函数的返回值是 `0`，类型是 `number`

参考：只有 7 种内置类型：`null`，`undefined`，`boolean`，`number`，`string`，`object`, `symbol` 和 `bigint`。`function`
不是一种类型，函数是对象，它的类型是`object`。

</p>
</details>

---

###### 35. 下面哪些值是 falsy?

```javascript
0;
new Number(0)("")(" ");
new Boolean(false);
undefined;
```

- A: `0`, `''`, `undefined`
- B: `0`, `new Number(0)`, `''`, `new Boolean(false)`, `undefined`
- C: `0`, `''`, `new Boolean(false)`, `undefined`
- D: All of them are falsy

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

只有 8 种 [falsy](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy) 值：

- `undefined`
- `null`
- `NaN`
- `false`
- `''` (empty string)
- `0`
- `-0`
- `0n` (BigInt(0))

`Function` 构造函数，比如 `new Number` 和 `new Boolean`
，是 [truthy](https://developer.mozilla.org/zh-CN/docs/Glossary/Truthy)。

</p>
</details>

---

###### 36. 输出是什么？

```javascript
console.log(typeof typeof 1);
```

- A: `"number"`
- B: `"string"`
- C: `"object"`
- D: `"undefined"`

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

`typeof 1` 返回 `"number"`。
`typeof "number"` 返回 `"string"`。

</p>
</details>

---

###### 37. 输出是什么？

```javascript
const numbers = [1, 2, 3];
numbers[10] = 11;
console.log(numbers);
```

- A: `[1, 2, 3, 7 x null, 11]`
- B: `[1, 2, 3, 11]`
- C: `[1, 2, 3, 7 x empty, 11]`
- D: `SyntaxError`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

当你为数组设置超过数组长度的值的时候，JavaScript 会创建名为 "empty slots" 的东西。它们的值实际上是 `undefined`。你会看到以下场景：

`[1, 2, 3, 7 x empty, 11]`

这取决于你的运行环境（每个浏览器，以及 node 环境，都有可能不同）

</p>
</details>

---

###### 38. 输出是什么？

```javascript
(() => {
  let x, y;
  try {
    throw new Error();
  } catch (x) {
    (x = 1), (y = 2);
    console.log(x);
  }
  console.log(x);
  console.log(y);
})();
```

- A: `1` `undefined` `2`
- B: `undefined` `undefined` `undefined`
- C: `1` `1` `2`
- D: `1` `undefined` `undefined`

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

`catch` 代码块接收参数 `x`。当我们传递参数时，这与之前定义的变量 `x` 不同。这个 `x` 是属于 `catch` 块级作用域的。

然后，我们将块级作用域中的变量赋值为 `1`，同时也设置了变量 `y` 的值。现在，我们打印块级作用域中的变量 `x`，值为 `1`。

`catch` 块之外的变量 `x` 的值仍为 `undefined`，`y` 的值为 `2`。当我们在 `catch` 块之外执行 `console.log(x)` 时，返回
`undefined`，`y` 返回 `2`。

</p>
</details>

---

###### 39. JavaScript 中的一切都是？

- A: 基本类型与对象
- B: 函数与对象
- C: 只有对象
- D: 数字与对象
-

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

JavaScript 只有基本类型和对象。

基本类型包括 `boolean`, `null`, `undefined`, `bigint`, `number`, `string`, `symbol`。

</p>
</details>

---

###### 40. 输出是什么？

```javascript
[
  [0, 1],
  [2, 3],
].reduce(
  (acc, cur) => {
    return acc.concat(cur);
  },
  [1, 2],
);
```

- A: `[0, 1, 2, 3, 1, 2]`
- B: `[6, 1, 2]`
- C: `[1, 2, 0, 1, 2, 3]`
- D: `[1, 2, 6]`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

`[1, 2]`是初始值。初始值将会作为首次调用时第一个参数 `acc` 的值。在第一次执行时，`acc` 的值是 `[1, 2]`，`cur` 的值是
`[0, 1]`。合并它们，结果为 `[1, 2, 0, 1]`。
第二次执行，`acc` 的值是 `[1, 2, 0, 1]`，`cur` 的值是 `[2, 3]`。合并它们，最终结果为 `[1, 2, 0, 1, 2, 3]`

</p>
</details>

---

###### 41. 输出是什么？

```javascript
!!null;
!!"";
!!1;
```

- A: `false` `true` `false`
- B: `false` `false` `true`
- C: `false` `true` `true`
- D: `true` `true` `false`

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

`null` 是 [falsy](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy)。`!null` 的值是 `true`。`!true` 的值是 `false`。

`""` 是 [falsy](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy)。`!""` 的值是 `true`。`!true` 的值是 `false`。

`1` 是 [truthy](https://developer.mozilla.org/zh-CN/docs/Glossary/Truthy)。`!1` 的值是 `false`。`!false` 的值是 `true`。

</p>
</details>

---

###### 42. `setInterval` 方法的返回值是什么？

```javascript
setInterval(() => console.log("Hi"), 1000);
```

- A: 一个唯一的 id
- B: 该方法指定的毫秒数
- C: 传递的函数
- D: `undefined`

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

`setInterval` 返回一个唯一的 id。此 id 可被用于 `clearInterval` 函数来取消定时。

</p>
</details>

---

###### 43. 输出是什么？

```javascript
[..."Lydia"];
```

- A: `["L", "y", "d", "i", "a"]`
- B: `["Lydia"]`
- C: `[[], "Lydia"]`
- D: `[["L", "y", "d", "i", "a"]]`

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

string 类型是可迭代的。扩展运算符将迭代的每个字符映射成一个元素。

</p>
</details>

---

###### 44. 输出是什么？

```javascript
function* generator(i) {
  yield i;
  yield i * 2;
}

const gen = generator(10);

console.log(gen.next().value);
console.log(gen.next().value);
```

- A: `[0, 10], [10, 20]`
- B: `20, 20`
- C: `10, 20`
- D: `0, 10 and 10, 20`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

一般的函数在执行之后是不能中途停下的。但是，生成器函数却可以中途“停下”，之后可以再从停下的地方继续。当生成器遇到`yield`
关键字的时候，会生成`yield`后面的值。注意，生成器在这种情况下不 _返回_ (_return_ ) 值，而是 _生成_ (_yield_) 值。

首先，我们用`10`作为参数`i`来初始化生成器函数。然后使用`next()`方法一步步执行生成器。第一次执行生成器的时候，`i`的值为`10`
，遇到第一个`yield`关键字，它要生成`i`的值。此时，生成器“暂停”，生成了`10`。

然后，我们再执行`next()`方法。生成器会从刚才暂停的地方继续，这个时候`i`还是`10`。于是我们走到了第二个`yield`关键字处，这时候需要生成的值是
`i*2`，`i`为`10`，那么此时生成的值便是`20`。所以这道题的最终结果是`10,20`。

</p>
</details>

###### 45. 返回值是什么？

```javascript
const firstPromise = new Promise((res, rej) => {
  setTimeout(res, 500, "one");
});

const secondPromise = new Promise((res, rej) => {
  setTimeout(res, 100, "two");
});

Promise.race([firstPromise, secondPromise]).then((res) => console.log(res));
```

- A: `"one"`
- B: `"two"`
- C: `"two" "one"`
- D: `"one" "two"`

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

当我们向`Promise.race`方法中传入多个`Promise`时，会进行 _优先_ 解析。在这个例子中，我们用`setTimeout`给`firstPromise`和
`secondPromise`分别设定了 500ms 和 100ms 的定时器。这意味着`secondPromise`会首先解析出字符串`two`。那么此时`res`参数即为
`two`，是为输出结果。

</p>
</details>

---

###### 46. 输出是什么？

```javascript
let person = { name: "Lydia" };
const members = [person];
person = null;

console.log(members);
```

- A: `null`
- B: `[null]`
- C: `[{}]`
- D: `[{ name: "Lydia" }]`

<details><summary><b>答案</b></summary>
<p>

#### 答案：D

首先我们声明了一个拥有`name`属性的对象 `person`。

<img src="https://i.imgur.com/TML1MbS.png" width="200">

然后我们又声明了一个变量`members`. 将首个元素赋值为变量`person`。当设置两个对象彼此相等时，它们会通过 _引用_
进行交互。但是当你将引用从一个变量分配至另一个变量时，其实只是执行了一个 _复制_ 操作。（注意一点，他们的引用 _并不相同_!）

<img src="https://i.imgur.com/FSG5K3F.png" width="300">

接下来我们让`person`等于`null`。

<img src="https://i.imgur.com/sYjcsMT.png" width="300">

我们没有修改数组第一个元素的值，而只是修改了变量`person`的值，因为元素（复制而来）的引用与`person`不同。`members`
的第一个元素仍然保持着对原始对象的引用。当我们输出`members`数组时，第一个元素会将引用的对象打印出来。

</p>
</details>

---

###### 47. 输出是什么？

```javascript
const person = {
  name: "Lydia",
  age: 21,
};

for (const item in person) {
  console.log(item);
}
```

- A: `{ name: "Lydia" }, { age: 21 }`
- B: `"name", "age"`
- C: `"Lydia", 21`
- D: `["name", "Lydia"], ["age", 21]`

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

在`for-in`循环中，我们可以通过对象的 key 来进行迭代，也就是这里的`name`和`age`。在底层，对象的 key 都是字符串（如果他们不是
Symbol 的话）。在每次循环中，我们将`item`设定为当前遍历到的 key.所以一开始，`item`是`name`，之后 `item`输出的则是`age`。

</p>
</details>

---

###### 48. 输出是什么？

```javascript
console.log(3 + 4 + "5");
```

- A: `"345"`
- B: `"75"`
- C: `12`
- D: `"12"`

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

当所有运算符的 _优先级_ 相同时，计算表达式需要确定运算符的结合顺序，即从右到左还是从左往右。在这个例子中，我们只有一类运算符
`+`，对于加法来说，结合顺序就是从左到右。

`3 + 4`首先计算，得到数字`7`.

由于类型的强制转换，`7 + '5'`的结果是`"75"`. JavaScript 将`7`转换成了字符串，可以参考问题 15.我们可以用`+`号把两个字符串连接起来。
`"7" + "5"` 就得到了`"75"`.

</p>
</details>

---

###### 49. `num`的值是什么？

```javascript
const num = parseInt("7*6", 10);
```

- A: `42`
- B: `"42"`
- C: `7`
- D: `NaN`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

只返回了字符串中第一个字母。设定了 _进制_ 后 (
也就是第二个参数，指定需要解析的数字是什么进制：十进制、十六机制、八进制、二进制等等……),`parseInt`
检查字符串中的字符是否合法。一旦遇到一个在指定进制中不合法的字符后，立即停止解析并且忽略后面所有的字符。

`*`就是不合法的数字字符。所以只解析到`"7"`，并将其解析为十进制的`7`. `num`的值即为`7`.

</p>
</details>

---

###### 50. 输出是什么？

```javascript
[1, 2, 3].map((num) => {
  if (typeof num === "number") return;
  return num * 2;
});
```

- A: `[]`
- B: `[null, null, null]`
- C: `[undefined, undefined, undefined]`
- D: `[ 3 x empty ]`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

对数组进行映射的时候，`num`就是当前循环到的元素。在这个例子中，所有的映射都是 number 类型，所以 if 中的判断
`typeof num === "number"`结果都是`true`.map 函数创建了新数组并且将函数的返回值插入数组。

但是，没有任何值返回。当函数没有返回任何值时，即默认返回`undefined`.对数组中的每一个元素来说，函数块都得到了这个返回值，所以结果中每一个元素都是
`undefined`.

</p>
</details>

---

###### 51. 输出的是什么？

```javascript
function getInfo(member, year) {
  member.name = "Lydia";
  year = "1998";
}

const person = { name: "Sarah" };
const birthYear = "1997";

getInfo(person, birthYear);

console.log(person, birthYear);
```

- A: `{ name: "Lydia" }, "1997"`
- B: `{ name: "Sarah" }, "1998"`
- C: `{ name: "Lydia" }, "1998"`
- D: `{ name: "Sarah" }, "1997"`

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

普通参数都是 _值_ 传递的，而对象则不同，是 _引用_ 传递。所以说，`birthYear`是值传递，因为他是个字符串而不是对象。当我们对参数进行值传递时，会创建一份该值的
_复制_。（可以参考问题 46）

变量`birthYear`有一个对`"1997"`的引用，而传入的参数也有一个对`"1997"`的引用，但二者的引用并不相同。当我们通过给 `year`赋值
`"1998"`来更新`year`的值的时候我们只是更新了`year`（的引用）。此时`birthYear`仍然是`"1997"`.

而`person`是个对象。参数`member`引用与之 _相同的_ 对象。当我们修改`member`所引用对象的属性时，`person`
的相应属性也被修改了，因为他们引用了相同的对象。`person`的 `name`属性也变成了 `"Lydia"`.

</p>
</details>

---

###### 52. 输出是什么？

```javascript
function greeting() {
  throw "Hello world!";
}

function sayHi() {
  try {
    const data = greeting();
    console.log("It worked!", data);
  } catch (e) {
    console.log("Oh no an error:", e);
  }
}

sayHi();
```

- A: `"It worked! Hello world!"`
- B: `"Oh no an error: undefined`
- C: `SyntaxError: can only throw Error objects`
- D: `"Oh no an error: Hello world!`

<details><summary><b>答案</b></summary>
<p>

#### 答案：D

通过`throw`语句，我么可以创建自定义错误。而通过它，我们可以抛出异常。异常可以是一个<b>字符串</b>，一个 <b>数字</b>，一个 <b>
布尔类型</b> 或者是一个 <b>对象</b>。在本例中，我们的异常是字符串`'Hello world'`.

通过 `catch`语句，我们可以设定当`try`语句块中抛出异常后应该做什么处理。在本例中抛出的异常是字符串`'Hello world'`. `e`
就是这个字符串，因此被输出。最终结果就是`'Oh an error: Hello world'`.

</p>
</details>

---

###### 53. 输出是什么？

```javascript
function Car() {
  this.make = "Lamborghini";
  return { make: "Maserati" };
}

const myCar = new Car();
console.log(myCar.make);
```

- A: `"Lamborghini"`
- B: `"Maserati"`
- C: `ReferenceError`
- D: `TypeError`

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

返回属性的时候，属性的值等于 _返回的_ 值，而不是构造函数中设定的值。我们返回了字符串 `"Maserati"`，所以 `myCar.make`等于
`"Maserati"`.

</p>
</details>

---

###### 54. 输出是什么？

```javascript
(() => {
  let x = (y = 10);
})();

console.log(typeof x);
console.log(typeof y);
```

- A: `"undefined", "number"`
- B: `"number", "number"`
- C: `"object", "number"`
- D: `"number", "undefined"`

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

`let x = y = 10;` 是下面这个表达式的缩写：

```javascript
y = 10;
let x = y;
```

我们设定`y`等于`10`时，我们实际上增加了一个属性`y`给全局对象 (浏览器里的`window`, Nodejs 里的`global`)。在浏览器中，
`window.y`等于`10`.

然后我们声明了变量`x`等于`y`，也是`10`.但变量是使用 `let`声明的，它只作用于 _块级作用域_
，仅在声明它的块中有效；就是案例中的立即调用表达式 (IIFE)。使用`typeof`操作符时，操作值 `x`没有被定义：因为我们在`x`
声明块的外部，无法调用它。这就意味着`x`未定义。未分配或是未声明的变量类型为`"undefined"`. `console.log(typeof x)`返回
`"undefined"`.

而我们创建了全局变量`y`，并且设定`y`等于`10`.这个值在我们的代码各处都访问的到。`y`已经被定义了，而且有一个`"number"`类型的值。
`console.log(typeof y)`返回`"number"`.

</p>
</details>

---

###### <a name=20190629></a>55. 输出是什么？

```javascript
class Dog {
  constructor(name) {
    this.name = name;
  }
}

Dog.prototype.bark = function () {
  console.log(`Woof I am ${this.name}`);
};

const pet = new Dog("Mara");

pet.bark();

delete Dog.prototype.bark;

pet.bark();
```

- A: `"Woof I am Mara"`, `TypeError`
- B: `"Woof I am Mara"`,`"Woof I am Mara"`
- C: `"Woof I am Mara"`, `undefined`
- D: `TypeError`, `TypeError`

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

我们可以用`delete`关键字删除对象的属性，对原型也是适用的。删除了原型的属性后，该属性在原型链上就不可用了。在本例中，函数
`bark`在执行了`delete Dog.prototype.bark`后不可用，然而后面的代码还在调用它。

当我们尝试调用一个不存在的函数时`TypeError`异常会被抛出。在本例中就是 `TypeError: pet.bark is not a function`，因为
`pet.bark`是`undefined`.

</p>
</details>

---

###### 56. 输出是什么？

```javascript
const set = new Set([1, 1, 2, 3, 4]);

console.log(set);
```

- A: `[1, 1, 2, 3, 4]`
- B: `[1, 2, 3, 4]`
- C: `{1, 1, 2, 3, 4}`
- D: `{1, 2, 3, 4}`

<details><summary><b>答案</b></summary>
<p>

#### 答案：D

`Set`对象是独一无二的值的集合：也就是说同一个值在其中仅出现一次。

我们传入了数组`[1, 1, 2, 3, 4]`，他有一个重复值`1`.以为一个集合里不能有两个重复的值，其中一个就被移除了。所以结果是
`{1, 2, 3, 4}`.

</p>
</details>

---

###### 57. 输出是什么？

```javascript
// counter.js
let counter = 10;
export default counter;
```

```javascript
// index.js
import myCounter from "./counter";

myCounter += 1;

console.log(myCounter);
```

- A: `10`
- B: `11`
- C: `Error`
- D: `NaN`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

引入的模块是 _只读_ 的：你不能修改引入的模块。只有导出他们的模块才能修改其值。

当我们给`myCounter`增加一个值的时候会抛出一个异常：`myCounter`是只读的，不能被修改。

</p>
</details>

---

###### 58. 输出是什么？

```javascript
const name = "Lydia";
age = 21;

console.log(delete name);
console.log(delete age);
```

- A: `false`, `true`
- B: `"Lydia"`, `21`
- C: `true`, `true`
- D: `undefined`, `undefined`

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

`delete`操作符返回一个布尔值：`true`指删除成功，否则返回`false`. 但是通过 `var`, `const` 或 `let` 关键字声明的变量无法用
`delete` 操作符来删除。

`name`变量由`const`关键字声明，所以删除不成功：返回 `false`. 而我们设定`age`等于`21`时，我们实际上添加了一个名为`age`
的属性给全局对象。对象中的属性是可以删除的，全局对象也是如此，所以`delete age`返回`true`.

</p>
</details>

---

###### 59. 输出是什么？

```javascript
const numbers = [1, 2, 3, 4, 5];
const [y] = numbers;

console.log(y);
```

- A: `[[1, 2, 3, 4, 5]]`
- B: `[1, 2, 3, 4, 5]`
- C: `1`
- D: `[1]`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

我们可以通过解构赋值来解析来自对象的数组或属性的值，比如说：

```javascript
[a, b] = [1, 2];
```

<img src="https://i.imgur.com/ADFpVop.png" width="200">

`a`的值现在是`1`，`b`的值现在是`2`.而在题目中，我们是这么做的：

```javascript
[y] = [1, 2, 3, 4, 5];
```

<img src="https://i.imgur.com/NzGkMNk.png" width="200">

也就是说，`y`等于数组的第一个值就是数字`1`.我们输出`y`，返回`1`.

</p>
</details>

---

###### 60. 输出是什么？

```javascript
const user = { name: "Lydia", age: 21 };
const admin = { admin: true, ...user };

console.log(admin);
```

- A: `{ admin: true, user: { name: "Lydia", age: 21 } }`
- B: `{ admin: true, name: "Lydia", age: 21 }`
- C: `{ admin: true, user: ["Lydia", 21] }`
- D: `{ admin: true }`

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

扩展运算符`...`为对象的组合提供了可能。你可以复制对象中的键值对，然后把它们加到另一个对象里去。在本例中，我们复制了`user`
对象键值对，然后把它们加入到`admin`对象中。`admin`对象就拥有了这些键值对，所以结果为
`{ admin: true, name: "Lydia", age: 21 }`.

</p>
</details>

---
