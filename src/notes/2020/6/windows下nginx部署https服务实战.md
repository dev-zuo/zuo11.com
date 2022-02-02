---
{
  "title": "windows下nginx部署https服务实战",
  "staticFileName": "nginx_https.html",
  "author": "guoqzuo",
  "createDate": "2020/06/21",
  "description": "这里复盘下将koa写的接口服务部署到`https://api.zuo11.com`上，相关nginx配置的全流程",
  "keywords": "nginx部署https服务,nginx https",
  "category": "运维部署与版本控制"
}
---


# windows下nginx部署https服务实战

这里复盘下将koa写的接口服务部署到`https://api.zuo11.com`上，配置nginx的全流程

1. 在阿里云将域名免费的ssl证书分配给api.zuo11.com
2. 在域名解析里，增加 api.zuo11.com 的解析，解析到服务器
3. 初始化一个koa项目，监听某个端口，比如 9000端口，写一些测试的接口
4. 部署到服务器
5. nginx 添加对https的支持：①. 在ssl证书位置下载证书，会有两个文件 xxx.pem, xxx.key，在服务器nignx目录下的conf目录新建cert目录，将两个文件拷贝进去，修改conf下nginx.conf的配置

```bash
# HTTPS server
server {
    listen       443 ssl;
    server_name  api.zuo11.com;

    ssl_certificate     cert\3391782_api.zuo11.com.pem;
    ssl_certificate_key cert\3391782_api.zuo11.com.key;

    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;

    # 注释掉默认的加密方式
    # ssl_ciphers  HIGH:!aNULL:!MD5;
    # ssl_prefer_server_ciphers  on;

    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;  #使用此加密套件。
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;   #使用该协议进行配置。
    ssl_prefer_server_ciphers on;

    location / {
        # root   html;
        # index  index.html index.htm;
        proxy_pass http://127.0.0.1:9000;
    }
}
```