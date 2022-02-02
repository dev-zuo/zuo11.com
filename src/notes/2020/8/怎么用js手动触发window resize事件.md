---
{
  "title": "怎么用js手动触发window resize事件",
  "staticFileName": "manual_dispatch_resize.html",
  "author": "guoqzuo",
  "createDate": "2020/08/30",
  "description": "js手动触发resize事件,手动触发resize事件,自定义resize事件,这里手动触发window.resize事件的目的，主要用于fix改变窗口大小后其他tab页echarts图表显示异常的问题，在echarts图表组件里，有时候需要图表大小自适应浏览器窗口大小。这种情况echart宽高都会设定为100%，依赖父元素的宽高。然后再监听window的resize事件，当窗口大小改变后，重绘图表。那么问题来了",
  "keywords": "js手动触发resize事件,手动触发resize事件,自定义resize事件,改变窗口大小后其他tab页echarts图表显示异常的问题",
  "category": "JavaScript"
}
---

# 怎么用js手动触发window resize事件

这里手动触发window.resize事件的目的，主要用于fix改变窗口大小后其他tab页echarts图表显示异常的问题

在echarts图表组件里，有时候需要图表大小自适应浏览器窗口大小。这种情况echart宽高都会设定为100%，依赖父元素的宽高。然后再监听window的resize事件，当窗口大小改变后，重绘图表。那么问题来了

在单个页面里没有问题，但在tab组件切换时，各个tab页是懒加载(keep-alive)的状态，tab切换时，会有页面组件被隐藏，但由于是keep-alive的，所以不会触发beforeDesotry事件，也就是没有销毁组件只是隐藏了。dom被隐藏后，window的resize事件没有被移除。导致调整窗口大小后，被隐藏的页面也会执行重绘操作，宽高都是百分比的，被隐藏后，宽高会异常，导致图表显示异常

除非每次切tab都重绘图表或者不使用keep-alive每次都刷新页面，才不会有问题。最后想了个方法，每次点击tab手动触发window的resize事件进行重绘，下面是手动触发window resize事件的方法

```js
tabClick(e) {
  console.log('tab click', e)
  // 触发window的resize事件
  this.$nextTick(e => {
    let resizeEvent = document.createEvent('Event')
    resizeEvent.initEvent('resize', true, true)
    window.dispatchEvent(resizeEvent)
  })
}
```

为什么不在tab切换后的activated里重绘图表呢？由于有十几个图表，这就需要写十几个手动重绘的函数，在tabclick的事件里写是改动最小的
