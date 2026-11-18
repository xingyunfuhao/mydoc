# html

## 语义化

让页面结构、内容含义对浏览器、搜索引擎、屏幕阅读器和开发者都更清晰

使用场景

`<header>` 页头、品牌logo、搜索框、顶部导航

`<nav>` 主导航、面包屑、分页、侧边目录

`<main>` 页面唯一的核心内容区，每页只用一个

`<aside>`：侧边栏、广告、相关文章、作者简介等与主内容弱相关的部分。

`<footer>`：版权、备案、联系方式、友情链接

`<article>`：一篇可独立分发的完整内容，如文章、帖子、商品评论。

## 盒模型

标准盒模型:box-sizing：content-box  width = content

IE 盒模型 / 怪异盒模型：box-sizing: border-box  width = content + padding + border

## margin塌陷

两个或多个相邻块级元素的垂直外边距合并成一个外边距，只发生在垂直方向，水平方向的 margin 不会合并。

解决办法

父子塌陷：父元素 display: flow-root、overflow: hidden、display: flex/grid，或加 padding/border；

兄弟合并：只设单向 margin，或用 flex/grid + gap；

空元素：加 padding/border/height，或不用空元素。

## 布局

grid 网格布局

grid-template-columns: 200px 1fr 200px; / 三列：左固定、中自适应、右固定

grid-template-rows: 60px 1fr 60px;      / 三行

gap: 16px;                              / 行列间距

auto-fit：自动填充列，空轨道会折叠，项目会拉伸。

auto-fill：自动填充列，但会保留空轨道。

minmax(220px, 1fr)：每列最小 220px，最大平分剩余空间。

## 居中方案

.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}

.parent {
  display: grid;
  place-items: center;
}

.child {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

## 选择器

!important

内联 style

ID 选择器

class / 属性 / 伪类

元素 / 伪元素

伪类：选中“处于某种状态或位置”的元素，比如鼠标悬停、第一个子元素、被选中。

伪元素：选中“元素的某一部分”，或者凭空造一个虚拟元素，比如首字母、占位符、::before。

伪类  用单冒号：  :hover

伪元素 用双冒号：  ::before

常用伪元素
css
::before { }               / 元素内容前，创建虚拟元素
::after { }                / 元素内容后，创建虚拟元素
::first-line { }           / 第一行文本
::first-letter { }         / 第一个字母/汉字
::placeholder { }          / 输入框占位符
::selection { }            / 用户选中的文本
::marker { }               / 列表项标记  
::backdrop { }             / dialog、全屏背景
::file-selector-button { } / 文件上传按钮

常用伪类

1.交互状态

css
a:hover { }            / 鼠标悬停
a:active { }           / 按下时
a:visited { }          / 已访问链接
a:link { }             / 未访问链接
input:focus { }        / 获得焦点  
input:focus-visible { }/ 键盘焦点  
div:focus-within { }   / 自己或后代获得焦点  

2.表单状态

css
input:checked { }              / 选中
input:disabled { }             / 禁用
input:enabled { }              / 可用 */
input:required { }             /* 必填 */
input:optional { }             /* 非必填 */
input:valid { }                /* 校验通过 */
input:invalid { }              /* 校验失败 */
input:in-range { }             /* 数值在范围内 */
input:out-of-range { }         /* 数值超出范围 */
input:read-only { }            /* 只读 */
input:read-write { }           /* 可读写 */
input:placeholder-shown { }    /* 显示占位符时 */
input:indeterminate { }        /* 半选状态 */
input:default { }              /* 默认选项 */

3.结构位置

css
li:first-child { }             / 第一个子元素 */
li:last-child { }              /* 最后一个子元素 */
li:only-child { }              /* 唯一子元素 */
li:nth-child(2) { }            /* 第 2 个子元素 */
li:nth-child(odd) { }          /* 奇数位 */
li:nth-child(even) { }         /* 偶数位 */
li:nth-child(3n) { }           /* 3、6、9... */
li:nth-last-child(1) { }       /* 倒数第 1 个 */

p:first-of-type { }            / 同类第一个 */
p:last-of-type { }             /* 同类最后一个 */
p:only-of-type { }             /* 同类唯一一个 */
p:nth-of-type(2) { }           /* 同类第 2 个 */
p:nth-last-of-type(1) { }      /* 同类倒数第 1 个 */

div:empty { }                  / 没有子节点和文本 */

4.逻辑与范围

css
:not(.active) { }              / 排除 */
:is(h1, h2, h3) { }            /* 匹配其中任意一个 */
:where(h1, h2, h3) { }         /* 同 is，但权重为 0 */
div:has(img) { }               /* 包含 img 的 div */
:root { }                      /* 根元素 html */
:target { }                    /* URL 锚点目标 */
:lang(zh) { }                  /* 语言

优先级

!important > 行内样式 > ID > 类/属性/伪类 > 元素/伪元素 > 通配符/继承。 通配符 *、组合器 > + ~、:where() 不增加优先级。

## 响应式

先加视口

`<meta name="viewport" content="width=device-width, initial-scale=1">`

移动优先

/ 移动端基础 */
.container {
  padding: 16px;
}

/ 平板 */
@media (min-width: 768px) {
  .container {
    padding: 24px;
  }
}

/ 桌面 */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    margin-inline: auto;
  }
}

