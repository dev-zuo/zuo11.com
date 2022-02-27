---
{
  "title": "Vue + Node.js 从 0 到 1 实现自动化部署工具",
  "staticFileName": "zuo_deploy_think.html",
  "author": "guoqzuo",
  "createDate": "2022/02/28",
  "description": "最近写了一个自动化部署的 npm 包 zuo-deploy。客户端 Vue + ElementUI，服务 koa + socket + koa-session 等。已开源在 github。zuoxiaobai/zuo-deploy 欢迎 Star、Fork。这里介绍下具体实现细节、思路。",
  "keywords": "自动化部署,js实现CICD,CI,CD,部署工具,zuo-deploy,实现自动化部署,node执行shell脚本",
  "category": "运维部署与版本控制"
}
---
# Vue + Node.js 从 0 到 1 实现自动化部署工具
最近写了一个自动化部署的 npm 包 zuo-deploy。客户端 Vue + ElementUI，服务 koa + socket + koa-session 等。已开源在 github。zuoxiaobai/zuo-deploy 欢迎 Star、Fork。这里介绍下具体实现细节、思路。
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

## 前后端技术栈、相关依赖
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

## 基础功能实现思路
最初目标：前端页面点击部署按钮，可以直接让服务器执行部署，并将部署 log 返回给前端

怎么去实现？
- 1.要有一个前端页面，给出 部署 按钮，日志显示区域。
- 2.前端页面与服务器交互，必须要有一个服务端 server
  - 2.1 提供接口，前端页面点击部署，请求该接口，知道什么时候要执行部署，
  - 2.2 后端接口接收到请求后，怎么执行部署任务，
  - 2.3 shell 脚本执行的 log，怎么搜集并发送给前端。同上，spawn 支持 log 输出

技术栈确定：
- 1.Vue + ElementUI 基本页面布局+基本逻辑，axios 请求接口数据
- 2.使用 node 技术栈来提供 服务端 server
  - 2.1 使用 koa/koa-router 实现接口
  - 2.2 部署一般是执行 shell 脚本，node 使用内置子进程 spawn 可以执行 shell 脚本文件、跑 terminal 下运行的命令操作
  - 2.3 spawn 执行时，子进程 stdout, stderr 可以获取到脚本执行 log，收集后返回给前端

考虑到前端页面的部署问题，可以与 koa server 服务放到一起，使用 koa-static 开启静态文件服务，支持前端页面访问

这里不使用前端工程化 `@vue/cli` ，直接使用静态 html，通过 cdn 引入 vue 等

### 1.客户端 Vue+ElementUI+axios
前端服务我们放到 frontend/index.html，koa-static 静态服务直接指向 frontend 目录就可以访问页面了

![前端基本按钮log区域](../../../images/blog/zuoDeploy/fe-base.png)

核心代码如下：

> 注意：cdn 链接都是 // 相对路径，需要使用 http 服务打开页面，不能以普通的 File 文件形式打开！可以等到后面 koa 写好后，开启服务再访问

```html
<head>
  <title>zuo-deploy</title>
  <!-- 导入样式 -->
  <link rel="stylesheet" href="//unpkg.com/element-plus/dist/index.css" />
  <!-- 导入 Vue 3 -->
  <script src="//unpkg.com/vue@next"></script>
  <!-- 导入组件库 -->
  <script src="//unpkg.com/element-plus"></script>
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
</head>

<body>
  <div id="app" style="margin:0 20px;">
    <el-button type="primary" @click="deploy">部署</el-button>
    <div>
      <p>部署日志:</p>
      <div class="text-log-wrap">
        <pre>{{ deployLog }}</pre>
      </div>
    </div>
  </div>
  <script>
    const app = {
      data() {
        return {
          deployLog: '点击按钮进行部署',
        }
      },
      methods: {
        deploy() {
          this.deployLog = '后端部署中，请稍等...'
          axios.post('/deploy')
            .then((res) => {
              // 部署完成，返回 log
              console.log(res.data);
              this.deployLog = res.data.msg
            })
            .catch(function (err) {
              console.log(err);
            })
        }
      }
    }

    Vue.createApp(app).use(ElementPlus).mount('#app')
  </script>
</body>
```
### 2.服务端koa+koa-router+koa-static
koa 开启 http server，写 deploy 接口处理。koa-static 开启静态服务

