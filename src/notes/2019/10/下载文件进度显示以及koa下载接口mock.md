
# 下载文件进度显示以及koa下载接口mock

在前端做导出功能的时候，需要请求一个接口去导出数据，一般是execl，然后接口会返回execl的文件数据。对于比较大的文件，我们怎么获取文件的下载进度呢？前端怎么用koa来mock导出的接口呢？下面来看看

## 前端代码
用input写一个导出按钮，用progress div来显示进度信息
```html
<input type="button" value="导出" id="export">
<div id="progress"></div>
```

再用js来监听导出的点击事件，如果用传统的window.open来打开文件，这样会没有进度信息，我们为了获取进度信息，还是直接用axios来发起请求进行下载文件，下面来看代码:

```html
<!-- 利用axios来做请求 -->
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
  let exportBtn = document.getElementById('export')
  let progress = document.getElementById('progress')
  // 导出事件点击
  exportBtn.onclick = async (e) => {
    try {
      let res = await axios.get('/download', {
        // 参考: https://github.com/axios/axios#request-config
        onDownloadProgress: function (progressEvent) {
          // Do whatever you want with the native progress event
          console.log(progressEvent)
          progress.innerHTML = `
          下载百分比:
          ${ Math.floor((progressEvent.loaded / progressEvent.total) * 100)} %
          ${progressEvent.loaded} / ${progressEvent.total}
          `
        },
      })
      console.log(res)

      // res.data 为文件的buffer数据，将buffer数据转为Blob对象，然后再下载
      // 假设下载的是一个x-tar文件
      // 下载文件
      downloadFile(res.data, 'application/x-tar', '这是一个文件')
    } catch(e) {
      console.error(e)
    }
  }
</script>
```
## 通用下载函数
一般使用a便签来下载，IE进行特殊处理
```js
// data 后端返回的文件数据
function downloadFile(data, fileType, fileName) {
  // window.open(dataUrl)

  // fileType 文件的MIME类型
  // 参考: https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types
  const blobData = new Blob([data], {
    type: fileType 
  })
  console.log(blobData) // 检查数据是否正常

  //如果是IE，特殊处理，防止IE下提提示 "拒绝访问"
  if (window.navigator.msSaveBlob) {
    try {
      // 根据实际情况加后缀名
      window.navigator.msSaveBlob(blobData, fileName, + '.tar')
    } catch(e) {
      console.log('msSaveBlob异常', e)
    }
    return
  }

  // 创建下载链接，并触发下载
  // https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a#浏览器兼容性
  // <a> download attribute not support IE, iOS safari
  const dataUrl = window.URL.createObjectUrl(blobData)
  const downloadElement = document.createElement('a')
  downloadElement.href = dataUrl
  downloadElement.download = fileName // download文件名

  // 触发点击，下载
  document.body.appendChild(downloadElement)
  documentElement.click()

  // 移除辅助下载DOM及对象URL
  document.body.removeChild(downloadElement)
  window.URL.revokeObjectURL(dataUrl)
}
```

## 后端koa代码
利用koa来mock下载接口，读取文件内容，返回buffer后，直接用ctx.body返回给前端即可
```js

const Koa = require('koa')
const Router = require('koa-router')
const  static = require('koa-static')
const app = new Koa()
const router = new Router()
const uitl = require('util')
const fs = require('fs')

app.use(static(__dirname + '/public'))

router.get('/download', async (ctx, next) => {

  let filePath = [
    '/upload/ffe73f4c-c160-49ff-b01d-53da5c544714.mongodb-macos-x86_64-4.2.2.tar',
    // '/upload/35f17dcc-9f87-40cf-968d-8880951440d8.屏幕快照 2020-02-28 23.19.02.png'
  ]
  let readFilePromise = uitl.promisify(fs.readFile)
  let res = await readFilePromise(__dirname + filePath[0])
  console.log(res)
  const fileName = encodeURIComponent('这是一一个文件')
  ctx.set({
    // 'Content-Type': 'image/png',
    'Content-Type': 'application/x-tar',
    'Content-Disposition': `attachment; filename="${fileName}.tar"`
  })
  ctx.body = res
})

app.use(router.routes())

app.listen(3000, () => {
  console.log('服务开启成功，3000端口')
})
```

## 进度信息total为0，只有loaded的情况
我们在koa文档里，可以找到ctx.body 的值可以是buffer与流，流类似管道。**当接口返回的数据不是buffer，而是流时，就会有这种情况**
```js
// 可以用下面的代码改写上面的koa，不使用fs.readFile，而创建一个读的流，直接响应给前端
let res = fs.createReadStream(__dirname + filePath[0])
ctx.body = res
```
**对于这种情况，前端怎么判断进度事件呢？建议每触发一次进度事件，加10个百分点，加到90停止，直到加载完成。10%的粒度可以自己调整**

## 注意事项

1. 理论上filename 不需要后缀名，可以根据fileType的MIME类型自动生成后缀，但有些情况比如execl 2003可能是没有后缀的，所以最好还是filename里加上后缀名

2. 上面可以看到需要自己设置文件类型，后缀名，但一般情况后端会在响应头 Content-Type里设置好文件类型

3. window.open 虽然没有进度，但优点是前端不用处理文件名这种问题，都是后端来处理

4. 上面的例子写的比较糙，实际情况对于文件种类比较多的需要进行判断，做一些适配处理



## 参考
- [axios onDownloadProgress config参数 - github](https://github.com/axios/axios#request-config)
- [fileType 文件的MIME类型 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types)

- [a标签download属性兼容性 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a#浏览器兼容性)