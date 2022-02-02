---
{
  "title": "vue-router编程方式跳转路由以及其传参问题",
  "staticFileName": "vue-router-jump.html",
  "author": "guoqzuo",
  "createDate": "2020/07/26",
  "description": "vue-router有以下几种编程方式跳转路由的方法。一般push和repalce用的比较多，下面来看看",
  "keywords": "vue-router,vue-router编程式跳转方法,vue-router跳转路由方法",
  "category": "Vue"
}
---
# vue-router编程方式跳转路由以及其传参问题

vue-router有以下几种编程方式跳转路由的方法。一般push和repalce用的比较多，下面来看看
```js
router.push(location, onComplete?, onAbort?)
router.push(location).then(onComplete).catch(onAbort)
router.replace(location, onComplete?, onAbort?)
router.replace(location).then(onComplete).catch(onAbort)
router.go(n)
router.back()
router.forward()
```

## push跳转页面
```js
// 知道路由名称，跳转
this.$router.push({
  name: '路由name',
  params: { userId: '123' } // 参数，url上面不可见
  query: { plan: 'private' } // 查询参数 url上可见
})

// 知道路由path，跳转 /register?plan=private
this.$router.push({ path: 'register', query: { plan: 'private' }})
// 注意：如果提供了 path，params 会被忽略，只能使用query参数
```
## replce跳转页面
push会在history添加一条记录，而replce不会，他只会改变当前页面
```js
// router.replace(location, onComplete?, onAbort?)
this.$router.replace({
  name: '路由name',
  params: { userId: '123' } // 参数，url上面不可见
  query: { plan: 'private' } // 查询参数 url上可见
})
```

## this.$router.resolve()
在新的tab页打开，可以用 this.$router.resolve() 来处理路由信息，也可以直接使用相对路径，注意hash、history跳转方式的区别
```js
const resolved: {
  location: Location;
  route: Route;
  href: string;
} = router.resolve(location, current?, append?)
window.open('#/user/info') 
// ‘_blank’为默认，在新的窗口打开，'_self' 为在当前页打开
```