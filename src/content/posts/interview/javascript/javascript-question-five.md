---
title: JavaScript 进阶问题列表5
published: 2024-09-18
description: 从基础到进阶，测试你有多了解 JavaScript
image: ''
tags: [ JavaScript ]
category: Interview
draft: false
comments: true
lang: ''
---
###### 121. 输出什么？

```javascript
const config = {
  languages: [],
  set language(lang) {
    return this.languages.push(lang);
  }
};

console.log(config.language);
```

- A: `function language(lang) { this.languages.push(lang }`
- B: `0`
- C: `[]`
- D: `undefined`

<details><summary><b>答案</b></summary>
<p>

#### 答案：D

方法 `language` 是一个 `setter`。Setters 并不保存一个实际值，它们的使命在于 _修改_ 属性。当调用方法 `setter`，返回
`undefined`。

</p>
</details>

---

###### 122. 输出什么？

```javascript
const name = "Lydia Hallie";

console.log(!typeof name === "object");
console.log(!typeof name === "string");
```

- A: `false` `true`
- B: `true` `false`
- C: `false` `false`
- D: `true` `true`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

`typeof name` 返回 `"string"`。字符串 `"string"` 是一个 truthy 的值，因此 `!typeof name` 返回一个布尔值 `false`。
`false === "object"` 和 `false === "string"` 都返回 `false`。

（如果我们想检测一个值的类型，我们应该用 `!==` 而不是 `!typeof`）

</p>
</details>

---

###### 123. 输出什么？

```javascript
const add = x => y => z => {
  console.log(x, y, z);
  return x + y + z;
};

add(4)(5)(6);
```

- A: `4` `5` `6`
- B: `6` `5` `4`
- C: `4` `function` `function`
- D: `undefined` `undefined` `6`

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

函数 `add` 是一个返回 返回箭头函数的箭头函数 的箭头函数（still with me?）。第一个函数接收一个值为 `4` 的参数 `x`
。我们调用第二个函数，它接收一个值为 `5` 的参数 `y`。然后我们调用第三个函数，它接收一个值为 `6` 的参数 `z`。当我们尝试在最后一个箭头函数中获取
`x`, `y` 和 `z` 的值，JS 引擎根据作用域链去找 `x` 和 `y` 的值。得到 `4` `5` `6`.

</p>
</details>

---

###### 124. 输出什么？

```javascript
async function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield Promise.resolve(i);
  }
}

(async () => {
  const gen = range(1, 3);
  for await (const item of gen) {
    console.log(item);
  }
})();
```

- A: `Promise {1}` `Promise {2}` `Promise {3}`
- B: `Promise {<pending>}` `Promise {<pending>}` `Promise {<pending>}`
- C: `1` `2` `3`
- D: `undefined` `undefined` `undefined`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

我们给 函数 range 传递：`Promise{1}`, `Promise{2}`, `Promise{3}`，Generator 函数 `range` 返回一个全是 async object promise
数组。我们将 async object 赋值给变量 `gen`，之后我们使用`for await ... of` 进行循环遍历。我们将返回的 Promise 实例赋值给
`item`：第一个返回 `Promise{1}`，第二个返回 `Promise{2}`，之后是 `Promise{3}`。因为我们正 _awaiting_ `item` 的值，resolved
状态的 promise，promise 数组的 resolved _值_ 以此为：`1`，`2`，`3`.

</p>
</details>

---

###### 125. 输出什么？

```javascript
const myFunc = ({x, y, z}) => {
  console.log(x, y, z);
};

myFunc(1, 2, 3);
```

- A: `1` `2` `3`
- B: `{1: 1}` `{2: 2}` `{3: 3}`
- C: `{ 1: undefined }` `undefined` `undefined`
- D: `undefined` `undefined` `undefined`

<details><summary><b>答案</b></summary>
<p>

#### 答案：D

`myFunc` 期望接收一个包含 `x`, `y` 和 `z` 属性的对象作为它的参数。因为我们仅仅传递三个单独的数字值 (1, 2, 3) 而不是一个含有
`x`, `y` 和 `z` 属性的对象 ({x: 1, y: 2, z: 3})，`x`, `y` 和 `z` 有着各自的默认值 `undefined`.

</p>
</details>

---

###### 126. 输出什么？

