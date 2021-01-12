# node koa 怎么获取 POST 请求 Content-Type 为 "text/plain" 的数据
在 Beacon API 中，使用 `navigator.sendBeacon(url, dataString)` 发送的是 POST 请求，Content-Type 是比较少见的 "text/plain;charset=UTF-8" 。它既不是 xhr，也不是 fetch，是一种独立的请求类型。在 koa 中，一般使用 koa-bodyparser 来处理 post 请求数据。但这次发现使用 ctx.request.body 无法接收到数据。之前接收 "application/x-www-form-urlencoded" 和 "application/json" 类型的数据都是正常的。

查了下文档，发现 koa-bodyparser 默认情况下不支持解析 `text/plain` 类型的数据，需要设置可配置选项才行。

> enableTypes: parser will only parse when request type hits enableTypes, support json/form/text/xml, default is ['json', 'form'].

```js
app.use(require('koa-bodyparser')({
  enableTypes: ['json', 'form', 'text']
}))
router.post('/user', async ctx => {
  console.log(ctx.request.body) 
  // { page: '/xxx', duration: '12s' } 
  ctx.body = {
    a: 1
  }
})
```

其他 koa-bodyparser 需要注意的地方
- encoding: requested encoding. Default is utf-8 by co-body.
- formLimit: limit of the urlencoded body. If the body ends up being larger than this limit, a 413 error code is returned. Default is 56kb.
- jsonLimit: limit of the json body. Default is 1mb.
- textLimit: limit of the text body. Default is 1mb.
- xmlLimit: limit of the xml body. Default is 1mb.

参考 
- [post数据解析 koa-bodyparser](https://github.com/koajs/bodyparser)
- [Beacon API - 20. JavaScript API - JS高程4笔记](http://fe.zuo11.com/js/ad3/js-ad3-24.html#beacon-api)
