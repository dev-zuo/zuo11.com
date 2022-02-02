---
{
  "title": "HTMLCollection 和 NodeList 有什么区别",
  "staticFileName": "HTMLCollection-NodeList.html",
  "author": "guoqzuo",
  "createDate": "2020/12/30",
  "description": "在获取 dom 节点结集合时，有的 API 返回的是 HTMLCollection 类型，有的是 NodeList 类型。他们有什么区别呢？下来看看具体的 API。HTMLCollection 和 NodeList 的相同点：1. 它们都是表示节点集合的类数组对象，都可以是活动对象（实时监听 dom 变化并修改值） 2. 它们都有 length 属性，都可以通过 item() 和数组下标的方式访问内部元素。都实现了 Symbol.iterator 迭代器方法（可以被 for...of 遍历）",
  "keywords": "HTMLCollection,NodeList,HTMLCollection与NodeList区别",
  "category": "JavaScript"
}
---
# HTMLCollection 和 NodeList 有什么区别
在获取 dom 节点结集合时，有的 API 返回的是 HTMLCollection 类型，有的是 NodeList 类型。他们有什么区别呢？下来看看具体的 API

返回 HTMLCollection 类型的 API
- element.children 获取 element 元素的所有子元素节点
- document.getElementsByTagName('div')
- document.getElementsByName('kk')
- document.getElementsByClassName('kk')
- document.anchors 获取文档中所有带 name 特性的 a 元素，必须要有 name 属性
- document.forms 相当于 document.getElementsByTagName('form')
- document.images 相当于 document.getElementsByTageName('img')
- document.links 获取所有a元素，相当于 documet.getElmentsByTagName('a')
- form.elements 表单 form 元素的所有表单字段元素

返回 NodeList 类型的 API
- element.childNodes 获取元素所有子节点(包含元素节点、文本节点、注释节点等)
- document.querySelectorAll('div')

HTMLCollection 和 NodeList 的相同点：
1. 它们都是表示节点集合的类数组对象，都可以是活动对象（实时监听 dom 变化并修改值）
2. 它们都有 length 属性，都可以通过 item() 和数组下标的方式访问内部元素。都实现了 Symbol.iterator 迭代器方法（可以被 for...of 遍历）

HTMLCollection 和 NodeList 的不同点：
- HTMLCollection 中的值都是 Element 元素节点类型，NodeList 中的值是 Node 节点类型，可以是 Element 元素节点，也可以是 文本节点、注释节点等
- HTMLCollection 支持但 NodeList 不支持的方法：namedItem() - 通过 name 属性查找元素。NodeList 支持但 HTMLCollection 不支持的方法 keys(), values(), entries(), forEach()

关于 document.querySelectorAll() 函数的特殊情况，理论上该函数获取的是元素集合，可以使用 HTMLCollection，但为什么使用了 NodeList 呢？来看下面的例子
```js
a = document.querySelectorAll('div')
b = document.getElementsByTagName('div')
console.log(a.length, b.length) // 75 75
document.body.appendChild(document.createElement('div'))
console.log(a.length, b.length) // 75 76
console.log(document.querySelectorAll('div').length) // 76
console.log(document.getElementsByTagName('div').length) // 76
```

上面的例子中 getElementsByTagName 获取的 HTMLCollection 类型的集合是实时的，动态的。而 querySelectorAll 获取的 NodeList 是非实时的，是静态的。

我的理解是，HTMLCollection 可能不支持创建静态副本。而 NodeList 可以是动态的活动对象，比如 element.childNodes，也可以是静态的，比如 querySelectorAll() 返回值。

参考：
- [querySelectorAll() - Selectors API - 15. DOM 扩展 - JS高程4](http://fe.zuo11.com/js/ad3/js-ad3-15.html#queryslectorall)
- [HTMLCollection与NodeList - Segmentfault](https://segmentfault.com/a/1190000006782004)