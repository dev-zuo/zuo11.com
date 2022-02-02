---
{
  "title": "npx create-react-app my-app 是什么意思？npx 有什么作用？",
  "staticFileName": "npx_use.html",
  "author": "guoqzuo",
  "createDate": "2021/04/03",
  "description": "在 react 官网，介绍 create-react-app 构建工具时，直接使用 npx create-react-app my-app 就可以直接创建一个 react 项目的脚手架，那 npx 命令执行和普通的 create-react-app my-app 有什么区别呢？下面来看看",
  "keywords": "npx 用法,npx 有什么用,npx create-react-app",
  "category": "前端工程化"
}
---
# npx create-react-app my-app 是什么意思？npx 有什么作用？

在 react 官网，介绍 create-react-app 构建工具时，直接使用 npx create-react-app my-app 就可以直接创建一个 react 项目的脚手架，那 npx 命令执行和普通的 create-react-app my-app 有什么区别呢？下面来看看

在之前介绍 [不全局安装npm包，怎么在项目目录下局部执行对应的命令](http://www.zuo11.com/blog/2020/11/npm_cmd_part.html) 中提到过三种方法
- npm run xxx
- npx 命令
- ./node_modules/.bin/命令

**npx 命令可以运行当前项目下的局部命令，而不用添加到 "scripts" 配置中**，相当于使用 `./node_modules/.bin/xx`。

**另外它可以直接从 npm 官方库中远程拉取包，并执行对应的命令**，避免使用命令前需要全局安装或局部安装该命令才能运行。

`npx create-react-app my-app` 运行时，会将 `create-react-app` 下载到一个临时的目录，使用该命令执行 `create-react-app my-app`，完成后再删除 `create-react-app`。另外 npx 下载包时还可以指定版本，比如

```bash
# 从 npm 拉取 uglify-js 的 3.1.0 版本，并对 main.js 执行混淆压缩，输出到 main.js
npx uglify-js@3.1.0 main.js -o ./dist/main.js
```

更多 npx 使用方法，参考: [npx 使用教程 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2019/02/npx.html)