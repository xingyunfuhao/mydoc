import comp from "D:/code/my-docs/docs/.vuepress/.temp/pages/webpack.html.vue"
const data = JSON.parse("{\"path\":\"/webpack.html\",\"title\":\"ES6\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"构建流程\",\"slug\":\"构建流程\",\"link\":\"#构建流程\",\"children\":[]},{\"level\":2,\"title\":\"打包细节\",\"slug\":\"打包细节\",\"link\":\"#打包细节\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"webpack.md\",\"excerpt\":\"\\n<p>langchain vibecoding\\n浏览器渲染流程\\nes6相关新特性</p>\\n<p>http1.0 http2.0 http3.0有哪些变化\\nwebpack和vite有哪些区别\\ncicd集成\\nperformance工具\\n白屏问题</p>\\n<h2>构建流程</h2>\\n<h2>打包细节</h2>\\n\"}")
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
