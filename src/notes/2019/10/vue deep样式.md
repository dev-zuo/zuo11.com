---
{
  "title": "vue deep样式",
  "staticFileName": "vue_css_deep.html",
  "author": "guoqzuo",
  "createDate": "2019/10/16",
  "description": "vue /deep/什么意思呢？/deep/ 样式为深度选择器，Vue单文件组件中如果style标签有scope属性，当前页面定义的样式对子组件会不生效。如果想让某些样式在子组件里面生效，可以使用/deep/",
  "keywords": "vue /deep/什么意思,/deep/,/deep/深度选择器,vue /deep/",
  "category": "Vue"
}
---

# vue /deep/ 样式

vue /deep/什么意思呢？/deep/ 样式为深度选择器，Vue单文件组件中如果style标签有scope属性，当前页面定义的样式对子组件会不生效。如果想让某些样式在子组件里面生效，可以使用/deep/

一般对于 layout.vue 这样的父组件，如果多个子组件有通用的样式可以抽取出来到当前页面，然后使用 /deep/ 使子组件也继承对应的样式

```html
<style lang="less" scoped>
/deep/ .el-checkbox {
  min-width: 180px;
  margin-bottom: 4px;
}  
</style>
```

