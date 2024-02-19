---
{
  "title": "axios请求拦截与响应拦截",
  "staticFileName": "http_axios_interceptors.html",
  "author": "guoqzuo",
  "createDate": "2019/10/12",
  "description": "axios提供了请求拦截与响应拦截的函数axios.interceptors，请求拦截器有什么用呢？具体怎么使用？下面来看看",
  "keywords": "axios请求拦截,axios响应拦截,axios.interceptors,axios拦截器",
  "category": "http与https"
}
---

# axios请求拦截与响应拦截

axios提供了请求拦截与响应拦截的函数axios.interceptors，请求拦截器有什么用呢？具体怎么使用？下面来看看

## 请求拦截函数 
向后台发起实际请求前，会进入axios.interceptors.request，参数config是请求的相关参数。作用如下

1. 可以对请求参数作出一些配置。**比如加一些公共参数**
2. 在函数里面可以接触发全局的loading提示，一般可以用于移动端

```js
// axios.interceptors.request.use(resolve func, reject func)
// Add a request interceptor
axios.interceptors.request.use(async function (config) {
  // Do something before request is sent
  console.log('request 拦截: ', config)
  
  // 为所有请求加一个时间戳参数
  config.url  += (config.url.includes('?') ? '&' : '?')  + 't=' + (+new Date())
  // Request URL: https://zuo11.com/getList?num=5&start=5&t=1575620590972

  await new Promise((resolve, reject) => {
    console.log('开始等待中...')
    setTimeout(()=> {
      resolve('结束等待')
    }, 5000)
  })

  return config; // 用来请求的参数
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
```
config 里的内容，包括url，method，参数等
```js
// axios.get('https://zuo11.com/getList?num=5&start=5') 请求后config内容
// 打印内容格式如下：
// {
//   "url": "https://zuo11.com/getList?num=5&start=5",
//   "data": undefined
//   "method": "get",
//   "headers": {
//     "common": {
//       "Accept": "application/json, text/plain, */*"
//     }
//   },
//   "timeout": 0,
//   "xsrfCookieName": "XSRF-TOKEN",
//   "xsrfHeaderName": "X-XSRF-TOKEN",
//   "maxContentLength": -1
// }
```

## 响应拦截函数
后端接收到请求处理后，响应给前端，axios请求 Promise状态变更，进入then后面的逻辑前，会进入响应拦截的逻辑，作用如下

1. 对某个特定的错误码处理，比如返回登录过期的code，指定重定向到登录页，而不用每次请求都处理
2. 返回数据过滤，一般返回的data位于 res.data.data 可以将结果过滤为res.data，使用更方便

```js
// axios.interceptors.response.use(resolve func, reject func)
// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  console.log('响应拦截', response)

  // 如果身份校验失败，返回登录页
  response.data.code === 111  && (window.location.href = response.data)

  return response.data // 过滤掉除data参数外的其它参数，响应接收到的值。
  // return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});
```

## 执行顺序问题

1. 先执行请求拦截（特意在拦截中加了一个阻塞5s的await）
2. 向后端发送请求
3. 触发响应拦截(这里也可能存在等待时间)
4. 最后才会执行axios请求then后面的内容

## 完整demo
代码以放到github: [axios拦截器demo - github](https://github.com/dev-zuo/fedemo/blob/master/src/DebugDemo/axios%E6%8B%A6%E6%88%AA%E5%99%A8/index.html)

```html
<!-- demo -->
<body>
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script>
    // Add a request interceptor
    axios.interceptors.request.use(async function (config) {
      // Do something before request is sent
      console.log('request 拦截: ', config)
      
      // 为所有请求加一个时间戳参数
      config.url  += (config.url.includes('?') ? '&' : '?')  + 't=' + (+new Date())
      // Request URL: https://zuo11.com/getList?num=5&start=5&t=1575620590972

      await new Promise((resolve, reject) => {
        console.log('开始等待中...')
        setTimeout(()=> {
          resolve('结束等待')
        }, 5000)
      })

      return config; // 用来请求的参数
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    });

    // Add a response interceptor
    axios.interceptors.response.use(function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      console.log('响应拦截', response)

      // 如果身份校验失败，返回登录页
      response.data.code === 111  && (window.location.href = response.data)

      return response.data // 过滤掉除data参数外的其它参数，响应接收到的值。
      // return response;
    }, function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    });

    axios.get('https://zuo11.com/getList?num=5&start=5').then((res) => {
      console.log('请求成功，', res)
    }, (err)=> {
      console.log('请求发生了错误,', err)
    })
  </script>
</body>
```

参考文档: https://github.com/axios/axios#interceptors