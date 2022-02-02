---
{
  "title": "Invalid character in header content ['Content-Disposition']",
  "staticFileName": "content-dispositon.html",
  "author": "guoqzuo",
  "createDate": "2020/06/21",
  "description": "在koa中，如果Content-Disposition里设置文件名有中文会提示错误，需要用类似 encodeURIComponent 转码的函数转码后才行，这里顺便介绍下encodeURIComponent和encodeURI的区别",
  "keywords": "Invalid character in header content ['Content-Disposition'],URI和URL的区别,encodeURIComponent和encodeURI的区别,encodeURI和encodeURIComponent区别",
  "category": "http与https"
}
---

# Invalid character in header content ["Content-Disposition"]

在koa中，如果Content-Disposition里设置文件名有中文会提示错误，需要用类似 encodeURIComponent 转码的函数转码后才行

```js
const fileName = encodeURIComponent('这是一个文件') // 需要先转码才行
ctx.set({
  'Content-Type': 'application/x-tar',
  'Content-Disposition': `attachment; filename="${fileName}.tar"`
})
```
## encodeURIComponent与encodeURI的区别
在JS高程3的第5章：引用类型 - 单体内置对象 - Global对象里有将对应的内容

### 什么是URI
- URI (Uniform Resource Identifiers，统一资源标识符) 在某个规则下把资源独一无二的标识出来
- URL (Uniform Resource Locator，同一资源定位符) URL是用定位的方式实现的URI。

### URI与URL的区别
> 统一资源标志符URI就是在某一规则下能把一个资源独一无二地标识出来。拿人做例子，假设这个世界上所有人的名字都不能重复，那么名字就是URI的一个实例，通过名字这个字符串就可以标识出唯一的一个人。现实当中名字当然是会重复的，所以身份证号才是URI，通过身份证号能让我们能且仅能确定一个人。那统一资源定位符URL是什么呢。也拿人做例子然后跟HTTP的URL做类比，就可以有：动物住址协议://地球/中国/浙江省/杭州市/西湖区/某大学/14号宿舍楼/525号寝/张三.人可以看到，这个字符串同样标识出了唯一的一个人，起到了URI的作用，所以URL是URI的子集。URL是以描述人的位置来唯一确定一个人的。在上文我们用身份证号也可以唯一确定一个人。对于这个在杭州的张三，我们也可以用：身份证号：123456789来标识他。所以不论是用定位的方式还是用编号的方式，我们都可以唯一确定一个人，都是URl的一种实现，而URL就是用定位的方式实现的URI。

参考: [HTTP 协议中 URI 和 URL 有什么区别？](https://www.zhihu.com/question/21950864/answer/154309494)

### encodeURIComponent与encodeURI的作用
由于有效的**URI不能包含某些字符，如空格以及其他特殊字符**。这两个函数可以对URI进行编码，以便发送给浏览器

他们的区别是：**encodeURI只转义空格，encodeURIComponent会转义所有的非字母数字字符**
```js
var uri = "http://www.zuo11.com/test value.html#start";
encodeURI(url); // "http://www.zuo11.com/test%20value.html#start"  只转义空格
encodeURIComponent(url); // "http%3A%2F%2Fwww.zuo11.com%2Ftest%20value.html%23start" 
// encodeURI只转义空格, encodeURIComponent()会转义所有的非字母数字字符

// 解码"http://www.zuo11.com/test value.html#start"
// 只解码空格
decodeURI("http://www.zuo11.com/test%20value.html#start");
// 解码非数字字母字符
decodeURIComponent("http%3A%2F%2Fwww.zuo11.com%2Ftest%20value.html%23start");
```