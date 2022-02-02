---
{
  "title": "什么是yarn",
  "staticFileName": "yarn.html",
  "author": "guoqzuo",
  "createDate": "2019/11/15",
  "description": "Yarn 是一个快速、可靠、安全的依赖管理工具。是 NPM 的替代品。今天看看了ts实战指南这本书，里面是这样介绍Yarn的：Yarn [jɑːn] 是facebook，google等公司共同开发的一款新的js包管理工具，并没有试图完全取代npm，Yarn同样是从npm获取包。存在的目的是：解决团队使用npm面临的少数问题，如版本锁定，并行安装、文案输出等",
  "keywords": "什么是yarn,yarn基本用法,macos安装yarn",
  "category": "前端工程化"
}
---
# 什么是yarn

Yarn 是一个快速、可靠、安全的依赖管理工具。是 NPM 的替代品。今天看看了ts实战指南这本书，里面是这样介绍Yarn的：

Yarn [jɑːn] 是facebook，google等公司共同开发的一款新的js包管理工具，并没有试图完全取代npm，Yarn同样是从npm获取包。存在的目的是：解决团队使用npm面临的少数问题，如版本锁定，并行安装、文案输出等

## macos安装Yarn方法
```js
brew install yarn
```

## Yarn基本用法
```bash
# 初始化一个新项目
yarn init
# 添加依赖包
yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]
# 添加到不同依赖类别
yarn add [package] --dev
yarn add [package] --peer
yarn add [package] --optional
# 更新依赖包
yarn upgrade [package]
yarn upgrade [package]@[version]
yarn upgrade [package]@[tag]
# 移除依赖包
yarn remove [package]
# 安装项目的全部依赖
yarn 或者 yarn install
```

参考: [yarn 官方文档](https://yarn.bootcss.com/)