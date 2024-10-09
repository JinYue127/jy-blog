---
title: JavaScript 进阶问题列表4
published: 2024-09-18
description: 从基础到进阶，测试你有多了解 JavaScript
image: ''
tags: [ JavaScript ]
category: 面试
draft: false
comments: true
lang: ''
---

###### 91. 输出什么？

```javascript
let newList = [1, 2, 3].push(4)

console.log(newList.push(5))
```

- A: `[1, 2, 3, 4, 5]`
- B: `[1, 2, 3, 5]`
- C: `[1, 2, 3, 4]`
- D: `Error`

<details><summary><b>答案</b></summary>
<p>

#### 答案：D

`.push`方法返回数组的长度，而不是数组本身！通过将`newList`设置为`[1,2,3].push(4)`，实际上`newList`等于数组的新长度：`4`。

然后，尝试在`newList`上使用`.push`方法。由于`newList`是数值`4`，抛出 TypeError。

</p>
</details>

---

###### 92. 输出什么？

```javascript
function giveLydiaPizza() {
  return "Here is pizza!"
}

const giveLydiaChocolate = () => "Here's chocolate... now go hit the gym already."

console.log(giveLydiaPizza.prototype)
console.log(giveLydiaChocolate.prototype)
```

- A: `{ constructor: ...}` `{ constructor: ...}`
- B: `{}` `{ constructor: ...}`
- C: `{ constructor: ...}` `{}`
- D: `{ constructor: ...}` `undefined`

<details><summary><b>答案</b></summary>
<p>

#### 答案：D

常规函数，例如`giveLydiaPizza`函数，有一个`prototype`属性，它是一个带有`constructor`属性的对象（原型对象）。然而，箭头函数，例如
`giveLydiaChocolate`函数，没有这个`prototype`属性。尝试使用`giveLydiaChocolate.prototype`访问`prototype`属性时会返回
`undefined`。

</p>
</details>

---

###### 93. 输出什么？

```javascript
const person = {
  name: "Lydia",
  age: 21
}

for (const [x, y] of Object.entries(person)) {
  console.log(x, y)
}
```

- A: `name` `Lydia` and `age` `21`
- B: `["name", "Lydia"]` and `["age", 21]`
- C: `["name", "age"]` and `undefined`
- D: `Error`

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

`Object.entries()`方法返回一个给定对象自身可枚举属性的键值对数组，上述情况返回一个二维数组，数组每个元素是一个包含键和值的数组：

`[['name','Lydia'],['age', 21]]`

使用`for-of`循环，我们可以迭代数组中的每个元素，上述情况是子数组。我们可以使用`const [x，y]`在`for-of`循环中解构子数组。`x`
等于子数组中的第一个元素，`y`等于子数组中的第二个元素。

第一个子阵列是`[“name”，“Lydia”]`，其中`x`等于`name`，而`y`等于`Lydia`。
第二个子阵列是`[“age”，21]`，其中`x`等于`age`，而`y`等于`21`。

</p>
</details>

---

###### 94. 输出什么？

```javascript
function getItems(fruitList, ...args, favoriteFruit) {
  return [...fruitList, ...args, favoriteFruit]
}

getItems(["banana", "apple"], "pear", "orange")
```

- A: `["banana", "apple", "pear", "orange"]`
- B: `[["banana", "apple"], "pear", "orange"]`
- C: `["banana", "apple", ["pear"], "orange"]`
- D: `SyntaxError`

<details><summary><b>答案</b></summary>
<p>

#### 答案：D

`... args`是剩余参数，剩余参数的值是一个包含所有剩余参数的数组，**并且只能作为最后一个参数**
。上述示例中，剩余参数是第二个参数，这是不可能的，并会抛出语法错误。

```javascript
function getItems(fruitList, favoriteFruit, ...args) {
  return [...fruitList, ...args, favoriteFruit]
}

getItems(["banana", "apple"], "pear", "orange")
```

上述例子是有效的，将会返回数组：`[ 'banana', 'apple', 'orange', 'pear' ]`
</p>
</details>

---

###### <a name=20190817></a>95. 输出什么？

```javascript
function nums(a, b) {
  if
  (a > b)
    console.log('a is bigger')
  else
    console.log('b is bigger')
  return
  a + b
}

console.log(nums(4, 2))
console.log(nums(1, 2))
```

