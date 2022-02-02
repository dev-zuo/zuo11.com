---
{
  "title": "AMD、UMD、CommonJS、ES Modules的理解",
  "staticFileName": "amd_umd_commonjs.html",
  "author": "guoqzuo",
  "createDate": "2020/11/23",
  "description": "在 ES6 之前，JS 本身没有模块功能，社区出现了 CommonJS 和 AMD 等模块方案。从 ES6 开始, JS 开始原生支持模块，一般称之为 ES Modules。- CommonJS: 主要用于服务端，是 node 中使用的 require、module.exports。从 Node.js v13.2 版本开始，Node.js 已经默认打开了 ES6 模块支持。但需要采用 .mjs 后缀文件名。如果不希望将后缀名改成.mjs，可以在项目的package.json文件中，指定type字段为module。- AMD: Asynchronous Module Definition，异步模块定义，主要用于客户端(浏览器)，以 RequireJS 为代表 define、require -  UMD: Universal Module Definition，通用模块定义模式，主要用来解决 CommonJS 模式和 AMD 模式代码不能通用的问题，并同时还支持老式的全局变量规范。",
  "keywords": "AMD,UMD,CommonJS,ES Modules",
  "category": "前端工程化"
}
---
# AMD、UMD、CommonJS、ES Modules的理解
在 ES6 之前，JS 本身没有模块功能，社区出现了 CommonJS 和 AMD 等模块方案。从 ES6 开始, JS 开始原生支持模块，一般称之为 ES Modules。

- CommonJS: 主要用于服务端，是 node 中使用的 require、module.exports。从 Node.js v13.2 版本开始，Node.js 已经默认打开了 ES6 模块支持。但需要采用 .mjs 后缀文件名。如果不希望将后缀名改成.mjs，可以在项目的package.json文件中，指定type字段为module。
- AMD: Asynchronous Module Definition，异步模块定义，主要用于客户端(浏览器)，以 RequireJS 为代表 define、require
- UMD: Universal Module Definition，通用模块定义模式，主要用来解决 CommonJS 模式和 AMD 模式代码不能通用的问题，并同时还支持老式的全局变量规范。
- ES Modules 是 ES 标准模块系统，import、export ，可以和 CommonJS 混合使用

```js
/*
 * bundle.js  UMD webpack打包后的js
 * 判断define为函数，并且是否存在define.amd，来判断是否为AMD规范,
 * 判断module是否为一个对象，并且是否存在module.exports来判断是否为CommonJS规范
 * 如果以上两种都没有，设定为原始的代码规范。
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.myBundle = factory());
}(this, (function () { 'use strict';

    var main = () => {
        return 'hello world';
    };

    return main;

})));
// index.html
<script src="bundle.js"></script>
<script>
  console.log(myBundle());
</script>
```

区别:
1. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。CommonJS一旦输出一个值，模块内部的变化就影响不到这个值。ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。
2. CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。因为 CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。
3. CommonJS 模块的require()是同步加载模块，ES6 模块的import命令是异步加载，有一个独立的模块依赖的解析阶段。

```js
// CommonJS模块
let { stat, exists, readfile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;

// ES6模块
import { stat, exists, readFile } from 'fs';
```

参考
- [《模块化系列》彻底理清 AMD,CommonJS,CMD,UMD,ES6](https://zhuanlan.zhihu.com/p/108217164)
- [Module 的语法 | ES6入门](https://es6.ruanyifeng.com/#docs/module)
- [Module 的加载实现 | ES6入门](https://es6.ruanyifeng.com/#docs/module-loader)