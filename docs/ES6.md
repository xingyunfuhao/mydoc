# ES6

## let const

块级作用域：只在{}块内生效，不再像var全局污染

暂时性死区：在块内变量声明之前不可用，而var会将变量提升为undefined

默认一般使用const定义变量，如果后面要改变值用let,const定义的对象可以改变属性值，不能重新指向新对象

## 箭头函数

与this绑定，箭头函数没有自己的this，它的this继承自外层作用域（词法环境）

箭头函数与普通函数的区别：

this指向机制：

普通函数的this动态绑定，看谁调用（运行时决定）

箭头函数的this静态绑定，捕获外层作用域的this（定义时决定，并且call/apply/bind都无法改变）

构造函数（能否new）

普通函数可以作为构造函数，通过new关键字实例化对象

箭头函数不能作为构造函数，因为箭头函数没有[[Construct]] 内部方法，使用 new 会抛出 `TypeError: fn is not a constructor`。

arguments对象

普通函数内部拥有arguments对象（类数组），用于获取传入的所有参数

箭头函数没有arguments对象，会沿着作用域向上查找，替代方案使用ES6的剩余参数（...args）

prototype属性

普通属性有prototype属性（用于原型链继承）

箭头函数没有prototype属性

语法简洁性与隐式返回

普通函数必须有return才能返回值
箭头函数只有一个表示式且省略花括号，会隐式返回该表达式，但是需要将返回内容加括号

函数体内的yield关键字

普通函数可以作为Generator函数（使用function *），含有yield关键字

箭头函数不能作为Generator函数，语法不支持

## 解构赋值与展开运算符

常用于props接收和配置项提取
 解构 + 重命名 + 默认值（面试常考）

`const { data: resData, code = 200 } = apiResponse;`

陷阱：展开运算符是浅拷贝

```javascript
const obj1 = { a: { b: 1 } };
const obj2 = { ...obj1 };
obj2.a.b = 2;
console.log(obj1.a.b); // 2 （浅拷贝导致原对象被修改）
```

## 模板字符串

用反引号（`）代替字符串拼接，支持插值和多行字符串。

```javascript
const name = 'Vue';
const version = 3;

// 插值
const msg = `Welcome to ${name} ${version}!`;

// 多行字符串
const html = `
  <div>
    <h1>${name}</h1>
    <p>Version: ${version}</p>
  </div>
`;

// 表达式
const result = `1 + 1 = ${1 + 1}`;
```

插值：`${expression}` 内部可以放任意 JS 表达式。
进阶用法（标签模板）：用于过滤或处理字符串

## Promise

状态：pending（进行中）-》fulfilled(成功)或者rejected（失败） 状态一旦改变就不可逆

```javascript
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

// 微任务封装，兼容旧环境
const microtask =
  typeof queueMicrotask === 'function'
    ? queueMicrotask
    : cb => Promise.resolve().then(cb);

class MyPromise {
  constructor(executor) {
    this.state = PENDING;
    this.value = undefined;   // fulfilled 的值
    this.reason = undefined;  // rejected 的原因
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = value => {
      // 值为 Promise 时跟随其状态
      if (value instanceof MyPromise) {
        return value.then(resolve, reject);
      }
      if (this.state === PENDING) {
        this.state = FULFILLED;
        this.value = value;
        this.onFulfilledCallbacks.forEach(cb => cb());
      }
    };

    const reject = reason => {
      if (this.state === PENDING) {
        this.state = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach(cb => cb());
      }
    };

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  then(onFulfilled, onRejected) {
    // 值穿透：非函数就原样传递
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : v => v;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : e => { throw e; };

    const promise2 = new MyPromise((resolve, reject) => {
      const runFulfilled = () => {
        microtask(() => {
          try {
            const x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      };

      const runRejected = () => {
        microtask(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      };

      if (this.state === FULFILLED) {
        runFulfilled();
      } else if (this.state === REJECTED) {
        runRejected();
      } else {
        this.onFulfilledCallbacks.push(runFulfilled);
        this.onRejectedCallbacks.push(runRejected);
      }
    });

    return promise2;
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(callback) {
    return this.then(
      value => MyPromise.resolve(callback()).then(() => value),
      reason =>
        MyPromise.resolve(callback()).then(() => {
          throw reason;
        })
    );
  }

  // -------- 静态方法 --------

  static resolve(value) {
    if (value instanceof MyPromise) return value;
    return new MyPromise(resolve => resolve(value));
  }

  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }

  // Promise.all：全部成功才成功；有一个失败立刻失败
  static all(iterable) {
    return new MyPromise((resolve, reject) => {
      const arr = Array.from(iterable);
      const results = new Array(arr.length);
      let count = 0;

      if (arr.length === 0) return resolve(results);

      arr.forEach((item, i) => {
        MyPromise.resolve(item).then(
          value => {
            results[i] = value;
            if (++count === arr.length) resolve(results);
          },
          reject
        );
      });
    });
  }

  // Promise.race：第一个 settle（成功或失败）就决定结果
  static race(iterable) {
    return new MyPromise((resolve, reject) => {
      const arr = Array.from(iterable);
      arr.forEach(item => {
        MyPromise.resolve(item).then(resolve, reject);
      });
    });
  }

  // Promise.allSettled：等全部完成，永远成功，返回每个结果的状态
  static allSettled(iterable) {
    return new MyPromise((resolve, reject) => {
      const arr = Array.from(iterable);
      const results = new Array(arr.length);
      let count = 0;

      if (arr.length === 0) return resolve(results);

      arr.forEach((item, i) => {
        MyPromise.resolve(item).then(
          value => {
            results[i] = { status: 'fulfilled', value };
            if (++count === arr.length) resolve(results);
          },
          reason => {
            results[i] = { status: 'rejected', reason };
            if (++count === arr.length) resolve(results);
          }
        );
      });
    });
  }

  // Promise.any：第一个成功就成功；全失败才失败（AggregateError）
  static any(iterable) {
    return new MyPromise((resolve, reject) => {
      const arr = Array.from(iterable);
      const errors = new Array(arr.length);
      let count = 0;

      if (arr.length === 0) {
        return reject(new AggregateError([], 'All promises were rejected'));
      }

      arr.forEach((item, i) => {
        MyPromise.resolve(item).then(resolve, err => {
          errors[i] = err;
          if (++count === arr.length) {
            reject(new AggregateError(errors, 'All promises were rejected'));
          }
        });
      });
    });
  }
}

// then 链的解析：处理返回 Promise / thenable / 普通值 / 循环引用
function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected'));
  }

  if (x instanceof MyPromise) {
    x.then(resolve, reject);
    return;
  }

  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    let then;
    try {
      then = x.then;
    } catch (e) {
      return reject(e);
    }

    if (typeof then === 'function') {
      let called = false;
      try {
        then.call(
          x,
          y => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          r => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } catch (e) {
        if (!called) reject(e);
      }
      return;
    }
  }

  resolve(x);
}
```

## Module模块化

ES6模块是编译时加载，CommonJS模块是运行时加载（require）

具名导出`export const fu=()=>{} -> import {fu} from './module.js'`

默认导出`export default class Fu{} -> import Fu from './module.js'`

动态导入：import('module').then(),用于路由懒加载

## Object.assign()

是ES6引入的一个静态方法，用于将所有可枚举的自有属性的值，从一个或多个源对象复制到目标对象，并返回修改后的目标对象

const merged = Object.assign({}, { foo: 'bar' })

console.log(merged); // 输出: { foo: 'bar' }

## iterator

Iterator（迭代器）是 ES6 引入的统一遍历机制，它规定了如何依次访问一个集合中的元素。理解迭代器协议和可迭代协议，是掌握 for...of、展开运算符、解构、生成器的基础。
