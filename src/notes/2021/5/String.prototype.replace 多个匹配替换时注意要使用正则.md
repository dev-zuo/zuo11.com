---
{
  "title": "String.prototype.replace 多个匹配替换时注意要使用正则",
  "staticFileName": "replace_regExp.html",
  "author": "guoqzuo",
  "createDate": "2021/05/04",
  "description": "在做字符串替换时可以使用 repalce，但这里要注意，当需要替换多个时，第一个参数不能是字符串，要使用正则表达式。来看一个例子，将字符串 '1,000,000' 中的 ',' 替换为空字符串 ''。注意：上面的例子中，如果单纯的字符串替换，只会替换第一个，全局匹配时，第一个参数就要用正则了",
  "keywords": "replace多个匹配时需要使用正则",
  "category": "JavaScript"
}
---
# String.prototype.replace 多个匹配替换时注意要使用正则
在做字符串替换时可以使用 repalce，但这里要注意，当需要替换多个时，第一个参数不能是字符串，要使用正则表达式

来看一个例子，将字符串 "1,000,000" 中的 "," 替换为空字符串 ""
```js
let str = "1,000,000"
str.replace(",", "") // "1000,000"
```

注意：上面的例子中，如果单纯的字符串替换，只会替换第一个，全局匹配时，第一个参数就要用正则了

```js
let str = "1,000,000"
str.replace(/,/g, "") // "1000000"
```