---
{
  "title": "使用iconfont时icon是如何加载成功的，字体图片？",
  "staticFileName": "iconfont.html",
  "author": "guoqzuo",
  "createDate": "2019/12/06",
  "description": "iconfont icon是如何加载成功的 字体图片？在前端开发中，经常会使用图标，而iconfont是很好的一种管理图标的方式。这里总结下iconfont的几种使用方式，以及iconfont通过设置class来显示图标内部做了哪些操作",
  "keywords": "iconfont使用,iconfont为什么可以加载图标,iconfont详细介绍",
  "category": "CSS"
}
---
# 使用iconfont时icon是如何加载成功的，字体图片？

在前端开发中，经常会使用图标，而iconfont是很好的一种管理图标的方式。这里总结下iconfont的几种使用方式，以及iconfont通过设置class来显示图标内部做了哪些操作

## iconfont的两种使用方式
iconfont.cn 有两种icon使用方式：下载代码、或直接下载图片

### 下载代码download.zip
将图标转换为字体，便于前端工程师自由调整与调用，download.zip 解压缩后目录如下，下面的文件很多，但不一定都会用到，下面详细介绍三种使用图片的方式：
```bash
├─demo.css        # 非必要，只是文档样式
├─demo_index.html # 非必要，只是文档
├─iconfont.css    # 重要重要重要重要重要重要文件
├─iconfont.eot    # 非必要，可以不引入
├─iconfont.js     # 重要重要重要重要重要重要文件
├─iconfont.json   # 非必要，可以不引入
├─iconfont.svg    # 非必要，可以不引入
├─iconfont.ttf    # 非必要，可以不引入
├─iconfont.woff   # 非必要，可以不引入
├─iconfont.woff2  # 非必要，可以不引入
```

#### Symbol 引用

> 这是一种全新的使用方式，应该说这才是未来的主流，也是平台目前推荐的用法。相关介绍可以参考这篇文章 这种用法其实是做了一个 SVG 的集合，与另外两种相比具有如下特点：
支持多色图标了，不再受单色限制.
通过一些技巧，支持像字体那样，通过 font-size, color 来调整样式。
兼容性较差，支持 IE9+，及现代浏览器。
浏览器渲染 SVG 的性能一般，还不如 png。

```html
<!-- 
  使用demo 
  只需要额外引入下载包里的 iconfont.js + copy 一小段css 即可使用
  iconfont.js里面是一段js代码，每个icon的svg path写死放到了字符串里，然后通过一定的方式供外部引用，不涉及网络请求
-->
<head>
  <style>
    /* 1.引入 默认icon样式，高宽、颜色 */
    .icon {
      width: 1em;
      height: 1em;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
    }
  </style>
  <!-- 2.引入js -->
  <!-- <script src="iconfont.js"></script> -->
  <script src="iconfont_delete_fill.js"></script>
</head>
<body>
  <!-- 
    3.使用
    这里发现设置color无效，网上百度了，发现 iconfont.js里面写死了fill的颜色  批量替换 fill="#181818" 为空字符串即可 
    参考: [iconfont图标symbol引用方式，有的图标不能通过设置color样式来修改颜色的解决办法] https://www.cnblogs.com/jopny/p/9454785.html
  -->
  <svg class="icon" aria-hidden="true" style="font-size:10em;color:blue">
    <use xlink:href="#icon-icon-test"></use>
  </svg>
  <svg class="icon" aria-hidden="true" style="font-size:5em;color:red">
    <use xlink:href="#icon-icon-test7"></use>
  </svg>
</body>
```

#### font-class 引用

> font-class 是 Unicode 使用方式的一种变种，主要是解决 Unicode 书写不直观，语意不明确的问题。与 Unicode 使用方式相比，具有如下特点：
兼容性良好，支持 IE8+，及所有现代浏览器。
相比于 Unicode 语意明确，书写更直观。可以很容易分辨这个 icon 是什么。
因为使用 class 来定义图标，所以当要替换图标时，只需要修改 class 里面的 Unicode 引用。
不过因为本质上还是使用的字体，所以多色图标(这里指多种颜色的图标, 单一的颜色不算)还是不支持的。

```html
<!-- 
  demo 直接引入 iconfont.css 即可使用，iconfont.css 文件里面有base64字体文件，所以不涉及网络请求
  - 也可以使用color、font-size来设置大小和颜色 
-->
<head>
  <link rel="stylesheet" href="./iconfont.css">
</head>
<body>
  <span class="iconfont icon-icon-test4" style="color:red;font-size:80px;"></span>

  <span class="iconfont icon-icon-test4"></span>
</body>
```

#### Unicode 引用

> Unicode 是字体在网页端最原始的应用方式，特点是：
  兼容性最好，支持 IE6+，及所有现代浏览器。
  支持按字体的方式去动态调整图标大小，颜色等等。  
  但是因为是字体，所以不支持多色。只能使用平台里单色的图标，就算项目里有多色图标也会自动去色。
  注意：新版 iconfont 支持多色图标，这些多色图标在 Unicode 模式下将不能使用，如果有需求建议使用symbol 的引用方式

```html
<!-- 
  demo 将iconfont.css里面的font-face拷贝到这里，拷贝样式，就可以直接使用了，
  不涉及网络请求
-->
<head>
    <style>
    @font-face {font-family: "iconfont";
      src: url('iconfont.eot?t=1575623500554'); /* IE9 */
      src: url('iconfont.eot?t=1575623500554#iefix') format('embedded-opentype'), /* IE6-IE8 */
      url('data:application/x-font-woff2;charset=utf-8;base64.xxx') format('woff2'),
      url('iconfont.woff?t=1575623500554') format('woff'),
      url('iconfont.ttf?t=1575623500554') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
      url('iconfont.svg?t=1575623500554#iconfont') format('svg'); /* iOS 4.1- */
    }
    .iconfont {
      font-family: "iconfont" !important;
      font-size: 16px;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  </style>
</head>
<body>
    <span class="iconfont" style="font-size:20px;color: red;">&#xe640;</span>

    <span class="iconfont">&#xe639;</span>
</body>
```

### 下载素材 （直接下载多种格式icon）
- SVG 下载的是 .svg文件格式，矢量图形，放大缩小不会失真, 打开文件，将文件中的svg标签的内容拷贝到html中就可以使用，颜色用fill来指定，大小由height指定
- 在Firefox、IE9+、Chrome和Safari中，可以直接在HTML嵌入SVG代码。
- SVG 文件可通过以下标签嵌入 HTML 文档：embed、object 或者 iframe。参考: [SVG 在 HTML 页面](https://www.runoob.com/svg/svg-inhtml.html) 
  ```html
  <?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg class="icon" width="16px" height="16.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#333333" d="M176 130.752l-45.248 45.248 22.72 22.528L466.752 512l-336 336 45.248 45.248L512 557.248l313.28 313.472 22.72 22.528 45.248-45.248-22.528-22.72L557.248 512l336-336-45.248-45.248L512 466.752 198.528 153.472z"  /></svg>
  ```
- AI 下载的是 .eps 文件，用AI（Adobe Illustrator CC）可以打开, 一般UI设计用，前端不会直接使用
- PNG 下载的是.png文件，直接可以用img标签src引入，下载时需要指定大小，非矢量图形，放大缩小会失真、模糊。

## iconfont通过设置class来显示图标内部做了哪些操作
注意我们在用class使用iconfont图标时，为什么可以使用，主要是iconfont.css里面做了三步操作:
1. 定义iconfont的 font-familay
2. 为.iconfont设置默认样式，指定为font-family字体
3. 为每个图标的class设置before的content

来看具体的demo，示例

```css
@font-face {
  font-family: "iconfont";
  src: url('iconfont.eot?t=1586579952536'); /* IE9 */
  src: url('iconfont.eot?t=1586579952536#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,省略...') format('woff2'),
  url('iconfont.woff?t=1586579952536') format('woff'),
  url('iconfont.ttf?t=1586579952536') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('iconfont.svg?t=1586579952536#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.iconok:before {
  content: "\e63c";
}

.iconerror1:before {
  content: "\e651";
}
```

参考: [Iconfont-阿里巴巴矢量图标库 Web端使用](https://www.iconfont.cn/help/detail?spm=a313x.7781069.1998910419.d8d11a391&helptype=code)