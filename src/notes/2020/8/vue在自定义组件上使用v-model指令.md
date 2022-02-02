---
{
  "title": "vue在自定义组件上使用v-model指令",
  "staticFileName": "custom_comp_v_model.html",
  "author": "guoqzuo",
  "createDate": "2020/08/15",
  "description": "vue自定义组件使用使用v-model,vue v-model,vue v-model原理,vue v-model内部实现,在自定义组件上，使用v-model指令，默认会向子组件传递一个字段名为 value 的 prop 属性，以及绑定一个名为 input 的事件。在子组件里，可以用props来接收value字段，可以用 this.$emit('input') 来对父组件里value的值进行修改。它主要的应用在子组件需要修改父组件属性值的情况，你不需要额外再调用子组件时，传递一个修改值的事件，节省了一个事件监听。来看看示例",
  "keywords": "vue自定义组件使用使用v-model,vue v-model,vue v-model原理,vue v-model内部实现",
  "category": "Vue"
}
---

# vue在自定义组件上使用v-model指令

在自定义组件上，**使用v-model指令，默认会向子组件传递一个字段名为 value 的 prop 属性，以及绑定一个名为 input 的事件。在子组件里，可以用props来接收value字段，可以用 this.$emit('input') 来对父组件里value的值进行修改。**

它主要的应用在子组件需要修改父组件属性值的情况，你不需要额外再调用子组件时，传递一个修改值的事件，节省了一个事件监听。来看看示例

```html
<my-div v-model="someValue"></my-div>
<!-- 等价于 -->
<my-div :value="someValue" @input="someValue = $event">

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {
    modifyParentCompsValue() {
      this.$emit('input', '要设置的值')
    }
  }
}
</script>
```

## 怎么修改v-model的默认行为

> model选项，允许一个自定义组件在使用 v-model 时定制 prop 和 event。默认情况下，一个组件上的 v-model 会把 value 用作 prop 且把 input 用作 event，但是一些输入类型比如单选框和复选框按钮可能想使用 value prop 来达到不同的目的。使用 model 选项可以回避这些情况产生的冲突。

```js
export default {
  model: {
    prop: 'show',
    event: 'close'
  }
  props: {
    show: {
      type: String,
      required: true
    }
  },
  data() {
    return {}
  },
  methods: {
    modifyParentCompsValue() {
      this.$emit('close', '要设置的值')
    }
  }
}
```

## 参考
- [选项 model | Vue.js API](https://cn.vuejs.org/v2/api/#model)
- [自定义组件的 v-model | Vue.js](https://cn.vuejs.org/v2/guide/components-custom-events.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E7%9A%84-v-model)
