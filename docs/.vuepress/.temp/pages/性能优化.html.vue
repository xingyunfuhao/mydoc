<template><div><h1 id="性能优化" tabindex="-1"><a class="header-anchor" href="#性能优化"><span>性能优化</span></a></h1>
<h2 id="浏览器渲染流程" tabindex="-1"><a class="header-anchor" href="#浏览器渲染流程"><span>浏览器渲染流程</span></a></h2>
<h3 id="第一阶段-构建两棵树" tabindex="-1"><a class="header-anchor" href="#第一阶段-构建两棵树"><span>第一阶段：构建两棵树</span></a></h3>
<p>构建DOM树（文档对象模型）</p>
<p>过程：字节流 → 字符 → Tokens（标签）→ Nodes（节点）→ DOM 树。</p>
<p>特点：DOM 树描述了页面的结构和内容。</p>
<p>特别注意（JS 阻塞）：遇到普通的 <code v-pre>&lt;script&gt;</code> 标签（无 async/defer），浏览器会暂停 DOM 构建，先去下载并执行 JS。因为 JS 可能会修改 DOM（如 document.write）。</p>
<p>构建 CSSOM 树（CSS 对象模型）</p>
<p>过程：浏览器解析所有 CSS（包括外部文件、<code v-pre>&lt;style&gt;</code> 和内联样式），构建出 CSSOM 树。</p>
<p>特点：CSSOM 描述了页面的样式。CSS 不会阻塞 DOM 的构建，但会阻塞页面的渲染（因为浏览器需要完整的样式才能开始绘制，防止出现“无样式闪烁”）。</p>
<h3 id="第二阶段-合并生成渲染树-render-tree" tabindex="-1"><a class="header-anchor" href="#第二阶段-合并生成渲染树-render-tree"><span>第二阶段：合并生成渲染树（Render Tree）</span></a></h3>
<p>DOM 和 CSSOM 是两棵独立的树，浏览器需要把它们“缝合”在一起。</p>
<p>过程：从 DOM 树的根节点开始，遍历每个可见节点，并在 CSSOM 中找到对应的样式规则，组合成 渲染树。</p>
<p>过滤规则：</p>
<p>被过滤：<code v-pre>&lt;head&gt;</code>、<code v-pre>&lt;script&gt;</code> 等标签，以及 CSS 中设置了 display: none 的元素（它们不占据空间，不会出现在渲染树中）。</p>
<p>保留：visibility: hidden 和 opacity: 0 的元素（因为它们占据布局空间，只是看不见，依然会留在渲染树中）。</p>
<h3 id="第三阶段-布局-回流-layout-reflow-——-计算几何位置" tabindex="-1"><a class="header-anchor" href="#第三阶段-布局-回流-layout-reflow-——-计算几何位置"><span>第三阶段：布局 / 回流（Layout / Reflow）—— 计算几何位置</span></a></h3>
<p>过程：遍历渲染树，计算每个可见节点在视口（Viewport） 内的精确坐标（x, y）和尺寸（width, height）。</p>
<p>代价极高：布局是渲染流程中最耗费 CPU 性能的环节。如果 DOM 结构发生变动（如添加元素）或几何属性改变（如改变 width），就会触发重新布局（回流）。</p>
<h3 id="第四阶段-绘制-paint-——-生成绘制指令" tabindex="-1"><a class="header-anchor" href="#第四阶段-绘制-paint-——-生成绘制指令"><span>第四阶段：绘制（Paint）—— 生成绘制指令</span></a></h3>
<p>浏览器知道了位置，开始“准备画画”了。</p>
<p>过程：遍历渲染树，按照层叠上下文（Stacking Context，即 z-index 层级） 的顺序，将每个节点的绘制步骤（先画背景、再画边框、再画文字）记录为一个个 “绘制指令（Paint Records）”。</p>
<p>注意：这一步只是在内存中生成指令列表，并没有真正的画像素。</p>
<h3 id="第五阶段-合成-composite-——-gpu-加速的灵魂所在" tabindex="-1"><a class="header-anchor" href="#第五阶段-合成-composite-——-gpu-加速的灵魂所在"><span>第五阶段：合成（Composite）—— GPU 加速的灵魂所在</span></a></h3>
<p>这是现代浏览器（Chrome）最核心的优化机制，也是“硬件加速”的底层原理</p>
<p>分层（Layerize）：浏览器会将一些特定的渲染树节点（如设置了 transform、opacity、will-change 的元素，或 <code v-pre>&lt;video&gt;</code> 标签）提升为独立的 “绘制图层（Layer）”，就像 Photoshop 里的独立图层。</p>
<p>分块（Tiling）：每个图层会被切割成多个 256x256 或 512x512 的图块（Tile）。</p>
<p>栅格化（Rasterization）：GPU 将这些图块快速转换为屏幕上的像素点（位图）。这是一个并行操作，速度极快。</p>
<p>合成（Compositing）：GPU 将所有图层按照顺序（如同 z-index）合并在一起，最终输出到屏幕上显示。</p>
<p>| 类型 | 触发原因 | 性能损耗 | 流程环节 |
| 回流（Reflow）| 改变元素的几何尺寸（宽高、边距、位置）或 DOM 增删。必然伴随重绘。 | 极其昂贵（会从 Layout 开始重新走一遍流程） | 布局 → 绘制 → 合成
| 重绘（Repaint）| 改变元素的外观（背景色、文字颜色、visibility），但不影响几何位置。| 相对便宜（跳过 Layout，直接进入 Paint）| 绘制 → 合成
| 合成（Composite） | 改变 transform（位移/旋转/缩放）或 opacity（透明度）。| 最便宜（完全跳过 Layout 和 Paint，直接在 GPU 合成层处理） | 仅合成</p>
<h2 id="performance工具" tabindex="-1"><a class="header-anchor" href="#performance工具"><span>performance工具</span></a></h2>
<h2 id="dcl" tabindex="-1"><a class="header-anchor" href="#dcl"><span>DCL</span></a></h2>
<p>DCL（DOMContentLoaded）—— DOM 树建成的时间点</p>
<p>定义：当浏览器完全加载并解析完 HTML，构建出完整的 DOM 树 后，立即触发的事件（无需等待 CSS、图片等资源加载完）。</p>
<p>对应渲染流程：第一阶段（构建 DOM 树） 完成的时刻。</p>
<p>现实表现：此时页面可能还是白屏（因为 CSSOM 可能没构建好），但 HTML 结构已经全部读完了。</p>
<p>如何观察：在 Performance 面板的时间线上，这是一条蓝色的竖线。</p>
<h2 id="fp" tabindex="-1"><a class="header-anchor" href="#fp"><span>FP</span></a></h2>
<p>FP（First Paint）—— 第一个像素出现的时刻</p>
<p>定义：浏览器首次在屏幕上绘制任何像素点的时间点。这个“像素”可以是背景色、Canvas 画布，甚至是一个空白的 div 边框。</p>
<p>对应渲染流程：第四阶段（绘制/Paint） 的第一次执行。</p>
<p>现实表现：白屏结束。用户终于看到了东西（虽然可能只是一个灰色的背景色或浏览器自带的加载圈）。</p>
<p>关键点：FP 不要求“有意义”的内容，只要画面不是纯白即可。</p>
<h2 id="fcp" tabindex="-1"><a class="header-anchor" href="#fcp"><span>FCP</span></a></h2>
<p>FCP（First Contentful Paint）—— 首次内容绘制</p>
<p>定义：浏览器首次绘制出任何“内容”（文本、图片（包含背景图）、非空白的 <code v-pre>&lt;canvas&gt;</code> 或 SVG）的时间点。</p>
<p>对应渲染流程：同样是第四阶段（绘制/Paint），但它是 FP 的“升级版”，要求绘制的内容得是用户能识别的“有效信息”。</p>
<p>现实表现：用户看到了文字标题、图片占位或 Logo。</p>
<h2 id="dcl、fp、fcp三者的先后顺序" tabindex="-1"><a class="header-anchor" href="#dcl、fp、fcp三者的先后顺序"><span>DCL、FP、FCP三者的先后顺序</span></a></h2>
<p>情况一：如果 CSS 很大或阻塞渲染（常见导致白屏）</p>
<p>此时浏览器必须等到 CSSOM 构建完才敢渲染。</p>
<p>顺序：DCL（DOM 解析完） -&gt; FP -&gt; FCP。</p>
<p>你会发现，HTML 早就解析完了（DCL 触发了），但浏览器一直在等 CSS，屏幕上依然是白的。等 CSS 下载完，FP 和 FCP 才紧挨着出现。</p>
<p>情况二：如果 CSS 内联在 <code v-pre>&lt;head&gt;</code> 中（极速首屏）</p>
<p>内联 CSS 不需要网络下载，浏览器边解析 HTML 边生成样式。</p>
<p>顺序：FP -&gt; FCP -&gt; DCL。</p>
<p>浏览器可能在 DOM 还没解析完（比如只解析到 <code v-pre>&lt;body&gt;</code> 开头），就把已经解析好的那部分文字直接画在屏幕上了（这叫渐进式渲染）。这就是为什么内联关键 CSS 能极大加速首屏。</p>
<p>情况三：渲染被 JS 阻塞</p>
<p>如果遇到 <code v-pre>&lt;script&gt;</code> 没有 defer/async。</p>
<p>顺序：FP -&gt; FCP -&gt; DCL（但 FP 和 FCP 出现极晚，因为 JS 执行期间 DOM 解析暂停，渲染无法进行）。</p>
<h2 id="lcp" tabindex="-1"><a class="header-anchor" href="#lcp"><span>LCP</span></a></h2>
<p>LCP（Largest Contentful Paint，最大内容绘制），它是 Google 定义的 Core Web Vitals（核心网页指标） 中最核心的权重指标。</p>
<p>FP（白屏结束） → FCP（内容出现） → LCP（主要内容就绪） → OnLoad（所有资源加载完）</p>
<h3 id="构成-lcp-的四大元素-浏览器只取最大的那个" tabindex="-1"><a class="header-anchor" href="#构成-lcp-的四大元素-浏览器只取最大的那个"><span>构成 LCP 的四大元素（浏览器只取最大的那个）</span></a></h3>
<p>浏览器不是随便找个元素就算 LCP，它只认以下 4 种元素，并取面积占比最大的那个：</p>
<p><code v-pre>&lt;img&gt;</code> 标签（最常被标记）。</p>
<p><code v-pre>&lt;image&gt;</code> 内部的 <code v-pre>&lt;svg&gt;</code>。</p>
<p><code v-pre>&lt;video&gt;</code> 的封面图（poster 属性）。</p>
<p>通过 background-image: url(...) 加载的块级元素。</p>
<p>块级文本节点（如 <code v-pre>&lt;p&gt;</code>、<code v-pre>&lt;h1&gt;</code>，但面积通常较小）</p>
<h3 id="影响-lcp-的四大核心瓶颈" tabindex="-1"><a class="header-anchor" href="#影响-lcp-的四大核心瓶颈"><span>影响 LCP 的四大核心瓶颈</span></a></h3>
<p>| 瓶颈环节 | 对应性能指标 | 可能原因 |
| 服务器响应慢 | TTFB（首字节时间）| 服务器处理请求花了 30 秒（比如 SQL 查询卡死）|
| 渲染阻塞资源 | FCP / LCP 之间的空白 | CSS 或 JS 主包太大，阻塞了 DOM 构建，导致 LCP 元素迟迟无法被解析 |
| 资源加载慢 | 图片/字体下载耗时 | LCP 元素是一张 10MB 的超大 PNG 图片，在 3G 网络下下载了 60 秒 |
| 客户端渲染（CSR）| JS 执行耗时 | React/Vue 需要先下载、解析、执行整个 app.js，然后才通过 JS 动态创建出 LCP 元素 |</p>
<h2 id="cicd集成" tabindex="-1"><a class="header-anchor" href="#cicd集成"><span>cicd集成</span></a></h2>
<p>github actions</p>
<p>docker</p>
<h2 id="规范" tabindex="-1"><a class="header-anchor" href="#规范"><span>规范</span></a></h2>
<p>ESLint</p>
<p>Prettier</p>
<p>Husky</p>
<p>commit规范</p>
<h2 id="性能优化的手段" tabindex="-1"><a class="header-anchor" href="#性能优化的手段"><span>性能优化的手段</span></a></h2>
<p>资源加载优化</p>
<p>路由懒加载：通过import引入页面文件</p>
<p>代码分割：Vite精细分包，避免UI库和业务代码混进首屏</p>
<p>chunkSizeWarningLimit: 1500,
rollupOptions: {
output: {
// Static resource classification and packaging
manualChunks: {
'vue-vendor': ['vue', 'vue-router', 'pinia'],
'element-plus': ['element-plus'],
'utils': ['lodash-es', 'dayjs']
},
chunkFileNames: &quot;assets/js/[name]-[hash].js&quot;,
entryFileNames: &quot;assets/js/[name]-[hash].js&quot;,
assetFileNames: &quot;assets/[ext]/[name]-[hash].[ext]&quot;
}
}</p>
<p>异步组件：首屏不可见的重型组件按需加载</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> defineAsyncComponent<span class="token punctuation">,</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 只有真正打开时才加载 echarts 组件</span></span>
<span class="line"><span class="token keyword">const</span> ChartPanel <span class="token operator">=</span> <span class="token function">defineAsyncComponent</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token function-variable function">loader</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'../components/ChartPanel.vue'</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">loadingComponent</span><span class="token operator">:</span> SkeletonBlock<span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">delay</span><span class="token operator">:</span> <span class="token number">200</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">timeout</span><span class="token operator">:</span> <span class="token number">5000</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> showChart <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token operator">&lt;</span><span class="token operator">/</span>script<span class="token operator">></span></span>
<span class="line"></span>
<span class="line"><span class="token operator">&lt;</span>template<span class="token operator">></span></span>
<span class="line">  <span class="token operator">&lt;</span>button @click<span class="token operator">=</span><span class="token string">"showChart = true"</span><span class="token operator">></span>查看图表<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span></span>
<span class="line"></span>
<span class="line">  <span class="token operator">&lt;</span>Suspense v<span class="token operator">-</span><span class="token keyword">if</span><span class="token operator">=</span><span class="token string">"showChart"</span><span class="token operator">></span></span>
<span class="line">    <span class="token operator">&lt;</span>ChartPanel <span class="token operator">/</span><span class="token operator">></span></span>
<span class="line">    <span class="token operator">&lt;</span>template #fallback<span class="token operator">></span></span>
<span class="line">      <span class="token operator">&lt;</span>div <span class="token keyword">class</span><span class="token operator">=</span><span class="token string">"skeleton"</span><span class="token operator">></span>图表加载中<span class="token operator">...</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span></span>
<span class="line">    <span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">></span></span>
<span class="line">  <span class="token operator">&lt;</span><span class="token operator">/</span>Suspense<span class="token operator">></span></span>
<span class="line"><span class="token operator">&lt;</span><span class="token operator">/</span>template<span class="token operator">></span></span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>UI库按需引入</p>
<p>图片优化：自定义懒加载指令+响应式图片</p>
<p>computed 缓存，而不是在模板里调方法，computed 只有在 list 或 keyword 变化时才重新计算，模板重渲染时直接返回缓存值。</p>
<p>控制响应式粒度：shallowRef / shallowReactive / markRaw。列表整体替换用 shallowRef；只需要浅层响应用 shallowReactive；ECharts、地图实例、编辑器实例用 markRaw 或 shallowRef。</p>
<p>v-memo / v-once：跳过不必要的子树更新。v-memo 的数组里放该行真正依赖的值，数组不变则整棵子树跳过 diff。注意不要滥用，依赖数组写错会导致 UI 不更新。</p>
<p>v-if vs v-show、key 的使用。同时避免 v-if 和 v-for 写在同一个元素上：v-if 优先级更高，会在每次循环时判断，应先 computed 过滤再 v-for。稳定唯一 id 做 key。</p>
<p>长列表虚拟渲染，生产环境推荐 vue-virtual-scroller</p>
<p>watch优化，精确依赖，控制深度与时机</p>
<p>防抖 / 节流：自定义指令 + 组合式函数</p>
<p>Vue 场景下的优先级建议</p>
<p>先砍包体积：路由懒加载 + defineAsyncComponent + UI 库按需引入 + Vite 精细分包，这是收益最大的一刀。</p>
<p>再治响应式粒度：大列表/大对象改用 shallowRef / shallowReactive / markRaw，模板里用 computed 替代方法调用。</p>
<p>然后减少组件更新：v-memo、稳定 key、v-show 替代频繁切换的 v-if、keep-alive 缓存页面。</p>
<p>治理主线程：虚拟滚动、Web Worker、防抖节流自定义指令。</p>
<p>最后锁收益：骨架屏 + 关键 CSS、图片懒加载指令、web-vitals 监控 + Lighthouse CI 预算。</p>
</div></template>


