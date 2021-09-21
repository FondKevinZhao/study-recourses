# TypeScript

## 介绍

1. 什么是 TypeScript

TypeScript 是 JavaScript 的一个超集，主要提供了类型系统和对 ES6 的支持，它由 Microsoft 开发，代码开源于 GitHub 上。

TypeScript 是 JavaScript 的类型的超集，它可以编译成纯 JavaScript。编译出来的 JavaScript 可以运行在任何浏览器上。TypeScript 编译工具可以运行在任何服务器和任何系统上。TypeScript 是开源的。

2. 为什么选择 TypeScript

- TypeScript 增加了代码的可读性和可维护性
  - 类型系统实际上是最好的文档，大部分的函数看看类型的定义就可以知道如何使用了
  - 可以在编译阶段就发现大部分错误，这总比在运行时候出错好
  - 增强了编辑器和 IDE 的功能，包括代码补全、接口提示、跳转到定义、重构等
- TypeScript 非常包容
  - TypeScript 是 JavaScript 的超集，.js 文件可以直接重命名为 .ts 即可
  - 即使不显式的定义类型，也能够自动做出类型推论
  - 可以定义从简单到复杂的几乎一切类型
  - 即使 TypeScript 编译报错，也可以生成 JavaScript 文件
  - 兼容第三方库，即使第三方库不是用 TypeScript 写的，也可以编写单独的类型文件供 TypeScript 读取
- TypeScript 拥有活跃的社区
  - 大部分第三方库都有提供给 TypeScript 的类型定义文件
  - Google 开发的 Angular2 就是使用 TypeScript 编写的
  - TypeScript 拥抱了 ES6 规范，也支持部分 ESNext 草案的规范

## 安装

1. 安装

```js
npm install -g typescript
```

2. 编译

```js
tsc hello.ts
```

## 初体验

1. hello.ts

```ts
function sayHello(person: string) {
  return "Hello, " + person;
}

let user = "Tom";
console.log(sayHello(user));
```

2. 使用 VSCODE 自动监视 TS 文件变化

- 初始化 tsconfig.json
  ```
  tsc --init
  ```
- 终端 -> 运行任务 -> typescript -> 监视

## 在 React 中使用 TypeScript

### 官方文档

https://create-react-app.dev/docs/adding-typescript

### 下载&安装

1. 使用 npm6+

```
npm init react-app react-ts --template typescript
```

2. 使用全局安装的包

```
// 如果要使用最新版本必须全局安装，重复全局安装才会是最新版本
npm i create-react-app -g
create-react-app react-ts --template typescript
```

### 运行项目

```
cd react-ts
npm start / yarn start
```

## TypeScript 基础

### 数据类型

1. 基本类型

Number、String、Boolean、Null、Undefined、Symbol、BigInt

```ts
// Number
let a: number = 123;
// a = 'str'; // TS2322: Type '"str"' is not assignable to type 'number'.

// String
const b: string = "hello";

// Boolean
const c: boolean = true;

// Null
const d: null = null;

// Undefined
const e: undefined = undefined;
```

2. 引用类型

Object、Function、Array

```ts
// Object
// 接口
interface Person {
  name: string;
  age: number;
}
const p: Person = {
  name: "jack",
  age: 18,
};

// Function
function fn(a: string, b: number): string {
  return a + b;
}

// Array
const arr1: number[] = [1, 2, 3];

// 数组泛型
const arr2: Array<string> = ["1", "2", "3"];
```

3. TS 扩展类型

- 元组 Tuple: 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
- 枚举 Enum: 枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。
- 任意值 Any：用来表示允许赋值为任意类型。
- 空值 Void: 与 Any 相反，用来表示没有任何类型
- 永不存在的值 Never：表示的是那些永不存在的值的类型

