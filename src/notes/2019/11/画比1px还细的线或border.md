
# 画比1px还细的线或border

一般使用transform缩小0.5倍来实现，如果是border先将元素放大2倍，再缩小0.5倍，放大缩小后还是以放大的空间来占位，使用positon:absolute脱离标准文档流，就不会有两倍的占位了。

```js
/* 比1px还细的线 */
.thinline {
  height: 1px;width:100%;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  background:#ccc;
}
```