# zuo11.com
zuo11.com blog部分源码

## 目录结构
```bash
├── src # 写博客文章的目录
│   ├── images # 图片目录
│   │   ├── blog # 专门放博客图片的目录
│   │   └── favicon.ico # 站点icon
│   └── notes # 博客文章，按年月分目录
│       ├── 2016
│       │   ├── 10 # 每个月份目录下放当月写的文章及当前月的配置文件
│       │   │   ├── _info.json # 配置文件记录了当前目录下每篇文章的配置、seo参数等
│       │   │   ├── xxx1.md # 博客文章
│       │   │   └── xxx2.md
│       │   ├── 11
│       │   └── 12
│       ├── ...
│       └── 2020 # 2020年目录
│           ├── 1 # 2020年1月目录
│           │   ├──  _info.json
│           │   └──  xx45.md
│           └── 2 
├── LICENSE # 开源协议 Apache 2.0
└── README.md # 说明文档
```

## _info.json配置文件说明
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


