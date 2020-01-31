
# mip改造

> 最近对网站进行了改版，移动端为了对搜索引擎更友好，用MIP改造了移动端，还有很多问题待完善。PC端也小改了下，本来找了个很好的背景图片，但由于文件大了，影响加载速度。还是放弃了，就加了个magnet图片，写了个js来控制背景图片的切换。

![web_mip_1.png](../../../images/blog/web/web_mip_1.png)

## 移动端改动
移动端改动主要是关于MIP相关改造，MIP很容易上手，不用怎么学，只是将相关的tag改下基本就可以了。mip校验工具简直就是神器。图片的轮播插件很赞，只需要简单的几句代码就OK了。
```xml
<mip-carousel autoplay defer="3000" layout="responsive" width="600" height="400">
    <mip-img src="images/lb02.png"> </mip-img>
    <mip-img src="images/lb03.png"> </mip-img>
    <mip-img src="images/lb04.png"></mip-img>
    <mip-img src="images/lb07.png"></mip-img>
</mip-carousel>
```
虽然MIP改造对收录很有好处，但目前zuo11.com想要完全符合MIP规范基本不可能，主要有一下几个问题:

1. `script`只支持百度mip和json相关script，其它的一律不能用，移动端多说的评论插件直接就扑街了，要解决这个问题，只有自己写相关评论系统。或者关闭移动端的评论功能。

2. `a`链接的target问题，target目前必须指定为_blank，iPhone下打开内部链接的那个效果差的很，不过据说以后的版本会改。

3. 非head内`style`的乱用问题，其实代码上面可以将style都写在一起，但是UEditor编辑出来的笔记，随便加个颜色就会产生这种带style的不规范代码，还有img还要转为mip-img。那样就极大限制了UEditor编辑的丰富性。

MIP相关链接:

MIP官网: https://www.mipengine.org

MIP校验工具: https://www.mipengine.org/validator/validate

## PC端改动
1. 将顶部的导航改成了一个整体，增加了favicon相关图片，修改了友链的样式。找了几张漂亮的背景图片，本来打算用来做背景图片的，但网站测速直接过5秒，压缩什么的也降不到3秒以下，最后就没用了。写了个比较low的js来手动控制图片的切换。这里有个缺点，重新刷新网页或进入新的页面，效果就没了。怎么设置全局的css是个问题，以后会想办法解决。

![web_mip_2.png](../../../images/blog/web/web_mip_2.png)

```css
/* 背景图片切换*/
var mark = 0;
function my_try() {
  if (mark == 0) {
    $("body").css("background","url(images/good4.jpg) fixed no-repeat 0 0");
    mark++;
  } else if (mark == 1){
    $("body").css("background","url(images/good3.jpg) fixed no-repeat 0 0");
    mark++;
  } else if (mark == 2){
    $("body").css("background","url(images/good2.jpg) fixed no-repeat 0 0");
    mark++;
  } else if (mark == 3){
    $("body").css("background","url(images/good.jpg) fixed no-repeat 0 0");
    mark = 0;
  }
  $("body").css("background-size","cover");
}
```

2. 之前jquery用的是本地的jquery.min.js，有80k左右。就算Tomcat开启了gzip，但这个文件基本没怎么变，之后在网上找了个相关的cdn资源，加载速度快且大小只有30k左右。刚才忘记改后台的jquery.min.js导入了，这篇文章本来早写完了，但保存的时候，什么内容都没存入，害的现在又重新手打一遍。

3. 代码高亮的问题，最近才知道UEditor内部就集成了第三方插件SyntaxHighlighter，但是当超出width时，没有scroll的效果，特别是移动端那个效果惨不忍睹，还有页面向上翻时，代码块会挡住顶部的fix部分。还不如不载入相关高亮效果，自带的pre效果虽然没有高亮，基本没这些问题。其实也想换个富文本编辑器，但UEditor用了这么久，短时间内找个比这个好用的基本不可能，只能凑合用了。

4. 关于文章质量的问题，最近无意间看到了张戈的博客，文章质量排版真心赞，相比自己以前写的渣渣文章，惭愧的很，我以前觉得博客是为自己服务的，但想要有流量想要做好，必须要用心去写好每一篇文章。以后我会用心的去写内容。尽自己最大的努力去经营好这个博客。

