---
{
  "title": "JS 数据类型有多少种，有哪些细节需要注意的？",
  "staticFileName": "js_data_type.html",
  "author": "guoqzuo",
  "createDate": "2020/12/15",
  "description": "ES3 有 5 种基本数据类型：null、undefined、boolean、number、string；1 种复杂数据类型 object。ES6+ 后面新增了两种基本数据类型：Symbol, Bigint。如果把函数 function 也算作一种数据类型，就是 9 种。需要注意的是：- typeof 数组值为 `object`，typeof 函数值为 `function`, typeof null 值为 `object`，本质上其实有 9 种数据类型。- new String('12') 是字符串对象，不是 string，new Number(1) 是数字对象，不是 number，new Boolean(false) 是对象，不是 boolean",
  "keywords": "js数据类型有多少种,js数据类型,js data type",
  "category": "JavaScript"
}
---
# JS数据类型有多少种，有哪些细节需要注意的？
ES3 有 5 种基本数据类型：null、undefined、boolean、number、string；1 种复杂数据类型 object。ES6+ 后面新增了两种基本数据类型：Symbol, Bigint。如果把函数 function 也算作一种数据类型，就是 9 种。

需要注意的是：
- typeof 数组值为 `object`，typeof 函数值为 `function`, typeof null 值为 `object`，本质上其实有 9 种数据类型。
- new String('12') 是字符串对象，不是 string，new Number(1) 是数字对象，不是 number，new Boolean(false) 是对象，不是 boolean
- 新增的 Symbol 以及 bigint 都是不能 new 的，没有 constructor 构造函数方法，参考：[Symbol、BigInt不能new，而String、Number可以new，为什么？ - 左小白的技术日常](http://127.0.0.1:3001/blog/2019/12/new_check.html)

测试 demo 如下
```js
var a = null,       // null
    b = undefined, // undefined 
    c = false, // boolean
    d = 1, // mumber
    e = "123", // string
    f = {}, // object
    g = Symbol("3"), // symbol
    h = BigInt(4), // 4n bigint
    i = function() {}; // function
[a, b, c, d, e, f, g, h, i].forEach(item => console.log(`typeof `, item, `: ${typeof item}`))
// typeof  null : object
// typeof  undefined : undefined
// typeof  false : boolean
// typeof  1 : number
// typeof  123 : string
// typeof  {} : object
// typeof  Symbol(3) : symbol
// typeof  4n : bigint
// typeof  ƒ () {} : function
```