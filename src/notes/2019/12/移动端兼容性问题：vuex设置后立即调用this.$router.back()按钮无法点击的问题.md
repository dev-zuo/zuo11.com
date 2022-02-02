---
{
  "title": "移动端兼容性问题：vuex设置后立即调用this.$router.back()按钮无法点击的问题",
  "staticFileName": "vuex_nexttick.html",
  "author": "guoqzuo",
  "createDate": "2019/12/24",
  "description": "今天测试机iPhone 7 plus，系统大概是iOS 11.3，vuex mutation操作后，立即调用 this.$router.back() 会导致页面里的下一步无法点击。而我自己的机型iPhone8是没问题的，解决方法是：在 vue mutaion操作后，不立即调用 back，而是使用 nextTick包裹，在下次 DOM 更新循环结束之后再执行",
  "keywords": "vuex设置后立即调用this.$router.back()按钮无法点击的问题",
  "category": "Vue"
}
---

# 移动端兼容性问题：vuex设置后立即调用this.$router.back()按钮无法点击的问题

今天测试机iPhone 7 plus，系统大概是iOS 11.3，vuex mutation操作后，立即调用 this.$router.back() 会导致页面里的下一步无法点击。

而我自己的机型iPhone8是没问题的，解决方法是：在 vue mutaion操作后，不立即调用 back，而是使用 nextTick包裹，在下次 DOM 更新循环结束之后再执行

```js
// 解决方法
// vuex mutation操作 =>  this.$nextTick(() => { 将 this.$router.back() 放到这里即可 })
```

参考：[Vue-nextTick | Vue.js官方文档](https://cn.vuejs.org/v2/api/#Vue-nextTick)

