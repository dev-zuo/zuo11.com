---
{
  "title": "使用js调用vue单文件组件",
  "staticFileName": "js_vue_comp.html",
  "author": "guoqzuo",
  "createDate": "2020/02/20",
  "description": "在封装组件时，如果是dialog组件，一般封装好后，通过component引入，然后把标签放到html里，通过true或false来隐藏和显示，每次都要写一些重复代码。怎么能够像ElementUI的message函数一样直接调用呢，首先需要搞懂怎么用js来调用vue单文件组件，下面来看方法",
  "keywords": "使用js调用vue单文件组件",
  "category": "Vue"
}
---

# 使用js调用vue单文件组件

在封装组件时，如果是dialog组件，一般封装好后，通过component引入，然后把标签放到html里，通过true或false来隐藏和显示，每次都要写一些重复代码。

怎么能够像ElementUI的message函数一样直接调用呢，首先需要搞懂怎么用js来调用vue单文件组件，下面来看方法
```js
// 假设写好了 showInfo.vue 组件，执行clickShow函数直接显示dialog
// 组件中 dialog :visible.sync="dialogTableVisible"初始值设置为true

// demo.vue 在需要调用的vue文件中引入该组件
import ShowInfo from 'showInfo.vue'
// ...
clickShow() {
  const Component = Vue.extend(ShowInfo)

  // 挂载后返回对应组件的vm
  let showInfoVue = new Component().$mount() 

  // 将组件vm的dom，append到当前页面
  this.$el.appendChild(showInfoVue.$el) 
}
// ...
```

参考: 

- [vm.$mount()](https://cn.vuejs.org/v2/api/#vm-mount)
- [JS 操作vue单文件组件](https://blog.csdn.net/u014445339/article/details/79596201)