```js
// server/index.js
const Koa = require("koa");
const KoaStatic = require("koa-static");
const KoaRouter = require("koa-router");
const path = require("path");

const app = new Koa();
const router = new KoaRouter();

router.post("/deploy", async (ctx) => {
  // 执行部署脚本
  let execFunc = () => {};
  try {
    let res =  await execFunc();
    ctx.body = {
      code: 0,
      msg: res,
    };
  } catch (e) {
    ctx.body = {
      code: -1,
      msg: e.message,
    };
  }
});

app.use(new KoaStatic(path.resolve(__dirname, "../frontend")));
app.use(router.routes()).use(router.allowedMethods());
app.listen(7777, () => console.log(`服务监听 ${7777} 端口`));
```
将项目跑起来

1. 在当前项目目录，执行 `npm init` 初始化 package.json
2. `npm install koa koa-router koa-static --save` 安装依赖包
3. `node server/index.js` 运行项目，注意如果 7777 端口被占用，需要换一个端口

访问 http:// 127.0.0.1:7777 就可以访问页面，点击部署就可以请求成功了

![后端koa基本服务](../../../images/blog/zuoDeploy/node-base.png)

### 3.Node执行shell脚本并输出log到前端
node 内置模块 child_process 下 spawn 执行 terminal 命令，包括执行 shell 脚本的 `sh 脚本文件.sh` 命令 

下来看一个 demo，新建一个 testExecShell 测试目录，测试效果
```js
// testExecShell/runCmd.js
const { spawn } = require('child_process');
const ls = spawn('ls', ['-lh', '/usr']); // 执行 ls -lh /usr 命令

ls.stdout.on('data', (data) => {
  // ls 产生的 terminal log 在这里 console
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  // 如果发生错误，错误从这里输出
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  // 执行完成后正常退出就是 0 
  console.log(`child process exited with code ${code}`);
});
```
运行 `node testExecShell/runCmd.js` 就可以使用 node 执行 `ls -lh /usr`，并通过 ls.stdout 接收到 log 信息并打印

![测试node执行ls命令](../../../images/blog/zuoDeploy/testShellLs.png)

回到正题，这里需要执行 shell 脚本，可以将 `ls -lh /usr` 替换为 `sh 脚本文件.sh` 即可。下面来试试

```js
// testExecShell/runShell.js
const { spawn } = require('child_process');
const child = spawn('sh', ['testExecShell/deploy.sh']); // 执行 sh deploy.sh 命令

child.stdout.on('data', (data) => {
  // shell 执行的 log 在这里搜集，可以通过接口返回给前端
  console.log(`stdout: ${data}`);
});

child.stderr.on('data', (data) => {
  // 如果发生错误，错误从这里输出
  console.error(`stderr: ${data}`);
});

child.on('close', (code) => {
  // 执行完成后正常退出就是 0 
  console.log(`child process exited with code ${code}`);
});
```
创建执行的 shell 脚本，可以先 `sh estExecShell/deploy.sh` 试试是否有可执行，如果没执行权限，就添加（chmod +x 文件名）
```bash
# /testExecShell/deploy.sh
echo '执行 pwd'
pwd
echo '执行 git pull'
git pull
```
运行 `node testExecShell/runShell.js` 就可以让 node 执行 deploy.sh 脚本了，如下图

![node执行shell脚本](../../../images/blog/zuoDeploy/node-exec-shell.png)

