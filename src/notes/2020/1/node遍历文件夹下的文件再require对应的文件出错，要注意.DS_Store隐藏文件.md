---
{
  "title": "node遍历文件夹下的文件再require对应的文件出错，要注意.DS_Store隐藏文件",
  "staticFileName": "node_for_DS_Store.html",
  "author": "guoqzuo",
  "createDate": "2020/01/16",
  "description": "在使用koa mock接口时，一个模块有很多接口，就写了十几个js，每个js对应一个接口数据。如果每增加一个接口，再添加一个require就很麻烦，于是写了个index.js来遍历文件夹，进行动态引入。以后写好js，就不用再手动require了。之前都运行正常的，最近再运行时发现一直报错，require异常。后来打印遍历的fileName，发现居然有 .DS_Store 文件，require这个文件时错误。这个文件属于mac系统自动生成的文件，之前都没有的。在程序中过滤调这个文件即可。",
  "keywords": "node遍历文件夹下的文件时需要过滤.DS_Store隐藏文件",
  "category": "前端工程化"
}
---

# node遍历文件夹下的文件再require对应的文件出错，要注意.DS_Store隐藏文件

在使用koa mock接口时，一个模块有很多接口，就写了十几个js，每个js对应一个接口数据。如果每增加一个接口，再添加一个require就很麻烦，于是写了个index.js来遍历文件夹，进行动态引入。以后写好js，就不用再手动require了。之前都运行正常的，最近再运行时发现一直报错，require异常。后来打印遍历的fileName，发现居然有 .DS_Store 文件，require这个文件时错误。这个文件属于mac系统自动生成的文件，之前都没有的。在程序中过滤调这个文件即可。

mock目录结构如下:

```bash
# 目录结构
mock
├── pm
│   ├── index.js # 入口
│   ├── 接口1.js
│   ├── 接口2.js
│   └── 接口n.js
├── user 
├── product
└── sever.js # 入口文件，require('./pm/index.js')(router) 将接口添加到路由
```

pm/index.js 代码如下：

```js
const fs = require('fs')

module.exports = router => {
  fs.readdirSync(__dirname).forEach(fileName => {
    if (fileName === 'index.js' || fileName.startsWith('.')) return
    require('./' + item)(router)
  })
}
```