```javascript
function getFine(speed, amount) {
  const formattedSpeed = new Intl.NumberFormat(
    'en-US',
    {style: 'unit', unit: 'mile-per-hour'}
  ).format(speed)

  const formattedAmount = new Intl.NumberFormat(
    'en-US',
    {style: 'currency', currency: 'USD'}
  ).format(amount)

  return `The driver drove ${formattedSpeed} and has to pay ${formattedAmount}`
}

console.log(getFine(130, 300))
```

- A: The driver drove 130 and has to pay 300
- B: The driver drove 130 mph and has to pay \$300.00
- C: The driver drove undefined and has to pay undefined
- D: The driver drove 130.00 and has to pay 300.00

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

通过方法 `Intl.NumberFormat`，我们可以格式化任意区域的数字值。我们对数字值 `130` 进行 `mile-per-hour` 作为 `unit` 的
`en-US` 区域 格式化，结果为 `130 mph`。对数字值 `300` 进行 `USD` 作为 `currency` 的 `en-US` 区域格式化，结果为 `$300.00`.

</p>
</details>

---

###### 127. 输出什么？

```javascript
const spookyItems = ["👻", "🎃", "🕸"];
({item: spookyItems[3]} = {item: "💀"});

console.log(spookyItems);
```

- A: `["👻", "🎃", "🕸"]`
- B: `["👻", "🎃", "🕸", "💀"]`
- C: `["👻", "🎃", "🕸", { item: "💀" }]`
- D: `["👻", "🎃", "🕸", "[object Object]"]`

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

通过解构对象们，我们可以从右手边的对象中拆出值，并且将拆出的值分配给左手边对象同名的属性。在这种情况下，我们将值 "💀" 分配给
`spookyItems[3]`。相当于我们正在篡改数组 `spookyItems`，我们给它添加了值 "💀"。当输出 `spookyItems` 时，结果为
`["👻", "🎃", "🕸", "💀"]`。

</p>
</details>

---

###### 128. 输出什么？

```javascript
const name = "Lydia Hallie";
const age = 21;

console.log(Number.isNaN(name));
console.log(Number.isNaN(age));

console.log(isNaN(name));
console.log(isNaN(age));
```

- A: `true` `false` `true` `false`
- B: `true` `false` `false` `false`
- C: `false` `false` `true` `false`
- D: `false` `true` `false` `true`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

通过方法 `Number.isNaN`，你可以检测你传递的值是否为 _数字值_ 并且是否等价于 `NaN`。`name` 不是一个数字值，因此
`Number.isNaN(name)` 返回 `false`。`age` 是一个数字值，但它不等价于 `NaN`，因此 `Number.isNaN(age)` 返回 `false`.

通过方法 `isNaN`，你可以检测你传递的值是否一个 number。`name` 不是一个 `number`，因此 `isNaN(name)` 返回 `true`. `age` 是一个
`number` 因此 `isNaN(age)` 返回 `false`.

</p>
</details>

---

###### 129. 输出什么？

```javascript
const randomValue = 21;

function getInfo() {
  console.log(typeof randomValue);
  const randomValue = "Lydia Hallie";
}

getInfo();
```

- A: `"number"`
- B: `"string"`
- C: `undefined`
- D: `ReferenceError`

<details><summary><b>答案</b></summary>
<p>

#### 答案：D

通过 `const` 关键字声明的变量在被初始化之前不可被引用：这被称之为 _暂时性死区_。在函数 `getInfo` 中，变量 `randomValue` 声明在
`getInfo` 的作用域的此法环境中。在想要对 `typeof randomValue` 进行 log 之前，变量 `randomValue` 仍未被初始化：错误
`ReferenceError` 被抛出！JS 引擎并不会根据作用域链网上寻找该变量，因为我们已经在 `getInfo` 函数中声明了 `randomValue` 变量。

</p>
</details>

---

###### 130. 输出什么？

```javascript
const myPromise = Promise.resolve("Woah some cool data");

(async () => {
  try {
    console.log(await myPromise);
  } catch {
    throw new Error(`Oops didn't work`);
  } finally {
    console.log("Oh finally!");
  }
})();
```

- A: `Woah some cool data`
- B: `Oh finally!`
- C: `Woah some cool data` `Oh finally!`
- D: `Oops didn't work` `Oh finally!`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

在 `try` 块区，我们打印 `myPromise` 变量的 awaited 值：`"Woah some cool data"`。因为`try` 块区没有错误抛出，`catch`
块区的代码并不执行。`finally` 块区的代码 _总是_ 执行，`"Oh finally!"` 被输出。

</p>
</details>

---

###### 131. 输出什么？

```javascript
const emojis = ["🥑", ["✨", "✨", ["🍕", "🍕"]]];

console.log(emojis.flat(1));
```

- A: `['🥑', ['✨', '✨', ['🍕', '🍕']]]`
- B: `['🥑', '✨', '✨', ['🍕', '🍕']]`
- C: `['🥑', ['✨', '✨', '🍕', '🍕']]`
- D: `['🥑', '✨', '✨', '🍕', '🍕']`

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

通过方法 `flat`，我们可以创建一个新的，已被扁平化的数组。被扁平化的深度取决于我们传递的值。在这个 case 里，我们传递了值 `1` (
并不必要，这是默认值)，相当于只有第一层的数组才会被连接。即这个 case 里的 `['🥑']` and `['✨', '✨', ['🍕', '🍕']]`。连接这两个数组得到结果
`['🥑', '✨', '✨', ['🍕', '🍕']]`.

</p>
</details>

---

###### <a name=20191224></a>132. 输出什么？

```javascript
class Counter {
  constructor() {
    this.count = 0;
  }

  increment() {
    this.count++;
  }
}

const counterOne = new Counter();
counterOne.increment();
counterOne.increment();

const counterTwo = counterOne;
counterTwo.increment();

console.log(counterOne.count);
```

- A: `0`
- B: `1`
- C: `2`
- D: `3`

<details><summary><b>答案</b></summary>
<p>

#### 答案：D

`counterOne` 是类 `Counter` 的一个实例。类 Counter 包含一个`count` 属性在它的构造函数里，和一个 `increment` 方法。首先，我们通过
`counterOne.increment()` 调用方法 `increment` 两次。现在，`counterOne.count` 为 `2`.

<img src="https://i.imgur.com/KxLlTm9.png" width="400">

然后，我们创建一个新的变量 `counterTwo` 并将 `counterOne` 的引用地址赋值给它。因为对象受引用地址的影响，我们刚刚创建了一个新的对象，其引用地址和
`counterOne` 的等价。因此它们指向同一块内存地址，任何对其的副作用都会影响 `counterTwo`。现在 `counterTwo.count` 为 `2`。

我们调用 `counterTwo.increment()` 将 `count` 的值设为 `3`。然后，我们打印 `counterOne` 里的 count，结果为 `3`。

<img src="https://i.imgur.com/BNBHXmc.png" width="400">

</p>
</details>

---

###### 133. 输出什么？

```javascript
const myPromise = Promise.resolve(Promise.resolve("Promise!"));

function funcOne() {
  myPromise.then(res => res).then(res => console.log(res));
  setTimeout(() => console.log("Timeout!"), 0);
  console.log("Last line!");
}

async function funcTwo() {
  const res = await myPromise;
  console.log(await res);
  setTimeout(() => console.log("Timeout!"), 0);
  console.log("Last line!");
}

funcOne();
funcTwo();
```

- A: `Promise! Last line! Promise! Last line! Last line! Promise!`
- B: `Last line! Timeout! Promise! Last line! Timeout! Promise!`
- C: `Promise! Last line! Last line! Promise! Timeout! Timeout!`
- D: `Last line! Promise! Promise! Last line! Timeout! Timeout!`

<details><summary><b>答案</b></summary>
<p>

#### 答案：D

首先，我们调用 `funcOne`。在函数 `funcOne` 的第一行，我们调用`myPromise` promise _异步操作_。当 JS 引擎在忙于执行
promise，它继续执行函数 `funcOne`。下一行 _异步操作_ `setTimeout`，其回调函数被 Web API 调用。 (详情请参考我关于 event loop
的文章.)

promise 和 timeout 都是异步操作，函数继续执行当 JS 引擎忙于执行 promise 和 处理 `setTimeout` 的回调。相当于 `Last line!`
首先被输出，因为它不是异步操作。执行完 `funcOne` 的最后一行，promise 状态转变为 resolved，`Promise!` 被打印。然而，因为我们调用了
`funcTwo()`，调用栈不为空，`setTimeout` 的回调仍不能入栈。

我们现在处于 `funcTwo`，先 _awaiting_ myPromise。通过 `await` 关键字，我们暂停了函数的执行直到 promise 状态变为 resolved (或
rejected)。然后，我们输出 `res` 的 awaited 值（因为 promise 本身返回一个 promise）。接着输出 `Promise!`。

下一行就是 _异步操作_ `setTimeout`，其回调函数被 Web API 调用。

我们执行到函数 `funcTwo` 的最后一行，输出 `Last line!`。现在，因为 `funcTwo` 出栈，调用栈为空。在事件队列中等待的回调函数（
`() => console.log("Timeout!")` from `funcOne`, and `() => console.log("Timeout!")` from `funcTwo`）以此入栈。第一个回调输出
`Timeout!`，并出栈。然后，第二个回调输出 `Timeout!`，并出栈。得到结果
`Last line! Promise! Promise! Last line! Timeout! Timeout!`

</p>
</details>

---

###### 134. 我们怎样才能在 `index.js` 中调用 `sum.js?` 中的 `sum`？

```javascript
// sum.js
export default function sum(x) {
  return x + x;
}

// index.js
import * as sum from "./sum";
```

- A: `sum(4)`
- B: `sum.sum(4)`
- C: `sum.default(4)`
- D: 默认导出不用 `*` 来导入，只能具名导出

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

使用符号 `*`，我们引入文件中的所有值，包括默认和具名。如果我们有以下文件：

```javascript
// info.js
export const name = "Lydia";
export const age = 21;
export default "I love JavaScript";

// index.js
import * as info from "./info";

console.log(info);
```

将会输出以下内容：

```javascript
{
default:
  "I love JavaScript",
    name
:
  "Lydia",
    age
:
  21
}
```

以 `sum` 为例，相当于以下形式引入值 `sum`：

```javascript
{ default:

  function sum(x) {
    return x + x
  }
}
```

我们可以通过调用 `sum.default` 来调用该函数

</p>
</details>

---

###### 135. 输出什么？

```javascript
const handler = {
  set: () => console.log("Added a new property!"),
  get: () => console.log("Accessed a property!")
};

const person = new Proxy({}, handler);

person.name = "Lydia";
person.name;
```

- A: `Added a new property!`
- B: `Accessed a property!`
- C: `Added a new property!` `Accessed a property!`
- D: 没有任何输出

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

使用 Proxy 对象，我们可以给一个对象添加自定义行为。在这个 case，我们传递一个包含以下属性的对象 `handler` : `set` and `get`
。每当我们 _设置_ 属性值时 `set` 被调用，每当我们 _获取_ 时 `get` 被调用。

第一个参数是一个空对象 `{}`，作为 `person` 的值。对于这个对象，自定义行为被定义在对象 `handler`。如果我们向对象 `person`
添加属性，`set` 将被调用。如果我们获取 `person` 的属性，`get` 将被调用。

首先，我们向 proxy 对象 (`person.name = "Lydia"`) 添加一个属性 `name`。`set` 被调用并输出 `"Added a new property!"`。

然后，我们获取 proxy 对象的一个属性，对象 handler 的属性 `get` 被调用。输出 `"Accessed a property!"`。

</p>
</details>

---

###### 136. 以下哪一项会对对象 `person` 有副作用？

```javascript
const person = {name: "Lydia Hallie"};

Object.seal(person);
```

- A: `person.name = "Evan Bacon"`
- B: `person.age = 21`
- C: `delete person.name`
- D: `Object.assign(person, { age: 21 })`

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

使用 `Object.seal` 我们可以防止新属性 _被添加_，或者存在属性 _被移除_.

然而，你仍然可以对存在属性进行更改。

</p>
</details>

---

###### 137. 以下哪一项会对对象 `person` 有副作用？

```javascript
const person = {
  name: "Lydia Hallie",
  address: {
    street: "100 Main St"
  }
};

Object.freeze(person);
```

- A: `person.name = "Evan Bacon"`
- B: `delete person.address`
- C: `person.address.street = "101 Main St"`
- D: `person.pet = { name: "Mara" }`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

使用方法 `Object.freeze` 对一个对象进行 _冻结_。不能对属性进行添加，修改，删除。

然而，它仅 对对象进行 _浅_ 冻结，意味着只有 对象中的 _直接_ 属性被冻结。如果属性是另一个 object，像案例中的 `address`，
`address` 中的属性没有被冻结，仍然可以被修改。

</p>
</details>

---

###### 138. 输出什么？

```javascript
const add = x => x + x;

function myFunc(num = 2, value = add(num)) {
  console.log(num, value);
}

myFunc();
myFunc(3);
```

- A: `2` `4` and `3` `6`
- B: `2` `NaN` and `3` `NaN`
- C: `2` `Error` and `3` `6`
- D: `2` `4` and `3` `Error`

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

首先我们不传递任何参数调用 `myFunc()`。因为我们没有传递参数，`num` 和 `value` 获取它们各自的默认值：num 为 `2`，而 `value`
为函数 `add` 的返回值。对于函数 `add`，我们传递值为 2 的 `num` 作为参数。函数 `add` 返回 `4` 作为 `value` 的值。

然后，我们调用 `myFunc(3)` 并传递值 `3` 参数 `num` 的值。我们没有给 `value` 传递值。因为我们没有给参数 `value`
传递值，它获取默认值：函数 `add` 的返回值。对于函数 `add`，我们传递值为 3 的 `num`给它。函数 `add` 返回 `6` 作为 `value` 的值。

</p>
</details>

---

###### 139. 输出什么？

```javascript
class Counter {
  #number = 10

  increment() {
    this.#number++
  }

  getNum() {
    return this.#number
  }
}

const counter = new Counter()
counter.increment()

console.log(counter.#number)
```

- A: `10`
- B: `11`
- C: `undefined`
- D: `SyntaxError`

<details><summary><b>答案</b></summary>
<p>

#### 答案：D

在 ES2020 中，通过 `#` 我们可以给 class 添加私有变量。在 class 的外部我们无法获取该值。当我们尝试输出 `counter.#number`
，语法错误被抛出：我们无法在 class `Counter` 外部获取它！

</p>
</details>

---

###### 140. 选择哪一个？

```javascript
const teams = [
  {name: "Team 1", members: ["Paul", "Lisa"]},
  {name: "Team 2", members: ["Laura", "Tim"]}
];

function* getMembers(members) {
  for (let i = 0; i < members.length; i++) {
    yield members[i];
  }
}

function* getTeams(teams) {
  for (let i = 0; i < teams.length; i++) {
    // ✨ SOMETHING IS MISSING HERE ✨
  }
}

const obj = getTeams(teams);
obj.next(); // { value: "Paul", done: false }
obj.next(); // { value: "Lisa", done: false }
```

- A: `yield getMembers(teams[i].members)`
- B: `yield* getMembers(teams[i].members)`
- C: `return getMembers(teams[i].members)`
- D: `return yield getMembers(teams[i].members)`

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

为了遍历 `teams` 数组中对象的属性 `members` 中的每一项，我们需要将 `teams[i].members` 传递给 Generator 函数 `getMembers`
。Generator 函数返回一个 generator 对象。为了遍历这个 generator 对象中的每一项，我们需要使用 `yield*`.

如果我们没有写 `yield`，`return yield` 或者 `return`，整个 Generator 函数不会第一时间 return 当我们调用 `next` 方法。

</p>
</details>

---

###### 141. 输出什么？

```javascript
const person = {
  name: "Lydia Hallie",
  hobbies: ["coding"]
};

function addHobby(hobby, hobbies = person.hobbies) {
  hobbies.push(hobby);
  return hobbies;
}

addHobby("running", []);
addHobby("dancing");
addHobby("baking", person.hobbies);

console.log(person.hobbies);
```

- A: `["coding"]`
- B: `["coding", "dancing"]`
- C: `["coding", "dancing", "baking"]`
- D: `["coding", "running", "dancing", "baking"]`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

函数 `addHobby` 接受两个参数，`hobby` 和有着对象 `person` 中数组 `hobbies` 默认值的 `hobbies`。

首相，我们调用函数 `addHobby`，并给 `hobby` 传递 `"running"` 以及给 `hobbies` 传递一个空数组。因为我们给 `hobbies` 传递了空数组，
`"running"` 被添加到这个空数组。

然后，我们调用函数 `addHobby`，并给 `hobby` 传递 `"dancing"`。我们不向 `hobbies` 传递值，因此它获取其默认值 —— 对象 `person`
的 属性 `hobbies`。我们向数组 `person.hobbies` push `dancing`。

最后，我们调用函数 `addHobby`，并向 `hobby` 传递 值 `"baking"`，并且向 `hobbies` 传递 `person.hobbies`。我们向数组
`person.hobbies` push `dancing`。

pushing `dancing` 和 `baking` 之后，`person.hobbies` 的值为 `["coding", "dancing", "baking"]`

</p>
</details>

---

###### 142. 输出什么？

```javascript
class Bird {
  constructor() {
    console.log("I'm a bird. 🦢");
  }
}

class Flamingo extends Bird {
  constructor() {
    console.log("I'm pink. 🌸");
    super();
  }
}

const pet = new Flamingo();
```

- A: `I'm pink. 🌸`
- B: `I'm pink. 🌸` `I'm a bird. 🦢`
- C: `I'm a bird. 🦢` `I'm pink. 🌸`
- D: Nothing, we didn't call any method

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

我们创建了类 `Flamingo` 的实例 `pet`。当我们实例化这个实例，`Flamingo` 中的 `constructor` 被调用。首相，输出
`"I'm pink. 🌸"`，之后我们调用`super()`。`super()` 调用父类的构造函数，`Bird`。`Bird` 的构造函数被调用，并输出
`"I'm a bird. 🦢"`。

</p>
</details>

---

###### 143. 哪一个选项会导致报错？

```javascript
const emojis = ["🎄", "🎅🏼", "🎁", "⭐"];

/* 1 */
emojis.push("🦌");
/* 2 */
emojis.splice(0, 2);
/* 3 */
emojis = [...emojis, "🥂"];
/* 4 */
emojis.length = 0;
```

- A: 1
- B: 1 and 2
- C: 3 and 4
- D: 3

<details><summary><b>答案</b></summary>
<p>

#### 答案：D

`const` 关键字意味着我们不能 _重定义_ 变量中的值，它 _仅可读_。然而，值本身不可修改。数组 `emojis` 中的值可被修改，如 push
新的值，拼接，又或者将数组的长度设置为 0。

</p>
</details>

---

###### 144. 我们需要向对象 `person` 添加什么，以致执行 `[...person]` 时获得形如 `["Lydia Hallie", 21]` 的输出？

```javascript
const person = {
  name: "Lydia Hallie",
  age: 21
}

  [
...
person
] // ["Lydia Hallie", 21]
```

- A: 不需要，对象默认就是可迭代的
- B: `*[Symbol.iterator]() { for (let x in this) yield* this[x] }`
- C: `*[Symbol.iterator]() { yield* Object.values(this) }`
- D: `*[Symbol.iterator]() { for (let x in this) yield this }`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

对象默认并不是可迭代的。如果迭代规则被定义，则一个对象是可迭代的（An iterable is an iterable if the iterator protocol is
present）。我们可以通过添加迭代器 symbol `[Symbol.iterator]` 来定义迭代规则，其返回一个 generator 对象，比如说构建一个
generator 函数 `*[Symbol.iterator]() {}`。如果我们想要返回数组 `["Lydia Hallie", 21]`: `yield* Object.values(this)`，这个
generator 函数一定要 yield 对象 `person` 的`Object.values`。

</p>
</details>

---

###### 145. 输出什么？

```javascript
let count = 0;
const nums = [0, 1, 2, 3];

nums.forEach(num => {
  if (num) count += 1
})

console.log(count)
```

- A: 1
- B: 2
- C: 3
- D: 4

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

在 `forEach` 循环内部的 `if` 会判断 `num` 的值是 truthy 或者是 falsy。因为 `nums` 数组的第一个数字是 `0`，一个 falsy 值，
`if` 语句代码块不会被执行。`count` 仅仅在 `nums` 数组的其他 3 个数字 `1`，`2`，`3` 时加 1。因为 `count` 执行了 3 次加 `1`
运算，所以 `count` 的值为 `3`。

</p>
</details>

---

###### 146. 输出是什么？

```javascript
function getFruit(fruits) {
  console.log(fruits?.[1]?.[1])
}

getFruit([['🍊', '🍌'], ['🍍']])
getFruit()
getFruit([['🍍'], ['🍊', '🍌']])
```

- A: `null`, `undefined`, 🍌
- B: `[]`, `null`, 🍌
- C: `[]`, `[]`, 🍌
- D: `undefined`, `undefined`, 🍌

<details><summary><b>答案</b></summary>
<p>

#### 答案：D

`?` 允许我们去选择性地访问对象内部更深层的嵌套属性。我们尝试打印 `fruits` 数组索引值为 `1` 的子数组内部的索引值为 `1`
的元素。如果在 `fruits` 数组索引值 为 `1` 的位置不存在元素，会直接返回 `undefined`。如果 `fruits` 数组在索引值为 `1`
的位置存在元素，但是子数组在索引值为 `1` 的位置不存在元素，也会返回 `undefined`。

首先，我们尝试打印 `[['🍊', '🍌'], ['🍍']]` 的子数组 `['🍍']` 的第 2 个元素。这个子数组只包含一个元素，也就意味着在索引值为 `1`
的位置不存在元素，所以返回的是 `undefined`。

其次，我们在没有传入任何参数调用了 `getFruits` 函数，也就意味着形参 `fruits` 的默认值为`undefined`。因为我们选择性地链接了
`fruits` 在索引值为 `1` 的元素，因为在索引值为 `1` 的位置不存在元素，因此返回的是 `undefined`。

最后，我们尝试打印 `['🍍'], ['🍊', '🍌']` 的子数组 `['🍊', '🍌']` 的第 2 个元素。子数组索引值为 `1`的位置为 `🍌`，因此它被打印出了。

</p>
</details>

---

###### 147. 输出什么？

```javascript
class Calc {
  constructor() {
    this.count = 0
  }

  increase() {
    this.count++
  }
}

const calc = new Calc()
new Calc().increase()

console.log(calc.count)
```

- A: `0`
- B: `1`
- C: `undefined`
- D: `ReferenceError`

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

我们设置 `calc` 变量为 `Calc` 类的一个新实例。然后，我们初始化一个 `Calc` 的新实例，而且调用了这个实例的 `increase` 方法。因为
count 属性是在 `Calc` class 的 constructor 内部的，所以 count 属性不会在 `Calc` 的原型链上共享出去。这就意味着 calc 实例的
count 值不会被更新，count 仍然是 `0`。

</p>
</details>

---

###### 148. 输出什么？

```javascript
const user = {
  email: "e@mail.com",
  password: "12345"
}

const updateUser = ({email, password}) => {
  if (email) {
    Object.assign(user, {email})
  }

  if (password) {
    user.password = password
  }

  return user
}

const updatedUser = updateUser({email: "new@email.com"})

console.log(updatedUser === user)
```

- A: `false`
- B: `true`
- C: `TypeError`
- D: `ReferenceError`

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

`updateUser` 函数更新 user 的 `email` 和 `password` 属性的值，如果它们的值传入函数，函数返回的就是 `user` 对象。
`updateUser` 函数的返回值是 `user` 对象，意味着 updatedUser 的值与 `user` 指向的是同一个 `user` 对象。
`updatedUser === user` 为 `true`.

</p>
</details>

---

###### 149. 输出什么？

```javascript
const fruit = ['🍌', '🍊', '🍎']

fruit.slice(0, 1)
fruit.splice(0, 1)
fruit.unshift('🍇')

console.log(fruit)
```

- A: `['🍌', '🍊', '🍎']`
- B: `['🍊', '🍎']`
- C: `['🍇', '🍊', '🍎']`
- D: `['🍇', '🍌', '🍊', '🍎']`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

首先，我们在 fruit 数组上调用 `slice` 方法。slice 方法不会修改原始数组，但是会返回从数组切片下来的值：香蕉 emoji。
其次，我们在 fruit 数组上调用 `splice` 方法。splice 方法会修改原始数组，也就意味着 fruit 数组此时为 `['🍊', '🍎']`。
最后，我们在 fruit 数组上调用 `unshift` 方法，通过添加一个值的方式改变了原始数组，添加的是'🍇'，它成为了数组的第一个元素。现在
fruit 数组的组成为 `['🍇', '🍊', '🍎']`。

</p>
</details>

---

###### 150. 输出什么？

```javascript
const animals = {};
let dog = {emoji: '🐶'}
let cat = {emoji: '🐈'}

animals[dog] = {...dog, name: "Mara"}
animals[cat] = {...cat, name: "Sara"}

console.log(animals[dog])
```

- A: `{ emoji: "🐶", name: "Mara" }`
- B: `{ emoji: "🐈", name: "Sara" }`
- C: `undefined`
- D: `ReferenceError`

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

对象的键会被转换为字符串。

因为  `dog` 的值是一个对象，`animals[dog]` 实际上意味着我们创建了一个叫做 `"object Object"` 的属性来代表新的对象。
`animals["object Object"]` 现在等于 `{ emoji: "🐶", name: "Mara"}`。

`cat` 也是一个对象，`animals[cat]` 实际上意味着我们在用新的 cat 的属性覆盖  `animals[``"``object Object``"``]` 的值。

打印  `animals[dog]`，实际上是`animals["object Object"]`，这是因为转化`dog`对象为一个字符串结果 `"object Object"`，所以返回
`{ emoji: "🐈", name: "Sara" }`。

</p>
</details>

---

###### 151. 输出什么？

```javascript
const user = {
  email: "my@email.com",
  updateEmail: email => {
    this.email = email
  }
}

user.updateEmail("new@email.com")
console.log(user.email)
```

- A: `my@email.com`
- B: `new@email.com`
- C: `undefined`
- D: `ReferenceError`

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

`updateEmail` 函数是一个箭头函数，它没有和 `user` 对象绑定。这就意味着 `this` 关键字不会引用到 `user` 对象，但是会引用到全局对象。
`user` 对象内部的 `email` 的值不会更新。当打印 `user.email` 的时候，原始值 `my@email.com` 被返回。

</p>
</details>

---

###### 152. 输出什么？

```javascript
const promise1 = Promise.resolve('First')
const promise2 = Promise.resolve('Second')
const promise3 = Promise.reject('Third')
const promise4 = Promise.resolve('Fourth')

const runPromises = async () => {
  const res1 = await Promise.all([promise1, promise2])
  const res2 = await Promise.all([promise3, promise4])
  return [res1, res2]
}

runPromises()
  .then(res => console.log(res))
  .catch(err => console.log(err))
```

- A: `[['First', 'Second'], ['Fourth']]`
- B: `[['First', 'Second'], ['Third', 'Fourth']]`
- C: `[['First', 'Second']]`
- D: `'Third'`

<details><summary><b>答案</b></summary>
<p>

#### 答案：D

`Promise.all` 方法可以并行式运行 promise。如果其中一个 promise 失败了，`Promise.all` 方法会带上被 reject 的 promise
的值_rejects_。在这个例子中，`promise3` 带着 `"Third"` 值 reject。我们在调用 `runPromises` 时在 `runPromises` 函数内部的
`catch` 方法去捕获任意 error 从而捕获到被 reject 的值。因为 `promise3` 带着 `"Third"` 被 reject，所以只有 `"Third"` 打印。

</p>
</details>

---

###### 153. 哪个作为`method`的值可以打印`{ name: "Lydia", age: 22 }`?

```javascript
const keys = ["name", "age"]
const values = ["Lydia", 22]

const method = /* ?? */
  Object[method](keys.map((_, i) => {
    return [keys[i], values[i]]
  })) // { name: "Lydia", age: 22 }
```

- A: `entries`
- B: `values`
- C: `fromEntries`
- D: `forEach`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

`fromEntries` 方法可以将二维数组转换为对象。在每个子数组的第一个元素是 key，在每个子数组的第二个元素是 value。在这个例子中，我们映射了
`keys` 数组，它返回了一个数组，数组的第一个元素为 keys 数组当前索引的值，第二个元素为 values 数组当前索引的值。

这样就创建了一个包含正确 keys 和 values 的子数组的数组，因此结果为`{ name: "Lydia", age: 22 }`。

</p>
</details>

---

###### 154. 输出什么？

```javascript
const createMember = ({email, address = {}}) => {
  const validEmail = /.+\@.+\..+/.test(email)
  if (!validEmail) throw new Error("Valid email pls")

  return {
    email,
    address: address ? address : null
  }
}

const member = createMember({email: "my@email.com"})
console.log(member)
```

- A: `{ email: "my@email.com", address: null }`
- B: `{ email: "my@email.com" }`
- C: `{ email: "my@email.com", address: {} }`
- D: `{ email: "my@email.com", address: undefined }`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

`address` 的默认值是一个空对象 `{}`。当我们设置 `member` 变量为 `createMember` 函数返回的对象，我们没有为 address 参数传值，意味着
address 的值为默认的空对象 `{}`。一个空对象是一个 truthy 值，意味着 `address ? address : null` 条件会返回 `true`。address
的值为空对象 `{}`。

</p>
</details>

---

###### 155. 输出什么？

```javascript
let randomValue = {name: "Lydia"}
randomValue = 23

if (!typeof randomValue === "string") {
  console.log("It's not a string!")
} else {
  console.log("Yay it's a string!")
}
```

- A: `It's not a string!`
- B: `Yay it's a string!`
- C: `TypeError`
- D: `undefined`

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

`if` 语句的条件判断 `!typeof randomValue` 的值是否等于 `"string"`。`!` 操作符将这个值转化为一个布尔值。如果值是 truthy
的话，返回值会是 `false`，如果值是 falsy，返回值会是 `true`。在这里，`typeof randomValue` 的返回值是一个 truthy 值 `"number"`
，意味着 `!typeof randomValue` 的值是一个布尔值 `false`。

`!typeof randomValue === "string"` 总是返回 false，因为我们实际上是在执行 `false === "string"`。因为条件返回的是 `false`
，所以 `else` 语句中的代码块会被运行，因此打印 `Yay it's a string!`。

</p>
</details>
