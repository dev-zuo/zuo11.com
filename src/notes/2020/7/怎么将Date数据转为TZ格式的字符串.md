
# 怎么将Date数据转为TZ格式的字符串

后台要求的数据格式 "2020-04-10T04:01:00.000Z" 为TZ格式的字符串。Date对象toString为 "Fri Apr 10 2020 12:00:00 GMT+0800 (中国标准时间)" 这种格式，那怎么转TZ字符串格式呢？**用 Date.prototype.toJSON() 方法即可** 
```js
a = new Date('2020/04/10 12:00:00') 
Fri Apr 10 2020 12:00:00 GMT+0800 (中国标准时间)

a.toJSON() //"2020-04-10T04:01:00.000Z"
```

参考：[Date.prototype.toJSON() - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/toJSON)