
# 为什么vconsole直接new一下就能引入，实现原理是什么？

在移动端真机调试时，一般会用到vconsole，那你会发现在vue中vconsole的引入非常简单，只需要在main.js里面引入，并new一下。相比其他组件需要Vue.use引入来说，会很迷惑，这个是怎么引入到项目的？页面底部时怎么显示vconsole的按钮的？

```js
// main.js
import VConsole from "vconsole";
new VConsole();
```

先来看结论，vconsole大致实现思路
1. 通过window监听页面加载，加载ok后向页面append vconsle相关的dom（右下角按钮）
2. 像log、network等相关的渲染显示，都是通过重写window下对应的系统方法来加入一些自定义操作

下面我们看看vconsole的源码，看看到底是怎么实现的：

## VConsole构造函数
入口在 src/core/core.js，有一个VConsole的class，可以看到这里用了单例模式，只允许有一个vconsole
```js
// src/core/core.js
// ...
class VConsole {

  constructor(opt) {
    if (!!$.one(VCONSOLE_ID)) {
      console.debug('vConsole is already exists.');
      return;
    }
    // ....
// ...
```
Log、System、Network、Element、Storage都是单独的模块
```js
// src/core/core.js
// ...
// built-in plugins
import VConsolePlugin from '../lib/plugin.js';
import VConsoleLogPlugin from '../log/log.js';
import VConsoleDefaultPlugin from '../log/default.js';
import VConsoleSystemPlugin from '../log/system.js';
import VConsoleNetworkPlugin from '../network/network.js';
import VConsoleElementPlugin from '../element/element.js';
import VConsoleStoragePlugin from '../storage/storage.js';
// ...
```
### 加载右下角按钮逻辑
constructor 里面挂载dom的方法如下，直接监听window的事件，当确定页面加载ok后，再将vconsole相关dom挂载上去
```js
// src/core/core.js
// ...
// try to init
let _onload = function() {
  if (that.isInited) {
    return;
  }
  that._render();
  that._mockTap();
  that._bindEvent();
  that._autoRun();
};
if (document !== undefined) {
  if (document.readyState === 'loading') {
    $.bind(window, 'DOMContentLoaded', _onload);
  } else {
    _onload();
  }
} else {
  // if document does not exist, wait for it
  let _timer;
  let _pollingDocument = function() {
    if (!!document && document.readyState == 'complete') {
      _timer && clearTimeout(_timer);
      _onload();
    } else {
      _timer = setTimeout(_pollingDocument, 1);
    }
  };
  _timer = setTimeout(_pollingDocument, 1);
}
```

## log模块：系统console方法重写加拦截
下面看看console是怎么拦截的，通过下面的代码我们可以看到重写了window.console.log/info/warn等方法，改为执行自己的printLog方法，用于记录log，并渲染到vconsole面板里
```js
// src/log/log.js
// ...
/**
 * replace window.console with vConsole method
 * @private
 */
mockConsole() {
  const that = this;
  const methodList = ['log', 'info', 'warn', 'debug', 'error'];

  if (!window.console) {
    window.console = {};
  } else {
    methodList.map(function (method) {
      that.console[method] = window.console[method];
    });
    that.console.time = window.console.time;
    that.console.timeEnd = window.console.timeEnd;
    that.console.clear = window.console.clear;
  }

  methodList.map(method => {
    window.console[method] = (...args) => {
      this.printLog({
        logType: method,
        logs: args,
      });
    };
  });
```
当vconsole remove后，还原现场
```js
// src/log/log.js
// ...
/**
 * before remove
 * @public
 */
onRemove() {
  window.console.log = this.console.log;
  window.console.info = this.console.info;
  window.console.warn = this.console.warn;
  window.console.debug = this.console.debug;
  window.console.error = this.console.error;
  window.console.time = this.console.time;
  window.console.timeEnd = this.console.timeEnd;
  window.console.clear = this.console.clear;
  this.console = {};

  const idx = ADDED_LOG_TAB_ID.indexOf(this.id);
  if (idx > -1) {
    ADDED_LOG_TAB_ID.splice(idx, 1);
  }
}
```
## network模块：重写XMLHttpRequest方法加请求拦截
我们再来看看Network相关，也是重写了原生的window.XMLHttpRequest.prototype.open/send等方法，在里面加入了拦截逻辑
```js
// src/network/network.js
/**
 * mock ajax request
 * @private
 */
mockAjax() {
  let _XMLHttpRequest = window.XMLHttpRequest;
  if (!_XMLHttpRequest) { return; }

  let that = this;
  let _open = window.XMLHttpRequest.prototype.open,
      _send = window.XMLHttpRequest.prototype.send;
  that._open = _open;
  that._send = _send;

  // mock open()
  window.XMLHttpRequest.prototype.open = function() {
    let XMLReq = this;
    let args = [].slice.call(arguments),
  // ...
  // mock send()
  window.XMLHttpRequest.prototype.send = function() {
    let XMLReq = this;
    let args = [].slice.call(arguments),
        data = args[0];
```

完整源码可以先npm install vconsole后再在node_modules里面查看，或者在github上看 [vconsole - github](https://github.com/Tencent/vConsole)

