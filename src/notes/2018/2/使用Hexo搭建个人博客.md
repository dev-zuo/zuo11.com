---
{
  "title": "使用Hexo搭建个人博客",
  "staticFileName": "web_hexo.html",
  "author": "guoqzuo",
  "createDate": "2018/02/26",
  "description": "用Github Pages弄了一个简单的页面后，琢磨着用Hexo来搭一个博客。把大致的过程梳理了一下。首先百度了Hexo，找到了[Hexo的中文文档](https://hexo.io/zh-cn/docs/)，由于之前没接触过，就按着流程一步步来了。",
  "keywords": "使用hexo搭建个人博客,hexo 个人博客",
  "category": "网站建设与SEO"
}
---

# 使用Hexo搭建个人博客

用Github Pages弄了一个简单的页面后，琢磨着用Hexo来搭一个博客。把大致的过程梳理了一下。

首先百度了Hexo，找到了[Hexo的中文文档](https://hexo.io/zh-cn/docs/)，由于之前没接触过，就按着流程一步步来了。

## 先安装Hexo
之前已经安装了node 及 git，直接用npm装，全局安装
``` bash
npm install -g hexo-cli
```

## 创建一个hexo项目, testHexo
```bash
# 初始化项目，会在当前目录下创建一个testHexo目录，生成标准的项目结构文件
hexo init testHexo
# 进入对应的目录
cd testHexo
# 安装项目依赖的一些包
npm install
```
生成的目录结构如下
```bash
├── _config.yml // 网站的配置信息，您可以在此配置大部分的参数。如标题、语言、git信息，主题等
├── package.json // 应用程序信息，需要安装的一些npm包信息
├── scaffolds // 模板文件夹，当写文章时，每次new的文章使用的就是里面的模板
├── source // 资源文件夹
| ├── _drafts // 存放草稿目录，我在mac下，初始化没有生成这个目录，可以手动mkdir一个
| └── _posts // 存放文章的目录，一般是.md格式的文章，展示的核心内容
└── themes // 主题 文件夹。Hexo 会根据主题来生成静态页面。
```

## 运行初始化项目
```bash
hexo generate # 根据配置，生成静态的项目文件，可简写为 hexo g
hexo server # 启动服务器。默认情况下，访问网址为： http://localhost:4000/。
# 访问http://localhost:4000/就可以看到Hexo默认的主题了。只有一篇hello world的文章。
```

## 写博客文章
用hex new 写文章后，再运行hexo g;hexo server 就可以看到新的文章了
```bash
# 新建一篇文章
hexo new 文章标题 # 可以指定使用的模板布局 hexo new [layout] 文章标题
# 默认会使用scaffolds目录下的post.md模板在source/_posts目录下生成对应的md文件
# 后面新建分类页和标签页时会使用 pages布局 hexo new page tags

# 打开生成的文件，按照md语法写内容就可以了。最上面用--- ---包含的内容为Front-matter
# 用来修改标题、时间、标签、分类等
# 例子:
---
title: 用Github的Pages功能创建静态个人网站
date: 2018-02-25 14:57:10
categories:
- 其他
tags:
- Github
- 个人博客
---
```
## 使用主题(themes) 
不需要样式美化可跳过这一步，直接看后面的项目部署

页面默认的风格很单一，Hexo有很多主题可以使用，[有哪些好看的 Hexo 主题？- 知乎](https://www.zhihu.com/question/24422335)

我选了star最多的next主题 [iissnan/hexo-theme-next · GitHub](https://github.com/iissnan/hexo-theme-next)

找到了一个比较易懂的中文文档: [开始使用 - NexT 使用文档](http://theme-next.iissnan.com/getting-started.html)

修改网页的标题、下载主题后使用
```c
// 下载next主题到项目的themes/next目录 
$ git clone https://github.com/iissnan/hexo-theme-next themes/next

// 修改项目目录下_config.yml文件，使用next主题
theme: next

// 重新生成一下，hexo g; hexo server 运行项目，就可以看到next主题的效果了
```
对主题的一些细节进行配置、修改
``` c
// 如果是英文，需要在项目目录下的_config.yml里做修改，注意不是next主题目录下的_config.yml
language: zh-Hans

// 下面修改的配置是修改的next目录下的_config.yml
// 修改主题, next有几种主题，我这里选的是Pisces主题
scheme: Pisces
// 生成关于、分类、标签页面，默认都是404的
$ hexo new page about // 这里的内容需要自己写
$ hexo new page categories  // 会更具写文章时对应的categories来自动载入
$ hexo new page tags // 会更具写文章时对应的tags来自动载入

// 使用评论系统 disqus（需要翻墙），先去官方申请一个账号或使用google账号登录
// 登录后 选择 I want to install Disqus on my site，填网站名称等信息就会生成对应的shortname
# Disqus
disqus:
  enable: true
  shortname: zuoxiaobais-blog  // 这里填对应的网站shortname
  count: true

// 使用 hexo g;hexo server 重新生成运行项目就可以看到效果了。
```
## 部署代码到zuoxiaobai.github.io
```c
// 每次修改配置，或写文章后都需要重新生成静态文件
$ hexo g 

// 配置部署到github，修改项目目录下的_config.yml文件
deploy:
  type: git
  repo: git@github.com:zuoxiaobai/zuoxiaobai.github.io.git // 这里填仓库（Repository）地址
  branch: master
  message: update note // commit信息, 默认为 Site updated: {{ now('YYYY-MM-DD HH:mm:ss') }}

// 部署
$ hexo deploy // 简写为 hexo d 

// 看到INFO  Deploy done: git 信息就是部署OK了
// 通过zuoxiaobai.github.io就可以看到最新改动的内容了

```
