# 深入koa-router源码理解allowedMethods中间件作用

在使用koa koa-router mock接口时，我们会看到 `app.use(router.routes()).use(router.allowedMethods())`，使用 router中间件后，又链式调用了router.allowedMethods()这个中间件，那为什么要加router.allowedMethods()中间件呢？他有什么作用？我们写个demo来测试下

先下结论：
1. router.allowedMethods()中间件，主要用于 405 Method Not Allowed 这个状态码先关
2. 如果不加这个中间件，如果接口是get请求，而前端使用post请求，会返回 404 状态码，接口未定义。如果加了这个中间件，这种情况时，会返回405 Method Not Allowed ，提示 request method 不匹配，并再响应头返回接口支持的请求方法，更有利于调试

下面来看一个demo

```js
let koa = require('koa');
let Router = require('koa-router')

let app = new koa()
let router = new Router()

router.post('/user', ctx => {
  ctx.body = {
    a: 1
  }
})

app.use(router.routes())
// app.use(router.routes()).use(router.allowedMethods())

app.listen('9000', () => {
  console.log('server listen on 9000 port')
})
```

上面的例子中，我们定义一个 /user 接口，他需要使用post请求方法。这里我们先通过get方法来请求这个接口试试

```bash
curl -v http://127.0.0.1:9000/user
# 以下是请求响应的内容，可以看到接口会返回404，因为我们接口现在只能是post请求的
* Connected to 127.0.0.1 (127.0.0.1) port 9000 (#0)
> GET /user HTTP/1.1
> Host: 127.0.0.1:9000
> User-Agent: curl/7.64.1
> Accept: */*
> 
< HTTP/1.1 404 Not Found
< Content-Type: text/plain; charset=utf-8
< Content-Length: 9
< Date: Thu, 25 Jun 2020 09:13:14 GMT
< Connection: keep-alive
< 
```
我们再调整下上面的demo，使用 router.allowedMethods() 中间件
```js
// app.use(router.routes())
app.use(router.routes()).use(router.allowedMethods())
```
再发一遍get请求
```bash
curl -v http://127.0.0.1:9000/user
# 以下是返回结果
* TCP_NODELAY set
* Connected to 127.0.0.1 (127.0.0.1) port 9000 (#0)
> GET /user HTTP/1.1
> Host: 127.0.0.1:9000
> User-Agent: curl/7.64.1
> Accept: */*
> 
< HTTP/1.1 405 Method Not Allowed
< Allow: POST
< Content-Type: text/plain; charset=utf-8
< Content-Length: 18
< Date: Thu, 25 Jun 2020 09:13:55 GMT
< Connection: keep-alive
< 
```
我们可以看到加router.allowedMethods()中间件和不加这个中间件的区别，当我们定义了post方法接口却发送对应的get请求时，执行结果对比

类型 | 响应状态码 | 响应头变化
--- | --- | ---
默认情况 | 404 Not Found | 无
router.allowedMethods() | 405 Method Not Allowed | 新增响应头 Allow: POST

下面我们来看下对应的源码：[koa-router源码 | github](https://github.com/koajs/router/blob/master/)

由于它是一个npm包，我们先在package.json里面看看他的入口
```bash
# package.json里面的main就是我们 require对应npm包后，引入的实际文件地址
"main": "lib/router.js",
```
也就是源码入口在lib/router.js
```js
// 源码截取至https://github.com/koajs/router/blob/master/lib/router.js
/**
 * Returns separate middleware for responding to `OPTIONS` requests with
 * an `Allow` header containing the allowed methods, as well as responding
 * with `405 Method Not Allowed` and `501 Not Implemented` as appropriate.
 * @param {Object=} options
 * @param {Boolean=} options.throw throw error instead of setting status and header
 * @param {Function=} options.notImplemented throw the returned value in place of the default NotImplemented error
 * @param {Function=} options.methodNotAllowed throw the returned value in place of the default MethodNotAllowed error
 * @returns {Function}
 */
Router.prototype.allowedMethods = function (options) {
  options = options || {};
  const implemented = this.methods;

  return function allowedMethods(ctx, next) {
    return next().then(function() {
      const allowed = {};

      if (!ctx.status || ctx.status === 404) {
        for (let i = 0; i < ctx.matched.length; i++) {
          const route = ctx.matched[i];
          for (let j = 0; j < route.methods.length; j++) {
            const method = route.methods[j];
            allowed[method] = method;
          }
        }

        const allowedArr = Object.keys(allowed);

        if (!~implemented.indexOf(ctx.method)) {
          if (options.throw) {
            let notImplementedThrowable = (typeof options.notImplemented === 'function')
            ? options.notImplemented()  // set whatever the user returns from their function
            : new HttpError.NotImplemented();
            
            throw notImplementedThrowable;
          } else {
            ctx.status = 501;
            ctx.set('Allow', allowedArr.join(', '));
          }
        } else if (allowedArr.length) {
          if (ctx.method === 'OPTIONS') {
            ctx.status = 200;
            ctx.body = '';
            ctx.set('Allow', allowedArr.join(', '));
          } else if (!allowed[ctx.method]) {
            if (options.throw) {
              let notAllowedThrowable = (typeof options.methodNotAllowed === 'function') 
              ? options.methodNotAllowed() // set whatever the user returns from their function
              : new HttpError.MethodNotAllowed();

              throw notAllowedThrowable;
            } else {
              ctx.status = 405;
              ctx.set('Allow', allowedArr.join(', '));
            }
          }
        }
      }
    });
  };
};
```
怎么弄清楚源码的执行呢？一般我们可以在源码里加入一些console.log，来打印一些关键的信息，注意:
1. 一般npm install koa-router --save后，当前目录下的node_modules里面会有对应的源码，可以在里面修改源码
2. 修改源码后，需要ctrl+s一下index.js触发nodemon重启服务，这样执行的才是修改过源码后的代码

以下是我在调试这个demo时，在源码中加的console信息，如下
```js
Router.prototype.allowedMethods = function (options) {
  options = options || {};
  const implemented = this.methods;

  console.log('koa router log, implemented', implemented)
  // [ 'HEAD', 'OPTIONS', 'GET', 'PUT', 'PATCH', 'POST', 'DELETE' ]

  return function allowedMethods(ctx, next) {
    return next().then(function() {
      const allowed = {};

      if (!ctx.status || ctx.status === 404) {
        console.log('ctx.matched', ctx.matched)
        //  ctx.matched 当前请求匹配到的路由，当发送 /user 请求时，这个数组只有一个元素
        // [ Layer {
        //   opts:
        //    { end: true,
        //      name: null,
        //      sensitive: false,
        //      strict: false,
        //      prefix: '',
        //      ignoreCaptures: undefined },
        //   name: null,
        //   methods: [ 'POST' ],
        //   paramNames: [],
        //   stack: [ [Function] ],
        //   path: '/user',
        //   regexp: /^\/user[\/#\?]?$/i } ]
        for (let i = 0; i < ctx.matched.length; i++) {
          const route = ctx.matched[i];
          // 有些接口可能支持多种methods请求，这里遍历当前接口支持的所有方法数组,/user 只支持一个post方法
          for (let j = 0; j < route.methods.length; j++) {
            const method = route.methods[j];
            allowed[method] = method;
          }
        }
        console.log('allowed', allowed) // { POST: 'POST' }

        const allowedArr = Object.keys(allowed); // ['POST']

        console.log('implemented.indexOf(ctx.method)', implemented.indexOf(ctx.method)) // 2

        // if (!~value) 等价于 if (value === -1)
        if (!~implemented.indexOf(ctx.method)) { // ctx.method  GET
          // 如果当前请求方法不是下面数组中的某一种
          // [ 'HEAD', 'OPTIONS', 'GET', 'PUT', 'PATCH', 'POST', 'DELETE' ]
          if (options.throw) {
            let notImplementedThrowable = (typeof options.notImplemented === 'function')
            ? options.notImplemented()  // set whatever the user returns from their function
            : new HttpError.NotImplemented();
            
            throw notImplementedThrowable;
          } else {
            ctx.status = 501;
            ctx.set('Allow', allowedArr.join(', '));
          }
        } else if (allowedArr.length) {
          // 当前路由404，但对应的接口可以使用其他的method进行请求
          if (ctx.method === 'OPTIONS') {
            ctx.status = 200;
            ctx.body = '';
            ctx.set('Allow', allowedArr.join(', '));
          } else if (!allowed[ctx.method]) { // allowed: { POST: 'POST' } ctx.method: GET
            // 当前请求方法，并不在接口允许的方法(allowed)里面
            if (options.throw) {
              // throw error instead of setting status and header
              let notAllowedThrowable = (typeof options.methodNotAllowed === 'function') 
              ? options.methodNotAllowed() // set whatever the user returns from their function
              : new HttpError.MethodNotAllowed();

              throw notAllowedThrowable;
            } else {
              // 默认请求，如果不传 throw方法的情况
              ctx.status = 405;
              ctx.set('Allow', allowedArr.join(', '));
            }
          }
        }
      }
    });
  };
};
```
总结，router.allowedMethods() 的执行逻辑大致如下

1. 如果当前接口为404时(!ctx.status的情况貌似没遇到过)，才执行该中间件的逻辑
2. 遍历当前请求匹配到的路由信息数组 ctx.matched，将匹配到的路由允许的methods存入 allowed 对象
3. 判断当前请求方法ctx.method是否是正常的请求方法，如果不是，抛异常，注意抛异常时，如果调用该中间件时有传入throw参数，则表示自己处理异常，这种情况默认返回501，提示服务异常
```js
// 注意这里用到了 !~ 来判断是否 === -1，这里可以使用ES2016新出的Array.prototype.includes来判断
// if (!~value) 等价于 if (value === -1)
if (!~implemented.indexOf(ctx.method)) { //
```
4. 如果当前路由404，但对应的接口可以使用其他的method进行请求，如果是 options(或预检请求)，不返回404，返回200，并设置allow响应头
5. 如果当前请求方法不在允许的方法里面，如果传入了throw自己处理异常，否则返回 405 method not allowed，且设置allow响应头
