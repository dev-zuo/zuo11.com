---
{
  "title": "vue为什么建议永远不要把 v-if 和 v-for 同时用在同一个元素上",
  "staticFileName": "v-if_v-for.html",
  "author": "guoqzuo",
  "createDate": "2020/08/15",
  "description": "vue v-if为什么不能和v-for一起用,vue v-if v-for一起用,vue v-if和v-for一起时优先级,在vue风格指南中，将'避免 v-if 和 v-for 用在一起'列为必要优先级，建议永远不要把 v-if 和 v-for 同时用在同一个元素上。官网文档如下: 一般我们在两种常见的情况下会倾向于这样做： 1. 为了过滤一个列表中的项目 (比如 v-for='user in users' v-if='user.isActive')。在这种情形下，请将 users 替换为一个计算属性 (比如 activeUsers)，让其返回过滤后的列表。2. 为了避免渲染本应该被隐藏的列表 (比如 v-for='user in users' v-if='shouldShowUsers')。这种情形下，请将 v-if 移动至容器元素上 (比如 ul、ol)。",
  "keywords": "vue v-if为什么不能和v-for一起用,vue v-if v-for一起用,vue v-if和v-for一起时优先级",
  "category": "Vue"
}
---

# vue为什么建议永远不要把 v-if 和 v-for 同时用在同一个元素上

在vue风格指南中，将"避免 v-if 和 v-for 用在一起"列为必要优先级，建议永远不要把 v-if 和 v-for 同时用在同一个元素上。官网文档如下: 

> 一般我们在两种常见的情况下会倾向于这样做：
> 1. 为了过滤一个列表中的项目 (比如 v-for="user in users" v-if="user.isActive")。在这种情形下，请将 users 替换为一个计算属性 (比如 activeUsers)，让其返回过滤后的列表。
> 2. 为了避免渲染本应该被隐藏的列表 (比如 v-for="user in users" v-if="shouldShowUsers")。这种情形下，请将 v-if 移动至容器元素上 (比如 ul、ol)。

实际运行时v-for 比 v-if 优先级高，来看个例子
```html
<ul>
  <li
    v-for="user in users"
    v-if="user.isActive"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```
将进行如下计算，**其实显示是正常的，但v-for会遍历所有的元素，哪怕我们只想通过v-if渲染出少部分元素**，渲染逻辑里，每次重新渲染的时候都会遍历整个列表，并判断是否需要显示
```js
this.users.map(function (user) {
  if (user.isActive) {
    return user.name
  }
})
```
这种情况，建议使用 computed属性过滤需要显示的数组，这样渲染逻辑理就不用再加v-if判断了
```js
computed: {
  activeUsers: function () {
    return this.users.filter(function (user) {
      return user.isActive
    })
  }
}
```

在实际的使用场景中，如果渲染逻辑需要使用v-if过滤的情况，都可以尝试先考虑是否能使用computed属性代替，让渲染时只用考虑数据，不需要考虑逻辑。即 `渲染 + 判断逻辑 + 数据` => `渲染 + 数据`

参考：[避免-v-if-和-v-for-用在一起必要 | Vue.js](https://cn.vuejs.org/v2/style-guide/#%E9%81%BF%E5%85%8D-v-if-%E5%92%8C-v-for-%E7%94%A8%E5%9C%A8%E4%B8%80%E8%B5%B7%E5%BF%85%E8%A6%81)

