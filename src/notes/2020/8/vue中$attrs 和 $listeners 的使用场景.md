---
{
  "title": "vue中$attrs 和 $listeners 的使用场景",
  "staticFileName": "vue_attrs_listeners.html",
  "author": "guoqzuo",
  "createDate": "2020/08/15",
  "description": "$attrs与$listeners,vue $attrs,vue $listeners,vue $attrs使用场景,vue $listeners使用场景,在vue中，$attrs，$listeners 分别记录了当前组件上绑定的属性以及事件，一般可能用的比较少，下面来看看。`v-bind=$attrs` 他类似属性展开运算符，将父组件调用子组件时传入的属性展开(不包含props已接收的)、v-bind到当前的元素上。listeners除了跨层级向下传递事件外，还可以用于将原生事件绑定到组件",
  "keywords": "$attrs与$listeners,vue $attrs,vue $listeners,vue $attrs使用场景,vue $listeners使用场景",
  "category": "Vue"
}
---
# vue中`$attrs` 和 `$listeners` 的使用场景

在vue中，$attrs，$listeners 分别记录了当前组件上绑定的属性以及事件，一般可能用的比较少，下面来看看

## this.$attrs

> `$attrs `包含了父作用域中不作为 prop 被识别 (且获取) 的 attribute 绑定 (class 和 style 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (class 和 style 除外)，并且可以通过 v-bind="$attrs" 传入内部组件——在创建高级别的组件时非常有用。

`v-bind="$attrs"` 他类似属性展开运算符，将父组件调用子组件时传入的属性展开(不包含props已接收的)、v-bind到当前的元素上。这里以封装input表单组件为例，来看看效果

```html
<!-- 调用 zuo-input组件时传参 -->
<zuo-input v-model="value" placeholder="请输入" maxlength="50"/>

<!-- zuo-input 组件内部实现 -->
<input :value="value" @input="oninput" v-bind="$attrs"> 
<!-- 上面的代码渲染出来效果如下 -->
<input :value="value" @input="oninput" placeholder="请输入" maxlength="50"/>
```

## this.$listeners

> 包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on="$listeners" 传入内部组件——在创建更高层次的组件时非常有用。

之前的笔记有提过，如果A组件包含B组件，B组件包含C组件。C组件想要触发A组件的方法，可以在B组件上加 `v-on="$listeners"` , 这样 C组件可以直接通过emit触发A组件的事件

```js
// this.$listeners
{
  focus: function (event) { /* ... */ }
  input: function (value) { /* ... */ },
}
```

除了跨层级向下传递事件外，还可以用于将原生事件绑定到组件

```html
<zuo-input @focus="focus" @input="xxx" @change="xx"/>
<!-- zuo-input 组件内部实现 -->
<input v-on="$listeners"> 
<!-- 上面的代码渲染出来效果如下 -->
<input onfocus="focus" oninput="xxx" onchange="xx"> 
```

## 实战应用
为了实践上面的`$attrs`和`$listeners`我们可以自己尝试封装一个element form表单组件，参考示例 [elementForm表单组件模仿实现 | github](https://github.com/dev-zuo/fedemo/tree/master/src/vuecli-demo/src/views/elementForm)

## 参考
- [深入了解组件 - 自定义事件 - 将原生事件绑定到组件 | Vue.js](https://cn.vuejs.org/v2/guide/components-custom-events.html#%E5%B0%86%E5%8E%9F%E7%94%9F%E4%BA%8B%E4%BB%B6%E7%BB%91%E5%AE%9A%E5%88%B0%E7%BB%84%E4%BB%B6)
- [`$attrs`和`$listeners` | Vue.js](https://cn.vuejs.org/v2/api/#vm-attrs)
