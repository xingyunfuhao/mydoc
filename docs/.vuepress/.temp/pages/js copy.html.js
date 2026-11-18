import comp from "D:/code/my-docs/docs/.vuepress/.temp/pages/js copy.html.vue"
const data = JSON.parse("{\"path\":\"/js%20copy.html\",\"title\":\"ES6\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"事件循环\",\"slug\":\"事件循环\",\"link\":\"#事件循环\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"js copy.md\",\"excerpt\":\"\\n<p>事件循环 浏览器和node\\nvue双向绑定和响应式原理（对比）\\nwebpack构建流程。打包细节\\nlangchain vibecoding\\n浏览器渲染流程\\nes6相关新特性\\nkeepalive 原理层面\\nhttp1.0 http2.0 http3.0有哪些变化\\nwebpack和vite有哪些区别\\ncicd集成\\nperformance工具\\n白屏问题</p>\\n<h2>事件循环</h2>\\n\"}")
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
