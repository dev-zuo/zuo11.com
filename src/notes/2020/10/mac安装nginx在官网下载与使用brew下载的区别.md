---
{
  "title": "mac安装nginx在官网下载与使用brew下载的区别",
  "staticFileName": "nginx_install.html",
  "author": "guoqzuo",
  "createDate": "2020/10/31",
  "description": "nginx官网直接下载的包，mac下可以直接进入该目录使用，但没有加到环境变量，不能在Terminal的任何目录下直接使用。如果使用 `brew install nginx` 安装，他会直接都安装好，并修改环境变量。可以使用which nginx来看具体的地址",
  "keywords": "mac nginx安装方法,mac nginx",
  "category": "计算机基础与开发工具"
}
---
# mac安装nginx在官网下载与使用brew下载的区别
nginx官网直接下载的包，mac下可以直接进入该目录使用，但没有加到环境变量，不能在Terminal的任何目录下直接使用。

![nginx_down.png](../../../images/blog/others/nginx_down.png)

如果使用 `brew install nginx` 安装，他会直接都安装好，并修改环境变量。可以使用which nginx来看具体的地址
