# mac安装nginx在官网下载与使用brew下载的区别
nginx官网直接下载的包，mac下可以直接进入该目录使用，但没有加到环境变量，不能在Terminal的任何目录下直接使用。

![nginx_down.png](../../../images/blog/others/nginx_down.png)

如果使用 `brew install nginx` 安装，他会直接都安装好，并修改环境变量。可以使用which nginx来看具体的地址
