
# 为什么说toFixed是不准确的
Number.prototype.toFixed() 对number取整或保留指定小数位，但它是不准确的，就类似 0.1 + 0.2 ≠ 0.3 一样，下面来看看怎么处理

## Number.prototype.toFixed()
```js
/**
 * Number.prototype.toFixed()
 * The toFixed() method formats a number using fixed-point notation.
 * 使用方法：
 * numObj.toFixed(digits) 
 * @params { Integer } digits 可选 保留精度，为空时，默认为0，即取整
 * @returns { String } 返回转换后的字符串
 */
var a = 1.235
a.toFixed()  // "1"
typeof a.toFixed()  // "string"
a.toFixed(2) // "1.23"
```

## toFixed四舍五入不准确的问题
```js
var a = 0.15
var b = 0.25
a.toFixed(1) // "0.1"  注意这里四舍五入异常
b.toFixed(1) // "0.3"  这里四舍五入又是成功的
```
怎么改善呢？假如想对0.15保留2位小数，先乘以100，转为 15，再除以100，再用toFixed()，0.15就是正常的了。以此类推

我们可以来写一个通用的myToFixed方法处理
```js
// 如果希望精准的保留1位小数可以   Math.round(a*10) / 10, 如果是两位 100，n位  Math.pow(10, n)
Number.prototype.myToFixed = function (num) {
  // 在原型方法注入 myToFixed函数，这里怎么获取当前的值呢？可以使用this
  // 注意 this 是一个Number对象
  // var a = Number(2)  // 2  typeof a 为 "number"
  // var b = new Number(2) // Number{2}  typeof b 为 "object"
  // 获取值需要使用 b.valueOf()  // 2

  // 如果没有传参数
  if (num === undefined) {
    return Math.round(this.valueOf())
  }

  // 如果有传参，且为整数
  if (Number.isInteger(num)) {
    var tempCount = Math.pow(10, num)
    var tempNum = Math.round(this.valueOf() * tempCount) / tempCount
    // 这一步其实已经就可以了。但对于保留整数后面两位小数来说，会有bug
    // var a = 2
    // a.myToFixed(2)  =>  2  而不是 2.00
    // 需要再转换下
    return tempNum.toFixed(num)
  } else {
    throw new Error('参数必须是number类型，且必须是整数')
  }
}
```

## 负数的运算符优先级问题
```js
-2.12.toFixed(1) // -2.1  注意返回的字符串，被 - 操作后就是number了
(-2.12).toFixed(1) // "-2.1"
```

## 参考
- [Number.prototype.toFixed() - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed)