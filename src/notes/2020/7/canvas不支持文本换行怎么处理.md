# canvas不支持文本换行怎么处理

今天在stackoveflow里面搜索ctx.fill的问题时，查到了很多关于canvas ctx.fillText()绘制文本时不支持换行的问题，找到了一个比较好的答案

> I'm afraid it is a limitation of Canvas' fillText. There is no multi-line support. Whats worse, there's no built-in way to measure line height, only width, making doing it yourself even harder!

一般解决思路是，根据 ctx.measureText('Hello').width 来看需要显示的文字是否需要换行，写一个for循环来处理

参考：
- [canvas绘制文本内容自动换行](https://segmentfault.com/a/1190000017869922)
- [javascript - HTML5 canvas ctx.fillText won't do line breaks? - Stack Overflow](https://stackoverflow.com/questions/5026961/html5-canvas-ctx-filltext-wont-do-line-breaks)