参考：[child_process - Node.js 内置模块笔记](http://fe.zuo11.com/node/node-doc.html#child-process)

### 4.deploy接口集成执行shell脚本功能
修改之前的 deploy 接口，加一个 runCmd 方法，执行当前目录的 deploy.sh 部署脚本，完成后接口将执行 log 响应给前端
```js
// 新建 server/indexExecShell.js，将 server/index.js 内容拷贝进来，并做如下修改
const rumCmd = () => {
  return new Promise((resolve, reject) => {
    const { spawn } = require('child_process');
    const child = spawn('sh', ['deploy.sh']); // 执行 sh deploy.sh 命令

    let msg = ''
    child.stdout.on('data', (data) => {
      // shell 执行的 log 在这里搜集，可以通过接口返回给前端
      console.log(`stdout: ${data}`);
      // 普通接口仅能返回一次，需要把 log 都搜集到一次，在 end 时 返回给前端
      msg += `${data}`
    });

    child.stdout.on('end', (data) => {
      resolve(msg) // 执行完毕后，接口 resolve，返回给前端
    });

    child.stderr.on('data', (data) => {
      // 如果发生错误，错误从这里输出
      console.error(`stderr: ${data}`);
      msg += `${data}`
    });

    child.on('close', (code) => {
      // 执行完成后正常退出就是 0 
      console.log(`child process exited with code ${code}`);
    });
  })
}

router.post("/deploy", async (ctx) => {
  try {
    let res =  await rumCmd(); // 执行部署脚本
    ctx.body = {
      code: 0,
      msg: res,
    };
  } catch (e) {
    ctx.body = {
      code: -1,
      msg: e.message,
    };
  }
});
```

修改完成后，运行 `node server/indexExecShell.js` 开启最新的服务，点击部署，接口执行正常，如下图

![node deploy no file](../../../images/blog/zuoDeploy/deploy-no-file.png)

执行的是当前目录的 deploy.sh，没有对应的文件。将上面 testExeclShell/deploy.sh 放到当前目录再点击部署

![node执行shell脚本](../../../images/blog/zuoDeploy/deploy-sh-log.png)

这样自动化部署基础功能基本就完成了。

## 功能优化
### 1.使用 socket 实时输出 log
上面的例子中，普通接口登台部署 shell 执行完成后再响应给前端，如果 git pull、npm run build 时间较长就会导致前端页面一直没log信息，如下图

![node执行shell脚本](../../../images/blog/zuoDeploy/deploy-pending.png)

这里我们改造下，使用 socket.io 来实时将部署 log 发送给前端。
### 2.部署接口添加鉴权
### 3.封装成一个npm包cli工具
### 4.稳定性提高-pm2改造
## 一些问题
### 前端/客户端为什么只有一个 html 没有使用工程化
1. 前端工程化方式组织代码比较重，没必要
2. 这里功能比较简单、只有部署按钮、部署 log 查看区域、鉴权（输入密码）区域
3. 便于部署，直接 koa-static 开启静态服务即可访问，无需打包构建

### 为什么封装成 npm 包，使用命令行工具开启服务
主要是简单易用，如果不使用命令行工具形式，需要三步：
1. 先下载代码到服务器
2. npm install
3. node index.js 或者 pm2 start index.js -n xxx 开启服务

改成 npm 包命令行工具形式只需要下面两步，而且更节省时间
1. npm install zuo-deploy pm2 -g
2. zuodeploy start 会自动使用 pm2 开启服务

### 为什么从 type: module 改为普通的 CommonJS
package.json 里面配置 type: module 后默认使用 ES Modules，有些 node 方法会有一些问题

虽然可以通过修改文件后缀为 .cjs 来解决，但文件多了，还不如直接去掉 type: module 使用 node 默认包形式

1. `__dirname` 报错。`__dirname` 对于 cli 项目来讲非常重要。当你需要使用当前项目内文件，而非 zuodeploy start 执行时所在目录的文件时，需要使用 __dirname
2. require("../package.json") 改为 import xx from '../package.json' 引入 JSON 文件时会出错