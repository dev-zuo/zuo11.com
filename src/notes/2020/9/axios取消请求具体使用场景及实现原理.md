# axios取消请求具体使用场景及实现原理
取消请求在前端有时候会用到，以下是两个工作中可能会用到的场景
1. tab切换时刷新某个列表数据，如果他们共用一个变量存储数据列表，当请求有延时，可能会导致两个tab数据错乱
2. 导出文件或下载文件时，中途取消

下面来看看axios是怎么取消请求的，以及对应的原理

```js
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

// get 方法 假设这个接口需要50s才返回
axios.get('/user/12345', {
  cancelToken: source.token
}).catch(function (thrown) {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message);
  } else {
    // handle error
  }
});

// post 方法时 假设这个接口需要50s才返回
// axios.post('/user/12345', {
//   name: 'new name'
// }, {
//   cancelToken: source.token
// })

// 3庙后取消请求
setTimeout(() => {
  // cancel the request (the message parameter is optional)
  source.cancel('Operation canceled by the user.');
}, 3000)
```

## axios是怎么实现取消请求的
本质上axios是对 XMLHttpRequest 的封装，取消请求时，使用XMLHttpRequest实例的 abort() 方法即可取消请求。

我们在node_modules里面axios目录下搜索 abort 即可找到对应的源码

```js
// 源码截取至 https://github.com/axios/axios/blob/master/lib/adapters/xhr.js
if (config.cancelToken) {
  // Handle cancellation
  config.cancelToken.promise.then(function onCanceled(cancel) {
    if (!request) {
      return;
    }

    request.abort();
    reject(cancel);
    // Clean up request
    request = null;
  });
}
```

参考：[axios cancellation | github](https://github.com/axios/axios#cancellation)