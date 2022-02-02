---
{
  "title": "github向他人的项目提交代码及添加域名解析",
  "staticFileName": "web_github_push.html",
  "author": "guoqzuo",
  "createDate": "2018/03/04",
  "description": "在Github新建的仓库，如果是项目拥有者，进入项目，就会看到setting的入口，这个位置配置当前项目的一些信息，删除该仓库。如果想要其他的github用户可以把代码直接提交到该仓库，可以在这里把对应的用户名添加到合作者，collaborators下。添加后，对方需要同意，可以把链接发给对方。这样，其他账号就可以直接提交到项目了。使用hexo g 可直接提交生效。",
  "keywords": "github向他人项目提交代码,github使用自定义域名",
  "category": "运维部署与版本控制"
}
---

# github向他人的项目提交代码及添加域名解析

## 向他人的项目提交代码
在Github新建的仓库，如果是项目拥有者，进入项目，就会看到setting的入口，这个位置配置当前项目的一些信息，删除该仓库。如果想要其他的github用户可以把代码直接提交到该仓库，可以在这里把对应的用户名添加到合作者，collaborators下。添加后，对方需要同意，可以把链接发给对方。这样，其他账号就可以直接提交到项目了。使用hexo g 可直接提交生效。

## 将自己的域名解析到Github Pages
如果希望当访问自己的域名时，自动跳转到xxx.github.io的页面，需要两步操作:

### 将域名解析到github的ip
先通过ping自己的xxx.github.io的域名，得到对应的ip，再在域名的管理控制台，将域名解析到这个IP.
### 设置项目的Github Pages
在项目的设置页面，Github Pages 里，可以看到Your site is published at https://xxx.github.io。在下面的Custom domain里面添加自己的域名，点击保存，就可以了。

### 关于hexo d 后需要重新设置custom domain的问题
设置自定义解析后，可以通过自己的域名访问对应的项目了，但写一篇文章后，hexo g 提交到仓库后，设置里面默认域名又变成xxx.github.io了，自定义域名的设置失效了。我们可以在hexo工程目录下的source目录下，新建一个名为CNAME的文件，里面写入自定义的域名。之后修改的每次提交就不会出现这种问题了。

