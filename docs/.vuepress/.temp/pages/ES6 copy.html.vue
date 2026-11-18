<template><div><h1 id="es6" tabindex="-1"><a class="header-anchor" href="#es6"><span>ES6</span></a></h1>
<p>事件循环 浏览器和node
vue双向绑定和响应式原理（对比）
webpack构建流程。打包细节
langchain vibecoding
浏览器渲染流程
es6相关新特性
keepalive 原理层面
http1.0 http2.0 http3.0有哪些变化
webpack和vite有哪些区别
cicd集成
performance工具
白屏问题</p>
<h2 id="let-const" tabindex="-1"><a class="header-anchor" href="#let-const"><span>let const</span></a></h2>
<p>块级作用域：只在{}块内生效，不再像var全局污染</p>
<p>暂时性死区：在块内变量声明之前不可用，而var会将变量提升为undefined</p>
<p>默认一般使用const定义变量，如果后面要改变值用let,const定义的对象可以改变属性值，不能重新指向新对象</p>
<h2 id="箭头函数" tabindex="-1"><a class="header-anchor" href="#箭头函数"><span>箭头函数</span></a></h2>
<p>与this绑定，箭头函数没有自己的this，它的this继承自外层作用域（词法环境）</p>
<h2 id="解构赋值与展开运算符" tabindex="-1"><a class="header-anchor" href="#解构赋值与展开运算符"><span>解构赋值与展开运算符</span></a></h2>
<p>常用于props接收和配置项提取
解构 + 重命名 + 默认值（面试常考）</p>
<p><code v-pre>const { data: resData, code = 200 } = apiResponse;</code></p>
<p>陷阱：展开运算符是浅拷贝</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> obj1 <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> obj2 <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token operator">...</span>obj1 <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">obj2<span class="token punctuation">.</span>a<span class="token punctuation">.</span>b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span></span>
<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj1<span class="token punctuation">.</span>a<span class="token punctuation">.</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 2 （浅拷贝导致原对象被修改）</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="模板字符串" tabindex="-1"><a class="header-anchor" href="#模板字符串"><span>模板字符串</span></a></h2>
<p>用反引号（`）代替字符串拼接，支持插值和多行字符串。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> name <span class="token operator">=</span> <span class="token string">'Vue'</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">const</span> version <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 插值</span></span>
<span class="line"><span class="token keyword">const</span> msg <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Welcome to </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>version<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">!</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 多行字符串</span></span>
<span class="line"><span class="token keyword">const</span> html <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string"></span>
<span class="line">  &lt;div></span>
<span class="line">    &lt;h1></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/h1></span>
<span class="line">    &lt;p>Version: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>version<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/p></span>
<span class="line">  &lt;/div></span>
<span class="line"></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 表达式</span></span>
<span class="line"><span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">1 + 1 = </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token number">1</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>插值：<code v-pre>${expression}</code> 内部可以放任意 JS 表达式。
进阶用法（标签模板）：用于过滤或处理字符串</p>
<h2 id="promise" tabindex="-1"><a class="header-anchor" href="#promise"><span>Promise</span></a></h2>
<p>状态：pending（进行中）-》fulfilled(成功)或者rejected（失败） 状态一旦改变就不可逆</p>
<h2 id="module模块化" tabindex="-1"><a class="header-anchor" href="#module模块化"><span>Module模块化</span></a></h2>
<p>ES6模块是编译时加载，CommonJS模块是运行时加载</p>
<p>具名导出<code v-pre>export const fu=()=&gt;{} -&gt; import {fu} from './module.js'</code></p>
<p>默认导出<code v-pre>export default class Fu{} -&gt; import Fu from './module.js'</code></p>
<p>动态导入：import('module').then(),用于路由懒加载</p>
</div></template>


