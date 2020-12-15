# JS 事件循环, Promise.then 与 setTimeout 执行顺序问题
来看一个 demo 的执行顺序
```js
setTimeout(function() {
  console.log(1);
}, 0);
new Promise(function executor(resolve) {
  console.log(2);
  for( var i=0 ; i<10000 ; i++ ) {
    i === 9999 && resolve();
  }
  console.log(3);
}).then(function() {
  console.log(4);
});
console.log(5);
```
执行顺序是：2 3 5 4 1，我们知道 setTimeout 与 Promise.then 的回调都是异步的。setTimeout 的执行函数是先 push 到任务队列的，而 Promise.then 的回调是后面 push 的。为什么 Promise.then 的回调先执行呢？这里涉及到 JS 事件循环中 **宏任务** 与 **微任务**。

- 宏任务：同步任务、I/O(比如文件读写等)、setTimeout、setInterval、requestAnimationFrame 等
- 微任务：Promise.then/catch/finally、generator、async/await、MutationObserver 等

某个宏任务执行 ok 后，会先看微任务事件队列里是否有任务，有就执行，然后才是宏任务队列。

参考：[js 事件循环消息队列和微任务宏任务](https://www.cnblogs.com/xingguozhiming/p/13276725.html)
