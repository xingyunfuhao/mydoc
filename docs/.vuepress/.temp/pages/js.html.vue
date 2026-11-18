<template><div><h1 id="js" tabindex="-1"><a class="header-anchor" href="#js"><span>js</span></a></h1>
<h2 id="基本类型-vs-引用类型" tabindex="-1"><a class="header-anchor" href="#基本类型-vs-引用类型"><span>基本类型 vs 引用类型</span></a></h2>
<p>基本类型</p>
<p>string</p>
<p>number</p>
<p>boolean</p>
<p>null</p>
<p>undefined</p>
<p>symbol</p>
<p>bigint</p>
<p>引用类型</p>
<p>Object</p>
<p>Array</p>
<p>Function</p>
<p>Date</p>
<p>RegExp</p>
<p>Map、Set</p>
<p>等等</p>
<h2 id="类型检测" tabindex="-1"><a class="header-anchor" href="#类型检测"><span>类型检测</span></a></h2>
<p>typeof 'abc';        // 'string'</p>
<p>typeof 123;          // 'number'</p>
<p>typeof true;         // 'boolean'</p>
<p>typeof undefined;    // 'undefined'</p>
<p>typeof Symbol();     // 'symbol'</p>
<p>typeof 10n;          // 'bigint'</p>
<p>typeof null;         // 'object' 历史遗留 bug</p>
<p>typeof {};           // 'object'</p>
<p>typeof [];           // 'object'</p>
<p>typeof function(){}; // 'function'</p>
<p>Array.isArray([]); // true</p>
<p>Object.prototype.toString.call([]);    // '[object Array]'</p>
<p>Object.prototype.toString.call(null);  // '[object Null]'</p>
<p>Object.prototype.toString.call({});    // '[object Object]'</p>
<p>[] instanceof Array; // true</p>
<h2 id="事件循环" tabindex="-1"><a class="header-anchor" href="#事件循环"><span>事件循环</span></a></h2>
<h3 id="浏览器事件循环" tabindex="-1"><a class="header-anchor" href="#浏览器事件循环"><span>浏览器事件循环</span></a></h3>
<p>四大组件：</p>
<p>调用栈</p>
<p>web APIs (setTimeout、DOM事件、fetch、mutationObserver)</p>
<p>宏任务队列（存放待执行的宏任务回调，如setTimeout、setInterval、IO事件、setImmediate等）</p>
<p>微任务队列（存放待执行的微任务回调，如Promise.then/catch/finally、MutationObserver等）</p>
<p>完整的执行流程</p>
<p>执行同步代码</p>
<p>清空微任务队列</p>
<p>渲染失败（关键帧）</p>
<p>取出一个宏任务</p>
<p>再次清空所有微任务，进入下一轮循环</p>
<p>requestAnimationFrame（rAF）的位置：它不在宏任务队列里，而是挂在渲染阶段之前</p>
<p>requestIdleCallback：在渲染完成后，如果当前帧还有空闲时间，则执行此回调，适合执行低优先级的后台任务（如上报埋点）。</p>
<h3 id="node事件循环" tabindex="-1"><a class="header-anchor" href="#node事件循环"><span>node事件循环</span></a></h3>
<p>六大阶段</p>
<p>timer阶段（定时器）执行setTimeout、setInterval中到期的回调</p>
<p>pending callbacks阶段（待定回调） 执行上一轮循环中延迟的IO回调（如TCP错误 某些系统操作）</p>
<p>idle，prepare阶段（空闲，准备） 仅node内部使用，开发者无需关心</p>
<p>poll(轮询、核心) 检索新的IO事件（如文件读取、网络请求）</p>
<p>check（检查） 执行setImmediate的回调</p>
<p>close callbacks 执行关闭事件</p>
<p>process.nextTick 队列：优先级最高。它不遵循事件循环的阶段顺序，而是在当前阶段结束后、下一阶段开始前立即全部执行。这会直接打断当前阶段的执行流。</p>
<p>Promise 微任务队列：优先级仅次于 nextTick，在 nextTick 清空后执行。</p>
<p>执行总原则：在事件循环进入下一个阶段之前，Node.js 会按照 nextTick 全部清空 → Promise 全部清空 的顺序执行微任务。</p>
<p>浏览器 vs node</p>
<p>| 对比维度 | 浏览器 | node |
|宏任务取用 | 每次循环只取一个宏任务执行 | 每个阶段会把队列中的所有宏任务执行完 |
| 微任务清空时机 | 执行完一个宏任务，立刻清空全部微任务 | 执行完当前阶段全部宏任务，再清空微任务队列 |
| 专属API | requestAnimationFrame（渲染前）、requestIdleCallback（空闲时） | process.nextTick（超优先级）、setImmediate（check阶段） |
| 渲染接入 | 微任务清空后，下一个宏任务之前，会插入渲染流程 | 无DOM渲染，专注IO和计算 |</p>
<h2 id="空值和假值" tabindex="-1"><a class="header-anchor" href="#空值和假值"><span>空值和假值</span></a></h2>
<p>假值包括 0、‘’、false、null、undefined、NaN</p>
<p>空值包括null、undefined</p>
<p>空值合并??  0 ?? 1 值为0</p>
<p>可选链 ?.</p>
<p>这两个都是ES2020  不是ES6</p>
<h2 id="改变this指向的方法" tabindex="-1"><a class="header-anchor" href="#改变this指向的方法"><span>改变this指向的方法</span></a></h2>
<p>| 方法 | 语法 | 执行时机 | 传参方式 | 返回值 |
| call | fn.call(thisArg, a, b, c) | 立即执行 | 逐个传递（逗号隔开） | 函数的执行结果 |
| apply | fn.apply(thisArg, [a, b, c]) | 立即执行 | 数组/类数组 | 函数的执行结果 |
| bind | fn.bind(thisArg, a, b) | 不执行，返回新函数 | 逐个传递（可预设参数） | 绑定了 this 的新函数 |</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">myCall</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">context<span class="token punctuation">,</span> <span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">// 1. 处理 null / undefined → 指向全局对象</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span>context <span class="token operator">===</span> <span class="token keyword">null</span> <span class="token operator">||</span> context <span class="token operator">===</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    context <span class="token operator">=</span> <span class="token keyword">typeof</span> globalThis <span class="token operator">!==</span> <span class="token string">'undefined'</span> <span class="token operator">?</span> globalThis <span class="token operator">:</span> window<span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">// 2. 处理原始值：数字、字符串、布尔值要装箱成对象</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> context <span class="token operator">!==</span> <span class="token string">'object'</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> context <span class="token operator">!==</span> <span class="token string">'function'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    context <span class="token operator">=</span> <span class="token function">Object</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">// 3. 用 Symbol 作为临时 key，避免属性名冲突</span></span>
<span class="line">  <span class="token keyword">const</span> key <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">'fn'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">// 4. 把当前函数挂到 context 上</span></span>
<span class="line">  context<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">// 5. 通过 context 调用，this 就指向了 context</span></span>
<span class="line">  <span class="token keyword">const</span> result <span class="token operator">=</span> context<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">// 6. 清理临时属性</span></span>
<span class="line">  <span class="token keyword">delete</span> context<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">return</span> result<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">myApply</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">context<span class="token punctuation">,</span> args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span>context <span class="token operator">===</span> <span class="token keyword">null</span> <span class="token operator">||</span> context <span class="token operator">===</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    context <span class="token operator">=</span> <span class="token keyword">typeof</span> globalThis <span class="token operator">!==</span> <span class="token string">'undefined'</span> <span class="token operator">?</span> globalThis <span class="token operator">:</span> window<span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> context <span class="token operator">!==</span> <span class="token string">'object'</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> context <span class="token operator">!==</span> <span class="token string">'function'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    context <span class="token operator">=</span> <span class="token function">Object</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">const</span> key <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">'fn'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  context<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">let</span> result<span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span>args <span class="token operator">===</span> <span class="token keyword">null</span> <span class="token operator">||</span> args <span class="token operator">===</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    result <span class="token operator">=</span> context<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token keyword">typeof</span> args <span class="token operator">===</span> <span class="token string">'object'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 类数组转成真数组再展开</span></span>
<span class="line">    result <span class="token operator">=</span> context<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token operator">...</span>Array<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">TypeError</span><span class="token punctuation">(</span><span class="token string">'CreateListFromArrayLike called on non-object'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">delete</span> context<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">return</span> result<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token class-name">Function</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">myBind</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">context<span class="token punctuation">,</span> <span class="token operator">...</span>bindArgs</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> <span class="token keyword">this</span> <span class="token operator">!==</span> <span class="token string">'function'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">TypeError</span><span class="token punctuation">(</span><span class="token string">'Bind must be called on a function'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">const</span> target <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">function</span> <span class="token function">boundFn</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>callArgs</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 关键：判断是否通过 new 调用</span></span>
<span class="line">    <span class="token comment">// 如果是 new，this 指向新实例，忽略绑定的 context</span></span>
<span class="line">    <span class="token keyword">const</span> isNew <span class="token operator">=</span> <span class="token keyword">this</span> <span class="token keyword">instanceof</span> <span class="token class-name">boundFn</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">const</span> finalContext <span class="token operator">=</span> isNew <span class="token operator">?</span> <span class="token keyword">this</span> <span class="token operator">:</span> context<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">return</span> <span class="token function">target</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>finalContext<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token operator">...</span>bindArgs<span class="token punctuation">,</span> <span class="token operator">...</span>callArgs<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">// 维护原型链：new boundFn() 创建的实例要能访问 target.prototype</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span>target<span class="token punctuation">.</span>prototype<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// 用空函数中转，避免直接赋值导致原型被修改</span></span>
<span class="line">    <span class="token keyword">function</span> <span class="token function">Empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>
<span class="line">    <span class="token class-name">Empty</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> target<span class="token punctuation">.</span>prototype<span class="token punctuation">;</span></span>
<span class="line">    boundFn<span class="token punctuation">.</span>prototype <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Empty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">return</span> boundFn<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="闭包" tabindex="-1"><a class="header-anchor" href="#闭包"><span>闭包</span></a></h2>
<p>一个函数能够记住并访问它定义时所在的作用域，即使这个函数在定义它的外部函数执行完之后才被调用。</p>
<p>闭包 = 函数 + 它捕获的词法环境</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">function</span> <span class="token function">createCounter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">let</span> count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    count<span class="token operator">++</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">return</span> count<span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> counter <span class="token operator">=</span> <span class="token function">createCounter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">counter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">counter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">counter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 3</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>词法作用域</p>
<p>函数在哪里定义，就能访问哪里的变量。</p>
<p>捕获的是变量，不是值</p>
<p>闭包持有外部变量的引用，而不是复制一份。</p>
<p>延长变量生命周期</p>
<p>被闭包引用的变量不会随外部函数结束而立即销毁。</p>
<p>每个闭包有自己的环境</p>
<p>每次调用外部函数，都会创建一套新的变量环境。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> c1 <span class="token operator">=</span> <span class="token function">createCounter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> c2 <span class="token operator">=</span> <span class="token function">createCounter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token function">c1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span></span>
<span class="line"><span class="token function">c1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2</span></span>
<span class="line"><span class="token function">c2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>原型链</p>
<p>| 名称 | 归属 | 含义 |
| prototype | 函数对象才有 | 指向一个原型对象，供实例共享方法 |
| <strong>proto</strong> | 几乎所有对象都有 | 内部属性 [[Prototype]] 的访问器，指向该对象的原型 |
| constructor | 原型对象上 | 指回对应的构造函数 |</p>
<p><strong>proto</strong> 不是标准属性，只是浏览器实现的访问器。推荐用 Object.getPrototypeOf() / Object.setPrototypeOf()。</p>
<p>p
└─ <strong>proto</strong> → Person.prototype
└─ <strong>proto</strong> → Object.prototype
└─ <strong>proto</strong> → null</p>
<p>原型链查找机制</p>
<p>访问对象属性时：</p>
<p>先在对象自身查找。</p>
<p>找不到，沿 <strong>proto</strong> 向上找。</p>
<p>直到 Object.prototype。</p>
<p>再找不到，返回 undefined。</p>
<p>终点是 null。</p>
<p>prototype 是函数才有的属性，指向原型对象。</p>
<p><strong>proto</strong> 是对象的内部原型引用，指向构造函数的 prototype。</p>
<p>原型链是对象通过 <strong>proto</strong> 链接形成的查找链，终点是 null。</p>
<p>继承的本质是让子类实例的原型链上包含父类的原型。</p>
<p>ES5 推荐寄生组合继承，ES6 用 class extends 更简洁。</p>
<p>new、instanceof、hasOwnProperty 都和原型链密切相关。</p>
<p>一句话：函数有 prototype，对象有 <strong>proto</strong>，实例的 <strong>proto</strong> 指向构造函数的 prototype，一层层链接就是原型链，继承就是在这条链上做文章。</p>
<h2 id="new" tabindex="-1"><a class="header-anchor" href="#new"><span>new</span></a></h2>
<p>new Foo(...args) 主要做四步：</p>
<p>创建一个新对象</p>
<p>把新对象的原型指向 Foo.prototype</p>
<p>把构造函数里的 this 绑定到这个新对象，并执行构造函数</p>
<p>根据构造函数返回值决定最终返回什么：</p>
<p>如果返回的是对象或函数，就返回这个返回值</p>
<p>如果返回的是原始值（数字、字符串、布尔、null、undefined 等），就忽略它，返回第 1 步创建的新对象</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">function</span> <span class="token function">myNew</span><span class="token punctuation">(</span><span class="token parameter">Ctor<span class="token punctuation">,</span> <span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">// 1. 创建新对象，原型指向 Ctor.prototype</span></span>
<span class="line">  <span class="token keyword">const</span> obj <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token class-name">Ctor</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">// 2. 执行构造函数，this 绑定到 obj</span></span>
<span class="line">  <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token function">Ctor</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">// 3. 返回值处理</span></span>
<span class="line">  <span class="token keyword">return</span> result <span class="token operator">!==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span></span>
<span class="line">    <span class="token punctuation">(</span><span class="token keyword">typeof</span> result <span class="token operator">===</span> <span class="token string">'object'</span> <span class="token operator">||</span> <span class="token keyword">typeof</span> result <span class="token operator">===</span> <span class="token string">'function'</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token operator">?</span> result</span>
<span class="line">    <span class="token operator">:</span> obj<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="数组扁平化" tabindex="-1"><a class="header-anchor" href="#数组扁平化"><span>数组扁平化</span></a></h2>
<p>原生方法 Array.prototype.flat</p>
<p>flat(depth)：默认 depth = 1，Infinity 表示任意深度。</p>
<p>flat() 会跳过空位（稀疏数组的 empty 会被移除）。</p>
<p>只能拍平数组，不能拍平类数组或字符串。</p>
<p>递归 + reduce</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">function</span> <span class="token function">flatten</span><span class="token punctuation">(</span><span class="token parameter">arr<span class="token punctuation">,</span> depth <span class="token operator">=</span> <span class="token number">1</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">return</span> arr<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">acc<span class="token punctuation">,</span> cur</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>cur<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> depth <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      acc<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token operator">...</span><span class="token function">flatten</span><span class="token punctuation">(</span>cur<span class="token punctuation">,</span> depth <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">      acc<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>cur<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">return</span> acc<span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token function">flatten</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>          <span class="token comment">// [1, 2, [3, [4]]]</span></span>
<span class="line"><span class="token function">flatten</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>       <span class="token comment">// [1, 2, 3, [4]]</span></span>
<span class="line"><span class="token function">flatten</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token number">Infinity</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [1, 2, 3, 4]</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>迭代 + 栈（避免递归爆栈）</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">function</span> <span class="token function">flatten</span><span class="token punctuation">(</span><span class="token parameter">arr<span class="token punctuation">,</span> depth <span class="token operator">=</span> <span class="token number">1</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">const</span> stack <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token operator">...</span>arr<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=></span> <span class="token punctuation">[</span>item<span class="token punctuation">,</span> depth<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">while</span> <span class="token punctuation">(</span>stack<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">const</span> <span class="token punctuation">[</span>item<span class="token punctuation">,</span> d<span class="token punctuation">]</span> <span class="token operator">=</span> stack<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> d <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token comment">// 展开一层，子元素深度减一，压回栈</span></span>
<span class="line">      stack<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token operator">...</span>item<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">sub</span> <span class="token operator">=></span> <span class="token punctuation">[</span>sub<span class="token punctuation">,</span> d <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">      result<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">return</span> result<span class="token punctuation">.</span><span class="token function">reverse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 栈是后进先出，结果要反转</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="柯里化" tabindex="-1"><a class="header-anchor" href="#柯里化"><span>柯里化</span></a></h2>
<p>柯里化（Currying）是一种把接收多个参数的函数转换成一系列只接收一个参数的函数的技术。</p>
<p>柯里化实现</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">function</span> <span class="token function">curry</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">curried</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span>args<span class="token punctuation">.</span>length <span class="token operator">>=</span> fn<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">return</span> <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>nextArgs</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">return</span> <span class="token function">curried</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>nextArgs<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="发布订阅模式" tabindex="-1"><a class="header-anchor" href="#发布订阅模式"><span>发布订阅模式</span></a></h2>
<p>发布订阅模式（Pub/Sub）是一种通过事件中心解耦发布者和订阅者的设计模式。</p>
</div></template>


