
# css background设置图片背景
HTML5权威指南这本书对background的简写貌似有点不正确，使用起来会有问题，这次让图片在某个区域完全显示，是分开写的，如下：
```css
div {
  background: #fff url('/images/xxx.png') no-repeat;
  background-size: cover;
}
```

具体语法，参见 [background - CSS（层叠样式表） | MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background)