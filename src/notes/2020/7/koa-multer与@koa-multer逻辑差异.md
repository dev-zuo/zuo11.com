---
{
  "title": "koa-multer与@koa-multer逻辑差异",
  "staticFileName": "koa-multer.html",
  "author": "guoqzuo",
  "createDate": "2020/07/06",
  "description": "之前有了解过以@开头的作用域包，这次在使用koa-multer这个模块时，发现@koa/multer与koa-multer的逻辑居然不一样。源码有些差异，下面来具体看看。koa-multer这个包是从express的multer包上面加了一层封装，而koa-multer并没有把fileds字段挂载到ctx.request.body上，只维持原来express那样挂载到node的request对象上，也就是ctx.req.body，来看看koa-multer的源码部分",
  "keywords": "koa-multer与@koa/multer逻辑差异",
  "category": "前端工程化"
}
---

# koa-multer与@koa/multer逻辑差异

之前有了解过以@开头的作用域包，这次在使用koa-multer这个模块时，发现@koa/multer与koa-multer的逻辑居然不一样。源码有些差异，下面来具体看看

```js
// 在使用 koa-multer 时
const multer = require('koa-multer')
router.post('/test', multer().none(), ctx => { 
  let isFormData = ctx.headers['content-type'].startsWith('multipart/form-data')
  // ctx.req node的request对象, ctx.request koa的request对象
  ctx.body = isFormData ? ctx.req.body : ctx.request.body
})
```

koa-multer这个包是从express的multer包上面加了一层封装，而koa-multer并没有把fileds字段挂载到ctx.request.body上，只维持原来express那样挂载到node的request对象上，也就是ctx.req.body，来看看koa-multer的源码部分

```js
// https://github.com/koa-modules/multer/blob/master/index.js
multer[name] = function () {
    const middleware = fn.apply(this, arguments)

    return (ctx, next) => {
      return new Promise((resolve, reject) => {
        middleware(ctx.req, ctx.res, (err) => {
          err ? reject(err) : resolve(ctx)
        })
      }).then(next)
    }
  }
```

而@koa/multer则做了处理，可以与上面的例子对比下

```js
// https://github.com/koajs/multer/blob/master/index.js
multer[name] = function() {
    const middleware = Reflect.apply(fn, this, arguments);

    return (ctx, next) => {
      return new Promise((resolve, reject) => {
        middleware(ctx.req, ctx.res, err => {
          if (err) return reject(err);
          if ('request' in ctx) {
            if (ctx.req.body) {
              ctx.request.body = ctx.req.body;
              delete ctx.req.body;
            }

            if (ctx.req.file) {
              ctx.request.file = ctx.req.file;
              ctx.file = ctx.req.file;
              delete ctx.req.file;
            }

            if (ctx.req.files) {
              ctx.request.files = ctx.req.files;
              ctx.files = ctx.req.files;
              delete ctx.req.files;
            }
          }

          resolve(ctx);
        });
      }).then(next);
    };
  };
```

我们再来看看使用@koa/multer的情况，就比较方便了，和其他数据一样挂载到 ctx.request.body

```js
const multer = require('@koa/multer')
router.post('/test', multer().none(), ctx => { 
  ctx.body = ctx.request.body
}) 
```

**综上，如果某个模块有两种包名，建议先考虑@开头的作用域包，通常这种功能会新点。后面迭代维护应该都是以这个为准**