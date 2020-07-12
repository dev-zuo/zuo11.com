
# nginx以及koa实现301跳转：xx.com重定向到`www.xx.com`

今天帮一个同学测试网络，使用curl来请求百度，发现 baidu.com 到 `www.baidu.com` 的重定向使用的是 html 的meta元素

```bash
curl -v baidu.com
# <html>
# <meta http-equiv="refresh" content="0;url=http://www.baidu.com/">
# </html>
```
当访问 baidu.com时，0秒后刷新页面到 `http://www.baidu.com` ，以后如果在不依赖nginx配置的情况下，可以使用这种方式。meta元素使用方法可以参考之前的笔记：[http-equiv改写http标头字段](https://www.yuque.com/guoqzuo/js_es6/qk5v84#edbe1211)

## nginx重定向使用的是301跳转
之前我有处理过 zuo11.com 跳转到 `www.zuo11.com` 的情况，配置了nginx，具体方法参见 [nginx 访问不带www的域名，自动切到www](https://www.yuque.com/guoqzuo/csm14e/hd0tdl#c1a009e0)

curl -v zuo11.com nginx响应内容如下：
```bash
curl -v zuo11.com
* Rebuilt URL to: zuo11.com/
*   Trying 47.107.190.93...
* TCP_NODELAY set
* Connected to zuo11.com (47.107.190.93) port 80 (#0)
> GET / HTTP/1.1
> Host: zuo11.com
> User-Agent: curl/7.54.0
> Accept: */*
> 
< HTTP/1.1 301 Moved Permanently
< Server: nginx/1.16.1
< Date: Mon, 06 Apr 2020 12:56:22 GMT
< Content-Type: text/html
< Content-Length: 169
< Connection: keep-alive
< Location: http://www.zuo11.com/
< 
<html>
<head><title>301 Moved Permanently</title></head>
<body>
<center><h1>301 Moved Permanently</h1></center>
<hr><center>nginx/1.16.1</center>
</body>
</html>

```
也就是当访问zuo11.com时，nginx会用301重定向到 `www.zuo11.com`。

## koa实现301跳转
我们可以做一个测试，当接收到一个请求后，修改状态码为301，然后设置Location响应头为 `http://www.zuo11.com` 看是否可以重定向页面，来写个koa例子
```js
const Koa = require('koa')
const app = new Koa()

app.use((ctx) => {
  console.log(ctx.url)
  if (ctx.url === '/test') {
    // 当访问 /test 时 301重定向到 http://www.zuo11.com
    ctx.status = 301
    ctx.set({
      'Location': 'http://www.zuo11.com'
    })
    return
  }
  // 非 /test 时，页面显示 welcome
  ctx.body = 'welcome'
})

app.listen('9000', () => { console.log('服务已开启，9000端口') })
```

通过测试上面的例子，发现只要响应的状态码设置为301，且响应头Location设置为要重定向的网页，就可以301跳转到对应的页面，新技能get
