---
{
  "title": "Failed to resolve directive: infinite-scroll",
  "staticFileName": "infinite-scroll.html",
  "author": "guoqzuo",
  "createDate": "2020/07/26",
  "description": "在element InfiniteScroll无限滚动功能里，使用了v-infinite-scroll指令，但直接使用会发现提示 Failed to resolve directive: infinite-scroll，后面查了下，发现要使用该指令需要安装一个vue-infinite-scroll npm包，并且在main.js里引入才行",
  "keywords": "Failed to resolve directive: infinite-scroll,element v-infinite-scroll指令",
  "category": "Vue"
}
---

# Failed to resolve directive: infinite-scroll

在element InfiniteScroll无限滚动功能里，使用了v-infinite-scroll指令，但直接使用会发现提示 Failed to resolve directive: infinite-scroll，后面查了下，发现**要使用该指令需要安装一个vue-infinite-scroll npm包，并且在main.js里引入才行**
```js
// 安装vue-infinite-scroll
// npm install vue-infinite-scroll --save

// 在main.js里引入
import infiniteScroll from "vue-infinite-scroll";
Vue.use(infiniteScroll);
```
这样就能正常使用了，注意加载数据 v-infinite-scroll="load" 指定的load函数里，获取数据后，每次push到列表list即可。首次进入会自动加载一次，无需在created钩子里手动请求一次数据，注意当在load里要加个判断，如果获取数据长度为0，或超出数据页数时，就不再继续load了

需要注意: **v-infinite-scroll 必须放在一个单独的单文件组件里，不要放到某个组件的slot里。且不要用v-if控制，使用v-show，这样可以防止首次不触发loadMore的问题**。详情参见：[v-infinite-scroll放到slot里或者用v-if控制时首次无法触发loadMore的问题](http://www.zuo11.com/blog/2020/7/v-infinite-scroll.html)

参考：
- [[Vue warn]: Failed to resolve directive: infinite-scroll](https://blog.csdn.net/qq_38502227/article/details/103891962)
- [无限滚动指令 v-infinite-scroll - Element](https://element.eleme.cn/#/zh-CN/component/infiniteScroll)