相对尺寸

| 单位 | 相对于 | 典型用途
| em | 当前元素字体大小；用在 font-size 上时相对于父元素字体大小 | 组件内边距、图标随文字缩放
| rem | 根元素 html 的字体大小 | 全局字体、间距、尺寸
| % | 包含块，具体属性规则不同 | 宽高、间距、字体
| vw | 视口宽度的 1% | 全屏宽、流体字号
| vh | 视口高度的 1% | 全屏高，但有移动端问题
| vmin | vw 和 vh 中较小值的 1% | 正方形、适配横竖屏
| vmax | vw 和 vh 中较大值的 1% | 适配横竖屏
| dvh | 动态视口高度 1% | 移动端全屏
| svh | 最小视口高度 1% | 避免工具栏遮挡
| lvh | 最大视口高度 1% | 大视口场景
| ch | 字符 0 的宽度 | 输入框、文本最大宽度
| ex | 小写 x 的高度 | 少用，不精确
| lh | 当前元素行高 | 行高相关布局
| rlh | 根元素行高 | 全局行高相关
| cqw / cqh | 容器宽/高的 1% | 容器查询组件
| cqi / cqb | 容器 inline/block 方向 1% | 逻辑方向容器查询
| fr | 网格剩余空间分配比例 | Grid 布局

## 移动端适配

视口设置

<meta
  name="viewport"
  content="width=device-width, initial-scale=1, viewport-fit=cover"
>
width=device-width：布局宽度等于设备宽度

initial-scale=1：初始不缩放

viewport-fit=cover：让页面延伸到刘海屏安全区，配合 env() 使用

布局：移动优先 + Flex/Grid

图片自适应

流体尺寸  clamp(最小值，理想值（结合vw展示），最大值)

img,
    video {
      max-width: 100%;
      height: auto;
      display: block;
    }

## 三栏布局

左右固定宽度，中间自适应

.container {
  display: grid;
  <!-- grid-template-columns: 200px minmax(0, 1fr) 200px; -->
  grid-template-columns: 200px 1fr 200px;
}

.container {
  display: flex;
}
.left,
.right {
  width: 200px;
  flex: 0 0 200px;
}
.center {
  flex: 1;
  min-width: 0; / 防止内容过长撑开 */
}

## BFC

块级格式化上下文，一个独立的渲染区域：内部元素的布局不会影响外部，外部也不会影响内部，

触发方式：

根元素 `<html>`

float 不为 none（如 left、right）

position 为 absolute 或 fixed

display 为 inline-block、table-cell、table-caption、flow-root

overflow 不为 visible（如 hidden、auto、scroll）

display: flex 或 grid 的子项（注意：flex/grid 容器本身创建的是 FFC/GFC，不是严格 BFC）

contain: layout、content、paint

column-span: all

有什么作用

清除浮动、解决高度塌陷

防止margin合并

自适应两栏布局

防止文字环绕浮动元素
