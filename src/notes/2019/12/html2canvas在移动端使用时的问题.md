

# html2canvas在移动端使用时的问题

在需要生成海报、图片的需求里，一般 html2canvas 是一种比较好的解决方案，pc端的问题还是比较少的，移动端兼容性问题就比较坑了，要特别注意多测试一些机型，下面总结下我之前遇到的两个移动端的问题

## html2canvas 生成图片时，background-image模糊的问题

PC端一般不会出现这个问题，主要是移动端，有两种解决方法：

1. 使用固定宽度，不要使用百分比单位(比如 1500px)
2. 用 img 标签使用 absolute 定位做背景，不使用background-image


## html2canvas 移动端生成图片文字重叠的问题

text-align:center 可能会导移动端，生成图片的文字重叠的问题，改为text-align:left或其他即可。但需要特别注意兼容性的问题，移动端安卓、iPhone、安卓平板 啥的都要看看。

