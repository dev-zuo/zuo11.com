---
{
  "title": "Node.js、js、v8三者之间的关系",
  "staticFileName": "node_js_v8.html",
  "author": "guoqzuo",
  "createDate": "2020/02/04",
  "description": "Node.js 提供了JS运行时（运行js的环境，类似的概念有JRE提供了运行java的环境）。Node.js通过内部集成Chrome V8引擎来解析执行js，Node.js除了解析执行js外，还包含其他功能，比如浏览器里js无法操作文件、无法开启http服务器、而Node.js里可以，主要是因为Node.js里面扩展加入了很多功能。比如使用libuv，提供了文件系统、网络、子进程、管道、信号处理、轮询、流等功能；使用llhttp提供了HTTP解析功能；使用OpenSSL提供tls、crypto加密相关功能等等",
  "keywords": "node.js和js的区别,node.js v8 js之间的关系",
  "category": "前端工程化"
}
---

# Node.js、js、v8三者之间的关系

1. Node.js 提供了JS运行时（运行js的环境，类似的概念有JRE提供了运行java的环境）。Node.js通过内部集成Chrome V8引擎来解析执行js

2. Node.js除了解析执行js外，还包含其他功能，比如浏览器里js无法操作文件、无法开启http服务器、而Node.js里可以，主要是因为Node.js里面扩展加入了很多功能。比如使用libuv，提供了文件系统、网络、子进程、管道、信号处理、轮询、流等功能；使用llhttp提供了HTTP解析功能；使用OpenSSL提供tls、crypto加密相关功能等等。

参考之前的笔记：[Node.js基础](https://www.yuque.com/guoqzuo/rdrqd5/ms0w14#Libraries)

