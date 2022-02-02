---
{
  "title": "vue中v-model与.sync的区别",
  "staticFileName": "v-model_vs_sync.html",
  "author": "guoqzuo",
  "createDate": "2020/08/15",
  "description": "v-model与.sync的区别,v-model vs .sync, vue v-model与 .sync的区别,一般父组件给子组件传值是单向的，对于非引用类型，子组件怎么修改父组件传给子组件prop对应的值呢？除了通过 $parent、$root、Bus(发布，订阅)、状态管理(vuex)、额外定义一个方法外，还有两种方法：使用 v-model，或者为加.sync，来看下对比",
  "keywords": "v-model与.sync的区别,v-model vs .sync, vue v-model与 .sync的区别",
  "category": "Vue"
}
---

# vue中v-model与.sync的区别

一般父组件给子组件传值是单向的，对于非引用类型，子组件怎么修改父组件传给子组件prop对应的值呢？除了通过 \$parent、\$root、Bus(发布，订阅)、状态管理(vuex)、额外定义一个方法外，还有两种方法：使用 v-model，或者为加.sync，来看下对比

先来看v-model

```html
<my-div v-model="someValue" />
<!-- 等价于 -->
<my-div :value="someValue" @input="someValue = $event">

<script>
  // this.$emit('input', '修改somevalue的值为这里的值')
</script>
```

再来看.sync
```html
<my-div :someValue.sync="doc.title" />
<!-- 等价于 -->
<my-div :someValue="doc.title" @update:someValue="doc.title = $event" />


<script>
  // this.$emit('update:someValue', '修改somevalue的值为这里的值')
</script>
```

两者的区别: 
- v-model主要用于表单输入的双向绑定，注重值的改变，.sync主要用于状态的切换
- v-model事件及prop的名称，子组件接收时是可以通过model自定义的，.sync子组件接收到的值是固定的

参考：
- [.sync修饰符 | Vue.js](https://cn.vuejs.org/v2/guide/components-custom-events.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6)
- [vue中v-model和.sync修饰符区别](https://www.jianshu.com/p/f0673a9eba3f)
