# zuo11.com

碎片化笔记，记录遇到的问题以及解决方法 http://zuo11.com

## 目录结构

v2.0.0 去除 _info.json（配置文件记录了当前目录下每篇文章的配置、seo参数等）
将相关参数设置到 md 文件，通过 front-matter 解析，主要为了可以有 edit on github 功能

```bash
├── src # extraRootFiles 额外的根目录文件，比如站点地图、广告说明文件等
├── server # server 本地服务测试
├── tools # nginx SSL 证书更换脚本 
├── src # 写博客文章的目录
│   ├── config.json # 全局配置文件
│   ├── global.js # 全局js
│   ├── global.css # 全局css 
│   ├── images # 图片目录
│   │   ├── blog # 专门放博客图片的目录
│   │   └── favicon.ico # 站点icon
│   └── notes # 博客文章，按年月分目录
│       ├── 2016
│       │   ├── 10 # 每个月份目录下放当月写的文章及当前月的配置文件
│       │   │   ├── xxx1.md # 博客文章
│       │   │   └── xxx2.md
│       │   ├── 11
│       │   └── 12
│       ├── ...
│       └── 2020 # 2020年目录
│           ├── 1 # 2020年1月目录
│           │   └──  xx45.md
│           └── 2 
├── LICENSE # 开源协议 Apache 2.0
└── README.md # 说明文档
```

## _config.json 全局配置说明

里面包含了站点名称、百度统计id、链接名称、底部文案等

```json
{
  "title": "左小白的技术日常",
  "isAddBaiduTongji": true,
  "baiduTongjiId": "183281668cc3440449274d1f93c04de6",
  "indexConfig": {
    "author": "guoqzuo",
    "description": "左小白的技术日常",
    "keywords": "左小白的技术日常,zuo11.com",
    "linkList": [
      { "name": "博客", "href": "/blog/category.html" },
      { "name": "语雀", "href": "https://www.yuque.com/guoqzuo", "target": "_black" },
      { "name": "Github", "href": "https://github.com/dev-zuo", "target": "_black"}
    ]
  },
  "topRightLink": [
    { "name": "语雀", "href": "https://www.yuque.com/guoqzuo", "target": "_black" },
    { "name": "Github", "href": "https://github.com/dev-zuo", "target": "_black"}
  ],
  "footer": {
    "left": "Copyright © 2016-2020 zuo11.com. 鄂ICP备16014741号-1",
    "right": "Powered by <a href='https://github.com/dev-zuo/zuo-blog' target='_black'>zuo-blog</a>"
  },
  "categorySequence": [
    "web",
    "微信小程序", 
    "数据库",
    "观点",
    "iOS",
    "UNIX环境高级编程",
    "C语言"
  ]
}
```

## _info.json配置文件说明

> 移动到每个文件 front-matter

为了方便做seo，每篇文章有创建时间、生成静态html的文件名、作者、关键字、描述等。每个月份下面都需要有一个_info.json文件用来描述当前目录下文章的信息，如果当前目录没文章，就不用创建这个配置文件，下面是一个例子:

```json

[
  {
    "source": "web站点优化 关于最近的改版.md",
    "staticFileName": "web_optimize_1.html",
    "author": "guoqzuo",
    "createDate": "2016/12/18",
    "description": "web站点优化 关于最近的改版",
    "keywords": "zuo11.com站点优化记录,PC站转移动站,移动端适配",
    "category": "web"
  },
  {
    "source": "网站打开速度优化.md",
    "staticFileName": "web_more_speed.html",
    "author": "guoqzuo",
    "createDate": "2016/12/22",
    "description": "网站打开速度优化",
    "keywords": "zuo11.com站点优化记录,Tomcat开启GZIP压缩,网站打开速度优化,tomcat 开启gzip",
    "category": "web"
  }
]
```

category用来给文章分类，注意按时间先后顺序来写配置文件

## 使用zuo-blog成静态博客系统

```bash
# 全局安装 zuo-blog
npm install -g zuo-blog

# 生成博客系统
cd zuo11.com  # 进入zuo11.com目录，确保该目录下包含src，src下面有notes，images目录
zuoblog init # 开始生成，在当前目录(zuo11.com)生成dist目录，可直接部署到nginx
```

## google

```js
,
  "asideTopHtml": "<ins class='adsbygoogle' style='display:inline-block;width:300px;height:250px;' data-ad-client='ca-pub-9527676606416641' data-ad-slot='9476232907'></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});</script>",
  "articleTopHtml": "<ins class='adsbygoogle' style='display:block;margin-top:1em;margin-bottom:0' data-ad-format='fluid' data-ad-layout-key='-gw-3+1f-3d+2z' data-ad-client='ca-pub-9527676606416641' data-ad-slot='8870245163'></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});</script>",
  "noteInnerAdHtml": "<ins class='adsbygoogle' style='display:block;margin-top:1em;margin-bottom:0' data-ad-format='fluid' data-ad-layout-key='-gw-3+1f-3d+2z' data-ad-client='ca-pub-9527676606416641' data-ad-slot='8870245163'></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});</script>",
  "commentTopHtml": "<ins class='adsbygoogle' style='display:block;text-align:center;' data-ad-layout='in-article' data-ad-format='fluid' data-ad-client='ca-pub-9527676606416641' data-ad-slot='5125924359'></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});</script>"
```
