<template><div><h1 id="es6" tabindex="-1"><a class="header-anchor" href="#es6"><span>ES6</span></a></h1>
<h2 id="输入网址到首屏画面呈现" tabindex="-1"><a class="header-anchor" href="#输入网址到首屏画面呈现"><span>输入网址到首屏画面呈现</span></a></h2>
<p>第一阶段：网络链路与资源请求（获取 HTML）</p>
<p>这是浏览器“空手道”开始前的准备动作，耗时主要取决于网络状况。</p>
<p>DNS 解析：浏览器将域名（如 example.com）转换为服务器的 IP 地址。</p>
<p>TCP 连接：通过三次握手建立与服务器的 TCP 连接（HTTP/2 和 HTTP/3 有优化）。</p>
<p>TLS 协商（HTTPS）：进行加密协议握手，确保安全通道建立。</p>
<p>发送 HTTP 请求：浏览器向服务器发送 GET 请求，等待服务器返回响应头及 HTML 文档的字节流。</p>
<p>第二阶段：构建 DOM 和 CSSOM（解析文档）</p>
<p>浏览器开始“阅读”拿到的 HTML 和 CSS 数据，但此时屏幕上依然一片空白。</p>
<p>字节流解码：将收到的二进制字节流解码为字符，再根据 HTML 规范词法分析成 Token（标签），最终构建出 DOM 树（文档对象模型）。</p>
<p>构建 CSSOM（关键渲染路径阻塞）：解析 HTML 时，遇到 <code v-pre>&lt;link&gt;</code> 或 <code v-pre>&lt;style&gt;</code> 标签会立即去请求或解析 CSS。CSS 不会阻塞 DOM 的构建，但会阻塞页面的渲染，因为浏览器需要完整的 CSSOM 树才能决定元素长什么样。</p>
<p>预加载扫描器：在主解析器解析 HTML 的同时，浏览器会启动一个“预加载扫描器”，它会提前发现 img、script、css 等资源链接，并并行提前下载它们，避免串行等待。</p>
<p>第三阶段：渲染树生成与布局（计算位置）</p>
<p>现在有了 DOM（结构）和 CSSOM（样式），浏览器开始“排版”。</p>
<p>合并为渲染树（Render Tree）：从 DOM 根节点开始遍历，过滤掉 display: none 等不可见元素，结合 CSSOM 为每个可见节点计算出最终的样式（即样式计算）。</p>
<p>布局（Layout / Reflow）：计算每个可见节点在视口（Viewport）内的精确几何位置（坐标和尺寸）。这一步非常耗费性能，它会遍历整个渲染树。</p>
<p>第四阶段：首次绘制（Painting）—— 首屏出现</p>
<p>这是用户第一次看到画面的时刻，通常对应性能指标 FP（First Paint） 或 FCP（First Contentful Paint，首次内容绘制）。</p>
<p>绘制（Paint）：将布局后的元素，按照层级（层叠上下文）划分成多个绘制图层（Layer）。</p>
<p>栅格化（Rasterization）：将绘制指令交给 GPU 进程，把图层切分成图块（Tile），并栅格化为屏幕上的像素点。</p>
<p>合成（Composite）：GPU 将多个图层按照顺序合成在一起，最终显示在屏幕上。此时你可能看到背景色、文字或首屏的基本骨架。</p>
<p>第五阶段：脚本执行与资源加载（填充与交互）</p>
<p>首屏虽然显示了，但页面通常还没“活”起来。</p>
<p>JavaScript 的“阻塞”效应：<code v-pre>&lt;script&gt;</code> 标签（未加 async/defer）会暂停 DOM 解析，立即下载并执行 JS。此时如果 JS 操作了 DOM，会触发强制回流（Reflow）或重绘（Repaint），导致首屏时间延后。</p>
<p>加载关键媒体资源：首屏内的 img、字体文件（@font-face）正在下载，下载完成后触发重新布局和绘制，这时用户会看到图片闪现或文字变化。</p>
<p>LCP（最大内容绘制）：首屏内最大的元素（通常是图片或大块文字）渲染完成，标志着首屏主要内容加载完毕。</p>
<h3 id="页面加载较慢-问题主要在这几点" tabindex="-1"><a class="header-anchor" href="#页面加载较慢-问题主要在这几点"><span>页面加载较慢，问题主要在这几点</span></a></h3>
<p>| CSS 阻塞渲染 | 构建 CSSOM 完成前，浏览器不会渲染任何东西。| 提取首屏关键 CSS（Critical CSS）内联到 <code v-pre>&lt;head&gt;</code>；非关键 CSS 异步加载。|</p>
<p>| JS 阻塞解析 | 普通 <code v-pre>&lt;script&gt;</code> 会阻止 DOM 构建，拖慢整个流程。 | 使用 <code v-pre>&lt;script defer&gt;</code>（DOM 解析完后执行）或 <code v-pre>&lt;script async&gt;</code>（下载完立即执行，不阻塞）。|</p>
<p>| 图片/字体延迟 | 未设置尺寸的图片或字体请求会触发布局抖动（Layout Shift）。| 图片添加 width/height 或 aspect-ratio；字体使用 font-display: swap。|</p>
<h2 id="白屏问题" tabindex="-1"><a class="header-anchor" href="#白屏问题"><span>白屏问题</span></a></h2>
<h3 id="经典白屏-fcp延迟-fp未触发" tabindex="-1"><a class="header-anchor" href="#经典白屏-fcp延迟-fp未触发"><span>经典白屏（FCP延迟/FP未触发）</span></a></h3>
<p>现象：浏览器地址栏转圈，页面完全空白，没有任何文字、背景色或占位图，持续数秒甚至数十秒</p>
<p>原因：</p>
<p>CSS 阻塞：浏览器必须构建完整的 CSSOM 才能绘制页面。如果 <code v-pre>&lt;head&gt;</code> 中有巨大的外部 CSS 文件未加载完，或者 CSS 文件被严重压缩且网络慢，浏览器会“宁愿不画”，导致白屏。</p>
<p>JS 阻塞：浏览器在构建 DOM 时遇到普通的 <code v-pre>&lt;script&gt;</code> 标签（无 async/defer），会暂停 DOM 构建去下载并执行 JS。如果这个 JS 特别大（如 2MB 的库文件）或执行耗时（如死循环），DOM 树无法继续构建，渲染无法触发。</p>
<p>解决方案：</p>
<p>内联关键 CSS（Critical CSS）：将首屏必需的样式（布局、背景色）直接用 <code v-pre>&lt;style&gt;</code> 标签内联在 <code v-pre>&lt;head&gt;</code> 中，让浏览器无需等待外部文件即可立即绘制。</p>
<p>外部 CSS 异步加载：非首屏 CSS 加上 media=&quot;print&quot; 或使用 preload + onload 异步加载，避免阻塞。</p>
<p>JS 添加 defer / async：非必须的 JS 加上 defer（DOM解析完后执行）或 async（下载完立即执行且不阻塞），把“阻塞执行”变成“并行下载”。</p>
<p>服务端渲染（SSR）：对于 React/Vue 单页应用（SPA），使用 SSR 直接返回填充好内容的 HTML，客户端无需等待 JS 下载执行就能看到骨架。</p>
<h3 id="spa-单页应用-框架特有的-加载白屏" tabindex="-1"><a class="header-anchor" href="#spa-单页应用-框架特有的-加载白屏"><span>SPA（单页应用）框架特有的“加载白屏”</span></a></h3>
<p>现象：页面先极快地闪现了一下背景色或 Loading 图标，然后突然变成白屏，或者一直白屏直到几秒后所有内容突然蹦出来。</p>
<p>根本原因：JS 加载或执行报错导致“水合（Hydration）”或“挂载（Mount）”失败。</p>
<p>解决方案：</p>
<p>添加骨架屏（Skeleton Screen）：在 HTML 内联 CSS 中直接绘制一块灰色的占位布局（如文章轮廓、头像占位）。这样即使 JS 没加载完，用户看到的也是“有结构的灰块”，而非空白。</p>
<p>资源加载失败兜底：给 <code v-pre>&lt;script&gt;</code> 标签添加 onerror 重试机制，或利用 Service Worker 缓存备用 JS。</p>
<p>前端错误监控与容错：使用 window.onerror 或 try-catch 捕获渲染期错误；在 Vue 中使用 errorCaptured 钩子，React 中使用 Error Boundaries（错误边界），防止单个组件报错导致整页白屏。</p>
<p>路由懒加载 + 预加载：使用 webpack 的代码分割，首屏只加载核心 JS，并利用 <code v-pre>&lt;link rel=&quot;preload&quot;&gt;</code> 提前加载首屏路由的 JS 模块。</p>
<h3 id="接口异常与数据依赖导致的白屏" tabindex="-1"><a class="header-anchor" href="#接口异常与数据依赖导致的白屏"><span>接口异常与数据依赖导致的白屏</span></a></h3>
<p>现象：页面样式、骨架屏都显示正常，但数据区域空白，或者整个页面被一个透明的遮罩层挡住。</p>
<p>根本原因：首屏强依赖的接口报错或超时。</p>
<p>解决方案：</p>
<p>默认数据（Default Props）：在请求数据前，先给组件赋予默认的空数组或空对象，确保 v-for 或 map 不会因 undefined 而报错。</p>
<p>合理设置超时与重试：接口请求设置 3-5 秒超时，超时后自动重试一次，或直接降级展示“加载失败”提示，而不是死等白屏。</p>
<p>加装 Loading 遮罩但不阻挡点击：如果是 SPA 的路由切换，可以使用 keep-alive 或延迟加载动画，避免路由切换时整个视图被清空导致的白屏闪烁。</p>
<p>终极排查工具（如果遇到线上白屏）</p>
<p>看network面板，是否有js、css资源不是200，如果有 404 或 403，说明资源部署路径错误（常见于打包后静态资源路径 publicPath 配置不对）。</p>
<p>看 Console（控制台）：是否有醒目的红色报错信息（如 Uncaught TypeError）？如果有，定位到报错行数（Source 面板）即可修复。</p>
<p>看 Sources（源代码） 的 Coverage 工具：查看首屏下载的代码中，有多少是当前未执行的，评估是否有不必要的庞大依赖。</p>
<h2 id="防抖" tabindex="-1"><a class="header-anchor" href="#防抖"><span>防抖</span></a></h2>
<p>防抖（Debounce）：像电梯关门。如果有人不断走进来（持续触发），电梯门就永远不关；直到最后一个人进来后过了 N 秒没人再来，门才关上运行（执行一次）。</p>
<p>标准实现（带immediate选项）</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">function</span> debounce<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args<span class="token operator">:</span>any<span class="token punctuation">[</span><span class="token punctuation">]</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> any<span class="token operator">></span><span class="token punctuation">(</span></span>
<span class="line">    <span class="token literal-property property">func</span><span class="token operator">:</span><span class="token constant">T</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">delay</span><span class="token operator">:</span>number<span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">immediate</span><span class="token operator">:</span>boolean <span class="token operator">=</span> <span class="token boolean">false</span></span>
<span class="line"><span class="token punctuation">)</span><span class="token operator">:</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args<span class="token operator">:</span> Parameters<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">void</span><span class="token punctuation">)</span> <span class="token operator">&amp;</span> <span class="token punctuation">{</span> <span class="token function-variable function">cancel</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">void</span> <span class="token punctuation">}</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">let</span> <span class="token literal-property property">timer</span><span class="token operator">:</span> ReturnType<span class="token operator">&lt;</span><span class="token keyword">typeof</span> setTimeout<span class="token operator">></span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">const</span> <span class="token function-variable function">debounced</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token keyword">this</span><span class="token operator">:</span> ThisParameterType<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span><span class="token punctuation">,</span> <span class="token operator">...</span>args<span class="token operator">:</span> Parameters<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">const</span> context <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token comment">// 如果 immediate 为 true 且 timer 为空，说明是第一次触发，立即执行</span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">(</span>immediate <span class="token operator">&amp;&amp;</span> timer <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token function">func</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">// 清除上一次的定时器</span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">(</span>timer<span class="token punctuation">)</span> <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timer<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">        <span class="token comment">// 重新设定延迟执行</span></span>
<span class="line">        timer <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>immediate<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token function">func</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">            timer <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span> <span class="token comment">// 重置，使得下一次触发能再次立即执行</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">,</span> delay<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// 添加取消方法，用于组件卸载时清除定时器，防止内存泄漏</span></span>
<span class="line">    debounced<span class="token punctuation">.</span><span class="token function-variable function">cancel</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">(</span>timer<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timer<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">            timer <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">return</span> debounced<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="节流" tabindex="-1"><a class="header-anchor" href="#节流"><span>节流</span></a></h2>
<p>节流（Throttle）：像水龙头滴水。不管你怎么猛转把手（疯狂触发），水珠都只能每隔 N 秒滴下一滴（固定频率执行）。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">function</span> throttle<span class="token operator">&lt;</span><span class="token constant">T</span> <span class="token keyword">extends</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args<span class="token operator">:</span> any<span class="token punctuation">[</span><span class="token punctuation">]</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> any<span class="token operator">></span><span class="token punctuation">(</span></span>
<span class="line">  <span class="token literal-property property">func</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">limit</span><span class="token operator">:</span> number</span>
<span class="line"><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args<span class="token operator">:</span> Parameters<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">void</span><span class="token punctuation">)</span> <span class="token operator">&amp;</span> <span class="token punctuation">{</span> <span class="token function-variable function">cancel</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">void</span> <span class="token punctuation">}</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">let</span> lastCall <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">let</span> <span class="token literal-property property">timer</span><span class="token operator">:</span> ReturnType<span class="token operator">&lt;</span><span class="token keyword">typeof</span> setTimeout<span class="token operator">></span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">const</span> <span class="token function-variable function">throttled</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token keyword">this</span><span class="token operator">:</span> ThisParameterType<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span><span class="token punctuation">,</span> <span class="token operator">...</span>args<span class="token operator">:</span> Parameters<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">></span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">const</span> now <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token keyword">const</span> remaining <span class="token operator">=</span> limit <span class="token operator">-</span> <span class="token punctuation">(</span>now <span class="token operator">-</span> lastCall<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span>remaining <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token comment">// 如果距离上次执行超过了时间间隔，立即执行</span></span>
<span class="line">      <span class="token keyword">if</span> <span class="token punctuation">(</span>timer<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timer<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        timer <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">      lastCall <span class="token operator">=</span> now<span class="token punctuation">;</span></span>
<span class="line">      <span class="token function">func</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>timer<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token comment">// 如果还没到时间，设置一个定时器，确保最后一次触发也能执行</span></span>
<span class="line">      timer <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">        lastCall <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        timer <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span></span>
<span class="line">        <span class="token function">func</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">      <span class="token punctuation">}</span><span class="token punctuation">,</span> remaining<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  throttled<span class="token punctuation">.</span><span class="token function-variable function">cancel</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span>timer<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timer<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">      timer <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">return</span> throttled<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>| 维度 | 防抖（Debounce）| 节流（Throttle）|
| 执行时机 | 延迟执行：连续触发时，只执行最后一次（或第一次）。 | 限频执行：固定时间间隔内，只执行一次。|
| 最终效果 | 将多次高频操作合并为一次。 | 将多次高频操作稀释为低频。|
| 适用场景 | 搜索框输入联想、窗口 resize 停止后的重绘、表单验证。 | 滚动加载（scroll）、鼠标拖拽、游戏动画帧、上传进度。|
| 比喻 | 电梯关门 | 红绿灯（固定放行）|</p>
<h2 id="vite打包后体积递增" tabindex="-1"><a class="header-anchor" href="#vite打包后体积递增"><span>vite打包后体积递增</span></a></h2>
<p>未设置emptyOutDir: true</p>
<h2 id="深拷贝" tabindex="-1"><a class="header-anchor" href="#深拷贝"><span>深拷贝</span></a></h2>
<p>深拷贝：创建一个新对象，并递归复制原对象所有层级的属性/元素，使新对象与原对象完全独立。修改副本不会影响原对象。</p>
<p>推荐：structuredClone</p>
<p>const copy = structuredClone(obj);</p>
<p>JSON序列化</p>
<p>const copy = JSON.parse(JSON.stringify(obj));</p>
<p>问题：会丢失 undefined、函数、Symbol；Date 变字符串；NaN/Infinity 变 null；Map/Set 变 {}；循环引用报错。</p>
<p>function deepClone(obj, map = new WeakMap()) {
if (obj === null || typeof obj !== 'object') return obj;
if (map.has(obj)) return map.get(obj);</p>
<p>if (obj instanceof Date) return new Date(obj);
if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags);</p>
<p>if (obj instanceof Map) {
const copy = new Map();
map.set(obj, copy);
obj.forEach((v, k) =&gt; copy.set(deepClone(k, map), deepClone(v, map)));
return copy;
}</p>
<p>if (obj instanceof Set) {
const copy = new Set();
map.set(obj, copy);
obj.forEach(v =&gt; copy.add(deepClone(v, map)));
return copy;
}</p>
<p>const copy = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj));
map.set(obj, copy);</p>
<p>for (const key of Object.keys(obj)) {
copy[key] = deepClone(obj[key], map);
}
return copy;
}</p>
<h2 id="垃圾回收" tabindex="-1"><a class="header-anchor" href="#垃圾回收"><span>垃圾回收</span></a></h2>
<p>可达性分析，从根对象开始，沿着引用链遍历。能到达的对象保留，到不了的回收。</p>
<p>JS 用可达性分析判断对象存活，V8 通过分代回收、Scavenge、标记-清除/整理、增量并发标记等策略，在自动释放内存的同时尽量降低停顿。避免内存泄漏的关键是：及时解除引用、清理监听和定时器、用 WeakMap/WeakSet 做弱引用缓存。</p>
</div></template>


