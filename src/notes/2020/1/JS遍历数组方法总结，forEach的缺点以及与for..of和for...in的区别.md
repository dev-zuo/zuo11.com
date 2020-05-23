
# JS遍历数组方法总结，forEach的缺点以及与for..of和for...in的区别

在ES5中新增了很多方便操作数组的方法，包括新5种数组的迭代方法：forEach, map, filter, some, every；缩小方法：reduce()；检测数组方法Array.isArray()等，这些方法让操作数组更加优雅，趋近于函数式编程. 在ES6中又增加了for..of以及values,entres,keys等，下面来详细看看

## ES5 Array5种迭代方法
ES5定义了5个迭代方法，每个方法都接收两个参数，运行函数及作用域对象(this)，IE9+支持
- 检测数组里的元素是否满足条件。every()、some() 返回Boolean值
  - every() 对数组的每一项运行给定函数，函数对每一项都返回true，则返回true
  - some() 对数组的每一项运行给定函数, 如果函数对数组的任一项返回的true，return true
- 只做遍历，不返回任何值
  - forEach()  对数组的每一项运行给定函数, 不返回任何值，只做函数操作 类似于 for () { do something }
- 返回数组
  - filter()  对数组的每一项运行给定函数, 返回该函数会返回true的项组成的数组
  - map()  对数组的每一项运行给定函数, 返回每次函数调用结果组成的数组

```js
var numbers = [1,2,3,4,5];

var isGreaterThan2 = function (item, index, array) {
    return (item > 2)
};

var everyResult = numbers.every(isGreaterThan2);
var someResult = numbers.some(isGreaterThan2);
var filterResult = numbers.filter(isGreaterThan2);

alert(everyResult); // false   是否所有值都大于2
alert(someResult); // true 是否有一个值大于2
alert(filterResult); // [3,4,5]  返回所有大于2的项

var mapResult = numbers.map(function (item, index, array) {
    return (item * 2);
});
alert(mapResult); // [2,3,6,8,10] 返回每个元素执行完*2后的数组

numbers.foreach(function(item, index, array) {
  cosnole.log(item)  // 依次打印数组的值
})
```

## ES5 Array.prototype.reduce()
ES5新增了两个缩小数组的方法reduce()和reduceRight(), 会迭代数组的所有项，然后构建一个最终返回的值。reduce从数组的第一项开始，逐个遍历到最后。reduceRight则从数组的最后一项开始，向前遍历到第一项。
- 该方法接收两个参数：一个在每一项上调用的函数，和（可选的）作为归并基础的初始值。
- 第一个参数的函数，接收4个参数：前一个值；当前值；项的索引；数组对象；这个函数返回的任何值，都会作为第一个参数传个下一项。第一次迭代发生在数组的第二项上，第一个参数是第一项，第二个参数为数组的第二项。

```js
// 一参的情况
var values = [1,2,3,4,5];
var sum = values.reduce(function(prev, cur, index, array) {
    return prev + cur;
});
alert(sum); // 15

// 二参的情况，reduce二参为初识值，然后函数第一个参数为初识值，第二个参数为数组第一个元素，再依次遍历
var numbers = [15.5, 2.3, 1.1, 4.7];
// 四舍五入相加
numbers.reduce(function(total, num) {
  return total + Math.round(num);
}, 0)

// 计算数组中每个元素出现的次数
// MDN文档：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];

var countedNames = names.reduce(function (allNames, name) { 
  if (name in allNames) {
    allNames[name]++;
  }
  else {
    allNames[name] = 1;
  }
  return allNames;
}, {});
// countedNames is:
// { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }
```

## ES5 Array.isArray() 检测是否为数组
在JS高程3中有讲过安全的类型检测，Object.prototype.toString.call(要检测类型的变量)，如果等于 "[object Array]"就是函数类型，ES5对这个方法进行了封装，我们直接使用Array.isArray(要检测类型的变量)即可
```js
// 判断是否为数组，在进行后续操作
if (value instanceof Array) {
    // 对数组执行某些操作
}
// ES5之后可以用 Array.isArray(value) 来替代，解决多个框架不同版本的Array构造函数问题
// 当检测Array实例时, Array.isArray 优于 instanceof,因为Array.isArray能检测iframes.
```
在mdn的官方文档里 [Array.isArray() Polyfill | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray) 有描述, 假如不存在 Array.isArray()，则在其他代码之前运行下面的代码将创建该方法。
```js
if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}
```
## forEach的缺点
现在一般再项目中，我经常使用forEach方法，形成了习惯，后来发现当只需要遍历部分元素，达到具体条件后就退出的情况时，这才发现forEach貌似是无法continue或break的，这是它的一个缺陷。这时我们可以使用some或直接使用原始的for循环来代替

