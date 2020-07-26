# nginx配置二级域名解析目录
最近看百度统计，有100多个河南的新ip访问，有些异常，而且都是访问的api.zuo11.com，最近两周明细里看到的ip段很有规律
```js
111.7.100.16 - 111.7.100.27
36.99.136.131 - 36.99.136.143
```
百度统计有个缺点，就是仅提供两周内的访问明细，最多5000条，后面有必要做一个自己的用户行为记录系统

之前我将 `https://api.zuo11.com` 解析到了一个node服务用于https接口，但发现 `http://api.zuo11.com` 走的80端口，会直接访问zuo11.com，我仿照`zuo11.com` 301重定向到 `www.zuo11.com` 的方式写了下面的配置，但发现不生效，当时也没管。
```js
if ($host = 'api.zuo11.com') {
  rewrite ^/(.*)$ https://api.zuo11.com/$1 permanent;
}
```
现在暴露出问题来了，就必须解决，让 `http://api.zuo11.com` 指向其他目录，花了好长时间才配置ok，以下是相关具体配置，省略了https配置
```js
server {
  listen       80;
  server_name  zuo11.com www.zuo11.com;
  charset utf-8;

  if ($host = 'zuo11.com') {
    rewrite ^/(.*)$ http://www.zuo11.com/$1 permanent;
  }

  location / {
      root   C:\Users\Administrator\Desktop\dist;
      index  index.html index.htm;
  }
}

server {
  listen   80;
  server_name  demo.zuo11.com;
  charset  utf-8;
  location / {
        root  C:\Users\Administrator\Desktop\demo_dist;
        index  index.html index.htm;
    }
}

server {
  listen   80;
  server_name  api.zuo11.com;
  charset  utf-8;
  location / {
        root  C:\Users\Administrator\Desktop\api_dist;
        index  index.html index.htm;
    }
}
```
其实就是多写一个server，把二级域名指向其他目录。中间有个坑的地方就是windows使用nginx时，关闭nginx运行的terminal后，进程不一定关闭，需要打开任务管理器，找nginx相关进程删掉，这样才彻底。