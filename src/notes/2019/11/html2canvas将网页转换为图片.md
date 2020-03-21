
# html2canvas将网页转换为图片

在web开发中，我们需要生成图片时，可以使用html2canvas，他可以将html转为png，pc端还好，移动端css的坑比较多，这里只是简单的介绍下怎么使用。

先引入 html2canvas.js，根据其api调用，来看看具体示例

```html
<!-- 核心代码 -->
<head>
  <title>Document</title>
  <script src="html2canvas.js"></script>
</head>
<body>
  <div id="test" style="background-image: url('bg.jpg');height:707px;width:500px;color: #fff;">
    <div style="padding-top:250px;padding-left:100px;">
        <h1>邀请函</h1>
        <div style="width: 200px;
        word-break: break-word;">
          你好，邀请你xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        </div>
        <p>
          --- guoqzuo
        </p>
    </div>
  </div>
  <script>
    let testElement = document.getElementById('test')
    html2canvas(testElement).then(function(canvas) {
      console.log(canvas)
      let img = new Image()
      img.src = canvas.toDataURL()
      img.onload = function() {
        document.body.appendChild(img);
      }
    });
  </script>
</body>
```

完整demo地址: [html2canvas demo - github](https://github.com/zuoxiaobai/fedemo/blob/master/src/DebugDemo/html2canvas/index.html)

上面的例子是原生开发的例子，还可以使用node模块的方式引用

[html2canvas文档](http://html2canvas.hertzen.com/documentation)