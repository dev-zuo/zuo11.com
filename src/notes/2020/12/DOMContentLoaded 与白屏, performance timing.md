---
{
  "title": "DOMContentLoaded 与白屏, performance timing",
  "staticFileName": "white-screen.html",
  "author": "guoqzuo",
  "createDate": "2020/12/30",
  "description": "白屏时间 = 地址栏输入网址后回车 - 浏览器出现第一个元素，首屏时间 = 地址栏输入网址后回车 - 浏览器第一屏渲染完成。一般页面白屏结束的时间节点在 head 结束，body 开始执行时。可以通过 `window.performance.timing` 这个对象来看具体时间。",
  "keywords": "白屏时间计算,DOMContentLoaded与白屏",
  "category": "JavaScript"
}
---
# DOMContentLoaded 与白屏, performance timing
白屏时间 = 地址栏输入网址后回车 - 浏览器出现第一个元素

首屏时间 = 地址栏输入网址后回车 - 浏览器第一屏渲染完成

一般页面 **白屏结束** 的时间节点在 head 结束，body 开始执行时。可以通过 `window.performance.timing` 这个对象来看具体时间。

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>白屏</title>
  <script>
    // 不兼容 performance.timing 的浏览器
    window.pageStartTime = Date.now()
  </script>
  <!-- 页面 CSS 资源 -->
  <link rel="stylesheet" href="xx.css">
  <link rel="stylesheet" href="zz.css">
  <script>
    // 白屏结束时间
    window.firstPaint = Date.now()
    // 白屏时间
    console.log(firstPaint - performance.timing.navigationStart)
  </script>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>
```

白屏时间 = firstPaint - performance.timing.navigationStart || pageStartTime


因此：**在 head 元素里面如果放了非 async 或 defer 的 JS，会增加白屏时间。**

DOMContentLoaded 是页面元素(dom)完成加载并解析，而不用等 css样式、图片和子 frame 完全加载完成时触发。对应 jQuery 的 ` $(document).ready()`

Load 事件是当整个页面加载完成时（包括所有相关资源，例如css样式表和图片）触发，对应 jQuery 里面的 `$(document).load()`

参考：
- [Web 性能优化-首屏和白屏时间](https://blog.csdn.net/z9061/article/details/101454438)
- [DOMContentLoaded与Load时间具体指的是什么时间？](http://fe.zuo11.com/daily/2020-10.html#domcontentloaded%E4%B8%8Eload%E6%97%B6%E9%97%B4%E5%85%B7%E4%BD%93%E6%8C%87%E7%9A%84%E6%98%AF%E4%BB%80%E4%B9%88%E6%97%B6%E9%97%B4)