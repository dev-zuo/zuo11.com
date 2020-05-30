
# 从0到1写一个静态博客生成系统zuo-blog(一)：JS怎么将markdown文件转html

其实早在18年12月，我就已经写好了最简的demo，使用的是marked这个工具。本来准备将博客静态化的，但后来就没继续了，这里来说下方法

## 用node写demo
一般js处理文件使用的是nodejs，下面来看看具体步骤(假设你已经安装了npm)
1. 创建一个test.js
2. npm init 生成packgage.json
3. 写一个利用marked包读取md文件生成html字符串后再创建一个文件的demo，下面是示例demo
4. node test.js 运行看是否生成正常

```js
// github: https://github.com/markedjs/marked
// marked.js 是下载好的，不想安装npm包
let marked = require('./lib/marked') // import marked.js
let fs = require('fs')
// 读取md文件
fs.readFile('iOS程序启动过程，从main函数开始UIApplication与AppDelegate.md', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  // 这里加入了基本的html框架，加入了代码高亮prismjs
  let htmlStr = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Title</title>
      <link href="../lib/prismjs/prism_default.css" rel="stylesheet" />
    </head>
    <body>
      ${marked(data.toString())}
      <script src="../lib/prismjs/prism_default.js"></script>
    </body>
  </html>
  `
  // 生成新的文件
  fs.writeFile('./dist/test.html', htmlStr, (err) => {
    console.log(err)
    console.log('写入文件成功');
  })
})
```

## 在zuo-blog里的实际应用
截取至 zuo-blog [部分源码 | github](https://github.com/zuoxiaobai/zuo-blog/blob/master/vendor/ZUOBlog.js)
```js
// 处理md文件
_handlerMdFile(article, articlePath, year, month) {
    // 读取文件内容，通过maked转换为html字符串
    const fileStr = fs.readFileSync(articlePath).toString() 
    let htmlStr = marked(fileStr)
}
```

**注意：marked将md文件转html时，如果在ol或ul后面加了代码块，必须换行，如果不换行就会准换异常**

```js
// - 这是一个ul
// ul后面这里不能直接用```写代码，需要换行，如果不换行在Typora可以正常渲染，但marked转换时会出问题
```