- A: `a is bigger`, `6` and `b is bigger`, `3`
- B: `a is bigger`, `undefined` and `b is bigger`, `undefined`
- C: `undefined` and `undefined`
- D: `SyntaxError`

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

在 JavaScript 中，我们不必显式地编写分号 (`;`)，但是 JavaScript 引擎仍然在语句之后自动添加分号。这称为**自动分号插入**
。例如，一个语句可以是变量，或者像`throw`、`return`、`break`这样的关键字。

在这里，我们在新的一行上写了一个`return`语句和另一个值`a + b `。然而，由于它是一个新行，引擎并不知道它实际上是我们想要返回的值。相反，它会在
`return`后面自动添加分号。你可以这样看：

```javascript
  return;
a + b
```

这意味着永远不会到达`a + b`，因为函数在`return`关键字之后停止运行。如果没有返回值，就像这里，函数返回`undefined`。注意，在
`if/else`语句之后没有自动插入！

</p>
</details>

---

###### 96. 输出什么？

```javascript
class Person {
  constructor() {
    this.name = "Lydia"
  }
}

Person = class AnotherPerson {
  constructor() {
    this.name = "Sarah"
  }
}

const member = new Person()
console.log(member.name)
```

- A: `"Lydia"`
- B: `"Sarah"`
- C: `Error: cannot redeclare Person`
- D: `SyntaxError`

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

我们可以将类设置为等于其他类/函数构造函数。在这种情况下，我们将`Person`设置为`AnotherPerson`。这个构造函数的名字是`Sarah`
，所以新的`Person`实例`member`上的 name 属性是`Sarah`。


</p>
</details>

---

###### 97. 输出什么？

```javascript
const info = {
  [Symbol('a')]: 'b'
}

console.log(info)
console.log(Object.keys(info))
```

- A: `{Symbol('a'): 'b'}` and `["{Symbol('a')"]`
- B: `{}` and `[]`
- C: `{ a: "b" }` and `["a"]`
- D: `{Symbol('a'): 'b'}` and `[]`

<details><summary><b>答案</b></summary>
<p>

#### 答案：D

`Symbol`类型是不可枚举的。`Object.keys`方法返回对象上的所有可枚举的键属性。`Symbol`
类型是不可见的，并返回一个空数组。记录整个对象时，所有属性都是可见的，甚至是不可枚举的属性。

这是`Symbol`的众多特性之一：除了表示完全唯一的值（防止对象意外名称冲突，例如当使用 2 个想要向同一对象添加属性的库时），您还可以
`隐藏`这种方式对象的属性（尽管不完全。你仍然可以使用`Object.getOwnPropertySymbols()`方法访问 `Symbol`。

</p>
</details>

---

###### 98. 输出什么？

```javascript
const getList = ([x, ...y]) => [x, y]
const getUser = user => {
  name: user.name, age
:
  user.age
}

const list = [1, 2, 3, 4]
const user = {name: "Lydia", age: 21}

console.log(getList(list))
console.log(getUser(user))
```

- A: `[1, [2, 3, 4]]` and `SyntaxError`
- B: `[1, [2, 3, 4]]` and `{ name: "Lydia", age: 21 }`
- C: `[1, 2, 3, 4]` and `{ name: "Lydia", age: 21 }`
- D: `Error` and `{ name: "Lydia", age: 21 }`

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

`getList`函数接收一个数组作为其参数。在`getList`函数的括号之间，我们立即解构这个数组。您可以将其视为：

`[x, ...y] = [1, 2, 3, 4]`

使用剩余的参数`... y`，我们将所有剩余参数放在一个数组中。在这种情况下，其余的参数是`2`，`3`和`4`。 `y`
的值是一个数组，包含所有其余参数。在这种情况下，`x`的值等于`1`，所以当我们打印`[x，y]`时，会打印`[1，[2,3,4]]`。

`getUser`
函数接收一个对象。对于箭头函数，如果只返回一个值，我们不必编写花括号。但是，如果您想从一个箭头函数返回一个对象，您必须将它写在圆括号之间，否则两个花括号之间的所有内容都将被解释为一个块语句！在这种情况下，花括号之间的代码不是有效的
JavaScript 代码，因此会抛出 SyntaxError。

以下函数将返回一个对象：

`const getUser = user => ({ name: user.name, age: user.age })`

</p>
</details>

---

###### 99. 输出什么？

```javascript
const name = "Lydia"

console.log(name())
```

