---
{
  "title": "vue v-cloak指定防止页面内容显示抖动的问题",
  "staticFileName": "vue_v_clock.html",
  "author": "guoqzuo",
  "createDate": "2019/10/11",
  "description": "v-clock主要用于防止由于网络原因vue.js未渲染时，页面显示类似 {{username}} 的问题，下面来看看实现",
  "keywords": "v-clock,vue v-clock,页面显示前vue未渲染内容一闪而过的问题,vue页面显示抖动",
  "category": "Vue"
}
---

# vue v-cloak指定防止页面内容显示抖动的问题

v-clock主要用于防止由于网络原因vue.js未渲染时，页面显示类似 {{username}} 的问题，下面来看看实现

```html
<!-- 加上 v-clock 指令-->
<div v-cloak>
  {{message/}}
</div>
```
**记住，需要配合css来使用**

> 这个指令保持在元素上直到关联实例结束编译。和 CSS 规则如 [v-cloak] { display: none } 一起用时，这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕。

```css
/* 当编译完成后，v-clock属性会被自动移除。*/ 
[v-cloak] {
  display: none;
}
```

参考：

- [v-cloak | vue.js](https://cn.vuejs.org/v2/api/#v-cloak)