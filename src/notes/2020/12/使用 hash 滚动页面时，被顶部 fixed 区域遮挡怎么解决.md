# 使用 hash 滚动页面时，被顶部 fixed 区域遮挡怎么解决
一般页面 URL 的 hash 值变化后，如果当前页面中存在 id 为该 hash 值的元素，页面会滚动到该区域。下面的例子中，点击跳转到h1，页面会滚动到 h1 元素，元素对齐到顶部。**这里有一个问题，如果顶部导航栏是 fixed 固定的，那使用这种方法滚动时，h1 标题会被导航栏遮挡。**
```js
<h1 id="h1">一级标题</h1>
<a href="#h2">跳转到h2</a>
// 假设这里有很长的内容，超过一页
<h2 id="h2">二级标题</h2>
<a href="#h1">跳转到h1</a>
```
之前在写 zuo-blog 时，我的解决方案是：滚动到顶部后，再往下滚动 70 px，这种方法有一个缺点，就是只能是 JS 跳转，如果直接通过 a 标签访问，还是会被遮挡
```js
document.getElementById(id).scrollIntoView(true)
document.documentElement.scrollBy(0, -70)
```
后来使用 VuePress 时，发现跳转的时候没有遮挡，于是审查元素，看了下样式。发现使用一个 css 就可以解决这个问题。 **给需要定位到该 id 的元素加一个超过导航栏高度的 padding-top，再加一个保持元素位置的 margin-top，这样使用 hash 滚动到该 id 元素时，就不会有遮挡，会与顶部保持 padding 的距离**
```css
h1,h2,h3,h4,h5,h6 {
  margin-top: -3.1rem;
  padding-top: 4.6rem;
  margin-bottom: 0;
}
```
我写了一个测试 demo，可以看对应的效果，完整 demo 参见 [顶部 fix 遮挡 hash demo | Github](https://github.com/zuoxiaobai/fedemo/tree/master/src/DebugDemo/顶部fix遮挡hash/index.html)
```html
<style>
  body {
    margin: 0;
  }
  .top {
    position: fixed;
    height: 60px;
    width: 100%;;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
  }
  .main {
    padding-top: 80px;
  }
  /* fix 顶部遮挡的问题 */
  /* h1,h2 {
    padding-top: 100px;
    margin-top: -90px;
  } */
</style>
<body>
  <div class="top">顶部区域</div>
  <div class="main">
    我是主内容区域
   <h1 id="h1">一级标题</h1>
   <a href="#h2">跳转到h2</a>
    <div>
      <ul>
        <li>列表a</li>
        <!-- 省略多行... -->
        <li>列表a</li>
      </ul>
      <h2 id="h2">二级标题</h2>
      <a href="#h1">跳转到h1</a>
      <ul>
        <li>列表a</li>
        <!-- 省略多行... -->
        <li>列表a</li>
      </ul>
    </div>
  </div>
</body>
```
