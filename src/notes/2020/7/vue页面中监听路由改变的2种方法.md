---
{
  "title": "vue页面中监听路由改变的2种方法",
  "staticFileName": "vue_watch_router.html",
  "author": "guoqzuo",
  "createDate": "2020/07/26",
  "description": "vue监听路由变化,vue监听路由,在vue中，怎么监听vue-router路由的变更呢？一般有两种方法 1. 单页面组件中，使用 beforeRouteEnter 2. 使用watch监听$route",
  "keywords": "ue监听路由变化,vue监听路由,监听vue-router变化",
  "category": "Vue"
}
---
# vue页面中监听路由改变的2种方法

在vue中，怎么监听vue-router路由的变更呢？一般有两种方法

1. 单页面组件中，使用 beforeRouteEnter
2. 使用watch监听$route

```js
// 1.单页面组件中，使用 beforeRouteEnter
created() {
},
beforeRouteEnter(to, from, next) {
	next(vm => {
		// vm就是this了
	})
},

// 2.使用watch监听$route
watch: {
	$route(to, from) {
		// xxx
	}
}
```