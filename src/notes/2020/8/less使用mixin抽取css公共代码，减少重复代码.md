---
{
  "title": "less使用mixin抽取css公共代码，减少重复代码",
  "staticFileName": "less_mixin.html",
  "author": "guoqzuo",
  "createDate": "2020/08/22",
  "description": "less函数,less mixin实例,less mixin,less封装css,less怎么抽取公共样式,less抽取公共样式，由于没有系统的学习less，之前只用到less的嵌套写法，很少用变量，基本没用mixin模块化封装，这次尝试了下，发现还是不错的，下面来用封装一个基础的布局组件，主要涉及三个知识点 1. 把css单独提成文件使用 @import (reference) url('') 引入 2. 封装mixin函数，在需要引入的地方执行函数 3. 使用 @headerHeight: 100px 这种方法定义变量",
  "keywords": "less函数,less mixin实例,less mixin,less封装css,less怎么抽取公共样式,less抽取公共样式",
  "category": "CSS"
}
---

# less使用mixin抽取css公共代码，减少重复代码

由于没有系统的学习less，之前只用到less的嵌套写法，很少用变量，基本没用mixin模块化封装，这次尝试了下，发现还是不错的，下面来用封装一个基础的布局组件，主要涉及三个知识点

1. 把css单独提成文件使用 @import (reference) url('') 引入
2. 封装mixin函数，在需要引入的地方执行函数
3. 使用 @headerHeight: 100px 这种方法定义变量

示例如下，完成代码：[less mixin封装测试 | github](https://github.com/zuoxiaobai/fedemo/tree/master/src/vuecli-demo/src/views/lessMixinTest)
```html
<!-- pageA -->
<template>
  <div class="container">
    <div class="top"></div>
    <div class="main">
      <div class="left"></div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
@import (reference) url('./common/base.less');
.container-mixin(); /* 调用base.less里面定义的mixin方法 */
</style>
```
common/base.less
```less
.container-mixin() {
  .container {
    @headerHeight: 100px; /* 变量，顶部高度 */
    .top {
      height: @headerHeight;
      background: #999;
    }
    .main {
      display: flex;
      height: calc(100vh - @headerHeight);
      background-color: rgba(255, 0, 0, 0.2);
      .left {
        width: 20%;
        background-color: greenyellow;
      }
      .right {
        width: 80%;
        background-color: turquoise;
      }
    }
  }
}
```
公共方法封装的好处在于，下次如果相同的页面，就不需要再写一遍了，虽然用class也可以，但less的mixin会更加强大，灵活，他还可以传参数，我们在页面B引入时，可以对默认样式进行修改
```html
<template>
  <div class="container">
    <div class="top"></div>
    <div class="main">
      <div class="left"></div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
@import (reference) url('./common/base.less');
.container-mixin();
// 引入公共样式后，再修改部分公共的样式
.container {
  .top {
    background: red;
  }
}
</style>
```
上面的例子中使用 (reference) 是为了防止在不同的组件中引入导致公共代码多次打包问题

