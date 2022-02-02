---
{
  "title": "koa 使用 multer 处理文件上传，FormData 数据解析",
  "staticFileName": "koa-formdata.html",
  "author": "guoqzuo",
  "createDate": "2021/01/12",
  "description": "一般在 koa 中，post 请求的数据是需要中间件来处理的，koa-bodyparser 可以很好的处理 json、serializer 数据，但 `multipart/form-data` 的类型无法处理，一般需要引入另外的中间件来处理，一般建议使用 multer 中间件来处理。先来看看前端上传文件代码，这里使用的是 fetch，当然也可以使用 xhr",
  "keywords": "multipart/form-data,FormData,文件上传",
  "category": "前端工程化"
}
---
# koa 使用 multer 处理文件上传，FormData 数据解析
一般在 koa 中，post 请求的数据是需要中间件来处理的，koa-bodyparser 可以很好的处理 json、serializer 数据，但 `multipart/form-data` 的类型无法处理，一般需要引入另外的中间件来处理，一般建议使用 multer 中间件来处理。先来看看前端上传文件代码，这里使用的是 fetch，当然也可以使用 xhr
```html
<!-- <input type="file" id="file"> -->
<input type="file" id="file" multiple>
<script>
  let fileInput = document.getElementById('file')
 
  fileInput.onchange = (event) => {
    let formData = new FormData()
    // 多个文件上传：使用同一个字段上传
    console.log(event.target.files) // FileList 类数组对象
    let files = event.target.files
    for (let i = 0, len = files.length; i < len; i++) {
      formData.append('image', files[i])
    }
    // 单文件上传
    // formData.append('image', files[0])
    formData.append('param1', 'abc')
    fetch('/upload', {
      method: 'POST',
      body: formData
    })
    .then(console.log)
    .catch(console.log)
    //  { param1: 'abc' }
  }
</script>
```

可以看到在前端需要上传文件时，一般使用 FormData 类型数据。使用一个字段存放文件数据，上面例子中使用的是 "image" 字段。另外在上传文件时，额外添加了一个 param1 字段数据。下面来看看 multer 中间件是如何处理文件上传的，注意以下几点:
- 如果是单文件上传，使用 `multer().single('文件字段')`。ctx.file 可以拿到 file 对象
- 如果是多文件上传，使用 `multer().fields([{ name: '文件字段', maxCount: '允许最大数'}])`。ctx.files 可以拿到文件数据对象 `{ 字段1: [ file 数组], 字段2: [file 数组] }`
- 如果非文件上传，仅接收 FormData 类型的文本字段，使用 `multer().none()`
- 普通 FormData 字段可以从 ctx.request.body 中获取
- file 对象包含如下属性
  - `fieldname` 前端用于存放文件的字段名，这里例子中使用的是 'image'
  - `originalname` 文件名
  - `mimetype` 文件 MIMT 类型
  - `buffer` 文件二进制数据，可以直接使用 `fs.writeFileSync(文件名, buffer)` 创建文件
  - `size` 文件大小，单位字节

```js
const multer = require('@koa/multer')
const fs = require('fs')

// 文件上传处理
// 前端 append 文件时使用的是 image 字段
let singleFileConfig = multer().single('image')
let multipleFilesConfig = multer().fields([
  {
    name: 'image',
    maxCount: 5
  }
])
let isMultiple = true
let fileConfig = isMultiple ? multipleFilesConfig : singleFileConfig
router.post('/upload', fileConfig ,async ctx => {

  // 文件外的其他 FormData数据 { param1: 'abc' }
  console.log('ctx.request.body', ctx.request.body) 
  console.log('ctx.files', ctx.files) // 多文件，返回 { 字段1: [file数组], 字段2: [file数组] }
  console.log('ctx.file', ctx.file) // 单文件，返回 file 对象

  // 如果是单文件取文件内容，如果是多文件，取第一个文件，前端字段传的 image
  let file = isMultiple ? ctx.files['image'][0] : ctx.file
  isMultiple && console.log(`ctx.files['image']`, ctx.files['image'][0])

  // 在服务端本地创建文件
  let { originalname, buffer } = file
  fs.writeFileSync(originalname, buffer)
  // {
  //   fieldname: 'image',
  //   originalname: '截屏2020-12-10 下午8.01.44.png',
  //   encoding: '7bit', 
  //   mimetype: 'image/png',
  //   buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 03 18 00 00 01 56 08 06 00 00 00 ea b0 3b 51 00 00 0c 64 69 43 43 50 49 43 43 20 50 72 6f 66 69 ... 90135 more bytes>,
  //   size: 90185
  // }
  ctx.body = ctx.request.body 
})
```
完整测试代码，参见 [fetch 上传文件 前端后代码 | Github](https://github.com/zuoxiaobai/fedemo/tree/master/src/JS_ES6/JS%E9%AB%98%E7%A8%8B3/fetch)


参考：
- [express/multer 'multipart/form-data' | Github](https://github.com/expressjs/multer)
- [@koa/multer | Github](https://github.com/koajs/multer)
