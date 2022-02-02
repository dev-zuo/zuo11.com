---
{
  "title": "mac pro retina屏两倍图，建议使用iconfont",
  "staticFileName": "retina_iconfont.html",
  "author": "guoqzuo",
  "createDate": "2020/07/12",
  "description": "之前在处理canvas绘制模糊的问题时了解到，retina是两倍像素屏，50 x 50像素的图会绘制在 100 x 100 像素区域，会导致绘制模糊。同理，如果需要在retina屏上显示50 x 50的图，需要提供两倍图 100 * 100，然后设置样式宽高为50，这样才会清晰。最好的方式还是使用iconfont、svg矢量图等可以任意设置宽高(size)而不会失真的图或字体。这样就不会模糊。",
  "keywords": "retina屏两倍图,建议使用iconfont",
  "category": "CSS"
}
---

# mac pro retina屏两倍图，建议使用iconfont

之前在处理canvas绘制模糊的问题时了解到，retina是两倍像素屏，50 x 50像素的图会绘制在 100 x 100 像素区域，会导致绘制模糊。

同理，如果需要在retina屏上显示50 x 50的图，需要提供两倍图 100 * 100，然后设置样式宽高为50，这样才会清晰。

最好的方式还是使用iconfont、svg矢量图等可以任意设置宽高(size)而不会失真的图或字体。这样就不会模糊。

