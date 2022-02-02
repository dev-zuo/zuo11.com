---
{
  "title": "安卓input键盘弹起导致底部按钮也被抬起的问题",
  "staticFileName": "android_h5.html",
  "author": "guoqzuo",
  "createDate": "2019/12/18",
  "description": "在写app内嵌H5页面时，之前遇到过这个问题，当输入时，键盘弹起导致底部按钮也被抬起了，这里用监听视窗高度变换的方法来fix这个问题,监听window.onresize，如果与之前的视窗高度不一致：变小了，就隐藏底部button，完成输入后，监听到视窗高度变大再次显示底部按钮",
  "keywords": "安卓input键盘弹起导致底部按钮也被抬起的问题,app内嵌H5安卓键盘抬起相关问题",
  "category": "JavaScript"
}
---

# 安卓input键盘弹起导致底部按钮也被抬起的问题

在写app内嵌H5页面时，之前遇到过这个问题，当输入时，键盘弹起导致底部按钮也被抬起了，这里用监听视窗高度变换的方法来fix这个问题

监听window.onresize，如果与之前的视窗高度不一致：变小了，就隐藏底部button，完成输入后，监听到视窗高度变大再次显示底部按钮

```js
let oriH = document.documentElement.clientHeight;
window.onresize = () => {
  if (document.documentElement.clientHeight < oriH) {
    document.getElementById('bttombtn').style.display = 'none';
  }else{
    document.getElementById('bttombtn').style.display = '原来的显示方式';
  }
})
```