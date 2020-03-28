# 网页深色模式样式适配(web dark mode support)
目前iOS，macos都有了深色模式，而最近微信最新版也做了深色模式(dark mode)适配，我试了下，手机切换时页面效果样式是实时刷新的。于是就想着web怎么能够监听深色模式，并设置样式。查了资料后，在Stack Overflow上找到了答案，下面来看看

一般通过css里的媒体查询就能适配深色模式: (prefers-color-scheme: dark)，先来看看怎么用js获取当前是否是深色模式

## 怎么用js判断当前是否是深色模式
```js
// 获取当前是否是深色模式
// window.matchMedia('(prefers-color-scheme: dark)').matches
window.matchMedia && console.log('Is dark mode: ', window.matchMedia('(prefers-color-scheme: dark)').matches)
```

## js实时监听深色模式的切换
```js
// 用js监听深色模式的切换事件
window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
  console.log('dark mode change，已' + (event.matches ? '进入': '退出') + 'dark mode')
})
```

window.matchMedia到底是用来做什么的？我查了下mdn，发现了这样一个示例

```js
let mql = window.matchMedia('(max-width: 600px)');

document.querySelector(".mq-value").innerText = mql.matches;
```
## 怎么用css媒体查询处理深色模式样式
从这个例子看，大概就知道怎么用css来支持dark模式了吧，就是加一个类似小屏适配的一个媒体查询样式，来看个例子
```css
/* dark mode support */
@media (prefers-color-scheme: dark) {
  body {
    background-color: black;
    color: #aaa;
  }
  
  body .content article, header, aside > div, footer  {
    border-color: #333;
    color: #aaa;
    background-color: black;
    box-shadow: 0 0 10px #333;
  }
}
```
深色模式下，一般将背景调暗，字体设置为偏白色即可。zuo11.com 已用上面的方法适配了深色模式，可以体验下。网站是开源的，[zuo11.com深色模式支持代码 - github](https://github.com/zuoxiaobai/zuo11.com/blob/master/src/global.css)

## 参考
- [How do I detect dark mode using JavaScript? - Stack Overflow](https://stackoverflow.com/questions/56393880/how-do-i-detect-dark-mode-using-javascript)
- [window.matchMedia | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)
- [Supporting Dark Mode in Your Interface | Apple Developer Documentation](https://developer.apple.com/documentation/xcode/supporting_dark_mode_in_your_interface)