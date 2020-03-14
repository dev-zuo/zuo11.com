
# nginx默认配置对前端开发的一些影响

一般前端代码开发好后，会部署到nginx，但nginx的某些默认配置，会使前端页面受到影响，比如默认请求超时限制，默认文件上传大小限制，默认字符编码问题等。下面来看具体的问题，以及怎么解决这些问题。

## nginx请求超时时间默认60s
axios请求时，配置config里有一个是设置请求超时时间的，有一次接口响应巨慢，超过了1分钟，于是我在axios里设置了超时时间为2分钟，但没效果。后来发现是nginx的默认配置限制了。
```js
// `timeout` specifies the number of milliseconds before the request times out.
// If the request takes longer than `timeout`, the request will be aborted.
timeout: 1000, // default is `0` (no timeout)
```
综上：前端就算超时设置为2分钟，但如果前端代码部署到了nginx上，也会导致1分钟超时，你也可以修改nginx的默认配置项

```conf
location / {
  root d:/test/;
  fastcgi_connect_timeout 600; # set timeout
  fastcgi_send_timeout 600; 
  fastcgi_read_timeout 600;
}
```

## nginx默认文件上传大小限制为1M
在做图片上传功能时，和后台本地联调都挺好的。但部署到服务器后，发现图片上传有时候会失败，后来用charles抓包发现，当图片大于1M时，就会超时。最开始以为是后端的问题，找后端调试时，返现后端根本没有收到上传的请求，然后我就想到可能是nginx这里直接拦截了请求，查资料后发现果然是这样。

所以，对于有文件 > 1M 需要上传的，需要修改下 nginx默认配置
```conf
server {
  listen       80;
  server_name  localhost;
  client_max_body_size 10M; #增加这个参数就可以指定最大上传文件大小为10m了；
}
```

## nginx字符编码与系统字符编码不一致导致中文图片路径404的问题
上一次更新博客时，在mac本地调试时，都是ok的，部署到windows服务器上后时，发现一个图片出现了404的问题，最开始以为是缓存的问题，清了缓存后还是404。这张图片是中文路径，之前全部用的是英文的，没发现这个问题。试了下英文的图片链接是ok的。百度了下，发现确实有这种问题。是nginx设置的编码与操作系统的编码不一致的问题。

```bash
# linux查看电脑默认编码
echo  $LANG
# zh_CN.UTF-8

# windows下查看默认字符编码
chcp
# 如果显示 活动代码页 936 表示GBK编码  我的服务器就是这个编码，修改了nginx charset utf-8;没效果
# 65001 表示utf-8

# 设置字符编码，但发现只在当前控制台生效，重新开一个就没了。
chcp 65001

# 有个修改注册表的方法：不知道是否可行，但怕影响服务器的其它服务，还是算了，改英文名比较稳。。。。
# https://blog.csdn.net/yangzhong0808/article/details/79012628?depth_1-utm_source=distribute.pc_relevant.none-task&utm_source=distribute.pc_relevant.none-task
```