```ts
// 元组 Tuple
let x: [string, number];
x = ["hello", 10]; // OK
x = [10, "hello"]; // Error

// 枚举 Enum
enum Color {
  red,
  green,
  blue,
}

// 任意值 Any
let y: any = 123;
y = "hello";
y = false;

// 空值 Void
// 表示函数没有返回值
function fn(): void {}

// 永不存在的值 Never
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message);
}
// 推断的返回值类型为never（类型推论）
function fail() {
  return error("Something failed");
}
// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) {}
}
```

### 类型推论

如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。

```ts
let num = 7;
num = "7"; // error

// 上面代码等价于
let num: number = 7;
num = "7"; // error
```

如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查

```ts
let num;
num = 7;
num = "7";
```

### 联合类型

联合类型（Union Types）表示取值可以为多种类型中的一种。

```ts
// 联合类型使用 | 分隔每个类型。
let num: string | number;
num = 7;
num = "string";
num = true; // error
```

当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们**只能访问此联合类型的所有类型里共有的属性或方法**：

```ts
// toString() 是string 和 number 的共有属性
function getString(something: string | number): string {
  return something.toString(); // ok
}

// length 不是 string 和 number 的共有属性
function getString(something: string | number): string {
  return something.length; // error
}
```

### 对象类型-接口

1. 什么是接口

在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）。
TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述。

2. 简单的例子

**赋值的时候，变量的形状必须和接口的形状保持一致**。

```ts
// 接口一般首字母大写
interface Person {
  name: string;
  age: number;
}

let tom: Person = {
  name: "Tom",
  age: 25,
};

// 定义的变量比接口少了一些属性是不允许的
let jack: Person = {
  name: "Jack", // error
};

// 多一些属性也是不允许的
let jerry: Person = {
  name: "Jerry",
  age: 25,
  gender: "male", // error
};
```

3. 可选属性

```ts
interface Person {
  name: string;
  age?: number;
}
// 可选属性的含义是该属性可以不存在, 也可以存在
let tom: Person = {
  name: "Tom",
};

let jerry: Person = {
  name: "Jerry",
  age: 25,
};
// 仍然不允许添加未定义的属性
let jack: Person = {
  name: "Jack",
  age: 25,
  gender: "male", // error
};
```

4. 任意属性

```ts
interface Person {
  name: string;
  age?: number;
  [propName: string]: any;
}

let tom: Person = {
  name: "Tom",
  gender: "male",
};
```

需要注意的是，**一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集：**

```ts
// 任意属性的值允许是 string
// 但是可选属性 age 的值却是 number，number 不是 string 的子属性，所以报错了
interface Person {
  name: string;
  age?: number; // error
  [propName: string]: string;
}

let tom: Person = {
  name: "Tom",
  age: 25,
  gender: "male",
};
```

一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型

```ts
interface Person {
  name: string;
  age: number;
  [propName: string]: string | number;
}

let tom: Person = {
  name: "Tom",
  age: 25,
  gender: "male",
};
```

5. 只读属性

有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 `readonly` 定义只读属性

```ts
interface Person {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: any;
}

let tom: Person = {
  id: 89757,
  name: "Tom",
  gender: "male",
};
// 只读属性不能重新赋值
tom.id = 9527; // error
```

### 数组类型

1. 「类型 + 方括号」表示法

```ts
let fibonacci: number[] = [1, 1, 2, 3, 5];
```

2. 数组泛型

```ts
let fibonacci: Array<number> = [1, 1, 2, 3, 5];
```

3. 用接口表示数组

```ts
// 一般不用，太复杂了
interface NumberArray {
  [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];
```

4. any 在数组中的应用

```ts
let list: any[] = ["atguigu", 25, { website: "http://www.atguigu.com" }];
```

### 函数的类型

1. 函数声明

```ts
function sum(x: number, y: number): number {
  return x + y;
}
```

2. 函数表达式

```ts
// 只对等号右侧的匿名函数进行了类型定义，而等号左边的 mySum，是通过赋值操作进行类型推论而推断出来的
let mySum1 = function (x: number, y: number): number {
  return x + y;
};
// 手动给 mySum 添加类型
let mySum2: (x: number, y: number) => number = function (
  x: number,
  y: number
): number {
  return x + y;
};
```

3. 用接口定义函数的形状

```ts
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
  return source.search(subString) !== -1;
};
```

4. 可选参数

```ts
// 我们用 ? 表示可选的参数
function buildName(firstName: string, lastName?: string) {
  if (lastName) {
    return firstName + " " + lastName;
  } else {
    return firstName;
  }
}
let tomcat = buildName("Tom", "Cat");
let tom = buildName("Tom");

// 可选参数后面不允许再出现必需参数了
function buildName(firstName?: string, lastName: string) {
  // error
  if (firstName) {
    return firstName + " " + lastName;
  } else {
    return lastName;
  }
}
let tomcat = buildName("Tom", "Cat");
let tom = buildName(undefined, "Tom");
```

5. 参数默认值

```ts
function buildName(firstName: string, lastName: string = "Cat") {
  return firstName + " " + lastName;
}
let tomcat = buildName("Tom", "Cat");
let tom = buildName("Tom");

// 此时就不受「可选参数必须接在必需参数后面」的限制了：
function buildName(firstName: string = "Tom", lastName: string) {
  return firstName + " " + lastName;
}
let tomcat = buildName("Tom", "Cat");
let cat = buildName(undefined, "Cat");
```

6. 剩余参数

```ts
// ...rest 的方式获取函数中的剩余参数
// 注意，rest 参数只能是最后一个参数
function push(array: any[], ...items: any[]) {
  items.forEach(function (item) {
    array.push(item);
  });
}

let a = [];
push(a, 1, 2, 3);
```

7. 重载

```ts
// 重载允许一个函数接受不同数量或类型的参数时，作出不同的处理
// 然而这样有一个缺点，就是不能够精确的表达，输入为数字的时候，输出也应该为数字，输入为字符串的时候，输出也应该为字符串。
function reverse(x: number | string): number | string {
  if (typeof x === "number") {
    return Number(x.toString().split("").reverse().join(""));
  } else if (typeof x === "string") {
    return x.split("").reverse().join("");
  }
}

// 我们可以使用重载定义多个 reverse 的函数类型
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
  if (typeof x === "number") {
    return Number(x.toString().split("").reverse().join(""));
  } else if (typeof x === "string") {
    return x.split("").reverse().join("");
  }
}
```

### 类型断言

类型断言（Type Assertion）可以用来手动指定一个值的类型。

1. 语法

```js
值 as 类型
<类型>值
```

在 tsx 语法（React 的 jsx 语法的 ts 版）中必须使用前者，即 值 as 类型。
故建议大家在使用类型断言时，统一使用 `值 as 类型` 这样的语法。

2. 用途

- 将一个联合类型断言为其中一个类型

```ts
interface Cat {
  name: string;
  run(): void;
}
interface Fish {
  name: string;
  swim(): void;
}

function isFish(animal: Cat | Fish) {
  if (typeof (animal as Fish).swim === "function") {
    return true;
  }
  return false;
}
```

- 将一个父类断言为更加具体的子类

```ts
class ApiError extends Error {
  code: number = 0;
}
class HttpError extends Error {
  statusCode: number = 200;
}

function isApiError(error: Error) {
  if (typeof (error as ApiError).code === "number") {
    return true;
  }
  return false;
}
```

### 声明文件

当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。

声明文件必须为 `xxx.d.ts`

1. 新语法索引

- declare var 声明全局变量
- declare function 声明全局方法
- declare class 声明全局类
- declare enum 声明全局枚举类型
- declare namespace 声明（含有子属性的）全局对象
- interface 和 type 声明全局类型
- export 导出变量
- export namespace 导出（含有子属性的）对象
- export default ES6 默认导出
- export = commonjs 导出模块
- export as namespace UMD 库声明全局变量
- declare global 扩展全局变量
- declare module 扩展模块
- /// <reference /> 三斜线指令
  - 三斜线指令是包含单个XML标签的单行注释。 注释的内容会做为编译器指令使用。
  - 三斜线引用告诉编译器在编译过程中要引入的额外的文件。

2. 第三方声明文件

位于 `node_modules/@types`

3. 自动生成声明文件

在 tsconfig.json 中配置

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true // 自动生成声明文件
  }
}
```

### 内置对象

JavaScript 中有很多内置对象，它们可以直接在 TypeScript 中当做定义好了的类型。

内置对象是指根据标准在全局作用域（Global）上存在的对象。这里的标准是指 ECMAScript 和其他环境（比如 DOM）的标准。

1. ECMAScript 的内置对象

有 `Boolean、Error、Date、RegExp` 等

我们可以在 TypeScript 中将变量定义为这些类型：

```ts
let b: Boolean = new Boolean(1);
let e: Error = new Error("Error occurred");
let d: Date = new Date();
let r: RegExp = /[a-z]/;
```

更多的内置对象，可以查看 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects"> MDN 的文档</a>。

而他们的定义文件，则在<a href="https://github.com/Microsoft/TypeScript/tree/master/src/lib"> TypeScript 核心库的定义文件</a>中

2. DOM 和 BOM 的内置对象

有 `Document、HTMLElement、Event、NodeList` 等

TypeScript 中会经常用到这些类型：

```ts
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll("div");
document.addEventListener("click", function (e: MouseEvent) {
  // Do something
});
```

它们的定义文件同样在<a href="https://github.com/Microsoft/TypeScript/tree/master/src/lib"> TypeScript 核心库的定义文件</a>中。

## 进阶

### 类型别名

类型别名用来给一个类型起个新名字。

```ts
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
  if (typeof n === "string") {
    return n;
  } else {
    return n();
  }
}
```

上例中，我们使用 `type` 创建类型别名。

类型别名常用于联合类型。

### 字符串字面量类型

字符串字面量类型用来约束取值只能是某几个字符串中的一个。

```ts
type EventNames = "click" | "scroll" | "mousemove";
function handleEvent(ele: Element, event: EventNames) {
  // do something
}

handleEvent(document.getElementById("hello"), "scroll"); // 没问题
handleEvent(document.getElementById("world"), "dbclick"); // 报错，event 不能为 'dbclick'
```

注意，**类型别名与字符串字面量类型都是使用 type 进行定义。**

### 元组

数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象。

元组起源于函数编程语言（如 F#），这些语言中会频繁使用元组。

1. 简单的例子

```ts
const tom: [string, number] = ["Tom", 25];
console.log(tom[0]);
console.log(tom[1]);
```

2. 越界的元素

当添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型：

```ts
const tom: [string, number] = ["Tom", 25];
tom.push("bob");
tom.push(18);
tom.push(true); // error
```

### 类

1. 类的概念

虽然 JavaScript 中有类的概念，但是可能大多数 JavaScript 程序员并不是非常熟悉类，这里对类相关的概念做一个简单的介绍。

- 类(Class)：定义了一件事物的抽象特点，包含它的属性和方法
- 对象（Object）：类的实例，通过 new 生成
- 面向对象（OOP）的三大特性：封装、继承、多态
- 封装（Encapsulation）：将对数据的操作细节隐藏起来，只暴露对外的接口。外界调用端不需要（也不可能）知道细节，就能通过对外提供的接口来访问该对象，同时也保证了外界无法任意更改对象内部的数据
- 继承（Inheritance）：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
- 多态（Polymorphism）：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应。比如 Cat 和 Dog 都继承自 Animal，但是分别实现了自己的 eat 方法。此时针对某一个实例，我们无需了解它是 Cat 还是 Dog，就可以直接调用 eat 方法，程序会自动判断出来应该如何执行 eat
- 存取器（getter & setter）：用以改变属性的读取和赋值行为
- 修饰符（Modifiers）：修饰符是一些关键字，用于限定成员或类型的性质。比如 public 表示公有属性或方法
- 抽象类（Abstract Class）：抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
- 接口（Interfaces）：不同类之间公有的属性或方法，可以抽象成一个接口。接口可以被类实现（implements）。一个类只能继承自另一个类，但是可以实现多个接口

2. ES6 中类的用法

- 属性和方法

使用 `class` 定义类，使用 `constructor` 定义构造函数。

通过 `new` 生成新实例的时候，会自动调用构造函数。

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    return `My name is ${this.name}`;
  }
}

let a = new Animal("Jack");
console.log(a.sayHi()); // My name is Jack
```

