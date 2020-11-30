# vue.config.js: "plugins" is not allowed
在 vue.config.js 中，webpack 相关的配置需要写到 configureWebpack 里，不能直接写到外面，否则会报错：vue.config.js: 'plugins' is not allowed。

![vue_config_js_plugins.png](../../../images/blog/vue/vue_config_js_plugins.png)

```js
// vue.config.js
module.exports = {
  plugins: [], // error，"plugins" is not allowed
  configureWebpack: {
    plugins: [], // 正确写法
    externals: {}
  }
};
```