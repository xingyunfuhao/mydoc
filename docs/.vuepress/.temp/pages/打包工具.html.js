import comp from "D:/code/my-docs/docs/.vuepress/.temp/pages/打包工具.html.vue"
const data = JSON.parse("{\"path\":\"/%E6%89%93%E5%8C%85%E5%B7%A5%E5%85%B7.html\",\"title\":\"ES6\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"构建流程\",\"slug\":\"构建流程\",\"link\":\"#构建流程\",\"children\":[]},{\"level\":2,\"title\":\"打包细节\",\"slug\":\"打包细节\",\"link\":\"#打包细节\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"打包工具.md\",\"excerpt\":\"\\n<p>langchain vibecoding\\n浏览器渲染流程\\nes6相关新特性</p>\\n<p>http1.0 http2.0 http3.0有哪些变化\\nwebpack和vite有哪些区别\\ncicd集成\\nperformance工具\\n白屏问题</p>\\n<h2>构建流程</h2>\\n<h2>打包细节</h2>\\n\"}")
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
