
# sessionStorage和localstorage的区别

sessionStorage和localstorage都属于Web Storage，在JS高程3中有讲，这里来回顾下，一般sessionStorage关闭浏览器后会消失，localstorage不会。

## web存储机制(Web Storage)
Web Storage的目的是克服cookie的限制，当数据需要严格控制在客户端时，无需持续的将数据发回服务器，IE8+支持, Web Storage的两个主要目标是:
- 提供了一种cookie之外存储会话数据的途径
- 提供了一种存储大量可以跨会话存在的数据机制

## Storage类型
Storage类型（localStorage、sessionStorage）提供最大的存储空间来存储键值对数据。Storage类型只能存储字符串，非字符串存储前需要转换为字符串。Storage实例与其对象有如下方法:
```js
setItem(name, value) // 设置键值对
getItem(name) // 根据指定的名字name获取对应的值，如果没值返回null
removeItem(name) // 删除指定name的值。
clear() // 删除所有值
key(index) // 获取index位置处的key的名称, 可以用来遍历值
lenth // 获取键值对数量
.name // 点语法支持，设置或获取值
```
## sessionStorage
sessionStorage数据浏览器关闭后，会消失。主要用于仅针对会话的小段数据存储。2.5M - 5M
```js
// MDN
sessionStorage maintains a separate storage area for each given origin that's available for the duration of the page session (as long as the browser is open, including page reloads and restores)
- Stores data only for a session, meaning that the data is stored until the browser (or tab) is closed.
- Data is never transferred to the server.
- Storage limit is larger than a cookie (at most 5MB).
```

## localStorage
修订过的HTML5规范中，localStorage取代globalStorage，作为持久保存客户端的数据的方案。要访问同一个localStorage对象，页面必须来自同一个域名(子域名无效)。使用同一种协议，同一个端口， 2.5M - 5M，localStorage没有过期时间，如果想要这个功能，那只能自己封装函数来实现了。

```js
// MDN
localStorage does the same thing, but persists even when the browser is closed and reopened.
- Stores data with no expiration date, and gets cleared only through JavaScript, or clearing the Browser cache / Locally Stored Data.
- Storage limit is the maximum amongst the three.
```

## storage事件
```js
// 单个页面里面storage事件不会触发，需要由其他tab页面触发, 触发的条件：
// - 同一浏览器打开了两个同源页面
// - 其中一个页面修改了localStorage或sessionStorage
// - 另一个网页注册了这个事件
// 参考资料: Storage事件无法触发解决(https://blog.csdn.net/jlin991/article/details/55855524)
window.addEventListener('storage', function (event) {
  console.log('storage chage');
  console.log(event);
}, false);
```

参考
-  [sessionStorage - JS高程3笔记](https://www.yuque.com/guoqzuo/js_es6/sp2k81#sessionStorage)
- [Window.sessionStorage - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/sessionStorage)
- [Window.localStorage - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage)