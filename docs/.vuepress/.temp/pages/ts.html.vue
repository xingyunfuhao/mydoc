<template><div><h1 id="ts" tabindex="-1"><a class="header-anchor" href="#ts"><span>ts</span></a></h1>
<h2 id="ts跟js的区别" tabindex="-1"><a class="header-anchor" href="#ts跟js的区别"><span>ts跟js的区别</span></a></h2>
<p>TS是JS的“超集”，它在JS的所有功能之上，添加了一套静态类型系统</p>
<p>核心区别：类型系统的不同</p>
<p>| 特性 | JavaScript (JS) | TypeScript (TS) |
| 类型系统 | 动态类型 | 静态类型 |
| 错误检测 | 运行时才发现（如 undefined is not a function）| 编译时就拦截（在代码运行前报错）|
| 代码可维护性 | 小型项目灵活，大型项目维护困难 | 通过类型约束，大型项目更易维护和重构 |
| 开发工具支持 | 基础语法提示 | 强大的智能提示、代码补全、安全重构 |
| 适用场景 | 小型项目、快速原型开发 | 中大型项目、企业级应用、长期维护的项目 |</p>
<p>使用ts的原因</p>
<p>类型安全：将错误扼杀在编译阶段</p>
<p>更好的开发体验：让IDE成为“超能力”</p>
<p>TS的类型信息让IDE（如VSCode）能提供精准的代码补全、安全的代码重构和直接的跳转定义等功能</p>
<p>代码即文档：提升可维护性</p>
<p>在大型项目中，TS的类型定义（如interface）本身就是一份“活文档”，清晰地描述了数据的结构</p>
<p>团队协作的强力粘合剂</p>
<p>在多人协作的项目中，统一的类型规范是最好的协作契约。它确保了代码风格的一致性，并有效避免因个人理解差异导致的集成问题</p>
<h2 id="基础类型" tabindex="-1"><a class="header-anchor" href="#基础类型"><span>基础类型</span></a></h2>
<p>布尔值（boolean）</p>
<p>数字浮点数（number） 除了支持js支持的十进制和十六进制，还支持二进制和八进制</p>
<p>字符串（string）</p>
<p>数组 两种方式表达，一种是数字类型后面跟着方括号，如number[]；另一种是使用数组泛型，如Array&lt;<code v-pre>number</code>&gt;</p>
<p>元组Tuple，表示一个已知元素数量和类型的数组，各元素的类型不必相同。如let x: [string, number];</p>
<p>枚举enum，对javaScript标准数据类型的一个补充，例如：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">enum</span> Color <span class="token punctuation">{</span>Red<span class="token punctuation">,</span> Green<span class="token punctuation">,</span> Blue<span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">let</span> <span class="token literal-property property">c</span><span class="token operator">:</span> Color <span class="token operator">=</span> Color<span class="token punctuation">.</span>Green<span class="token punctuation">;</span>`</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>any：任意类型</p>
<p>void，表示没有任何类型，当一个函数没有返回值时，返回值类型用void</p>
<p>null和undefined</p>
<p>never：永不存在的值的类型</p>
<p>Object：表示非原始类型</p>
<h2 id="类型断言" tabindex="-1"><a class="header-anchor" href="#类型断言"><span>类型断言</span></a></h2>
<p>有两种形式：</p>
<p>其一是尖括号语法：&lt;<code v-pre>string</code>&gt;someValue</p>
<p>另一个为as语法：someValue as string</p>
</div></template>


