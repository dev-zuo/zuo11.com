
# 全局修改element组件样式而不影响其他页面

vue项目中，虽然UI基于element设计，但有些情况还是需要修改element组件的默认样式，怎么修改element的默认样式呢


.vue单文件组件style元素加上scope后，当前页面修改el-tree的默认样式无效需要去掉scope，将样式暴露到全局，

```html
<template>
</template>
<script>
</script>
<style lang='less' scoped>
  /* 这里面如果修改element样式可能会不生效，需要去掉  scoped ,将样式暴露到全局 */
</style>
```

当样式暴露到全局后，怎么避免影响其他样式呢，需要使用一个class来包裹，防止造成全局污染

```html
<style lang="less">
  .root-menu-left {
    /* el样式修改 */  
  }
</style>
```