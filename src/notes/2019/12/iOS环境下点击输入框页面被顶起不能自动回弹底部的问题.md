---
{
  "title": "iOS环境下点击输入框页面被顶起不能自动回弹底部的问题",
  "staticFileName": "ios_kb_rebound.html",
  "author": "guoqzuo",
  "createDate": "2019/12/19",
  "description": "在开发app内嵌H5时，iOS系统里，输入框输入时，页面会被抬起，但输入完成后，页面不会自动回弹，这里需要特殊处理下，解决方法：在对应的input元素加 @blur 事件，input失去焦点时，手动滚动页面 window.scroll(0,0)",
  "keywords": "iOS环境下点击输入框页面被顶起不能自动回弹底部的问题",
  "category": "JavaScript"
}
---

# iOS环境下点击输入框页面被顶起不能自动回弹底部的问题

在开发app内嵌H5时，iOS系统里，输入框输入时，页面会被抬起，但输入完成后，页面不会自动回弹，这里需要特殊处理下

**解决方法：在对应的input元素加 @blur 事件，input失去焦点时，手动滚动页面 window.scroll(0,0)**

参考：[解决ios环境下点击输入框页面被顶起不能自动回弹到底部问题](https://blog.csdn.net/YY110621/article/details/87919966)