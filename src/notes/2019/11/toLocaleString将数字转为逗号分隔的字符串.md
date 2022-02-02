---
{
  "title": "toLocaleString将数字转为逗号分隔的字符串",
  "staticFileName": "num_str.html",
  "author": "guoqzuo",
  "createDate": "2019/11/14",
  "description": "Number.prototype.toLocaleString()可以将数字转换为千分位逗号分隔的字符串，而且该方法还内置了数字转人民币、美元等字符串的方法，这样我们在处理金钱相关的数据时就可以很方便使用了，来看一个列子",
  "keywords": "toLocaleString将数字转为逗号分隔的字符串,toLocaleString,Number.prototype.toLocaleString",
  "category": "JavaScript"
}
---

# toLocaleString将数字转为逗号分隔的字符串

Number.prototype.toLocaleString()可以将数字转换为千分位逗号分隔的字符串，而且该方法还内置了数字转人民币、美元等字符串的方法，这样我们在处理金钱相关的数据时就可以很方便使用了，来看一个列子

```js
var number = 12123
number.toLocaleString() // "12,123"
number.toLocaleString('en', {style:'currency', currency:'USD'}) // "$12,123.00"
number.toLocaleString('cn', {style:'currency', currency:'CNY'}) // "￥12,123.00"
```

参考 [Number.prototype.toLocaleString() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString)