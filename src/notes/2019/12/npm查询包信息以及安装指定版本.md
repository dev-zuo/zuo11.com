---
{
  "title": "npm查询包信息以及安装指定版本",
  "staticFileName": "npm_package_info.html",
  "author": "guoqzuo",
  "createDate": "2019/12/17",
  "description": "当我们需要安装某个npm包的指定版本时，我们可以使用 npm view 先查看某个包的一些版本信息，npm install时，可以通过在包名后面加@版本号来指定安装对应的版本",
  "keywords": "npm查询包信息,npm安装指定版本,npm install以及加参数后的一些区别",
  "category": "前端工程化"
}
---

# npm查询包信息以及安装指定版本

当我们需要安装某个npm包的指定版本时，我们可以使用 npm view 先查看某个包的一些版本信息，npm install时，可以通过在包名后面加@版本号来指定安装对应的版本

```bash
# npm view -h  帮助文档
npm view [<@scope>/]<pkg>[@<version>] [<field>[.subfield]...]

aliases: v, info, show

# npm 查询某个包的信息：最新版本、tags记录、github地址等
npm view 某个包名

# 安装指定版本
npm install 某个包名@版本号
```

## npm install以及加参数后的一些区别

### npm install moduleName
1. 安装模块到项目node_modules目录下。
2. 不会将模块依赖写入devDependencies或dependencies 节点。
3. 运行 npm install 初始化项目时不会下载模块。

### npm install -g moduleName
1. 安装模块到全局，不会在项目node_modules目录中保存模块包。
2. 不会将模块依赖写入devDependencies或dependencies 节点。
3. 运行 npm install 初始化项目时不会下载模块。

### npm install -save moduleName
1. 安装模块到项目node_modules目录下。
2. 会将模块依赖写入dependencies 节点。
3. 运行 npm install 初始化项目时，会将模块下载到项目目录下。
4. 运行npm install --production或者注明NODE_ENV变量值为production时，会自动下载模块到node_modules目录中。

### npm install -save-dev moduleName
1. 安装模块到项目node_modules目录下。
2. 会将模块依赖写入devDependencies 节点。
3. 运行 npm install 初始化项目时，会将模块下载到项目目录下。
4. 运行npm install --production或者注明NODE_ENV变量值为production时，不会自动下载模块到node_modules目录中。

对于只有在开发中使用的，比如node中间件、gulp、压缩css、js的模块，可以使用 --save-dev形式安装，如果线上代码必须依赖的模块，需要使用--save