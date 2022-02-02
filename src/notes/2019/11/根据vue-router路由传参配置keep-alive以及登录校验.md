---
{
  "title": "根据vue-router路由传参配置keep-alive以及登录校验",
  "staticFileName": "vue_router_params.html",
  "author": "guoqzuo",
  "createDate": "2019/11/04",
  "description": "在vue开发中，路由配置的时候，给每个路由添加一个自定义的meta对象，在meta对象中可以设置一些状态，来进行一些操作。可以用来设置是否使用keep-alive，以及登录校验，先来看看配置",
  "keywords": "vue 中路由meta,根据路由配置做登录验证,根据vue-router路由传参配置keep-alive",
  "category": "Vue"
}
---

# 根据vue-router路由传参配置keep-alive以及登录校验

> 登录校验这块 From [vue 中路由meta](https://www.jianshu.com/p/33c9e7454028)

在vue开发中，路由配置的时候，给每个路由添加一个自定义的meta对象，在meta对象中可以设置一些状态，来进行一些操作。可以用来设置是否使用keep-alive，以及登录校验，先来看看配置

```js
{
  path: '/actile',
  name: 'Actile',
  component: Actile,
  meta: {
    login_require: false,
    iskeepAlive: false
  },
},
{
  path: '/goodslist',
  name: 'goodslist',
  component: Goodslist,
  meta: {
    login_require: true,
    iskeepAlive: true
  },
  children:[
    {
      path: 'online',
      component: GoodslistOnline
    }
  ]
}
```
keep-alive 相关前端设置
```html
<keep-alive>
  <router-view v-if="$route.meta.iskeepAlive" :key="routeKey">
</keep-alive>
<router-view v-if="!$route.meta.iskeepAlive" :key="routeKey">
```
页面登录校验时，路由钩子
```js
router.beforeEach((to, from, next) => {
  if (to.matched.some(function (item) {
    return item.meta.login_require
  })) {
    next('/login')
  } else 
    next()
})
```