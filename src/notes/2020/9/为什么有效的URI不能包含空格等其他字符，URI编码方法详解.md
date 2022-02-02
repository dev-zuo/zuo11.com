---
{
  "title": "为什么有效的URI不能包含空格等其他字符，URI编码方法详解",
  "staticFileName": "uri.html",
  "author": "guoqzuo",
  "createDate": "2020/09/12",
  "description": "在JS高程3里介绍URI编码方法时，有这样一个描述：**有效的URI中不能包含某些字符，比如空格。使用URI编码方法可以把所有无效的字符替换为特殊的utf-8编码，从而让浏览器能够接受和理解** 为什么有效的URI不能包含空格等其他字符？ 在《HTTP权威指南》第2章URL与资源 - 各种令人头疼的字符(p38)里有介绍原因：",
  "keywords": "URI编码方法详解",
  "category": "http与https"
}
---
# 为什么有效的URI不能包含空格等其他字符，URI编码方法详解
在JS高程3里介绍URI编码方法时，有这样一个描述：**有效的URI中不能包含某些字符，比如空格。使用URI编码方法可以把所有无效的字符替换为特殊的utf-8编码，从而让浏览器能够接受和理解**

## 为什么有效的URI不能包含空格等其他字符？
在《HTTP权威指南》第2章URL与资源 - 各种令人头疼的字符(p38)里有介绍原因：

URL是可移植的(portable)，它要统一的命名网上所有的资源，意味着要通过各种不同的协议来传送这些资源，这些协议在传输数据时都会使用不同的机制，在设计URL时，需要满足以下特性：
1. 可以通过任意协议进行**安全的传输**：完整/不丢失信息，以SMTP电子邮件的简单邮件传输协议为例，它使用的传输方法会剥去一些特定字符，为了避开这些问题，URL只能使用一些相对较小的、通用的安全字母表中的字符。
2. **URL具有可读性**：即使是看不见，不可打印的字符也能在URL中使用，比如空格
3. **完整性**：人们可能会希望URL中可以包含除通用安全字母表之外的二进制数据或字符，因此需要一种转义机制，能够将不安全的字符编码转为安全字符再进行传输

## js中两种URI编码方法的区别
之前有简单说明encodeURIComponent与encodeURI的区别：~~encodeURI只转义空格，encodeURIComponent会转义所有的非字母数字字符~~

其实上面的说法是错误的，在mdn的一个示例中，有更加详细说明两者的区别
```js
// encodeURI vs encodeURIComponent
// encodeURI() differs from encodeURIComponent() as follows:
var set1 = ";,/?:@&=+$#"; // Reserved Characters
var set2 = "-_.!~*'()";   // Unreserved Marks
var set3 = "ABC abc 123"; // Alphanumeric Characters + Space  [ˌælfənjuːˈmerɪk] 字母数字 + 空格

console.log(encodeURI(set1)); // ;,/?:@&=+$#
console.log(encodeURI(set2)); // -_.!~*'()
console.log(encodeURI(set3)); // ABC%20abc%20123 (the space gets encoded as %20)

console.log(encodeURIComponent(set1)); // %3B%2C%2F%3F%3A%40%26%3D%2B%24%23
console.log(encodeURIComponent(set2)); // -_.!~*'()
console.log(encodeURIComponent(set3)); // ABC%20abc%20123 (the space gets encoded as %20)
```
上面的例子中可以看到，URI编码方法一般有3种类型的字符

字符类型(中) | 字符类型(英) | 包含 | encodeURI | encodeURIComponent
---|---|---|---|---
URI保留字符 | Reserved Characters | ";,/?:@&=+$#" | 不转义 | 转义(escaped)
非转义字符 | Unreserved Marks or Alphanumeric Characters | "-_.!~*'()"以及数字(0-9)、字母(a-zA-Z) | 不转义 | 不转义
空格等其他字符/中文等 | space or other character etc | " 中文？"等其他字符 | 转义 | 转义

通过上面的表格我们可以看到
- **encodeURI不会编码URI保留字符/非转义字符，只会对空格等其他字符(如中文字符，中文等)进行编码**
- **encodeURIComponent不会编码非转义字符，URI保留字符和其他字符都会编码**

综上，encodeURI与encodeURIComponent的区别是：**encodeURIComponent会对URI保留字符进行编码，而encodeURI则不会，其他逻辑基本一致**。

## 标准
下面来看看ECMA262标准/规范(specification)对encodeURI()的定义(definition)
```js
18.2.6.4 encodeURI ( uri )
The encodeURI function computes a new version of a UTF-16 encoded (6.1.4) URI in which each instance of certain code points is replaced by one, two, three, or four escape sequences representing the UTF-8 encoding of the code points.

The encodeURI function is the %encodeURI% intrinsic object. When the encodeURI function is called with one argument uri, the following steps are taken:

  1. Let uriString be ? ToString(uri).
  2. Let unescapedURISet be a String containing one instance of each code unit valid in uriReserved and uriUnescaped  
     plus "#".
  3. Return ? Encode(uriString, unescapedURISet).

NOTE
The code point # is not encoded to an escape sequence even though it is not a reserved or unescaped URI code point.
```
Runtime Semantics: Encode(string, unescapedSet)
```js
The abstract operation Encode takes arguments string (a String) and unescapedSet (a String). It performs URI encoding and escaping. It performs the following steps when called:

1. Let strLen be the number of code units in string.
2. Let R be the empty String.
3. Let k be 0.
4. Repeat,
     a. If k equals strLen, return R.
     b. Let C be the code unit at index k within string.
     c. If C is in unescapedSet, then
          i. Set k to k + 1.
          ii. Set R to the string-concatenation of the previous value of R and C.
     d. Else,
          i. Let cp be ! CodePointAt(string, k).
          ii. If cp.[[IsUnpairedSurrogate]] is true, throw a URIError exception.
          iii. Set k to k + cp.[[CodeUnitCount]].
          iv. Let Octets be the List of octets resulting by applying the UTF-8 transformation to cp.[[CodePoint]].
          v. For each element octet of Octets in List order, do
               1. Set R to the string-concatenation of:
                   - the previous value of R
                   - "%"
                   - the String representation of octet, formatted as a two-digit uppercase hexadecimal number, padded to the left with a zero if necessary
```

以上，在总结某个知识点的过程中，我们可以发现介绍js相关知识点的平台很多，我们可以大致的判断出文档的详细程度如下：

菜鸟教程/w3school等 <= JS高程3等技术类书籍 <= MDN <= tc39 ECMA标准文档

js相关知识基本都是对API、tc39 ECMA标准文档的总结、梳理。区别在于：
1. 整理的意图：是仅仅展示API调用，还是介绍原理（简单说明/详细介绍）
2. 示例demo是否丰富？demo是否可以让人很好的理解知识点？

## 参考
- [URI Handling Functions | ECMA-262 Specifications](https://tc39.es/ecma262/#sec-uri-handling-functions)
- [encodeURI() | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI)
- [encodeURIComponent与encodeURI的区别](http://www.zuo11.com/blog/2020/6/content-dispositon.html)
- [js高程3的引用类型 - 单体内置对象 - global对象 - URI编码方法笔记](https://www.yuque.com/guoqzuo/js_es6/ep07nf#841dc4e5)
- [关于URL编码 | 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2010/02/url_encoding.html)