- A: `SyntaxError`
- B: `ReferenceError`
- C: `TypeError`
- D: `undefined`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

变量`name`保存字符串的值，该字符串不是函数，因此无法调用。

当值不是预期类型时，会抛出`TypeErrors`。JavaScript 期望`name`是一个函数，因为我们试图调用它。但它是一个字符串，因此抛出
`TypeError`：`name is not a function`

当你编写了一些非有效的 JavaScript 时，会抛出语法错误，例如当你把`return`这个词写成`retrun`时。
当 JavaScript 无法找到您尝试访问的值的引用时，抛出`ReferenceErrors`。

</p>
</details>

---

###### 100. 输出什么？

```javascript
// 🎉✨ This is my 100th question! ✨🎉

const output = `${[] && 'Im'}possible!
You should${'' && `n't`} see a therapist after so much JavaScript lol`
```

- A: `possible! You should see a therapist after so much JavaScript lol`
- B: `Impossible! You should see a therapist after so much JavaScript lol`
- C: `possible! You shouldn't see a therapist after so much JavaScript lol`
- D: `Impossible! You shouldn't see a therapist after so much JavaScript lol`

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

`[]`是一个真值。使用`&&`运算符，如果左侧值是真值，则返回右侧值。在这种情况下，左侧值`[]`是一个真值，所以返回`Im`。

`""`是一个假值。如果左侧值是假的，则不返回任何内容。`n't`不会被退回。

</p>
</details>

---

###### 101.输出什么？

```javascript
const one = (false || {} || null)
const two = (null || false || "")
const three = ([] || 0 || true)

console.log(one, two, three)
```

- A: `false` `null` `[]`
- B: `null` `""` `true`
- C: `{}` `""` `[]`
- D: `null` `null` `true`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

使用`||`运算符，我们可以返回第一个真值。如果所有值都是假值，则返回最后一个值。

`（false || {} || null）`：空对象`{}`是一个真值。这是第一个（也是唯一的）真值，它将被返回。`one`等于`{}`。

`（null || false ||“”）`：所有值都是假值。这意味着返回传递的值`""`。`two`等于`""`。

`（[] || 0 ||“”）`：空数组`[]`是一个真值。这是第一个返回的真值。`three`等于`[]`。

</p>
</details>

---

###### 102. 依次输出什么？

```javascript
const myPromise = () => Promise.resolve('I have resolved!')

function firstFunction() {
  myPromise().then(res => console.log(res))
  console.log('second')
}

async function secondFunction() {
  console.log(await myPromise())
  console.log('second')
}

firstFunction()
secondFunction()
```

- A: `I have resolved!`, `second` and `I have resolved!`, `second`
- B: `second`, `I have resolved!` and `second`, `I have resolved!`
- C: `I have resolved!`, `second` and `second`, `I have resolved!`
- D: `second`, `I have resolved!` and `I have resolved!`, `second`

<details><summary><b>答案</b></summary>
<p>

#### 答案：D

有了 promise，我们通常会说：当我想要调用某个方法，但是由于它可能需要一段时间，因此暂时将它放在一边。只有当某个值被
resolved/rejected，并且执行栈为空时才使用这个值。

我们可以在`async`函数中通过`.then`和`await`关键字获得该值。尽管我们可以通过`.then`和`await`获得 promise
的价值，但是它们的工作方式有所不同。

在 `firstFunction`中，当运行到`myPromise`方法时我们将其放在一边，即 promise 进入微任务队列，其他后面的代码（
`console.log('second')`）照常运行，因此`second`被打印出，`firstFunction`方法到此执行完毕，执行栈中宏任务队列被清空，此时开始执行微任务队列中的任务，
`I have resolved`被打印出。

在`secondFunction`方法中，我们通过`await`关键字，暂停了后面代码的执行，直到异步函数的值被解析才开始后面代码的执行。这意味着，它会等着直到
`myPromise` 以值`I have resolved`被解决之后，下一行`second`才开始执行。


</p>
</details>

---

###### 103. 输出什么？

```javascript
const set = new Set()

set.add(1)
set.add("Lydia")
set.add({name: "Lydia"})

for (let item of set) {
  console.log(item + 2)
}
```

- A: `3`, `NaN`, `NaN`
- B: `3`, `7`, `NaN`
- C: `3`, `Lydia2`, `[Object object]2`
- D: `"12"`, `Lydia2`, `[Object object]2`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

