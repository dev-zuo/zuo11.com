# canvas绘制模糊的问题

今天发现同样的代码在两台电脑上绘制的一个清晰，一个模糊，后来查资料发现确实有这个问题

因为canvas不是矢量图，高dpi屏幕每平方英寸有更多的像素，也就是两倍屏，浏览器会以两个像素点的宽度来渲染一个像素，所以在Retina屏上会导致图片、文字都会模糊，怎么解决呢？

获取设备像素比：`window.devicePixelRatio || 1`

**如果绘制的实际区域大小为 750 * 40，假设设备像素比为2，那么，canvas的width、height需要设置为 1500 * 80，然后用内联样式设置width为750，height为40，相当于canvas绘制2倍的大小，然后再缩放，这样就清晰了。**

综上，在canvas绘制时，各种长度一定要考虑乘以devicePixelRatio，不然可能显示的不清晰

参考：[解决 canvas 在高清屏中绘制模糊的问题](https://www.html.cn/archives/9297)