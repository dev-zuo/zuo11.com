---
{
  "title": "vue封装组件时预留install函数便于Vue.use全局引入",
  "staticFileName": "vue_use_install.html",
  "author": "guoqzuo",
  "createDate": "2020/06/29",
  "description": "在element组件中，我们使用el-input等element元素时，不需要在components里引入。为什么呢？在引入element时，我们有在mian.js里我们使用了Vue.use(elemnt组件)，这样进行了全局注入组件，相当于组件做成了一个vue插件，如果我们自己封装组件如何能够在Vue.use后直接可以全局调用呢？",
  "keywords": "vue封装组件时预留install函数,element组件为什么use后可以直接使用",
  "category": "Vue"
}
---

# vue封装组件时预留install函数便于Vue.use全局引入

在element组件中，我们使用el-input等element元素时，不需要在components里引入。为什么呢？在引入element时，我们有在mian.js里我们使用了Vue.use(elemnt组件)，这样进行了全局注入组件，相当于组件做成了一个vue插件，如果我们自己封装组件如何能够在Vue.use后直接可以全局调用呢？

于是我特意去看了下element组件源码，这里我们暂时不要求封装为npm包，只需要在平常自定义组件的基础上做一个增强，可以使用Vue.use全局引入。
element-ui源码中，以alert组件为例，来看目录结构
```bash
alert
├── src
│   └── main.vue  # 组件实现
└── index.js # install方法，供全局引入
```

```js
import Alert from './src/main';

/* istanbul ignore next */
Alert.install = function(Vue) {
  Vue.component(Alert.name, Alert);
};

export default Alert;
```

综上：我们在开发组件时，可以增加全局引入的接口，层级也可以仿照element的来，多研究源码这样代码才会写的更健壮。