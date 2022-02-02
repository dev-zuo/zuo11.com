---
{
  "title": "Node.js的核心用处及应用场景",
  "staticFileName": "nodejs_uses.html",
  "author": "guoqzuo",
  "createDate": "2020/06/29",
  "description": "Node.js是一个基于chrome v8引擎的js运行时，那他一般有什么用处呢，下面来看看。node三个核心应用场景：1.打包构建、工程化 2.写后台接口 3.综合应用：获取数据+渲染页面(高并发、高性能)",
  "keywords": "Node.js的核心用处及应用场景,node使用场景,node应用场景,node应用",
  "category": "前端工程化"
}
---

# Node.js的核心用处及应用场景

Node.js是一个基于chrome v8引擎的js运行时，那他一般有什么用处呢，下面来看看

## node三个核心应用场景
1. **打包构建、工程化**，主要依赖基础的fs模块，文件读写，如xxx-cli(脚手架)、webpack、parcel、hexo，node在打包构建、前端工程化这块基本影响了整个前端的开发过程，各框架基本都有基于node的cli，快速生成脚手架，使开发更加高效、规范。

2. **写后台接口**，主要依赖基础的http模块，处理请求和响应，如 express.js、koa.js，一般主要用于模拟假数据接口, 调UI、交互效果以及做一些请求响应方面的自测

3. **综合应用：获取数据+渲染页面(高并发、高性能)**，koa.js对于开发商业化应用来说还是比较单薄，egg.js基于koa做了一些增强，让node也可以做企业级应用。阿里的使用场景就是一个很好的例子，基础设施大部分采用 Java 实现，变化较少，有事务要求的 Business Services 通常使用 Java。而Node主要用于**替代过去php、jsp使用场景**, 用在需要快速迭代，需求变化非常快的用户侧。node已经经受了阿里双11的考验，技术上是可行的。

> 题外话：个人认为综合应用这块，自己玩玩还可以，小团队或node不是非常强的技术团队尽量不要尝试，阿里能做好这块是因为国内顶尖的node方面人才基本都在阿里，经过多年实践踩坑，拥有相对完善的node基建和生态。目前市面上前端里node强的比较少，饿了么为了招node服务端开发，还专门写了个node相关的面试教程。可想而知这方面人才有多少。

## node支持高并发的原因
- **node.js基于异步I/O**，接收到请求后，直接开一个I/O线程去执行，然后就不管了，立即继续执行主线程。等I/O线程执行完成后，直接执行对应的回调函数即可。省去了许多等待请求的时间
- **事务驱动**，主线程通过event loop事件循环触发的方式来运行程序，这一条暂时还不是很理解，先写上~

## 参考
- [如何评价阿里开源的企业级 Node.js 框架 EggJS？](https://www.zhihu.com/question/50526101/answer/144952130)
- [Node.js：浅析高并发与分布式集群](https://segmentfault.com/a/1190000015841624)
- [天猫双11前端分享系列（四）：大规模 Node.js 应用](https://github.com/tmallfe/tmallfe.github.io/issues/28?utm_source=ourjs.com)
- [egg.js](https://eggjs.org/zh-cn/intro/index.html)
- [node-interview | ElemeFE](https://github.com/ElemeFE/node-interview)