“+”运算符不仅用于添加数值，还可以使用它来连接字符串。每当 JavaScript 引擎发现一个或多个值不是数字时，就会将数字强制为字符串。

第一个是数字 1。1 + 2 返回数字 3。

但是，第二个是字符串“Lydia”。 “Lydia”是一个字符串，2 是一个数字：2 被强制转换为字符串。 “Lydia”和“2”被连接起来，产生字符串“Lydia2”。

`{name：“Lydia”}`是一个对象。数字和对象都不是字符串，因此将二者都字符串化。每当我们对常规对象进行字符串化时，它就会变成
`[Object object]`。与“2”串联的“ [Object object]”成为“[Object object]2”。

</p>
</details>

---

###### 104. 结果是什么？

```javascript
Promise.resolve(5)
```

- A: `5`
- B: `Promise {<pending>: 5}`
- C: `Promise {<fulfilled>: 5}`
- D: `Error`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

我们可以将我们想要的任何类型的值传递`Promise.resolve`，无论是否`promise`。该方法本身返回带有已解析值的`Promise` (
`<fulfilled>`)。如果您传递常规函数，它将是具有常规值的已解决`promise`。如果你通过了 promise，它将是一个已经 resolved
的且带有传的值的 promise。

上述情况，我们传了数字 5，因此返回一个 resolved 状态的 promise，resolve 值为`5`

</p>
</details>

###### 105. 输出什么？

```javascript
function compareMembers(person1, person2 = person) {
  if (person1 !== person2) {
    console.log("Not the same!")
  } else {
    console.log("They are the same!")
  }
}

const person = {name: "Lydia"}

compareMembers(person)
```

- A: `Not the same!`
- B: `They are the same!`
- C: `ReferenceError`
- D: `SyntaxError`

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

对象通过引用传递。当我们检查对象的严格相等性（===）时，我们正在比较它们的引用。

我们将“person2”的默认值设置为“person”对象，并将“person”对象作为“person1”的值传递。

这意味着两个值都引用内存中的同一位置，因此它们是相等的。

运行“else”语句中的代码块，并记录`They are the same!`。

</p>
</details>

---

###### 106. 输出什么？

```javascript
const colorConfig = {
  red: true,
  blue: false,
  green: true,
  black: true,
  yellow: false,
}

const colors = ["pink", "red", "blue"]

console.log(colorConfig.colors[1])
```

- A: `true`
- B: `false`
- C: `undefined`
- D: `TypeError`

<details><summary><b>答案</b></summary>
<p>

#### 答案：D

在 JavaScript 中，我们有两种访问对象属性的方法：括号表示法或点表示法。在此示例中，我们使用点表示法（`colorConfig.colors`
）代替括号表示法（`colorConfig [“colors”]`）。

使用点表示法，JavaScript 会尝试使用该确切名称在对象上查找属性。在此示例中，JavaScript 尝试在 colorConfig 对象上找到名为
colors 的属性。没有名为“colors”的属性，因此返回“undefined”。
然后，我们尝试使用`[1]`访问第一个元素的值。我们无法对未定义的值执行此操作，因此会抛出
`Cannot read property '1' of undefined`。

JavaScript 解释（或取消装箱）语句。当我们使用方括号表示法时，它会看到第一个左方括号`[`并一直进行下去，直到找到右方括号`]`
。只有这样，它才会评估该语句。如果我们使用了 colorConfig [colors [1]]，它将返回 colorConfig 对象上 red 属性的值。


</p>
</details>

---

###### 107. 输出什么？

```javascript
console.log('❤️' === '❤️')
```

- A: `true`
- B: `false`

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

在内部，表情符号是 unicode。heat 表情符号的 unicode 是`“U + 2764 U + FE0F”`。对于相同的表情符号，它们总是相同的，因此我们将两个相等的字符串相互比较，这将返回
true。

</p>
</details>

---

###### 108. 哪些方法修改了原数组？

```javascript
const emojis = ['✨', '🥑', '😍']

emojis.map(x => x + '✨')
emojis.filter(x => x !== '🥑')
emojis.find(x => x !== '🥑')
emojis.reduce((acc, cur) => acc + '✨')
emojis.slice(1, 2, '✨')
emojis.splice(1, 2, '✨')
```

- A: `All of them`
- B: `map` `reduce` `slice` `splice`
- C: `map` `slice` `splice`
- D: `splice`

<details><summary><b>答案</b></summary>
<p>

