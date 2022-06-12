---
{
  "title": "vue多层级组件，父组件怎么将事件传递给孙组件?",
  "staticFileName": "vue_listeners.html",
  "author": "guoqzuo",
  "createDate": "2020/08/10",
  "description": "来看一个例子，假设A组件包含组件B，B组件又包含组件C，我们知道，在B组件里 this.$emit('open-tab') 会执行其父组件A里面对应的方法，但如果B的子组件C，也想触发A组件的事件，那要怎么做呢？",
  "keywords": "vue多层级组件，父组件怎么将事件传递给孙组件",
  "category": "Vue"
}
---
# vue多层级组件，父组件怎么将事件传递给孙组件?
来看一个例子，假设A组件包含组件B，B组件又包含组件C，我们知道，在B组件里 this.$emit('open-tab') 会执行其父组件A里面对应的方法，但如果B的子组件C，也想触发A组件的事件，那要怎么做呢？

```html
<comp-a :detail="detail" @open-tab="openTab"></comp-a>
<comp-b></comp-b>
<comp-c></comp-c>
```

这就要用到 v-on="$listeners"，在B组件上加上这个属性，可以将A组件上v-on绑定的事件（不含 .native 修饰器的）传递到其子组件，对创建高层级组件非常有用。

```html
<comp-b v-on="$listeners"></comp-b>
```

同理怎么将A组件的props值传递到C组件？可以通过加 v-bind="$attrs" 来实现

[vm.$listeners API — Vue.js](https://cn.vuejs.org/v2/api/#vm-listeners)
