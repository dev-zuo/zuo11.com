---
{
  "title": "vue组件updated钩子使用场景",
  "staticFileName": "vue_updated.html",
  "author": "guoqzuo",
  "createDate": "2019/12/12",
  "description": "updated钩子，在vue中，只要data变更就会触发，子组件的列表数据会根据接口请求的数据来刷新，当列表数据更新后，会调用子组件updated钩子函数，我们可以在这里里处理列表数据刷新后的一些操作。比如清除所有focus状态，滚动页面等",
  "keywords": "updated钩子,vue组件updated钩子使用场景",
  "category": "Vue"
}
---


# vue组件updated钩子使用场景

updated钩子，在vue中，只要data变更就会触发，子组件的列表数据会根据接口请求的数据来刷新，当列表数据更新后，会调用子组件updated钩子函数，我们可以在这里里处理列表数据刷新后的一些操作。比如清除所有focus状态，滚动页面等

一般data每改动一次，就会触发一次updated钩子函数，对于data属性比较多的情况，可能会触发上百次的updated钩子函数，这种情况就不要使用updated了，它适用于data属性比较少的情况。
