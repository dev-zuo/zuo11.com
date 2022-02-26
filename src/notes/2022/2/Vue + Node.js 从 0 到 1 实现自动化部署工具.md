# Vue + Node.js 从 0 到 1 实现自动化部署工具

## 目录结构
```bash
├── bin # 命令行工具命令
│   ├── start.js # zuodeploy start 执行入口
│   └── zuodeploy.js # zuodeploy 命令入口，在 package.json 的 bin 属性中配置
├── docImages # README.md 文档图片 
├── frontend # 客户端页面/前端操作页面（koa-static 静态服务指定目录）
│   └── index.html # Vue + ElementUI + axios + socket.io
├── server # 服务端
│   ├── utils
│   │   ├── logger.js # log4js 
│   │   └── runCmd.js # node child_process spawn（执行 shell 脚本、pm2 服务开启）
│   └── index.js # 主服务（koa 接口、静态服务 + socket + 执行 shell 脚本）
├── .eslintrc.cjs # eslint 配置文件 + prettier
├── args.json # 用于 pm2 改造后，跨文件传递端口、密码参数
├── CHANGELOG.md # release 版本功能迭代记录
├── deploy-master.sh # 用于测试，当前目录开启服务偶，点击部署按钮，执行该脚本
├── index.js # zuodeploy start 执行文件，用于执行 pm2 start server/index.js 主服务 
├── package.json # 项目描述文件，npm 包名、版本号、cli 命令名称、
├── publish.sh # npm publish（npm包） 发布脚本
└── README.md # 使用文档
```

## 前后端技术栈、先关依赖
- 前端/客户端
  - 静态 html + css，非前端工程化，库都以 cdn 形式引入，通过库暴露的 CommonJS 全局变量使用
  - vue3，MVVM 框架，不用操作 dom
  - element-plus，基础表单样式统一、美化
  - axios，请求接口
  - socket.io，接收实时部署 log
- 服务端
  - 基于 Node.js 技术栈，无数据库
  - commander，用于生成的命令 zuodeploy 运行时帮助文档、提示，zuodeploy start 执行入口
  - prompts，参照 vue-create，引导用户输入端口、密码
  - koa，http 服务端, 提供接口、静态服务运行容器（类似 nginx、tomcat 等）
  - koa-bodyparser，用于解析 post 请求参数（login 鉴权接口需要）
  - koa-router，用于不同接口（路径，比如 /login, /deploy等）执行不同的方法
  - koa-session，用于接口鉴权，防止他人获取到部署接口后疯狂请求部署
  - koa-static，静态服务器，类似 nginx 启动静态服务
  - socket.io，socket 服务端，当 git pull, npm run build 部署时间较长时，实时发送 log 到前端
    - 普通接口，可能需要等完全部署好后，才能拿到结果
  - log4js，带时间戳的 log 输出
  - pm2，直接执行，当 terminal 结束服务会被关掉，用 pm2 以后台方式静默执行

## 前端/客户端具体功能
## 服务端具体功能
### commander

## 一些问题
### 为什么封装成 npm 包，使用命令行工具开启服务
主要是简单易用，如果不使用命令行工具形式，需要三步：
1. 先下载代码到服务器
2. npm install
3. node index.js 或者 pm2 start index.js -n xxx 开启服务

改成 npm 包命令行工具形式只需要下面两步，而且更节省时间
1. npm install zuo-deploy pm2 -g
2. zuodeploy start 会自动使用 pm2 开启服务

### 前端/客户端为什么只有一个 html 没有使用工程化
1. 功能比较简单、只有部署按钮、部署 log 查看区域、鉴权（输入密码）区域
2. 便于部署，直接 koa-static 开启静态服务即可访问，无需打包构建

### 为什么从 type: module 改为普通的 CommonJS
package.json 里面配置 type: module 后默认使用 ES Modules，有些 node 方法会有一些问题

虽然可以通过修改文件后缀为 .cjs 来解决，但文件多了，还不如直接去掉 type: module 使用 node 默认包形式

1. `__dirname` 报错。`__dirname` 对于 cli 项目来讲非常重要。当你需要使用当前项目内文件，而非 zuodeploy start 执行时所在目录的文件时，需要使用 __dirname
2. require("../package.json") 改为 import xx from '../package.json' 引入 JSON 文件时会出错