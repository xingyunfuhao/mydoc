<template><div><h1 id="网络" tabindex="-1"><a class="header-anchor" href="#网络"><span>网络</span></a></h1>
<h2 id="http1-0-http2-0-http3-0有哪些变化" tabindex="-1"><a class="header-anchor" href="#http1-0-http2-0-http3-0有哪些变化"><span>http1.0 http2.0 http3.0有哪些变化</span></a></h2>
<h3 id="第一站-http-1-0-1996年-——-原始的-短命连接" tabindex="-1"><a class="header-anchor" href="#第一站-http-1-0-1996年-——-原始的-短命连接"><span>第一站：HTTP/1.0（1996年）—— 原始的“短命连接”</span></a></h3>
<p>核心缺陷：短连接（非持久连接）。每次请求（如一个 CSS、一张图片）都必须重新建立一次 TCP 连接（三次握手），请求结束后立刻断开。</p>
<p>致命伤：一个页面如果有 50 个资源，就要握手 50 次，极其消耗时间和服务器资源。</p>
<p>无 Host 头：一个 IP 只能对应一个域名，无法在一台服务器上虚拟多个主机。</p>
<h3 id="第二站-http-1-1-1999年-——-统治互联网二十年的-老大哥" tabindex="-1"><a class="header-anchor" href="#第二站-http-1-1-1999年-——-统治互联网二十年的-老大哥"><span>第二站：HTTP/1.1（1999年）—— 统治互联网二十年的“老大哥”</span></a></h3>
<p>这是目前最广泛使用的版本（虽然正在被 2.0 取代），它解决了 1.0 最痛的点。</p>
<p>核心改进：持久连接（Keep-Alive）。默认开启 Connection: keep-alive，在一个 TCP 连接上可以发送多个 HTTP 请求，省去了重复握手的开销。</p>
<p>管道化（Pipelining）：允许客户端在同一个连接上并发发送多个请求（不用等上一个响应回来再发）。（但现实很骨感：服务器必须按顺序返回响应，如果第一个请求处理慢了，后面的请求都得排队等着，这就是著名的“队头阻塞”问题，所以浏览器通常默认关闭了这个功能）。</p>
<p>分块传输编码（Chunked）：可以边生成数据边发送，不需要提前计算 Content-Length。</p>
<p>缓存增强：引入了 E-tag（实体标签）、Cache-Control 等精细化缓存头。</p>
<p>1.1 的痛点：虽然能复用连接，但同一域名下浏览器最多只能开 6~8 个并行 TCP 连接，且存在“队头阻塞”，导致加载大量小资源时依然很慢。</p>
<h3 id="第三站-http-2-0-2015年-——-彻底的-二进制革命" tabindex="-1"><a class="header-anchor" href="#第三站-http-2-0-2015年-——-彻底的-二进制革命"><span>第三站：HTTP/2.0（2015年）—— 彻底的“二进制革命”</span></a></h3>
<p>这是目前现代 Web（尤其配合 HTTPS）的主流标准。它不再是文本协议，而是二进制协议。</p>
<p>核心改进 1：二进制分帧：将请求和响应拆分为更小的“帧（Frame）”，并将它们乱序发送。</p>
<p>核心改进 2：多路复用（Multiplexing） —— 最重磅升级。解决了 1.1 的队头阻塞。现在只用一个 TCP 连接，就可以并行发送无数个请求和响应，互不干扰。请求 A 慢，完全不影响请求 B 先到达。极大地利用了带宽。</p>
<p>核心改进 3：头部压缩（HPACK）：1.x 时代，每次请求都会携带巨大的重复 Cookie 和 User-Agent。2.0 使用专门算法压缩头部，并维护一张“静态/动态字典表”，后续请求只发送差异部分，体积减少 80% 以上。</p>
<p>核心改进 4：服务器推送（Server Push）：服务器可以主动把浏览器即将需要的资源（如 CSS、JS）推送给客户端，无需等浏览器解析 HTML 后再发请求。</p>
<p>2.0 的隐藏痛点：虽然解决了“应用层”的队头阻塞，但它依然基于 TCP（传输控制协议）。TCP 有“丢包重传”机制——如果这唯一的连接中丢失了一个数据包，TCP 会等待该包重传完成，导致整个连接上的所有流（所有请求）都被卡住。这依然存在队头阻塞，只不过转移到了“传输层”</p>
<h3 id="第四站-http-3-0-2022年正式定稿-——-换掉底层地基的-颠覆者" tabindex="-1"><a class="header-anchor" href="#第四站-http-3-0-2022年正式定稿-——-换掉底层地基的-颠覆者"><span>第四站：HTTP/3.0（2022年正式定稿）—— 换掉底层地基的“颠覆者”</span></a></h3>
<p>为了彻底干掉 TCP 的顽疾，HTTP/3.0 直接把传输层协议从 TCP 换成了 UDP（用户数据报协议），具体实现叫 QUIC（快速 UDP 网络连接）</p>
<p>核心改进 1：彻底解决队头阻塞。QUIC 实现了流级别的独立控制。如果某个流（请求）丢包了，只重传这个流，其他流完全不受影响，彻底解决了 2.0 基于 TCP 的阻塞痛点。</p>
<p>核心改进 2：0-RTT（零往返时间）快速连接。1.0/2.0 建立连接需要 TCP 三次握手 + TLS 加密握手（共 2-3 个 RTT）。3.0 由于 QUIC 内置了 TLS 1.3 加密，第一次连接只需 1-RTT，如果之前连接过，甚至可以 0-RTT 直接发送数据，极大缩短了首屏延迟。</p>
<p>核心改进 3：连接迁移（Connection Migration）。移动端神器！当你从 Wi-Fi 切换到 5G 时，IP 地址变了。TCP 连接会直接断开重连。但 HTTP/3.0 使用 Connection ID（连接标识符） 来标识连接，只要 ID 不变，即使 IP 变了，连接依然保持，数据无缝继续传输。</p>
<p>| 特性| HTTP/1.0 | HTTP/1.1 | HTTP/2.0 | HTTP/3.0 (QUIC) |
| 传输层协议 | TCP | TCP | TCP | UDP |
| 连接方式 | 短连接（用完即断） | 持久连接（Keep-Alive） | 多路复用（单连接并发） | 多路复用（独立流） |
| 队头阻塞 | 严重（请求排队） | 严重（响应排队）| 解决（应用层）| 彻底解决（传输层+应用层） |
| 头部压缩 | 无 | 无 | HPACK（强） | QPACK（更强，适应乱序） |
| 服务器推送 | 无 | 无 | 有（Server Push） | 有（进阶版） |
| 握手延迟 | 3 次握手 |3 次握手 + TLS | 3 次握手 + TLS | 0-RTT / 1-RTT |
| 连接迁移 | 不支持 | 不支持 | 不支持 | 支持（Wi-Fi/4G 无缝切换）|</p>
<h2 id="状态码" tabindex="-1"><a class="header-anchor" href="#状态码"><span>状态码</span></a></h2>
<p>类别 | 含义 | 常见状态码
1xx | 信息性，请求已收到，继续处理 | 100 Continue、101 Switching Protocols
2xx | 成功 | 200 OK、201 Created、204 No Content
3xx | 重定向/缓存 | 301 永久重定向、302 临时重定向、304 未修改、307/308 保留方法重定向
4xx | 客户端错误 | 400 请求错误、401 未认证、403 禁止访问（无权限）、404 未找到、405 方法不允许、408 超时、409 冲突、413 请求体过大、415 媒体类型不支持、429 请求过多
5xx | 服务端错误 | 500 服务器内部错误、501 未实现、502 网关错误、503 服务不可用、504 网关超时</p>
<h2 id="缓存" tabindex="-1"><a class="header-anchor" href="#缓存"><span>缓存</span></a></h2>
<p>HTTP 缓存主要分 强缓存 和 协商缓存。核心区别：强缓存命中时不发 HTTP 请求；协商缓存需要向服务器发条件请求，由服务器决定是否用本地缓存。</p>
<p>强缓存：浏览器直接使用本地缓存，不请求服务器。命中时开发者工具常显示 200 (from disk cache) / 200 (from memory cache)。</p>
<p>Cache-Control &gt; Expires。</p>
<p>Cache-Control: public, max-age=31536000, immutable</p>
<p>协商缓存：强缓存过期后，浏览器带上“条件请求头”问服务器：资源变了吗？</p>
<p>没变：服务器返回 304 Not Modified，无响应体，浏览器用本地缓存。</p>
<p>变了：服务器返回 200 和新资源。</p>
<p>ETag / If-None-Match &gt; Last-Modified / If-Modified-Since。</p>
<p>完整流程</p>
<p>浏览器请求资源。</p>
<p>检查强缓存：</p>
<p>未过期且可用：直接使用本地缓存，不发请求。</p>
<p>已过期或需验证：进入协商缓存。</p>
<p>发条件请求：</p>
<p>服务器判断未变：304，用本地缓存。</p>
<p>已变化：200，返回新资源并更新缓存。</p>
<p>如果 no-store：完全不缓存</p>
<p>需要注意的点：</p>
<p>no-cache ≠ 不缓存：它允许存缓存，但每次使用前必须向服务器验证，通常走协商缓存。</p>
<p>no-store 才是完全不缓存。</p>
<p>强缓存过期 ≠ 删除缓存：过期后进入协商缓存。</p>
<p>304 不是强缓存：304 是协商缓存命中后的结果。</p>
<p>Ctrl+F5 强制刷新：通常会绕过强缓存和协商缓存，直接请求源站。</p>
<p>地址栏回车：可能使用强缓存；具体行为受浏览器和刷新方式影响。</p>
<p>一句话总结：强缓存看 Cache-Control/Expires，命中不发请求；协商缓存看 ETag/Last-Modified，命中返回 304。</p>
<h2 id="跨域" tabindex="-1"><a class="header-anchor" href="#跨域"><span>跨域</span></a></h2>
<p>同源 = 协议 + 域名 + 端口 三者完全一致。</p>
<p>跨域是浏览器的安全限制，不是服务器限制。很多跨域请求其实已经到达服务器并执行了，只是浏览器拦截了响应，前端拿不到结果。</p>
<p>Access-Control-Allow-Origin</p>
<p>常见解决方式：</p>
<p>CORS 服务端加响应头授权</p>
<p>Nginx反向代理</p>
<p>开发环境 vite/Webpack devServer proxy</p>
<p>jsonp script不受同源限制</p>
<p>postMessage 窗口/iframe之前通信</p>
<p>websokect 握手不受同源策略限制</p>
<p>跨域是浏览器同源策略的限制；标准解法是服务端 CORS 授权，生产常用 Nginx 同源反向代理；带 Cookie 时 credentials、Allow-Credentials、Allow-Origin 具体源、SameSite 四者必须配套。</p>
<h2 id="浏览器存储" tabindex="-1"><a class="header-anchor" href="#浏览器存储"><span>浏览器存储</span></a></h2>
<p>存储          | 容量                   |生命周期                                     |作用域            |同步/异步      |是否随请求发送|数据类型|典型用途
Cookie        |约4KB/条，每域名约几十条|可设 Expires/Max-Age；会话 Cookie 关浏览器失效|同源 + Domain/Path|同步（随请求头）|是，自动携带 |字符串
会话标识、少量状态
localStorage  |约 5–10MB/源            |永久，除非手动/浏览器清理                     |同源              |同步，阻塞主线程 |否          |字符串
少量配置、非敏感偏好
sessionStorage| 约 5–10MB/源           |标签页/窗口会话，关闭即清；刷新保留            |同源 + 标签页     |同步            |否           |字符串
表单草稿、单标签页临时状态
IndexedDB     |大，受配额限制，可达数百 MB 级|持久，除非清理                           |同源             |异步 |否  |结构化对象、Blob、ArrayBuffer大量结构化数据、离线数据
Cache Storage |受同源配额限制           |持久，除非清理                                |同源             |异步             |否 |Request/Response	Service Worker 离线缓存
OPFS          |受配额限制               |持久                                          |同源             |异步；Worker 中可同步 |否  |文件/二进制	大文件、类文件系统
Web SQL       |已废弃
Application Cache|已废弃</p>
<h2 id="安全" tabindex="-1"><a class="header-anchor" href="#安全"><span>安全</span></a></h2>
<p>XSS 跨站脚本攻击</p>
<p>XSS 的本质是恶意脚本在受害者浏览器中、以当前页面的权限执行。它能窃取数据、劫持会话、篡改页面，甚至发起进一步攻击。通过输出编码 + 安全 API + CSP防御</p>
<p>CSRF 跨站请求伪造</p>
<p>CSRF 的本质是浏览器自动携带目标站点的 Cookie，攻击者不需要读取响应，只需要“让浏览器发出一个带凭证的请求”。它利用的是“服务器无法区分请求是否出自用户本意”。
SameSite Cookie（基础且有效） 。将会话 Cookie 设为 SameSite=Lax 或 Strict，跨站请求默认不携带，直接切断大多数 CSRF 场景。</p>
<p>CSP 内容安全策略</p>
<p>CSP 是一个 HTTP 响应头，用来限制浏览器可以加载和执行哪些资源，是对 XSS 的强力纵深防御。 Content-Security-Policy</p>
<p>点击劫持</p>
<p>攻击者把目标页面嵌入透明的 iframe 中，诱导用户在“以为点击的是当前页面”的情况下，实际点击了目标页面上的敏感按钮（转账、授权、发帖等）。</p>
<p>首选 CSP frame-ancestors：frame-ancestors 'none' 禁止任何嵌套，或指定允许的父级源。它是 X-Frame-Options 的现代替代，优先级更高。</p>
<p>X-Frame-Options 作为兼容回退：DENY 或 SAMEORIGIN。</p>
</div></template>


