
# v-if里使用filters无效的问题

在项目中，想在v-if里使用filters发现不生效，于是查了下vue的文档，发现v-if里是不支持使用filters的。一般filters只能在两种情况下使用

**双花括号插值和 v-bind 表达式 (后者从 2.1.0+ 开始支持)**。过滤器应该被添加在 JavaScript 表达式的尾部，由“管道”符号指示。

```html
<!-- 在双花括号中 -->
{{ message | capitalize }}

<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>
```
对应的js
```js
filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
```

参考 [过滤器 — Vue.js官方文档](https://cn.vuejs.org/v2/guide/filters.html)