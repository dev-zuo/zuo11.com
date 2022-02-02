---
{
  "title": "iconfont通过设置class来显示图标内部做了那些操作",
  "staticFileName": "iconfont_class.html",
  "author": "guoqzuo",
  "createDate": "2020/07/26",
  "description": "iconfont是怎么通过class来加载图标的，内部做了哪些操作，注意我们在用class使用iconfont图标时，为什么可以使用，主要是iconfont.css里面做了三步操作: 1. 定义iconfont的 font-familay 2. 为.iconfont设置默认样式，指定为font-family字体 3. 为每个图标的class设置before的content",
  "keywords": "iconfont是怎么通过class来加载图标的,内部做了哪些操作,iconfont class字体图标",
  "category": "CSS"
}
---
# iconfont通过设置class来显示图标内部做了那些操作

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