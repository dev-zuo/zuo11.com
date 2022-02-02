---
{
  "title": "URLSearchParams URL查询字符串处理",
  "staticFileName": "web_url_searchparams.html",
  "author": "guoqzuo",
  "createDate": "2019/10/10",
  "description": "一般在通过url传参时会使用查询字符串，一般使用字符串相加的方法，当参数比较多时，就显得不够优雅了，这时就可以使用专门用于处理 URL 查询字符串API: URLSearchParams",
  "keywords": "URLSearchParams URL查询字符串处理,url查询字符串处理,URLSearchParams,处理查询字符串优雅的方法",
  "category": "JavaScript"
}
---
# URLSearchParams URL查询字符串处理

一般在通过url传参时会使用查询字符串，一般使用字符串相加的方法，当参数比较多时，就显得不够优雅了，这时就可以使用专门用于处理 URL 查询字符串API: URLSearchParams

## 以面向对象的方法操作查询字符串
```js
var searchParams = new URLSearchParams()
searchParams.append('a', 1212)
searchParams.append('b', 'xxx')
searchParams.toString()   // "a=1212&b=xxxx"

// 传参
var paramsString = "q=URLUtils.searchParams&topic=api"
var searchParams = new URLSearchParams(paramsString);

for (let p of searchParams) {
  console.log(p);
}
// 打印值
// ["q", "URLUtils.searchParams"]
// ["topic", "api"]
```

## URLSearchParams构造函数注意事项
URLSearchParams构造函数不会解析完整 URL，但是如果字符串起始位置有 ? 会被去除，如果需要处理完整的url，可以先用new URL(url)中转一下
```js
var paramsString1 = "http://example.com/search?query=%40";
var searchParams1 = new URLSearchParams(paramsString1);

searchParams1.has("query"); // false 
searchParams1.has("http://example.com/search?query"); // true

searchParams1.get("query"); // null
searchParams1.get("http://example.com/search?query"); // "@" (equivalent to decodeURIComponent('%40'))

var paramsString2 = "?query=value";
var searchParams2 = new URLSearchParams(paramsString2);
searchParams2.has("query"); // true 

var url = new URL("http://example.com/search?query=%40");
var searchParams3 = new URLSearchParams(url.search);
searchParams3.has("query") // true
```
## 结合Object.fromEntries解析查询字符串
Object.fromEntries()方法是Object.entries()的逆操作，用于将一个键值对数组转为对象。
```js
Object.fromEntries([
  ['foo', 'bar'],
  ['baz', 42]
])
// { foo: "bar", baz: 42 }

// 用来处理查询字符串
Object.fromEntries(new URLSearchParams('foo=bar&baz=qux'))
// { foo: "bar", baz: "qux" }
```

注意：**Object.fromEntries() 暂时不支持 Edge、IE，详情参见下面的MDN文档链接**

## 参考
- [Object.fromEntries() - 对象的扩展与新增方法 | 语雀](https://www.yuque.com/guoqzuo/js_es6/rxu7ms#e6a375d4)
- [Object.fromEntries() - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries)
- [URLSearchParams - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams)