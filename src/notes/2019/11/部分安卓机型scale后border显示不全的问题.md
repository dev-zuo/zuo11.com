---
{
  "title": "部分安卓机型scale后border显示不全的问题",
  "staticFileName": "scale_line.html",
  "author": "guoqzuo",
  "createDate": "2019/11/21",
  "description": "由于border需要画比1px还细的线，也就是0.5px，在移动端你设置px是没用的，一般会使用scale(0.5)缩放来实现,但在某些安卓机型上，发现这样实现的border边框会有显示不全的情况，重点来了，解决方法是将对应scale等样式用style写在内联样式里，刚开始不相信写成内联样式就可以解决这个问题，但实践后发现确实可以解决这个问题。",
  "keywords": "scale border消失,部分安卓机型scale后border显示不全的问题,border在手机上显示不全的问题s",
  "category": "CSS"
}
---

# 部分安卓机型scale后border显示不全的问题

由于border需要画比1px还细的线，也就是0.5px，在移动端你设置px是没用的，一般会使用scale(0.5)缩放来实现

但在某些安卓机型上，发现这样实现的border边框会有显示不全的情况。

重点来了

**解决方法是将对应scale等样式用style写在内联样式里**，刚开始不相信写成内联样式就可以解决这个问题，但实践后发现确实可以解决这个问题。