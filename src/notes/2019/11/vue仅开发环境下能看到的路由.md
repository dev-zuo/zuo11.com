---
{
  "title": "vue仅开发环境下能看到的路由",
  "staticFileName": "vue_dev_router.html",
  "author": "guoqzuo",
  "createDate": "2019/11/04",
  "description": "通过vue-cli创建的项目，npm run build 的代码是可以根据开发环境的不同而调整的，使用 process.env.NODE_ENV 可以做一些只有开发环境有的逻辑，比如下面的例子中，仅开发环境，才能看到相应的路由",
  "keywords": "vue仅开发环境下能看到的路由",
  "category": "Vue"
}
---

# vue仅开发环境下能看到的路由

通过vue-cli创建的项目，npm run build 的代码是可以根据开发环境的不同而调整的，使用 process.env.NODE_ENV 可以做一些只有开发环境有的逻辑，比如下面的例子中，仅开发环境，才能看到相应的路由

```js
let routes = []

// 路由信息仅开发环境可见
if (process.env.NODE_ENV === 'development') { 
  routes = [
    {
      path: ‘/xxxx’,
      component: () => import(‘xxx’)
    }
  ]
}

export default routes
```
