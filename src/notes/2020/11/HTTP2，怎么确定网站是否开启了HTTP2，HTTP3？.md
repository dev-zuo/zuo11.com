---
{
  "title": "HTTP2，怎么确定网站是否开启了HTTP2，HTTP3？",
  "staticFileName": "http2_http3.html",
  "author": "guoqzuo",
  "createDate": "2020/11/23",
  "description": "HTTP/2 是新一代的 HTTP 协议，于 2015 正式发布。相对 HTTP/1 来说，大幅提升了网页性能，绝大多数浏览器都支持了 HTTP/2。http 怎么开启 http2 呢？HTTP/2 现阶段必须使用 https，80端口就不要想了。HTTP/1.1 不足的地方 - 连接无法复用，每次请求都经历三次握手和慢启动 - HTTP/1.0 传输数据时，每次都需要重新建立连接，增加延迟。- HTTP/1.1 虽然加入 keep-alive 可以复用一部分连接，但域名分片等情况下仍然需要建立多个 connection，耗费资源，给服务器带来性能压力。",
  "keywords": "HTTP2,HTTP3,怎么开启HTTP/2",
  "category": "http与https"
}
---
# HTTP/2，怎么确定网站是否开启了HTTP/2，HTTP/3？

HTTP/2 是新一代的 HTTP 协议，于 2015 正式发布。相对 HTTP/1 来说，大幅提升了网页性能，绝大多数浏览器都支持了 HTTP/2。

http 怎么开启 http2 呢？HTTP/2 现阶段必须使用 https，80端口就不要想了。参考: [拥抱HTTP2.0时代，让网站飞起来 | 百度站长](https://ziyuan.baidu.com/wiki/786)

HTTP/1.1 不足的地方
- 连接无法复用，每次请求都经历三次握手和慢启动
  - HTTP/1.0 传输数据时，每次都需要重新建立连接，增加延迟。
  - HTTP/1.1 虽然加入 keep-alive 可以复用一部分连接，但域名分片等情况下仍然需要建立多个 connection，耗费资源，给服务器带来性能压力。
- 队头阻塞(Head-Of-Line Blocking,HOLB)，并发请求数量限制
  - 当页面中需要请求很多资源的时候，HOLB（队头阻塞）会导致在达到最大请求数量时，剩余的资源需要等待其他资源请求完成后才能发起请求。
  - HTTP 1.0：下个请求必须在前一个请求返回后才能发出，request-response对按序发生。显然，如果某个请求长时间没有返回，那么接下来的请求就全部阻塞了。
  - HTTP 1.1：尝试使用 pipeling 来解决，即浏览器可以一次性发出多个请求（同个域名，同一条 TCP 链接）。但 pipeling 要求返回是按序的，那么前一个请求如果很耗时（比如处理大图片），那么后面的请求即使服务器已经处理完，仍会等待前面的请求处理完才开始按序返回。所以，pipeling 只部分解决了 HOLB。
- 协议开销大，header 里携带的内容过大，在一定程度上增加了传输的成本，并且每次请求 header 基本不怎么变化，尤其在移动端增加用户流量。
- 安全因素，所有传输的内容都是明文，客户端和服务器端都无法验证对方的身份，这在一定程度上无法保证数据的安全性

HTTP/2 就是为了解决 HTTP/1 存在的问题而产生的
- 二进制传输，HTTP/1.1传输的是文本数据，而HTTP/2传输的是二进制数据，提高了数据传输效率。
- 多路复用，多个HTTP请求可以复用同一个TCP连接。解决了浏览器限制同一个域名下的请求数量的问题，减少额外的3次握手开销。
- 压缩请求头(Header)，减少重复发送相同的请求头
- 支持服务器推送(Server push)，允许在请求之前先响应数据到客户端（之前请求过的数据），可以加快css/js等资源加载速度

开启 HTTP/2 只需要在 listen 443 ssl 后面加上 http2 即可，可以使用 curl -I 进行测试看HTTP/2是否生效
```bash
# /etc/nginx/conf.d/docker.conf 
server
{
    server_name www.zuoguoqing.com;

    location / {
      proxy_pass http://127.0.0.1:3000;
    }

    listen 443 ssl http2; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/www.zuoguoqing.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/www.zuoguoqing.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}
```
来看看 HTTP/1.1 和 HTTP/2 的测试对比
```bash
curl -I www.zuo11.com
# HTTP/1.1 200 OK
# Server: nginx/1.16.1
# Date: Thu, 08 Oct 2020 09:08:55 GMT
# Content-Type: text/html; charset=utf-8
# Content-Length: 3666
# Last-Modified: Thu, 01 Oct 2020 15:02:42 GMT
# Connection: keep-alive
# Vary: Accept-Encoding
# ETag: "5f75ef92-e52"
# Accept-Ranges: bytes

curl -I https://www.zuoguoqing.com
# HTTP/2 200 
# server: nginx/1.14.0 (Ubuntu)
# date: Thu, 08 Oct 2020 09:09:07 GMT
# content-type: text/html
# content-length: 213
# last-modified: Wed, 07 Oct 2020 09:03:03 GMT
# etag: "5f7d8447-d5"
# accept-ranges: bytes
```

**HTTP/2够好了，为什么还会有 HTTP/3？**

HTTP/2 的问题在于，其底层支撑协议为 TCP，在丢包的情况下，多个请求复用一个 TCP 连接时，整个 TCP 都要开始等待重传，也就导致了后面的所有数据都被阻塞了。这时 HTTP/2 效果可能还不如 HTTP/1

因此，Google 又弄了一个基于 UDP 协议的 QUIC 协议，是 HTTP/3 中的底层支撑协议，又取了 TCP 中的精华，实现了即快又可靠的协议。

- 通过提高链接利用效率减少 RTT（Round Trip Time，通俗地说，就是通信一来一回的时间），提高数据交互速度。
- 在第一条的基础上，囊括安全需求。
- 解决当前实际网络环境中的适配问题

参考 
- [一文读懂 HTTP/2 及 HTTP/3 特性](https://blog.fundebug.com/2019/03/07/understand-http2-and-http3/)
- [Fundebug网站升级HTTP/2，真的变快了！](https://kiwenlau.com/2019/10/28/speedup-fundebug-by-using-http2/)
- [HTTP/2之服务器推送(Server Push)最佳实践](https://zhuanlan.zhihu.com/p/40595473)
- [如何看待 HTTP/3 ？](https://www.zhihu.com/question/302412059)
