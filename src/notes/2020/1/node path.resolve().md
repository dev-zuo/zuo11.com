---
{
  "title": "node path.resolve()",
  "staticFileName": "node_path.html",
  "author": "guoqzuo",
  "createDate": "2020/01/10",
  "description": "koa静态文件服务中间件的实现里，需要将当前路径 __dirname 与用户传入的路径合并为一个绝对路径，就可以使用path.resolve函数",
  "keywords": "node path.resolve,node路径处理",
  "category": "前端工程化"
}
---
# node path.resolve()

koa静态文件服务中间件的实现里，需要将当前路径 __dirname 与用户传入的路径合并为一个绝对路径，就可以使用path.resolve函数

> The path.resolve() method resolves a sequence of paths or path segments into an absolute path.

```js
const path = require('path')

path.resolve('/foo/bar', './baz');
// Returns: '/foo/bar/baz'

path.resolve('/foo/bar', '/tmp/file/');
// Returns: '/tmp/file'

let dirPath = './public'
path.resolve(__dirname, dirPath)
```

参考：[node path.resolve](https://nodejs.org/docs/latest/api/path.html#path_path_resolve_paths)
