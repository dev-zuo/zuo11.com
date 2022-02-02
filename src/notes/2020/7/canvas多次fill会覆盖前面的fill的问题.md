---
{
  "title": "canvas多次fill会覆盖前面的fill的问题",
  "staticFileName": "canvas_file_more.html",
  "author": "guoqzuo",
  "createDate": "2020/07/06",
  "description": "在使用canvas进行绘图时，封装了一个绘制函数，每次都会填充颜色 ctx.fill()，如果多次执行，只会在最后一次时，整体fill一次？刚开始以为是后面的fill覆盖了前面的fill，后来网上查了下，第一次fill后，再次fill需要再次调用ctx.beginPath()，不然只会在最后一次fill。",
  "keywords": "canvas多次fill会覆盖前面的fill的问题,ctx.fill覆盖了前一次的fill",
  "category": "JavaScript"
}
---

# canvas 多次fill会覆盖前面的fill的问题

在使用canvas进行绘图时，封装了一个绘制函数，每次都会填充颜色 ctx.fill()，如果多次执行，只会在最后一次时，整体fill一次？

刚开始以为是后面的fill覆盖了前面的fill，后来网上查了下，第一次fill后，**再次fill需要再次调用ctx.beginPath()**，不然只会在最后一次fill。

参考: [HTML5的canvas标签为什么会覆盖之前画的东西的颜色 ](https://bbs.csdn.net/topics/392293890?page=1)