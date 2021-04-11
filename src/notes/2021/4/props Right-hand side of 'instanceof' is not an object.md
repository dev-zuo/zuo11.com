# props Right-hand side of 'instanceof' is not an object
在 Vue 中写 props 属性时，一般最简单的方式是使用数组的形式： props: ['属性名1', '属性名2']，但这样没有类型校验、默认值。在使用对象的写法时，发现出现 props Right-hand side of 'instanceof' is not an object，错误，写法如下

```js
export default {
  props: {
    tips: {
      type: “Array”,
      default: () => []
    }
  }
}
```

后面发现是 type 属性设置的有问题。限定为数组，Array 类型，直接用 Array 就行，不要加引号，它不是字符串，而是对象 object（类）。
```js
tips: {
  type: Array,
  default: () => []
}
```

参考: [Prop 验证 — Vue.js](https://cn.vuejs.org/v2/guide/components-props.html#Prop-%E9%AA%8C%E8%AF%81)