- 类的继承
  使用 `extends` 关键字实现继承，子类中使用 `super` 关键字来调用父类的构造函数和方法。

```js
class Cat extends Animal {
  constructor(name) {
    super(name); // 调用父类的 constructor(name)
    console.log(this.name);
  }
  sayHi() {
    return "Meow, " + super.sayHi(); // 调用父类的 sayHi()
  }
}

let c = new Cat("Tom"); // Tom
console.log(c.sayHi()); // Meow, My name is Tom
```

- 存取器

使用 `getter` 和 `setter` 可以改变属性的赋值和读取行为：

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  get name() {
    return "Jack";
  }
  set name(value) {
    console.log("setter: " + value);
  }
}

let a = new Animal("Kitty"); // setter: Kitty
a.name = "Tom"; // setter: Tom
console.log(a.name); // Jack
```

- 静态方法

使用 `static` 修饰符修饰的方法称为静态方法，它们不需要实例化，而是直接通过类来调用：

```js
class Animal {
  static isAnimal(a) {
    return a instanceof Animal;
  }
}

let a = new Animal("Jack");
Animal.isAnimal(a); // true
a.isAnimal(a); // TypeError: a.isAnimal is not a function
```

3. ES7 中类的用法

- 实例属性

ES6 中实例的属性只能通过构造函数中的 `this.xxx` 来定义，ES7 提案中可以直接在类里面定义：

```js
class Animal {
  name = "Jack"; // ES7

  constructor() {
    this.age = 18; // ES6
  }
}

let a = new Animal();
console.log(a.name); // Jack
```

- 静态属性

ES7 提案中，可以使用 `static` 定义一个静态属性：

```js
class Animal {
  static num = 42; // ES7
  static fn() {} // ES6

  constructor() {
    // ...
  }
}

console.log(Animal.num); // 42
```

4. TypeScript 中类的用法

- public private 和 protected

TypeScript 可以使用三种访问修饰符（Access Modifiers），分别是 `public`、`private` 和 `protected`

```
public 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
private 修饰的属性或方法是私有的，不能在声明它的类的外部访问
protected 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的
```

```ts
// public例子
class Animal {
  public name;
  public constructor(name) {
    this.name = name;
  }
}

let a = new Animal("Jack");
console.log(a.name); // Jack
a.name = "Tom";
console.log(a.name); // Tom
```

```ts
// private例子
// 很多时候，我们希望有的属性是无法直接存取的，这时候就可以用 private 了：
class Animal {
  private name;
  public constructor(name) {
    this.name = name;
  }
}

let a = new Animal("Jack");
console.log(a.name); // error

// 使用 private 修饰的属性或方法，在子类中也是不允许访问的：
class Animal {
  private name;
  public constructor(name) {
    this.name = name;
  }
}

class Cat extends Animal {
  constructor(name) {
    super(name);
    console.log(this.name); // error
  }
}

// 当构造函数修饰为 private 时，该类不允许被继承或者实例化：
class Animal {
  public name;
  private constructor(name) {
    this.name = name;
  }
}
class Cat extends Animal {
  // error
  constructor(name) {
    super(name);
  }
}

let a = new Animal("Jack"); // error
```

```ts
// protected例子
// 用 protected 修饰，则允许在子类中访问：
class Animal {
  protected name;
  public constructor(name) {
    this.name = name;
  }
}

class Cat extends Animal {
  constructor(name) {
    super(name);
    console.log(this.name);
  }
}

// 当构造函数修饰为 protected 时，该类只允许被继承：

