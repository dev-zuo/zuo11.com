# 使用curl向百度站长主动推送站点url
之前提交链接都是手动将url粘贴到输入框提交。这次试了下curl方式提交还是很方便的，来看看步骤
```bash
# 先将要提交的url存放到 urls.txt 里
vi urls.txt

# 查看
cat urls.txt 
http://www.zuo11.com/blog/2019/11/v-if_filters.html
http://www.zuo11.com/blog/2019/12/web_storage.html
http://www.zuo11.com/blog/2019/12/phantomjs-prebuilt.html
http://www.zuo11.com/blog/2019/12/node_sleep_module.html
http://www.zuo11.com/blog/2019/12/git_clone_timeout.html
http://www.zuo11.com/blog/2019/11/git_push_branch.html
http://www.zuo11.com/blog/2019/12/npm_resource.html

# 确定内容没问题后提交，对应的链接在百度站长提交链接哪里会自动生成
curl -H 'Content-Type:text/plain' --data-binary @urls.txt "http://data.zz.baidu.com/urls?site=www.zuo11.com&token=xxxxxxx"

# 执行后返回推送接口，实时推送成功
{"remain":99993,"success":7}
```