### 实例场景
```js
// 真实场景: 匹配路由数组里的路径，匹配到就结束遍历，发现无法结束遍历
// 遍历路由进行匹配，如果匹配到了则执行，停止往下执行下一个中间件，否则向下执行
stock.forEach((item) => {
  if (ctx.url === item.path && item.methods.includes(ctx.method)) {
    return
  }
  await next()
})
```
### 使用some测试
```js
var arr = [1,2,3,4,5] // 为了好在termial执行，改为var
var result = arr.some(item => {
    console.log('遍历数组', item)
    return item === 2
}) 
console.log('result', result)
// 遍历数组 1
// 遍历数组 2
// result true
```
some测试结果，可以阻断遍历执行，适用于遇到单一条件就直接结束遍历的情况

### 使用最原始的for
```js
var arr = [1,2,3,4,5] 
// for里面的第二个语句每次循环结束后都会去执行比较
// ;i < arr.length; 每次都计算arr.length，这个值每次会减一，如果把len在一个参数里计算好
// 复杂度会从O(n) => O(1)
// 参考：JS高程3 第24章 最佳实践 - 性能 - 选择正确的方法 - 优化循环
for (let i = 0, len = arr.length; i < len; i++) {
    let item = arr[i]
    if (item === 2) continue
    if (item === 4) break
    console.log('遍历数组', item)
}
// 遍历数组 1
// 遍历数组 3
```
使用原始的for循环，控制更加精准

### 使用throw异常的方式结合try catch终端forEach
```js
// 参考：https://www.cnblogs.com/Marydon20170307/p/8920775.html
try {
  var array = ["first","second","third","fourth"];

  // 执行到第3次，结束循环
  array.forEach(function(item,index){
      if (item == "third") {
          throw new Error("EndIterative");
      }
      alert(item);// first,sencond
  });
} catch(e) {
    if(e.message!="EndIterative") throw e;
};
```

## ES6新增的数组迭代方法for...of,entries()，keys()和values()
可以用for...of循环进行遍历，它们都返回一个遍历器对象（具体细节参见《ES6入门 Iterator》一章）。**唯一的区别是keys()是对键名(数组下标)的遍历、values()是对键值的遍历，entries()是对键值对的遍历。**
```js
for (let index of ['a', 'b'].keys()) {  
  console.log(index);}
// 0
// 1
for (let elem of ['a', 'b'].values()) {
  console.log(elem);}
// 'a'
// 'b'
for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);}
// 0 "a"
// 1 "b"
```
相比forEach，for...of是可以使用break，continue中断的，而不需要像最普通的for那样写index，比较长度，自增1等
```js
for (let item of ['a','b','c']) {console.log(item)}
// a
// b
// c
```
## for...in遍历数组
for...in一般是用来遍历对象的，他也可以遍历数组
```js
for (let item in ['a','b','c']) {console.log(item)}
// 0, 1, 2 和for...of的区别是他遍历的是数组下标
```

## 遍历数组时对空格的处理
```js
// ES5 对空位的处理
// forEach(), filter(), reduce(), every() 和some()都会跳过空位
// map()会跳过空位，但会保留这个值
// join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串

// forEach方法
[,'a'].forEach((x,i) => console.log(i)); // 1
// filter方法
['a',,'b'].filter(x => true) // ['a','b']
// every方法
[,'a'].every(x => x==='a') // true
// reduce方法
[1,,2].reduce((x,y) => x+y) // 3
// some方法
[,'a'].some(x => x !== 'a') // false
// map方法
[,'a'].map(x => 1) // [,1]
// join方法
[,'a',undefined,null].join('#') // "#a##"
// toString方法
[,'a',undefined,null].toString() // ",a,,"

// ES6 则是明确将空位转为undefined。
// entries()
[...[,'a'].entries()] // [[0,undefined], [1,"a"]]
// keys()
[...[,'a'].keys()] // [0,1]
// values()
[...[,'a'].values()] // [undefined,"a"]
// find()
[,'a'].find(x => true) // undefined
// findIndex()
[,'a'].findIndex(x => true) // 0
```

参考：

- [ES5 5种Array迭代方法 | JS高程3笔记](https://www.yuque.com/guoqzuo/js_es6/ep07nf#b5608f9d)
- [ES6数组的扩展 | ES6入门笔记](https://www.yuque.com/guoqzuo/js_es6/xr0m8g#3dc09eb1)
- [ES2015(ES6)及之前的JS版本更新概要 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/New_in_JavaScript)
