# npm run start 为什么可以简写为 npm start，npm run start 与 npm start 区别

在一些项目中发现项目启动命令是 npm start，但一般启动都是 npm run xxx，而 npm start 有点像 npm run start 的简写，于是就想着他们之间有什么关系，其它的命令是否也可以简写。下面来具体看看 npm start 与 npm run start.


一般在 node 项目中，npm run xxx 会执行 package.json 配置中 "scripts" 字段中对应的命令，可以用于创建某些命令的快捷执行方式。比如在下面的例子中

```js
// package.json
{
  "scripts": {
    "start": "node foo.js",
    "dev" "node dev.js",
    "build": "vuepress build docs"
  }
}
```
npm run dev 相当于 node dev.js 命令的快捷方式。另外它还可以**用于在未全局安装某个命令时，项目内局部运行命令**。上面的例子中 vuepress 命令未全局安装，仅项目内安装，要执行 vuepress 命令就需要使用 scripts 快捷方式执行了。

这里的 npm run build，相当于在项目目录下执行了 `./node_modules/.bin/vuepress build docs`

知道这些后，再回归我们的主题，npm run start 为什么可以简写为 npm start 呢？是否 npm run xxx，可以直接简写问 npm xxx 呢？

查阅了 npm 官方文档，发现 npm start 其实是内置的命令。只是巧合，并不是 npm run xxx 可以简写为 npm xxx

npm start 的运行机制，`npm start` Description

This runs a predefined command specified in the "start" property of a package's "scripts" object.

If the "scripts" object does not define a "start" property, npm will run node server.js.

它会执行 scripts 中 "start" 属性预先指定的脚本，如果 "scripts" 中没有设置 "start" 属性，那么就运行 "node server.js" 命令。

更多 npm 指令、scripts 相关，参考:
- [npm-run-script | npm Docs](https://docs.npmjs.com/cli/v7/commands/npm-run-script)
- [npm-start | npm Docs](https://docs.npmjs.com/cli/v7/commands/npm-start)