#### 答案：D

使用`splice`方法，我们通过删除，替换或添加元素来修改原始数组。在这种情况下，我们从索引 1 中删除了 2 个元素（我们删除了`'🥑'`和
`'😍'`），同时添加了✨emoji 表情。

`map`，`filter`和`slice`返回一个新数组，`find`返回一个元素，而`reduce`返回一个减小的值。

</p>
</details>

---

###### <a name=20191009></a>109. 输出什么？

```javascript
const food = ['🍕', '🍫', '🥑', '🍔']
const info = {favoriteFood: food[0]}

info.favoriteFood = '🍝'

console.log(food)
```

- A: `['🍕', '🍫', '🥑', '🍔']`
- B: `['🍝', '🍫', '🥑', '🍔']`
- C: `['🍝', '🍕', '🍫', '🥑', '🍔']`
- D: `ReferenceError`

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

我们将`info`对象上的`favoriteFood`属性的值设置为披萨表情符号“🍕”的字符串。字符串是原始数据类型。在 JavaScript
中，原始数据类型通过值起作用

在这种情况下，我们将`info`对象上的`favoriteFood`属性的值设置为等于`food`数组中的第一个元素的值，字符串为披萨表情符号（
`'🍕'`）。字符串是原始数据类型，并且通过值进行交互，我们更改`info`对象上`favoriteFood`属性的值。food 数组没有改变，因为
favoriteFood 的值只是该数组中第一个元素的值的复制，并且与该元素上的元素没有相同的内存引用食物`[0]`。当我们记录食物时，它仍然是原始数组
`['🍕'，'🍫'，'🥑'，'🍔']`。

</p>
</details>

---

###### 110. 这个函数干了什么？

```javascript
JSON.parse()
```

- A: Parses JSON to a JavaScript value
- B: Parses a JavaScript object to JSON
- C: Parses any JavaScript value to JSON
- D: Parses JSON to a JavaScript object only

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

使用`JSON.parse()`方法，我们可以将 JSON 字符串解析为 JavaScript 值。

```javascript
// 将数字字符串化为有效的 JSON，然后将 JSON 字符串解析为 JavaScript 值：
const jsonNumber = JSON.stringify(4) // '4'
JSON.parse(jsonNumber) // 4

// 将数组值字符串化为有效的 JSON，然后将 JSON 字符串解析为 JavaScript 值：
const jsonArray = JSON.stringify([1, 2, 3]) // '[1, 2, 3]'
JSON.parse(jsonArray) // [1, 2, 3]

// 将对象字符串化为有效的 JSON，然后将 JSON 字符串解析为 JavaScript 值：
const jsonArray = JSON.stringify({name: "Lydia"}) // '{"name":"Lydia"}'
JSON.parse(jsonArray) // { name: 'Lydia' }
```

</p>
</details>

---

###### 111. 输出什么？

```javascript
let name = 'Lydia'

function getName() {
  console.log(name)
  let name = 'Sarah'
}

getName()
```

- A: Lydia
- B: Sarah
- C: `undefined`
- D: `ReferenceError`

<details><summary><b>答案</b></summary>
<p>

#### 答案：D

每个函数都有其自己的执行上下文。`getName`函数首先在其自身的上下文（范围）内查找，以查看其是否包含我们尝试访问的变量`name`
。上述情况，`getName`函数包含其自己的`name`变量：我们用`let`关键字和`Sarah`的值声明变量`name`。

带有`let`关键字（和`const`）的变量被提升，但是与`var`不同，它不会被*** 初始化***
。在我们声明（初始化）它们之前，无法访问它们。这称为“暂时性死区”。当我们尝试在声明变量之前访问变量时，JavaScript 会抛出
`ReferenceError: Cannot access 'name' before initialization`。

如果我们不在`getName`函数中声明`name`变量，则 javascript 引擎会查看原型链。会找到其外部作用域有一个名为`name`的变量，其值为
`Lydia`。在这种情况下，它将打印`Lydia`：

```javascript
let name = 'Lydia'

function getName() {
  console.log(name)
}

getName() // Lydia
```

</p>
</details>

---

###### 112. 输出什么？

```javascript
function* generatorOne() {
  yield ['a', 'b', 'c'];
}

function* generatorTwo() {
  yield* ['a', 'b', 'c'];
}

const one = generatorOne()
const two = generatorTwo()

console.log(one.next().value)
console.log(two.next().value)
```

