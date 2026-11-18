# js

## 基本类型 vs 引用类型

基本类型

string

number

boolean

null

undefined

symbol

bigint

引用类型

Object

Array

Function

Date

RegExp

Map、Set

等等

## 类型检测

typeof 'abc';        // 'string'

typeof 123;          // 'number'

typeof true;         // 'boolean'

typeof undefined;    // 'undefined'

typeof Symbol();     // 'symbol'

typeof 10n;          // 'bigint'

typeof null;         // 'object' 历史遗留 bug

typeof {};           // 'object'

typeof [];           // 'object'

typeof function(){}; // 'function'

Array.isArray([]); // true

Object.prototype.toString.call([]);    // '[object Array]'

Object.prototype.toString.call(null);  // '[object Null]'

Object.prototype.toString.call({});    // '[object Object]'

[] instanceof Array; // true

## 事件循环

### 浏览器事件循环

四大组件：

调用栈

web APIs (setTimeout、DOM事件、fetch、mutationObserver)

宏任务队列（存放待执行的宏任务回调，如setTimeout、setInterval、IO事件、setImmediate等）

微任务队列（存放待执行的微任务回调，如Promise.then/catch/finally、MutationObserver等）

完整的执行流程

执行同步代码

清空微任务队列

渲染失败（关键帧）

取出一个宏任务

再次清空所有微任务，进入下一轮循环

requestAnimationFrame（rAF）的位置：它不在宏任务队列里，而是挂在渲染阶段之前

requestIdleCallback：在渲染完成后，如果当前帧还有空闲时间，则执行此回调，适合执行低优先级的后台任务（如上报埋点）。

### node事件循环

六大阶段

timer阶段（定时器）执行setTimeout、setInterval中到期的回调

pending callbacks阶段（待定回调） 执行上一轮循环中延迟的IO回调（如TCP错误 某些系统操作）

idle，prepare阶段（空闲，准备） 仅node内部使用，开发者无需关心

poll(轮询、核心) 检索新的IO事件（如文件读取、网络请求）

check（检查） 执行setImmediate的回调

close callbacks 执行关闭事件

process.nextTick 队列：优先级最高。它不遵循事件循环的阶段顺序，而是在当前阶段结束后、下一阶段开始前立即全部执行。这会直接打断当前阶段的执行流。

Promise 微任务队列：优先级仅次于 nextTick，在 nextTick 清空后执行。

执行总原则：在事件循环进入下一个阶段之前，Node.js 会按照 nextTick 全部清空 → Promise 全部清空 的顺序执行微任务。

浏览器 vs node

| 对比维度 | 浏览器 | node |
|宏任务取用 | 每次循环只取一个宏任务执行 | 每个阶段会把队列中的所有宏任务执行完 |
| 微任务清空时机 | 执行完一个宏任务，立刻清空全部微任务 | 执行完当前阶段全部宏任务，再清空微任务队列 |
| 专属API | requestAnimationFrame（渲染前）、requestIdleCallback（空闲时） | process.nextTick（超优先级）、setImmediate（check阶段） |
| 渲染接入 | 微任务清空后，下一个宏任务之前，会插入渲染流程 | 无DOM渲染，专注IO和计算 |

## 空值和假值

假值包括 0、‘’、false、null、undefined、NaN

空值包括null、undefined

空值合并??  0 ?? 1 值为0

可选链 ?. 

这两个都是ES2020  不是ES6

## 改变this指向的方法

| 方法 | 语法 | 执行时机 | 传参方式 | 返回值 |
| call | fn.call(thisArg, a, b, c) | 立即执行 | 逐个传递（逗号隔开） | 函数的执行结果 |
| apply | fn.apply(thisArg, [a, b, c]) | 立即执行 | 数组/类数组 | 函数的执行结果 |
| bind | fn.bind(thisArg, a, b) | 不执行，返回新函数 | 逐个传递（可预设参数） | 绑定了 this 的新函数 |

```javascript
Function.prototype.myCall = function (context, ...args) {
  // 1. 处理 null / undefined → 指向全局对象
  if (context === null || context === undefined) {
    context = typeof globalThis !== 'undefined' ? globalThis : window;
  }

  // 2. 处理原始值：数字、字符串、布尔值要装箱成对象
  if (typeof context !== 'object' && typeof context !== 'function') {
    context = Object(context);
  }

  // 3. 用 Symbol 作为临时 key，避免属性名冲突
  const key = Symbol('fn');

  // 4. 把当前函数挂到 context 上
  context[key] = this;

  // 5. 通过 context 调用，this 就指向了 context
  const result = context[key](...args);

  // 6. 清理临时属性
  delete context[key];

  return result;
};

Function.prototype.myApply = function (context, args) {
  if (context === null || context === undefined) {
    context = typeof globalThis !== 'undefined' ? globalThis : window;
  }

  if (typeof context !== 'object' && typeof context !== 'function') {
    context = Object(context);
  }

  const key = Symbol('fn');
  context[key] = this;

  let result;
  if (args === null || args === undefined) {
    result = context[key]();
  } else if (Array.isArray(args) || typeof args === 'object') {
    // 类数组转成真数组再展开
    result = context[key](...Array.from(args));
  } else {
    throw new TypeError('CreateListFromArrayLike called on non-object');
  }

  delete context[key];
  return result;
};

Function.prototype.myBind = function (context, ...bindArgs) {
  if (typeof this !== 'function') {
    throw new TypeError('Bind must be called on a function');
  }

  const target = this;

  function boundFn(...callArgs) {
    // 关键：判断是否通过 new 调用
    // 如果是 new，this 指向新实例，忽略绑定的 context
    const isNew = this instanceof boundFn;
    const finalContext = isNew ? this : context;

    return target.apply(finalContext, [...bindArgs, ...callArgs]);
  }

  // 维护原型链：new boundFn() 创建的实例要能访问 target.prototype
  if (target.prototype) {
    // 用空函数中转，避免直接赋值导致原型被修改
    function Empty() {}
    Empty.prototype = target.prototype;
    boundFn.prototype = new Empty();
  }

  return boundFn;
};
```

