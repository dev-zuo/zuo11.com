---
{
  "title": "TypeScript error in 'AntdModal' refers to a value, but is being used as a type here",
  "staticFileName": "ts_error_yarn.html",
  "author": "guoqzuo",
  "createDate": "2021/04/03",
  "description": "在 ts + react + ant-design 的项目中，git clone 项目后，npm install 了，但 npm run serve 时一直提示 TypeScript error in 'AntdModal' refers to a value, but is being used as a type here. 在这个项目的场景下，npm install 安装的包是不全的。需要使用 yarn 来安装，具体命令如下",
  "keywords": "TypeScript error in 'AntModal',refers to a value, but is being used as a type here",
  "category": "TypeScript"
}
---
# TypeScript error in 'AntdModal' refers to a value, but is being used as a type here.

在 ts + react + ant-design 的项目中，git clone 项目后，npm install 了，但 npm run serve 时一直提示 TypeScript error in 'AntdModal' refers to a value, but is being used as a type here. 在这个项目的场景下，npm install 安装的包是不全的

**需要使用 yarn 来安装**，具体命令如下

```bash
# 全局安装 yarn
sudo npm install yarn -g
# 在项目下安装所有模块 
yarn add # 相当于 npm install 
```

这样安装后，就不会报错了，比较奇怪的一个问题。更多 Yarn 命令用法参考: [Yarn CLI 简介](https://yarn.bootcss.com/docs/cli/)