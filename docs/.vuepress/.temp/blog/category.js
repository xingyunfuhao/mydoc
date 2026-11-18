export const categoriesMap = JSON.parse("{\"category\":{\"/\":{\"path\":\"/category/\",\"map\":{\"History\":{\"path\":\"/category/history/\",\"indexes\":[0,1]},\"Category A\":{\"path\":\"/category/category-a/\",\"indexes\":[2,3,4,5,6,7,8,9,10,11,12,13]},\"Category B\":{\"path\":\"/category/category-b/\",\"indexes\":[2,3,4,5,6,7,8,10,11,12]},\"Category C\":{\"path\":\"/category/category-c/\",\"indexes\":[14,15]}}}}}");

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
  if (__VUE_HMR_RUNTIME__.updateBlogCategory)
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoriesMap);
}

if (import.meta.hot)
  import.meta.hot.accept(({ categoriesMap }) => {
    __VUE_HMR_RUNTIME__.updateBlogCategory(categoriesMap);
  });