## 闭包

一个函数能够记住并访问它定义时所在的作用域，即使这个函数在定义它的外部函数执行完之后才被调用。

闭包 = 函数 + 它捕获的词法环境

```js
function createCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const counter = createCounter();

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

词法作用域

函数在哪里定义，就能访问哪里的变量。

捕获的是变量，不是值

闭包持有外部变量的引用，而不是复制一份。

延长变量生命周期

被闭包引用的变量不会随外部函数结束而立即销毁。

每个闭包有自己的环境

每次调用外部函数，都会创建一套新的变量环境。

```js
const c1 = createCounter();
const c2 = createCounter();

c1(); // 1
c1(); // 2
c2(); // 1
```

原型链

| 名称 | 归属 | 含义 |
| prototype | 函数对象才有 | 指向一个原型对象，供实例共享方法 |
| __proto__ | 几乎所有对象都有 | 内部属性 [[Prototype]] 的访问器，指向该对象的原型 |
| constructor | 原型对象上 | 指回对应的构造函数 |

__proto__ 不是标准属性，只是浏览器实现的访问器。推荐用 Object.getPrototypeOf() / Object.setPrototypeOf()。

p
 └─ __proto__ → Person.prototype
                 └─ __proto__ → Object.prototype
                                 └─ __proto__ → null

原型链查找机制

访问对象属性时：

先在对象自身查找。

找不到，沿 __proto__ 向上找。

直到 Object.prototype。

再找不到，返回 undefined。

终点是 null。

prototype 是函数才有的属性，指向原型对象。

__proto__ 是对象的内部原型引用，指向构造函数的 prototype。

原型链是对象通过 __proto__ 链接形成的查找链，终点是 null。

继承的本质是让子类实例的原型链上包含父类的原型。

ES5 推荐寄生组合继承，ES6 用 class extends 更简洁。

new、instanceof、hasOwnProperty 都和原型链密切相关。

一句话：函数有 prototype，对象有 __proto__，实例的 __proto__ 指向构造函数的 prototype，一层层链接就是原型链，继承就是在这条链上做文章。

## new

new Foo(...args) 主要做四步：

创建一个新对象

把新对象的原型指向 Foo.prototype

把构造函数里的 this 绑定到这个新对象，并执行构造函数

根据构造函数返回值决定最终返回什么：

如果返回的是对象或函数，就返回这个返回值

如果返回的是原始值（数字、字符串、布尔、null、undefined 等），就忽略它，返回第 1 步创建的新对象

```javascript
function myNew(Ctor, ...args) {
  // 1. 创建新对象，原型指向 Ctor.prototype
  const obj = Object.create(Ctor.prototype);

  // 2. 执行构造函数，this 绑定到 obj
  const result = Ctor.apply(obj, args);

  // 3. 返回值处理
  return result !== null &&
    (typeof result === 'object' || typeof result === 'function')
    ? result
    : obj;
}
```

## 数组扁平化

原生方法 Array.prototype.flat

flat(depth)：默认 depth = 1，Infinity 表示任意深度。

flat() 会跳过空位（稀疏数组的 empty 会被移除）。

只能拍平数组，不能拍平类数组或字符串。

递归 + reduce

```javascript
function flatten(arr, depth = 1) {
  return arr.reduce((acc, cur) => {
    if (Array.isArray(cur) && depth > 0) {
      acc.push(...flatten(cur, depth - 1));
    } else {
      acc.push(cur);
    }
    return acc;
  }, []);
}

flatten([1, [2, [3, [4]]]]);          // [1, 2, [3, [4]]]
flatten([1, [2, [3, [4]]]], 2);       // [1, 2, 3, [4]]
flatten([1, [2, [3, [4]]]], Infinity); // [1, 2, 3, 4]
```

迭代 + 栈（避免递归爆栈）

```javascript
function flatten(arr, depth = 1) {
  const stack = [...arr.map(item => [item, depth])];
  const result = [];

  while (stack.length) {
    const [item, d] = stack.pop();

    if (Array.isArray(item) && d > 0) {
      // 展开一层，子元素深度减一，压回栈
      stack.push(...item.map(sub => [sub, d - 1]));
    } else {
      result.push(item);
    }
  }

  return result.reverse(); // 栈是后进先出，结果要反转
}
```

## 柯里化

柯里化（Currying）是一种把接收多个参数的函数转换成一系列只接收一个参数的函数的技术。

柯里化实现

```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }

    return function (...nextArgs) {
      return curried.apply(this, args.concat(nextArgs));
    };
  };
}
```

## 发布订阅模式

发布订阅模式（Pub/Sub）是一种通过事件中心解耦发布者和订阅者的设计模式。
