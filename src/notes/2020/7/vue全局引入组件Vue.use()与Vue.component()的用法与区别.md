---
{
  "title": "vue全局引入组件Vue.use()与Vue.component()的用法与区别",
  "staticFileName": "vue_global_comps.html",
  "author": "guoqzuo",
  "createDate": "2020/07/26",
  "description": "vue全局组件，Vue.use与Vue.component区别，之前的笔记里有将Vue.use()全局引入组件的方法，其实用 Vue.compoennt()也可以全局引入组件。下面来看具体用法，以及他们的区别",
  "keywords": "vue全局组件,Vue.use()与Vue.component()的区别,Vue.use与Vue.component区别",
  "category": "Vue"
}
---
# vue全局引入组件Vue.use()与Vue.component()的用法与区别
之前的笔记里有将Vue.use()全局引入组件的方法，其实用 Vue.compoennt()也可以全局引入组件。下面来看具体用法，以及他们的区别
```bash
alert
├── src
│   └── main.vue  # 组件实现
└── index.js # install方法，供全局引入
index.js 提供install方法，供Vue.use()使用
```
```js
import Alert from './src/main';

/* istanbul ignore next */
Alert.install = function(Vue) {
  Vue.component(Alert.name, Alert);
};

export default Alert;
```
main.js全局引入组件的两种方式
```js
// 1. Vue.use()
import Alert from '@/components/alert/index.js'
Vue.use(Alert)

// 2. Vue.component()
import Alert from "@/components/alert/src/main.vue"
Vue.component('alert', Alert)
```

Vue.use 和Vue.component 全局引入组件之间的区别：
1. Vue.component 只是单纯的引入组件、不需要额外写支持的js文件
2. Vuew.use 除组件外，需要写额外的js实现install方法，但它不仅可以注入组件，还可以注入很多其他东西，比如全局实例属性等。