- A: `a` and `a`
- B: `a` and `undefined`
- C: `['a', 'b', 'c']` and `a`
- D: `a` and `['a', 'b', 'c']`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

通过 `yield` 关键字，我们在 `Generator` 函数里执行`yield`表达式。通过 `yield*` 关键字，我们可以在一个`Generator` 函数里面执行（
`yield`表达式）另一个 `Generator` 函数，或可遍历的对象 (如数组).

在函数 `generatorOne` 中，我们通过 `yield` 关键字 yield 了一个完整的数组 `['a', 'b', 'c']`。函数`one`通过`next`方法返回的对象的
`value` 属性的值 (`one.next().value`) 等价于数组 `['a', 'b', 'c']`.

```javascript
console.log(one.next().value) // ['a', 'b', 'c']
console.log(one.next().value) // undefined
```

在函数 `generatorTwo` 中，我们使用 `yield*` 关键字。就相当于函数`two`第一个`yield`的值，等价于在迭代器中第一个 `yield`
的值。数组`['a', 'b', 'c']`就是这个迭代器。第一个 `yield` 的值就是 `a`，所以我们第一次调用 `two.next().value`时，就返回`a`。

```javascript
console.log(two.next().value) // 'a'
console.log(two.next().value) // 'b'
console.log(two.next().value) // 'c'
console.log(two.next().value) // undefined
```

</p>
</details>

---

###### 113. 输出什么？

```javascript
console.log(`${(x => x)('I love')} to program`)
```

- A: `I love to program`
- B: `undefined to program`
- C: `${(x => x)('I love') to program`
- D: `TypeError`

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

带有模板字面量的表达式首先被执行。相当于字符串会包含表达式，这个立即执行函数 `(x => x)('I love')` 返回的值。我们向箭头函数
`x => x` 传递 `'I love'` 作为参数。`x` 等价于返回的 `'I love'`。这就是结果 `I love to program`。

</p>
</details>

---

###### 114. 将会发生什么？

```javascript
let config = {
  alert: setInterval(() => {
    console.log('Alert!')
  }, 1000)
}

config = null
```

- A: `setInterval` 的回调不会被调用
- B: `setInterval` 的回调被调用一次
- C: `setInterval` 的回调仍然会被每秒钟调用
- D: 我们从没调用过 `config.alert()`, config 为 `null`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

一般情况下当我们将对象赋值为 `null`，那些对象会被进行 _垃圾回收（garbage collected）_ 因为已经没有对这些对象的引用了。然而，
`setInterval`的参数是一个箭头函数（所以上下文绑定到对象 `config` 了），回调函数仍然保留着对 `config`
的引用。只要存在引用，对象就不会被垃圾回收。因为没有被垃圾回收，`setInterval` 的回调每 1000ms (1s) 会被调用一次。

</p>
</details>

---

###### 115. 哪一个方法会返回 `'Hello world!'` ？

```javascript
const myMap = new Map()
const myFunc = () => 'greeting'

myMap.set(myFunc, 'Hello world!')

//1
myMap.get('greeting')
//2
myMap.get(myFunc)
//3
myMap.get(() => 'greeting')
```

- A: 1
- B: 2
- C: 2 and 3
- D: All of them

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

当通过 `set` 方法添加一个键值对，一个传递给 `set`方法的参数将会是键名，第二个参数将会是值。在这个 case 里，键名为 _函数_
`() => 'greeting'`，值为`'Hello world'`。 `myMap` 现在就是 `{ () => 'greeting' => 'Hello world!' }`。

1 是错的，因为键名不是 `'greeting'` 而是 `() => 'greeting'`。
3 是错的，因为我们给`get` 方法传递了一个新的函数。对象受 _引用_ 影响。函数也是对象，因此两个函数严格上并不等价，尽管他们相同：他们有两个不同的内存引用地址。

</p>
</details>

---

###### 116. 输出什么？

```javascript
const person = {
  name: "Lydia",
  age: 21
}

const changeAge = (x = {...person}) => x.age += 1
const changeAgeAndName = (x = {...person}) => {
  x.age += 1
  x.name = "Sarah"
}

changeAge(person)
changeAgeAndName()

console.log(person)
```

- A: `{name: "Sarah", age: 22}`
- B: `{name: "Sarah", age: 23}`
- C: `{name: "Lydia", age: 22}`
- D: `{name: "Lydia", age: 23}`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

