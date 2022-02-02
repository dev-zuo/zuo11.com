---
{
  "title": "Date.prototype.toLocaleString()在0点或12点时转换异常的问题",
  "staticFileName": "toLocaleString_exception.html",
  "author": "guoqzuo",
  "createDate": "2020/07/26",
  "description": "toLocaleString时间异常的情况，toLocaleString在0点或12点时时间转换问题，在使用toLocaleString把Date转为字符串时，需要额外注意时间为 '00:00:00' 和 '12:00:00' 的情况，它们分别会被转为 上午12:00:00，下午12点，下面来看看",
  "keywords": "toLocaleString时间异常的情况,toLocaleString在0点或12点时时间转换问题",
  "category": "JavaScript"
}
---

# Date.prototype.toLocaleString()在0点或12点时转换异常的问题

在使用toLocaleString把Date转为字符串时，需要额外注意时间为 '00:00:00' 和 '12:00:00' 的情况，它们分别会被转为 上午12:00:00，下午12点，下面来看看

```js
a = new Date('2020/04/10 00:00:00') 
// Fri Apr 10 2020 00:00:00 GMT+0800 (中国标准时间)

a.toLocaleString() // "2020/4/10 上午12:00:00"
a.getHours() // 0
a.getMinutes() // 0
a.getSeconds() // 0
```
那我们来试试 '12:00:00' 的情况
```js
a = new Date('2020/04/10 12:00:00') 
// Fri Apr 10 2020 12:00:00 GMT+0800 (中国标准时间)
a.toLocaleString() // "2020/4/10 下午12:00:00"
a.getHours() // 12
```
综上:**虽然Date对象的toLocaleString()比较好用，但还是仅用日期方面的toLocaleDateString()，时间方面的还是尽量不要使用**

参考：[Date.prototype.toLocaleString() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString)
