---
{
  "title": "vue路由懒加载时import里面不能是变量的问题",
  "staticFileName": "vue_import_var.html",
  "author": "guoqzuo",
  "createDate": "2019/12/11",
  "description": "路由懒加载地址不能有变量，当在vue里面需要将路由组件按需加载时，import里面开头不能是变量，webpack编译会无法加载对应的组件，解决方法是前面加一部分写死的字符串路径，后面的使用变量即可",
  "keywords": "路由懒加载地址不能有变量，路由懒加载import变量无效,路由懒加载import里面使用变量不生效",
  "category": "Vue"
}
---
# vue路由懒加载时import里面不能是变量的问题

路由懒加载地址不能有变量，当在vue里面需要将路由组件按需加载时，import里面开头不能是变量，webpack编译会无法加载对应的组件，解决方法是前面加一部分写死的字符串路径，后面的使用变量即可

```js
// `前面加写死的字符串+${变量字符串}` 是可行的，会加载path目录下的所有
{ 
  path: '/path',
  // components: () => import(`${myFile}`)  // 找不到组件路径
  components: () => import(`./path/${myFile}`)  // ok

}
```