class Animal {
  public name;
  protected constructor(name) {
    this.name = name;
  }
}
class Cat extends Animal {
  constructor(name) {
    super(name);
  }
}

let a = new Animal("Jack"); // error
```

- 参数属性

修饰符和 `readonly` 还可以使用在构造函数参数中，等同于类中定义该属性同时给该属性赋值，使代码更简洁。

```ts
class Animal {
  // public name: string;
  public constructor(public name) {
    // this.name = name;
  }
}
```

- readonly

只读属性关键字，只允许出现在属性声明或索引签名或构造函数中。

```ts
class Animal {
  readonly name;
  public constructor(name) {
    this.name = name;
  }
}

let a = new Animal("Jack");
console.log(a.name); // Jack
a.name = "Tom"; // error

// 注意如果 readonly 和其他访问修饰符同时存在的话，需要写在其后面。
class Animal {
  // public readonly name;
  public constructor(public readonly name) {
    // this.name = name;
  }
}
```

- 抽象类
  `abstract` 用于定义抽象类和其中的抽象方法。

```
什么是抽象类？
1. 抽象类是不允许被实例化的
2. 抽象类中的抽象方法必须被子类实现
```

```ts
// 正确使用抽象类的例子
abstract class Animal {
  public name;
  public constructor(name) {
    this.name = name;
  }
  public abstract sayHi();
}

class Cat extends Animal {
  public sayHi() {
    console.log(`Meow, My name is ${this.name}`);
  }
}

let cat = new Cat("Tom");
```

5. 类的类型

给类加上 TypeScript 的类型很简单，与接口类似：

```ts
class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  sayHi(): string {
    return `My name is ${this.name}`;
  }
}

let a: Animal = new Animal("Jack");
console.log(a.sayHi()); // My name is Jack
```

### 类与接口

1. 类实现接口

实现（implements）是面向对象中的一个重要概念。一般来讲，一个类只能继承自另一个类，有时候不同类之间可以有一些共有的特性，这时候就可以把特性提取成接口（interfaces），用 implements 关键字来实现。这个特性大大提高了面向对象的灵活性。

举例来说，门是一个类，防盗门是门的子类。如果防盗门有一个报警器的功能，我们可以简单的给防盗门添加一个报警方法。这时候如果有另一个类，车，也有报警器的功能，就可以考虑把报警器提取出来，作为一个接口，防盗门和车都去实现它：

```ts
// 报警器
interface Alarm {
  alert(): void;
}
// 门
class Door {}
// 安全门
class SecurityDoor extends Door implements Alarm {
  alert() {
    console.log("SecurityDoor alert");
  }
}
// 车
class Car implements Alarm {
  alert() {
    console.log("Car alert");
  }
}

// 一个类可以实现多个接口
interface Alarm {
  alert(): void;
}

interface Light {
  lightOn(): void;
  lightOff(): void;
}

class Car implements Alarm, Light {
  alert() {
    console.log("Car alert");
  }
  lightOn() {
    console.log("Car light on");
  }
  lightOff() {
    console.log("Car light off");
  }
}
```

2. 接口继承接口

接口与接口之间可以是继承关系：

```ts
interface Alarm {
  alert(): void;
}

interface LightableAlarm extends Alarm {
  lightOn(): void;
  lightOff(): void;
}
```

3. 接口继承类

常见的面向对象语言中，接口是不能继承类的，但是在 TypeScript 中却是可以的：

```ts
class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
// 值得注意的是构造函数，静态属性或静态方法是不包含的
// 类继承类和接口继承类，都只会继承它的实例属性和实例方法。
interface Point3d extends Point {
  z: number;
}

let point3d: Point3d = { x: 1, y: 2, z: 3 };
```

### 泛型

泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

1. 简单的例子

首先，我们来实现一个函数 `createArray`，它可以创建一个指定长度的数组，同时将每一项都填充一个默认值：

```ts
function createArray(length: number, value: any): Array<any> {
  let result = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}

