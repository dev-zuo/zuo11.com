# 什么是回流(Reflow)和重绘(Repaint)？怎么避免？
**1. 什么是回流和重绘**

- 浏览器使用流式布局模型 (Flow Based Layout)
- 浏览器把 HTML 解析成 DOM，把 CSS 解析为 CSDOM，DOM 和 CSDOM 合并就产生了 Render Tree(渲染树)
- 根据Render Tree，计算各个元素在页面中的大小和位置，绘制到页面上。

**回流/重排（Reflow）**：当 Render Tree 中部分或全部元素的尺寸、结构或位置发生改变时，浏览器会重新渲染部分或整个文档的过程就称为Reflow

**重绘（RePaint）**: 当页面中元素样式的改变并不影响它在文档中的位置时，浏览器会重绘该区域，这个过程称为重绘

**2. 回流和重绘的比较**

DOM、CSS style的改变会照成回流或者重绘，回流比重绘更消耗性能

- 回流：重新布局，会引起元素位置变化的就会reflow，比如修改 DOM 的宽高、字体大小、窗口大小改变、元素位置改变等
- 重绘：重新绘制区域，不改变元素位置，比如修改背景、颜色，visibility等

**3. 如何避免回流或重绘**

CSS：
- 尽可能在DOM树的最末端改变class
- 避免设置多层内联样式，将动画效果应用到 position 属性为 absolute 或 fixed 的元素上
- 避免使用CSS表达式（例如：calc())

JavaScript
- 避免频繁操作样式、DOM
- 在 documentFragment 或 display 为 none 的元素上进行 dom 操作不会引起回流或重绘
- 对复杂动画，使用绝对定位脱离文档流，避免整体回流

参考：
- [浏览器的回流与重绘 (Reflow & Repaint) | 掘金](https://juejin.im/post/6844903569087266823)
- [使用chrome对页面重绘和回流做优化](https://www.zhoulujun.cn/html/webfront/browser/webkit/2016_0506_7820.html)