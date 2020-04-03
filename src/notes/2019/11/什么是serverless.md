
# 什么是serverless

什么是serverless，最近在前端开发领域是一个比较火的概念，字面意思是无服务器，小程序云开发就是一种

主要是弱化服务器概念，把原来需要后端开发的内容搬到前端，让前端可以不用管数据库建表、部署方面的事情，写好代码一提交就可以自动生成对应的接口服务。

## 发展过程
物理设备 => 虚拟机 => 容器 => serverless（只需关注业务逻辑，不需要关心服务器资源等）

## severless优势
1. 减少人力成本7-8人开发  => 2-3人
2. 弹性伸缩，所需耗时: 虚拟机(小时级) => 容器(分钟级) => serverless(毫秒级)
3. 故障恢复方面优势

## serverless 支持语言
现在一般支持nodejs，java，go，php，python

## 注意
注意serverless强依赖某个平台及其开放的服务


参考：[云函数 Serverless Cloud Function](https://cloud.tencent.com/product/scf)