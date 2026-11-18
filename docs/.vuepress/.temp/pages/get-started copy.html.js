import comp from "D:/code/my-docs/docs/.vuepress/.temp/pages/get-started copy.html.vue"
const data = JSON.parse("{\"path\":\"/get-started%20copy.html\",\"title\":\"list\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"vue响应式原理（对比）\",\"slug\":\"vue响应式原理-对比\",\"link\":\"#vue响应式原理-对比\",\"children\":[]},{\"level\":2,\"title\":\"vue双向绑定（对比）\",\"slug\":\"vue双向绑定-对比\",\"link\":\"#vue双向绑定-对比\",\"children\":[]},{\"level\":2,\"title\":\"Configuration\",\"slug\":\"configuration\",\"link\":\"#configuration\",\"children\":[]},{\"level\":2,\"title\":\"Layouts and customization\",\"slug\":\"layouts-and-customization\",\"link\":\"#layouts-and-customization\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"get-started copy.md\",\"excerpt\":\"\\n<p>This is a normal page, which contains VuePress basics.事件循环 浏览器和node\\nvue双向绑定和响应式原理（对比）\\nwebpack构建流程。打包细节\\nlangchain vibecoding\\n浏览器渲染流程\\nes6相关新特性\\nkeepalive 原理层面\\nhttp1.0 http2.0 http3.0有哪些变化\\nwebpack和vite有哪些区别\\ncicd集成\\nperformance工具\\n白屏问题</p>\\n<h2>vue响应式原理（对比）</h2>\\n<p>You can add markdown files in your vuepress directory, every markdown file will be converted to a page in your site.</p>\"}")
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
