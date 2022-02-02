---
{
  "title": "网页seo之将链接提交到搜索引擎进行评定收录",
  "staticFileName": "seo_commit.html",
  "author": "guoqzuo",
  "createDate": "2020/01/30",
  "description": "最近对zuo11.com进行了改版，完成了博客的静态化并完成了上线，nginx + 静态文件代替了原来的 tomcat + jsp + mysql的模式。针对百度收录与索引，google收录，做了一些处理。",
  "keywords": "提交站点链接到百度,提交链接到google",
  "category": "网站建设与SEO"
}
---

# 网页seo之将链接提交到搜索引擎进行评定收录

最近对zuo11.com进行了改版，完成了博客的静态化并完成了上线，nginx + 静态文件代替了原来的 tomcat + jsp + mysql的模式。针对百度收录与索引，google收录，做了一些处理。

## 登录到百度站长平台
由于url除了zuo11.com其他原来文章的url全部失效，需要让百度重新收录，添加索引。入口：[百度站长平台，现在叫资源搜索平台](https://ziyuan.baidu.com/)

### 提交改版规则 
提交网站改版的规则URL对，百度搜索 site:zuo11.com，将收录的网页链接，以及改版后的url以规定的格式提交

```bash
# 旧URL，对应的改版后的url，以空格隔开，一行是一条数据
http://zuo11.com/Notes.woe?action=detail&note_id=24 http://www.zuo11.com/blog/2016/10/c_vim.html
http://zuo11.com/Notes.woe?action=APUE http://www.zuo11.com/blog/category.html
```

### 提交死链
对于改版后404的页面，可以提交死链，防止搜索引擎认为网站不稳定或服务异常，导致权重评分降级，最好将死链放到一个txt里，定期进行一些更新

```bash
# 死链规则
http://zuo11.com/Notes.woe?
```

### sitemap
这里推荐使用sitemap的方式提交链接，怎么生成sitemap呢？使用 https://www.xml-sitemaps.com/ 输入你的站点，就可以自动生成sitemap.xml信息了，默认只有sitemap.xml，可以找更多文件的下载入口，可以下到一个sitemaps.zip的一个文件，里面还包含了txt、html等非xml格式的数据。**将生成后的sitemap.xml文件放到域名根目录下，提交对应的链接到百度站长平台**

### 向百度站长主动推送站点url
之前提交链接都是手动将url粘贴到输入框提交。这次试了下curl方式提交还是很方便的
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

## 登录到Google search console
入口：[Google search console](https://search.google.com/search-console)，登录后左侧菜单index - Sitemaps提交sitemap链接