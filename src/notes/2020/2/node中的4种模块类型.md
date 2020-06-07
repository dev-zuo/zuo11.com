

# node中的4种模块类型

Node.js的模块化使用CommonJS规范：module.exports导出，require引入。在node中你会发现在使用某个模块时，有时候需要require，有时候不需要；有时候需要npm install，有时候不需要，这是为什么呢？下面来看看

## 核心模块 
require都不需要直接使用，比如global、buffer、module、process等

## 内置模块 
需要require才能使用，不需要npm install，比如：os、fs、path、http、util等

## 第三方模块 
不仅需要require，还需要npm install才能使用，比如: download-git-repo、ora、commander等

## 本地自己写的模块
自己写的模块一般require就行，但如果里面包含了需要npm install的包，也需要安装
