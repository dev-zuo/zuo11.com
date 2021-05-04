# Vue 组件中 css 路径简写 @ 不可用，需要使用 ~@
> Vue css src 路径，css @ 不生效，css src 简写@, webpack 解析 css 路径

在 vue-cli 创建的 vue 项目中，可以使用 @ 来表示 src 路径。但在 css 中，图片路径使用 @ 就会出错。那 css 中要怎么使用 src 相对路径呢？

需要在前面加 ~，也就是 ~@，这样就不必使用相对路径了。

```css
#img {
  height: 100px;
  width: 100px;
  background: url("~@/assets/logo.png");
  background-size: contain;
}
```
为什么呢？可能的原因是 @ 是 css 的保留关键字，在 @import 的时候会用到，为了避免冲突，才使用 ~@ 以示区分。

webpack 中使用 css-loader 来处理 css，具体逻辑可以看 [css-loader 源码](https://github.com/webpack-contrib/css-loader)


参考: 
- [webpack对CSS使用alias相对路径 | CSDN](https://blog.csdn.net/qq_39148344/article/details/100771356)
- [vue项目，webpack中配置src路径别名及使用](https://blog.csdn.net/yusirxiaer/article/details/105661313)
