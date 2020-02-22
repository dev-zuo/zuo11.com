# Element使用JS全局触发消息

在Vue中，单文件组件xx.vue里如果想触发ElementUI的提示消息（如错误信息、警告信息），怎么通过一行js就能触发呢？下面来看看调用方法

## 1.在main.js里引入Element
```js
// main.js
import Vue from 'vue'
import ElementUI from 'element-ui' // 这里
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
```

## 2.将Element的相关函数绑定到Vue实例属性
将Element的相关函数绑定到Vue实例属性，绑定到实例属性后，就可以全局调用了，在单文件组件里 this.$xxx 就可以调用了。
```js
// main.js
// 在 Vue.use(ElementUI) 后
Vue.prototype.$message = ElementUI.Message
Vue.prototype.$alert = ElementUI.MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$notify = ElementUI.Notification
```

## 3.在单文件组件xx.vue中调用
以消息提示为例子，介绍怎么在单文件组件中触发Element全局的消息提示
```js
// 触发消息提示
this.$message({
  type: 'error', // warning、success
  message: '这是一条消息' 
})

// 错误信息
this.$message.error('错误提示信息')

// 示例
try {

} catch(e) {
  // 当捕捉到错误时提示错误信息
  this.$message.error(e.message)
}
```

## 参考
- [Vue 实例属性](https://cn.vuejs.org/v2/api/#%E5%AE%9E%E4%BE%8B%E5%B1%9E%E6%80%A7)
- [组件 | Element - 快速上手](https://element.eleme.cn/#/zh-CN/component/quickstart)
- [Element Message 消息提示](https://element.eleme.cn/#/zh-CN/component/message)