函数 `changeAge` 和函数 `changeAgeAndName` 有着不同的参数，定义一个 _新_ 生成的对象 `{ ...person }`。这个对象有着所有
`person` 对象 中 k/v 值的副本。

首项，我们调用 `changeAge` 函数并传递 `person` 对象作为它的参数。这个函数对 `age` 属性进行加一操作。`person` 现在是
`{ name: "Lydia", age: 22 }`。

然后，我们调用函数 `changeAgeAndName`，然而我们没有传递参数。取而代之，`x` 的值等价 _new_ 生成的对象：`{ ...person }`
。因为它是一个新生成的对象，它并不会对对象 `person` 造成任何副作用。`person` 仍然等价于 `{ name: "Lydia", age: 22 }`。

</p>
</details>

---

###### 117. 下面那个选项将会返回 `6`?

```javascript
function sumValues(x, y, z) {
  return x + y + z;
}
```

- A: `sumValues([...1, 2, 3])`
- B: `sumValues([...[1, 2, 3]])`
- C: `sumValues(...[1, 2, 3])`
- D: `sumValues([1, 2, 3])`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

通过展开操作符 `...`，我们可以 _暂开_ 单个可迭代的元素。函数 `sumValues` function 接收三个参数：`x`, `y` 和 `z`。
`...[1, 2, 3]` 的执行结果为 `1, 2, 3`，将会传递给函数 `sumValues`。

</p>
</details>

---

###### 118. 输出什么？

```javascript
let num = 1;
const list = ["🥳", "🤠", "🥰", "🤪"];

console.log(list[(num += 1)]);
```

- A: `🤠`
- B: `🥰`
- C: `SyntaxError`
- D: `ReferenceError`

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

通过 `+=` 操作符，我们对值 `num` 进行加 `1` 操作。`num` 有初始值 `1`，因此 `1 + 1` 的执行结果为 `2`。数组 `list` 的第二项为
🥰，`console.log(list[2])` 输出 🥰.

</p>
</details>

---

###### 119. 输出什么？

```javascript
const person = {
  firstName: "Lydia",
  lastName: "Hallie",
  pet: {
    name: "Mara",
    breed: "Dutch Tulip Hound"
  },
  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
};

console.log(person.pet?.name);
console.log(person.pet?.family?.name);
console.log(person.getFullName?.());
console.log(member.getLastName?.());
```

- A: `undefined` `undefined` `undefined` `undefined`
- B: `Mara` `undefined` `Lydia Hallie` `ReferenceError`
- C: `Mara` `null` `Lydia Hallie` `null`
- D: `null` `ReferenceError` `null` `ReferenceError`

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

通过 ES10 或 TS3.7+[可选链操作符
`?.`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/%E5%8F%AF%E9%80%89%E9%93%BE)
，我们不再需要显式检测更深层的嵌套值是否有效。如果我们尝试获取 `undefined` 或 `null` 的值 (_nullish_)，表达将会短路并返回
`undefined`.

`person.pet?.name`：`person` 有一个名为 `pet` 的属性：`person.pet` 不是 nullish。它有个名为 `name` 的属性，并返回字符串
`Mara`。
`person.pet?.family?.name`：`person` 有一个名为 `pet` 的属性：`person.pet` 不是 nullish. `pet` _并没有_ 一个名为 `family`
的属性，`person.pet.family` 是 nullish。表达式返回 `undefined`。
`person.getFullName?.()`：`person` 有一个名为 `getFullName` 的属性：`person.getFullName()` 不是 nullish 并可以被调用，返回字符串
`Lydia Hallie`。
`member.getLastName?.()`: 变量`member` 不存在，因此会抛出错误`ReferenceError`。

</p>
</details>

---

###### 120. 输出什么？

```javascript
const groceries = ["banana", "apple", "peanuts"];

if (groceries.indexOf("banana")) {
  console.log("We have to buy bananas!");
} else {
  console.log(`We don't have to buy bananas!`);
}
```

- A: We have to buy bananas!
- B: We don't have to buy bananas
- C: `undefined`
- D: `1`

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

我们传递了一个状态 `groceries.indexOf("banana")` 给 if 条件语句。`groceries.indexOf("banana")` 返回 `0`，一个 falsy 的值。因为
if 条件语句的状态为 falsy，`else` 块区内的代码执行，并且 `We don't have to buy bananas!` 被输出。

</p>
</details>

---
