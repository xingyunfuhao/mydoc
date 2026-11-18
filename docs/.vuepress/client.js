import { defineClientConfig } from 'vuepress/client'
import Category from './layouts/Category.vue'
import Timeline from './layouts/Timeline.vue'

export default defineClientConfig({
  // we provide some blog layouts
  layouts: {
    Category,
    Timeline,
  },
})
