<template><div><h1 id="工程" tabindex="-1"><a class="header-anchor" href="#工程"><span>工程</span></a></h1>
<h2 id="webpack配置详解" tabindex="-1"><a class="header-anchor" href="#webpack配置详解"><span>webpack配置详解</span></a></h2>
<h3 id="入口-entry" tabindex="-1"><a class="header-anchor" href="#入口-entry"><span>入口（Entry）</span></a></h3>
<p>指定打包的入口文件，告诉Webpack从哪个文件开始，构建内部的依赖图。通常是一个js文件，也可以是一个对象，包含多个入口文件</p>
<h3 id="出口" tabindex="-1"><a class="header-anchor" href="#出口"><span>出口</span></a></h3>
<p>指定打包的出口文件，告诉Webpack将打包后的文件放在哪里以及如何命名。</p>
<p>path：输出目录的绝对路径，必须使用path.resolve()生成。</p>
<p>filename：主入口文件的名称，可以使用[name]、[contenthash]等占位符。</p>
<p>chunkFilename：非入口（如动态导入）代码块的名称。</p>
<p>publicPath：为所有资源指定一个基础的URL路径，通常用于CDN部署</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'path'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">path</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">'dist'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>        <span class="token comment">// 输出到项目根目录下的 dist 文件夹</span></span>
<span class="line">    <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">'[name].[contenthash].bundle.js'</span><span class="token punctuation">,</span>   <span class="token comment">// 入口文件</span></span>
<span class="line">    <span class="token literal-property property">chunkFilename</span><span class="token operator">:</span> <span class="token string">'[name].[chunkhash].chunk.js'</span><span class="token punctuation">,</span> <span class="token comment">// 非入口文件</span></span>
<span class="line">    <span class="token literal-property property">publicPath</span><span class="token operator">:</span> <span class="token string">'/'</span><span class="token punctuation">,</span>                             <span class="token comment">// 静态资源引用路径</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="模式" tabindex="-1"><a class="header-anchor" href="#模式"><span>模式</span></a></h3>
<p>development：启用NamedChunksPlugin和NamedModulesPlugin，打包速度更快，代码不压缩，方便调试。</p>
<p>production：启用FlagDependencyUsagePlugin、TerserWebpackPlugin等，自动进行代码压缩、Tree Shaking等优化。</p>
<p>none：不使用任何默认优化。</p>
<h3 id="模块" tabindex="-1"><a class="header-anchor" href="#模块"><span>模块</span></a></h3>
<p>module是Webpack处理不同类型文件的核心。通过配置rules，可以为不同类型的文件指定不同的Loader</p>
<p>test：一个正则表达式，匹配需要被处理的文件类型。</p>
<p>use：指定使用的Loader，执行顺序从后往前。</p>
<p>include/exclude：明确Loader的作用范围，能有效提升构建速度。</p>
<h3 id="插件" tabindex="-1"><a class="header-anchor" href="#插件"><span>插件</span></a></h3>
<p>Loader用于转换特定类型的模块，而Plugin则用于执行范围更广的任务，如打包优化、资源管理和环境变量注入</p>
<p>HtmlWebpackPlugin：自动生成HTML文件，并自动注入打包后的JS/CSS资源。</p>
<p>HotModuleReplacementPlugin：启用模块热替换（HMR）。</p>
<p>DefinePlugin：允许在编译时创建全局常量，用于区分开发/生产环境。</p>
<p>loader和plugin执行时机</p>
<p>| 角色 | 执行时机 | 本质 | 核心能力 |
| loader | 在编译阶段（make流程中）处理单个模块文件时执行 | 文件转换器（转换函数） | 将非js文件（css/图片、ts）转换为webpack可识别的js模块 |
| plugin | 贯穿整个生命周期（初始、编译、输出、优化等阶段） | 功能增强剂 | 代码压缩（TerserPlugin）、提取 CSS（MiniCssExtractPlugin）、生成 HTML（HtmlWebpackPlugin）。 |</p>
<h3 id="解析" tabindex="-1"><a class="header-anchor" href="#解析"><span>解析</span></a></h3>
<p>extensions：自动解析的扩展名列表，引入模块时可以省略后缀。</p>
<p>alias：创建路径别名，简化导入路径。</p>
<h3 id="其他重要配置" tabindex="-1"><a class="header-anchor" href="#其他重要配置"><span>其他重要配置</span></a></h3>
<p>devtool：控制是否以及如何生成Source Map，用于开发调试。</p>
<p>'eval-cheap-module-source-map'：开发环境推荐，构建速度快。</p>
<p>'source-map'：生产环境推荐，能生成完整的独立.map文件。</p>
<p>devServer：配置开发服务器，提供热更新（HMR）、代理等功能</p>
<p>optimization：用于精细化控制打包优化，如代码分割（splitChunks）、压缩（minimize）等</p>
<p>externals：声明外部依赖，防止将某些库打包进bundle，通常用于通过CDN引入的库</p>
<p>cache：配置缓存策略以提升二次构建速度</p>
<p>performance：控制文件体积性能提示</p>
<h2 id="webpack构建流程" tabindex="-1"><a class="header-anchor" href="#webpack构建流程"><span>webpack构建流程</span></a></h2>
<p>本质是一个静态模块打包工具，构建时完整打包</p>
<p>核心三大阶段（主线流程）</p>
<p>阶段一：初始化</p>
<p>合并配置和创建compiler</p>
<p>合并配置（webpack.config.js和命令行（cli）参数）</p>
<p>创建compiler对象，遍历所有插件，依次调用apply方法，传入compiler对象</p>
<p>阶段二：编译</p>
<p>从入口文件出发，递归构建依赖图</p>
<p>确定入口（Entry）：从配置的入口模块开始</p>
<p>创建compilation对象：它代表这次构建的上下文，包含本次构建的所有资源、依赖和状态</p>
<p>构建模块：</p>
<p>加载（loader转换），loader的执行顺序是从右向左、从下往上执行</p>
<p>解析：将转换后的代码通过acorn(js解析器)解析成AST（抽象语法树）</p>
<p>依赖收集：遍历ast,识别require/import语句，将依赖的模块路径加入待处理队列</p>
<p>递归处理：依次处理待处理队列中的模块，重复加载-转换-解析直到所有依赖都被处理完</p>
<p>生成chunk: 所有模块处理完后，根据entry和splitchunks配置，将模块组合成一个或多个chunk（代码块）</p>
<p>阶段三：输出</p>
<p>生成文件：compilation对象将chunk转换为浏览器可识别的内容（即bundle）</p>
<p>写入磁盘：调用compiler的emit钩子，将文件内容写入配置的output.path目录（如dist文件）</p>
<p>compiler和compilation的区别</p>
<p>compiler全局唯一，贯穿整个构建生命周期</p>
<p>compilation对象在每次重新构建时创建，它包含当前这次构建的模块、依赖和资源等细节</p>
<p>Tree Shaking (摇树优化)</p>
<p>本质是借助ES6的模块系统，只打包使用到的模块，避免打包未使用的模块，从而减小打包体积。</p>
<p>sideEffects的坑</p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">"sideEffects"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token string">"*.css"</span><span class="token punctuation">,</span>      <span class="token comment">// 保留所有 CSS 文件（因为 CSS 导入就是为了执行，不能删）</span></span>
<span class="line">    <span class="token string">"*.scss"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string">"src/polyfill.js"</span> <span class="token comment">// 保留 polyfill 文件</span></span>
<span class="line">  <span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不配置可能会导致样式丢失或 Polyfill 失效，因为未使用的模块会被打包到最终的 bundle 中，导致样式无法正常加载。</p>
<p>Babel的干扰</p>
<p>如果Babel配置将ES Module转换为CommonJS模块，Tree Shaking 无法生效，必须强制Babel 保留 ES Module 语法给 Webpack 处理：</p>
<div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json"><pre v-pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">// babel.config.js</span></span>
<span class="line">  <span class="token property">"presets"</span><span class="token operator">:</span> <span class="token punctuation">[</span></span>
<span class="line">    <span class="token punctuation">[</span><span class="token string">"@babel/preset-env"</span><span class="token punctuation">,</span><span class="token punctuation">{</span></span>
<span class="line">        <span class="token property">"modules"</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token comment">// 关键！告诉 Babel 不要转换 import/export</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">]</span></span>
<span class="line">  <span class="token punctuation">]</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>splitChunks (代码分割)：缓存与加载的制胜法宝</p>
<p>核心配置思维导图</p>
<p>chunks：决定对哪些模块进行分割。</p>
<p>'async'（默认）：只分割异步导入的模块（import()）。</p>
<p>'initial'：只分割同步导入的模块。</p>
<p>'all'（推荐）：无论同步异步，全部进行分割（最强模式）。</p>
<p>minSize：生成 chunk 的最小体积（默认 20000 bytes / 20kb）。小于这个大小的模块将不会被单独分割，避免 HTTP 请求过多。</p>
<p>minChunks：模块被引用多少次才被分割（默认 1）。常用于抽离公共业务组件（如设置 minChunks: 2，即至少被 2 个地方引用才抽离）。</p>
<p>cacheGroups（缓存组）：这是配置的灵魂，用于将符合条件的模块分到同一个组里打包</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token comment">// webpack.config.js</span></span>
<span class="line"><span class="token literal-property property">optimization</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">splitChunks</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">chunks</span><span class="token operator">:</span> <span class="token string">'all'</span><span class="token punctuation">,</span> <span class="token comment">// 一网打尽</span></span>
<span class="line">    <span class="token literal-property property">minSize</span><span class="token operator">:</span> <span class="token number">20000</span><span class="token punctuation">,</span> <span class="token comment">// 20kb 以下不分割，减少请求数量</span></span>
<span class="line">    <span class="token literal-property property">minChunks</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token literal-property property">cacheGroups</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token comment">// 1. 第三方库（vendor）抽离</span></span>
<span class="line">        <span class="token literal-property property">vendor</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">[\\/]node_modules[\\/]</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'vendors'</span><span class="token punctuation">,</span> <span class="token comment">// 固定文件名，利用浏览器强缓存</span></span>
<span class="line">            <span class="token literal-property property">priority</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token comment">// 优先级最高，优先匹配这个规则</span></span>
<span class="line">            <span class="token literal-property property">reuseExistingChunk</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token comment">// 如果当前块已被复用，则直接引用，不重复生成</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token comment">// 2. 公共业务组件抽离（如 utils、components 里的公共代码）</span></span>
<span class="line">        <span class="token literal-property property">common</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token literal-property property">minChunks</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token comment">// 至少被 2 个入口引用</span></span>
<span class="line">            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'common'</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token literal-property property">priority</span><span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token literal-property property">reuseExistingChunk</span><span class="token operator">:</span> <span class="token boolean">true</span></span>
<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">       <span class="token comment">// 1. 【核心】Vue 全家桶独立打包</span></span>
<span class="line">        <span class="token literal-property property">vueFamily</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'chunk-vue-family'</span><span class="token punctuation">,</span> <span class="token comment">// 生成的文件名，如 chunk-vue-family.[hash].js</span></span>
<span class="line">            <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">[\\/]node_modules[\\/](vue|vue-router|pinia|vuex|axios)[\\/]</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token literal-property property">priority</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token comment">// 优先级必须高于下面的 vendors (通常是 -10)</span></span>
<span class="line">            <span class="token literal-property property">chunks</span><span class="token operator">:</span> <span class="token string">'all'</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token literal-property property">reuseExistingChunk</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token literal-property property">enforce</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 忽略 minSize 等限制，强制生成</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>致命陷阱：maxInitialRequests（初始请求数）</p>
<p>默认情况下 maxInitialRequests 为 25，如果分割的chunk太多，超过限制，webpack会主动合并部分小chunk，导致你的分割配置看起来不生效</p>
<p>项目优化打包体积</p>
<p>第一步（Tree Shaking）：先检查 sideEffects 配置，确保 node_modules 中的无用代码被剔除，并且 Babel 必须设置 modules: false。这能将 lodash 这种大库从 500kb 压到只留你用到的 10kb 函数。</p>
<p>第二步（SplitChunks）：将剩下必须保留的代码分层。</p>
<p>react/vue 等基础框架放在 vendors（变动极少，走强缓存）。</p>
<p>业务公共组件放在 common（避免每个页面重复打包）。</p>
<p>路由页面用 import() 动态导入（配合 chunks: 'async'），实现按需加载。</p>
<p>vite怎么处理这两件事情</p>
<p>Tree Shaking：Vite 的生产打包底层使用 Rollup，Rollup 原生天生支持 Tree Shaking，你只需在 vite.config.js 中配置 build.rollupOptions.output.manualChunks 即可。</p>
<p>SplitChunks：Vite 没有 Webpack 这么复杂的 splitChunks 配置，它推荐使用 manualChunks 进行手动分割。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token comment">// vite.config.js</span></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">build</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token literal-property property">rollupOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token literal-property property">manualChunks</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token string-property property">'vue-vendor'</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'vue'</span><span class="token punctuation">,</span> <span class="token string">'vue-router'</span><span class="token punctuation">,</span> <span class="token string">'pinia'</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token string-property property">'element-plus'</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'element-plus'</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">            <span class="token string-property property">'utils'</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'lodash-es'</span><span class="token punctuation">,</span> <span class="token string">'dayjs'</span><span class="token punctuation">]</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">      <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>验证打包效果</p>
<p>webpack使用npm run build -- --report，会自动生成一个 dist/report.html，打开浏览器即可看到各 chunk 的体积占比。</p>
<p>vite安装 rollup-plugin-visualizer 插件，配置后在 build 时生成 stats.html 可视化视图。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token comment">// vite.config.js</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> visualizer <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'rollup-plugin-visualizer'</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">vue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">visualizer</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">open</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="vite打包细节" tabindex="-1"><a class="header-anchor" href="#vite打包细节"><span>vite打包细节</span></a></h2>
<p>vite开发环境使用esbuild按需编译，生产环境基于rollup进行打包</p>
<p>esbuild 编译速度更快，支持 ES Module 语法，不支持 CommonJS 模块。rollup 编译速度慢，支持 CommonJS 模块，不支持 ES Module 语法。vite 生产环境使用 rollup 打包，因为 rollup 支持 Tree Shaking，而 esbuild 不支持 Tree Shaking。</p>
<p>vite构建的核心是用rollup引擎 跑vite插件生态</p>
<p>构建流程</p>
<p>阶段一：预构建</p>
<p>Vite 会使用 esbuild 扫描你的 node_modules，将那些 CommonJS 格式（require）或包含大量内部文件的库（如 lodash-es），提前打包（预构建）成单个 ESM 格式的模块。</p>
<p>阶段二：入口解析与依赖图谱构建</p>
<p>入口发现：以项目根目录的index.html为入口，解析 HTML 中的 <code v-pre>&lt;script type=&quot;module&quot; src=&quot;/src/main.js&quot;&gt;</code>，确定真正的 JS 入口。</p>
<p>路径解析：处理 @ 别名、node_modules 路径，以及 Vue 单文件组件（.vue）的解析</p>
<p>模块图构建：Rollup 从 main.js 开始，递归遍历所有 import 语句，构建出完整的静态依赖图谱（这是 Tree Shaking 的基础，必须是静态 ESM 才能分析）。</p>
<p>阶段三：转换与加载</p>
<p>遍历模块：Rollup 按依赖图顺序读取每个文件</p>
<p>插件链处理：文件内容会经过 Vite 插件链的 transform 钩子。</p>
<p>.vue 文件：@vitejs/plugin-vue 将其拆解为 template（编译为 render 函数）、script（TS 转 JS）、style（提取为 CSS）。</p>
<p>TS/JSX：Vite 默认使用 esbuild 进行语法转译（这里没有用 Babel，所以极快）。</p>
<p>CSS/静态资源：转换为 JS 导入或单独提取。</p>
<p>阶段四：代码优化与分割</p>
<p>Tree Shaking（摇树）：Rollup 利用阶段二的静态依赖图，标记出所有未被使用的 export（死代码），并在后续步骤中剔除。此时 package.json 中的 sideEffects 配置起到关键作用。</p>
<p>Chunk 分割（代码分割）：Rollup 执行 output.manualChunks 逻辑（你的配置）。</p>
<p>如果你写死了 manualChunks: { vendor: ['lodash-es'] }，所有 lodash 代码会强制合并进这个文件，从而解决“两个块都有 lodash”的重复问题。</p>
<p>如果是动态函数，则按规则分配文件名。</p>
<p>公共代码抽离：将多个入口共用的模块抽离成单独的 Chunk（Vite 默认的 vendor 分裂策略比 Webpack 保守一些，所以需要你手动干预）。</p>
<p>阶段五：压缩与输出</p>
<p>代码压缩（Minify）：</p>
<p>Vite 默认使用 esbuild 进行压缩（极快），替代了传统的 Terser。</p>
<p>如果追求极致压缩率，可以在 build.minify: 'terser' 切换回 Terser（但会慢很多）</p>
<p>资源哈希（Hashing）：为文件名注入 [contenthash]，利用浏览器缓存。</p>
<p>Manifest 生成（可选）：如果你配置了 build.manifest: true，Vite 会生成 manifest.json，用于后端或 SSR 映射资源路径。</p>
<p>写入磁盘：Rollup 将所有的 Chunk、CSS、HTML（处理过静态资源路径的）写入 dist 目录。此阶段触发 visualizer 插件，生成你看到的矩形树图。</p>
<h2 id="webpack和vite有哪些区别" tabindex="-1"><a class="header-anchor" href="#webpack和vite有哪些区别"><span>webpack和vite有哪些区别</span></a></h2>
<p>| 维度 | webpack | vite |
| 启动方式 | Bundle打包，必须全量构建完整依赖图，才能启动dev server | no-bundle 通过浏览器原生ESM,按需编译，启动极快 |
| 更新方式 | 全量更新，即使只修改一个文件，也会重新打包大量相关模块 | 按需更新，只编译修改的文件并替换，其余模块走浏览器缓存 |
| 生产打包 | 成熟稳定，优化策略极其丰富（tree-shaking、splitChunks 等） | 底层依赖 Rollup 进行生产打包，亦非常优秀，但生态插件丰富度略逊于 Webpack |
| 处理逻辑 | JS 主导：所有资源通过 JS 逻辑进行转换和加载 | ESM 主导：利用浏览器原生解析能力，dev 和 build 用两套工具（esbuild + rollup）|</p>
<h2 id="commonjs-vs-esm-es-module" tabindex="-1"><a class="header-anchor" href="#commonjs-vs-esm-es-module"><span>CommonJS vs ESM(ES Module)</span></a></h2>
<p>Tree Shaking（摇树优化）的核心原理是：在打包时，通过静态分析代码，把那些被定义了但从未被使用过的代码（Dead Code）安全地移除掉，从而减小最终打包体积。</p>
<p>在这个领域，ESM（ES Module）天生支持 Tree Shaking，而 CommonJS（CJS）极难甚至无法进行有效的 Tree Shaking。</p>
<p>特性 | ESM (ES Modules) | CommonJS (CJS)
加载时机 | 编译时（静态解析）| 运行时（动态执行）
依赖关系 | 静态结构，可画依赖图 | 动态执行，难以预测
Tree Shaking | ✅ 完美支持 | ❌ 极难支持（除非借助插件强转 ESM）
导出机制 | 引用绑定（Live Bindings）| 对象属性拷贝
代码位置 | 必须在顶层 | 可以在任何位置</p>
<h2 id="代码懒加载" tabindex="-1"><a class="header-anchor" href="#代码懒加载"><span>代码懒加载</span></a></h2>
<p>1.路由懒加载</p>
<p>在 Vue Router 或 React Router 中，利用动态 import() 语法，实现页面级别的按需加载。</p>
<p>底层原理：打包工具（Rollup / Webpack）遇到 import() 语法时，会自动进行代码分割（Code Splitting），把对应的模块单独打包成一个独立的文件。</p>
<p>2.组件懒加载</p>
<p>如果某些重型组件（如图表组件、弹窗、编辑器）不是一进来就展示的，可以把它定义为异步组件。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> defineAsyncComponent <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'vue'</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// 只有渲染这个组件时，才会去下载对应的代码</span></span>
<span class="line"><span class="token keyword">const</span> HeavyChart <span class="token operator">=</span> <span class="token function">defineAsyncComponent</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'@/components/HeavyChart.vue'</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3.第三方库懒加载（如按需引入）</p>
<p>像 echarts、xlsx 这种体积巨大的库，如果不是每个页面都用，可以在用到它的函数内部调用。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code><span class="line"><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">exportExcel</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">// 只有点击导出按钮时，才去下载 xlsx 库</span></span>
<span class="line">  <span class="token keyword">const</span> <span class="token constant">XLSX</span> <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'xlsx'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token constant">XLSX</span><span class="token punctuation">.</span><span class="token function">writeFile</span><span class="token punctuation">(</span><span class="token operator">...</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="资源懒加载-图片、视频" tabindex="-1"><a class="header-anchor" href="#资源懒加载-图片、视频"><span>资源懒加载（图片、视频）</span></a></h2>
<p>图片懒加载</p>
<p>滚动到图片可视区域才加载图片，避免浪费带宽</p>
<p><code v-pre>&lt;img src=&quot;huge-image.jpg&quot; loading=&quot;lazy&quot; alt=&quot;...&quot; /&gt;</code></p>
<p>骨架屏</p>
</div></template>


