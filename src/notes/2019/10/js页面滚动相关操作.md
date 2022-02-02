---
{
  "title": "js页面滚动相关操作",
  "staticFileName": "web_js_scroll.html",
  "author": "guoqzuo",
  "createDate": "2019/10/09",
  "description": "通过一个URL进入一个页面，需要滚动到对应的锚点位置，可以用什么方法呢，下面我们来总结下页面滚动相关的一些方法，例如：Element.scrollIntoView、window.scroll、window.scrollTo、window.scrollBy、Element.scrollTop等",
  "keywords": "js页面滚动,页面滚动,scroll,scrollTo,scrollBy,scrollTop,scrollLeft,scrollIntoView,使用hash滚动,vue中vue-router滚动",
  "category": "JavaScript"
}
---

# js页面滚动相关操作

通过一个URL进入一个页面，需要滚动到对应的锚点位置，可以用什么方法呢，下面我们来总结下页面滚动相关的一些方法，例如：Element.scrollIntoView、window.scroll、window.scrollTo、window.scrollBy、Element.scrollTop等

## window.scrollTo() 
滚动到页面指定位置
```js
// https://developer.mozilla.org/zh-CN/docs/Web/API/Window/scrollTo
window.scrollTo(x-coord,y-coord )
window.scrollTo(options)
// * x-coord 是文档中的横轴坐标。
// * y-coord 是文档中的纵轴坐标。
// * options 是一个包含三个属性的对象:
//  1. top 等同于  y-coord
//  2. left 等同于  x-coord
//  3. behavior  类型String,表示滚动行为,支持参数 smooth(平滑滚动),instant(瞬间滚动),默认值auto,实测效果等同于instant

window.scrollTo( 0, 1000 );

// 设置滚动行为改为平滑的滚动
window.scrollTo({ 
    top: 1000, 
    behavior: "smooth" 
});
```

## window.scroll() 
method scrolls the window to a particular place in the document. 滚动到指定位置，与window.scrollTo功能一样，在MDN有这样一行解释: Window.scrollTo() is effectively the same as this method.
```js
// https://developer.mozilla.org/en-US/docs/Web/API/Window/scroll
// 进入一个有滚动条的页面，打开Chrome的Console来测试
scroll(0, 50) // 页面y轴滚动了50
scroll(0, 10000) // 页面直接滚动到了最底部

// 设置滚动行为改为平滑的滚动
window.scroll({ 
    top: 1000, 
    behavior: "smooth" 
});
```

## window.scrollBy() 
相对于当前位置滚动
```js
window.scrollBy(x-coord, y-coord);
window.scrollBy(options)
// * x是水平滚动的偏移量，单位：像素。
// * Y 是垂直滚动的偏移量，单位：像素。
// 正数坐标会朝页面的右下方滚动，负数坐标会滚向页面的左上方。

window.scrollBy(0, window.innerHeight);  // 向下滚动 一页(浏览器可视高度)
```

## Element.scrollTop与Element.scrollLeft
Element.scrollTop 属性可以获取或设置一个元素的内容垂直滚动的像素数。返回文档在垂直方向已滚动的像素值。
```js
document.documentElement.scrollTop = 100 // 页面滚动
// 获取或设置水平方向的滚动值就可以使用Element.scrollLeft了，如果设置的值 > 滚动距离，会滚动到底
```

## Element.scrollIntoView(alignToTop)
参数是一个布尔值alignToTop，默认为true，滚动到元素顶部，如果设置为false，滚动到元素底部。
```js
document.getElementById('注意').scrollIntoView(true)
// https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView#%E7%A4%BA%E4%BE%8B
document.getElementById(id).scrollIntoView(true)
document.documentElement.scrollBy(0, -70) // 顶部固定有遮挡时，fix方案，70这个值取决于顶部高度

// 下面功能目前还属于实验性功能，兼容性有待提高，暂不考虑
// element.scrollIntoView(scrollIntoViewOptions); // Object型参数
```

## 使用hash
url设置hash，可以滚动到对应的id位置，对于有顶部fix的情况，会有遮挡需要处理下。页面再向下滚动一点距离
```js
document.documentElement.scrollBy(0, -70)
```

## vue中vue-router滚动
创建Router实例时，可以提供scrollBehavior方法，来设置对应的滚动效果。参考: [vue-router滚动行为](https://www.yuque.com/guoqzuo/yyxr05/brzgg7#8bab95a6)


## end
对于非标准的 Window.scrollByLines(), and Window.scrollByPages(). 这里暂不讨论详情参见MDN