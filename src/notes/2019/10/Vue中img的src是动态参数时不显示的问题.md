
# Vue中img的src是动态参数时不显示的问题

在vue 2.x中，img的src如果是变量，会出现无法显示的问题，需要使用require才行

```html
<!-- 使用require来加载图片 -->
<img :src="'url ? url : require(../assets/images/avatar.png)">
```

参考: [Vue中img的src是动态渲染时不显示](https://blog.csdn.net/laishaojiang/article/details/80950995)