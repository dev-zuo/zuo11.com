# xx.github.io偶尔访问不了是为什么？
在 Github 上开启 Pages 服务后，可以通过 xx.github.io 访问对应的网页。但偶尔会出现打不开的问题，之前都是可以打开的，试了其他人的 github.io，发现也打不开，这就不是自己网络的问题了。

网上查原因是电信运营商 DNS 污染（域名解析不到正确的 IP 地址）。我们在本地手动设置 host 指定对应域名的解析 IP 即可正常访问，假设我要访问 `https://zuoxiaobai.github.io/fedemo/` 那手动指定一下这个域名的解析ip即可。下面来看具体怎么操作

```bash
# 修改 /etc/hosts
sudo vi /etc/hosts
# 添加如下host记录
185.199.108.153 zuoxiaobai.github.io
# 查看host文件
cat /etc/hosts    
##
# Host Database
#
# localhost is used to configure the loopback interface
# when the system is booting.  Do not change this entry.
##
127.0.0.1	localhost
185.199.108.153 zuoxiaobai.github.io
255.255.255.255	broadcasthost
::1             localhost
```
保存后，就可以打开 `https://zuoxiaobai.github.io/fedemo/` 了。**这样只能保证自己的电脑上可以正常访问这个网站，但其他人也会出现偶尔访问不了的情况，对于要求较高的网站，建议部署在自己的服务器上。如果想要免费的，可以在 码云 上面弄一个仓库来做自己的网站。国内 IP 解析很快，参考 vant 组件官网。**

参考：
- [github.io无法访问问题及解决](https://blog.csdn.net/qq_43229056/article/details/108036569)
- [github无法访问的解决方法 --- 2020](https://www.cnblogs.com/onelikeone/p/12791969.html)