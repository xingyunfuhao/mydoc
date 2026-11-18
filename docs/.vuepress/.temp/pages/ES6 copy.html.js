import comp from "D:/code/my-docs/docs/.vuepress/.temp/pages/ES6 copy.html.vue"
const data = JSON.parse("{\"path\":\"/ES6%20copy.html\",\"title\":\"ES6\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"let const\",\"slug\":\"let-const\",\"link\":\"#let-const\",\"children\":[]},{\"level\":2,\"title\":\"箭头函数\",\"slug\":\"箭头函数\",\"link\":\"#箭头函数\",\"children\":[]},{\"level\":2,\"title\":\"解构赋值与展开运算符\",\"slug\":\"解构赋值与展开运算符\",\"link\":\"#解构赋值与展开运算符\",\"children\":[]},{\"level\":2,\"title\":\"模板字符串\",\"slug\":\"模板字符串\",\"link\":\"#模板字符串\",\"children\":[]},{\"level\":2,\"title\":\"Promise\",\"slug\":\"promise\",\"link\":\"#promise\",\"children\":[]},{\"level\":2,\"title\":\"Module模块化\",\"slug\":\"module模块化\",\"link\":\"#module模块化\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"ES6 copy.md\",\"excerpt\":\"\\n<p>事件循环 浏览器和node\\nvue双向绑定和响应式原理（对比）\\nwebpack构建流程。打包细节\\nlangchain vibecoding\\n浏览器渲染流程\\nes6相关新特性\\nkeepalive 原理层面\\nhttp1.0 http2.0 http3.0有哪些变化\\nwebpack和vite有哪些区别\\ncicd集成\\nperformance工具\\n白屏问题</p>\\n<h2>let const</h2>\\n<p>块级作用域：只在{}块内生效，不再像var全局污染</p>\\n<p>暂时性死区：在块内变量声明之前不可用，而var会将变量提升为undefined</p>\\n<p>默认一般使用const定义变量，如果后面要改变值用let,const定义的对象可以改变属性值，不能重新指向新对象</p>\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