createArray(3, "x"); // ['x', 'x', 'x']
```

上例中，我们使用了之前提到过的**数组泛型**来定义返回值的类型。

这段代码编译不会报错，但是一个显而易见的缺陷是，它并没有准确的定义返回值的类型：

`Array<any>` 允许数组的每一项都为任意类型。但是我们预期的是，数组中每一项都应该是输入的 `value` 的类型。

这时候，泛型就派上用场了：

```ts
function createArray<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}

createArray<string>(3, "x"); // ['x', 'x', 'x']
```

上例中，我们在函数名后添加了 `<T>`，其中 `T` 用来指代任意输入的类型，在后面的输入 `value: T` 和输出 `Array<T>` 中即可使用了。
接着在调用的时候，可以指定它具体的类型为 `string`。当然，也可以不手动指定，而让类型推论自动推算出来

```ts
function createArray<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}

createArray(3, "x"); // ['x', 'x', 'x']
```

2. 多个类型参数

定义泛型的时候，可以一次定义多个类型参数：

```ts
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}

swap([7, "seven"]); // ['seven', 7]
```

3. 泛型约束

在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法：

```ts
function loggingIdentity<T>(arg: T): T {
  console.log(arg.length); // error
  return arg;
}
```

上例中，泛型 `T` 不一定包含属性 `length`，所以编译的时候报错了。

这时，我们可以对泛型进行约束，只允许这个函数传入那些包含 `length` 属性的变量。这就是泛型约束：

```ts
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
```

4. 泛型接口

之前学习过，可以使用接口的方式来定义一个函数需要符合的形状：

```ts
// 接口
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
  return source.search(subString) !== -1;
};
```

当然也可以使用含有泛型的接口来定义函数的形状：

```ts
interface CreateArrayFunc {
  <T>(length: number, value: T): Array<T>;
}

let createArray: CreateArrayFunc;
createArray = function <T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
};

createArray(3, "x"); // ['x', 'x', 'x']
```

进一步，我们可以把泛型参数提前到接口名上：

```ts
interface CreateArrayFunc<T> {
  (length: number, value: T): Array<T>;
}

let createArray: CreateArrayFunc<any>;
createArray = function <T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
};

createArray(3, "x"); // ['x', 'x', 'x']
```

注意，此时在使用泛型接口的时候，需要定义泛型的类型。

5. 泛型类

与泛型接口类似，泛型也可以用于类的类型定义中：

```ts
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};
```

6. 泛型参数的默认类型

在 TypeScript 2.3 以后，我们可以为泛型中的类型参数指定默认类型。当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用。

```ts
function createArray<T = string>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}
```

### 声明合并

如果定义了两个相同名字的函数、接口或类，那么它们会合并成一个类型：

1. 函数合并

```ts
// 函数合并也叫重载
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
  if (typeof x === "number") {
    return Number(x.toString().split("").reverse().join(""));
  } else if (typeof x === "string") {
    return x.split("").reverse().join("");
  }
}
```

2. 接口合并

接口中的属性在合并时会简单的合并到一个接口中：

```ts
interface Alarm {
  price: number;
}
interface Alarm {
  weight: number;
}

// 等价于
interface Alarm {
  price: number;
  weight: number;
}
```

注意，合并的属性的类型必须是唯一的：

```ts
interface Alarm {
  price: number;
}
interface Alarm {
  price: number; // 虽然重复了，但是类型都是 `number`，所以不会报错
  weight: number;
}
```

```ts
interface Alarm {
  price: number;
}
interface Alarm {
  price: string; // 类型不一致，会报错
  weight: number;
}
```

接口中方法的合并，与函数的合并一样：

```ts
interface Alarm {
  price: number;
  alert(s: string): string;
}
interface Alarm {
  weight: number;
  alert(s: string, n: number): string;
}

// 等价于
interface Alarm {
  price: number;
  weight: number;
  alert(s: string): string;
  alert(s: string, n: number): string;
}
```

3. 类合并

类的合并与接口的合并规则一致。
