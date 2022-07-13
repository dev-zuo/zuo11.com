# Vue2全家桶实现: (1)手写实现vue-router

## 准备工作

首先我们使用 `@vue/cli` 生成一个基本的脚手架

```bash
# 这里假设你已经安装了 @vue/cli，如果没安装请先安装
vue create vue2-implement
```

选择 vue2 + vue-router/hash模式 + js + vuex + eslint/prettier + sass + pnpm

在 github/github/... 上创建一个同名仓库，将该项目同步到远程仓库，防止电脑更换，代码丢失

![code_router_1_prepare.png](../../../../src/images/blog/vue-source/code_router_1_prepare.png)

## 实现思路

vue-router 引入逻辑在 src/router/index.js 中，通过 "vue-router" npm 包引入 VueRouter。如果要手写 vue-router，可以从这里入手。

```js
import VueRouter from "vue-router";
```

![code_router_2_silu.png](../../../../src/images/blog/vue-source/code_router_2_silu.png)

实现第一步：从我们自己写的 MyVueRouter.js 中引入 VueRouter

```js
import VueRouter form './MyVueRouter.js'
```

MyVueRouter.js

```js
class MyVueRouter {
  constructor() {}
}

export default MyVueRouter;
```

第二步：实现基础方法、组件

- Vue.use(VueRouter) 需要实现 Vue 插件方法 VueRouter.install
- const router = new VueRouter({ routes })；export default router; 需要实现 constructor 构造方法 ，处理传参，返回实例

```bash
# 页面 URL(hash模式)
http://localhost:8080/#/  # 首页
http://localhost:8080/#/about # 关于
```

![code_router_3_router_replace.png](../../../../src/images/blog/vue-source/code_router_3_router_replace.png)

- 全局组件
  - router-view 路由组件占位。url 改变，根据 routes 配置，将 router-view 替换为具体的组件
  - router-link  a 标签封装
- 路由切换替换 router-view 逻辑
  - hash 模式，监听 hashchange 事件，window.addEventListener('hashchange', cb)
  - history 模式，监听 history.back()、history.forward()、history.go() 等，参考：[url 变化监听 - 语雀](https://www.yuque.com/guoqzuo/csm14e/xwagc7#orG4y)
- 查看以下代码，为什么在 router.js 中导出 router 后，在 new Vue 时作为参数传入，主要作用是什么？  注入 `$router` 到所有组件

```js
// main.ts
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

```

- 程序化跳转、路由钩子
