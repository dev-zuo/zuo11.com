
# JS 为什么使用set对数组或对象去重时会无效？

我们知道Set是JS的一个种新的数据结构，和数组类似，和数组不同的是它可以去重，比如存入两个1或两个"123"，只有1条数据会存入成功，但有个特殊情况，如果添加到set的值是引用类型，比如数组、对象，他将无法自动去重。因为值相同的两个引用类型地址是不一样的。下面来看一个例子：

```js
var mySet = new Set()
mySet.add([-1,0,1])
mySet.add([-1,0,1])
mySet.add({a: 1})
mySet.add({a: 1})
mySet.size // 4
console.log(Array.from(mySet)) // [[-1, 0, 1], [-1, 0, 1], {a: 1}, {a: 1}]
```

我们来看看mdn上的文档描述

Description
> Set objects are collections of values. You can iterate through the elements of a set in insertion order. A value in the Set may only occur once; it is unique in the Set's collection.

Value equality
> Because each value in the Set has to be unique, the value equality will be checked. In an earlier version of ECMAScript specification, this was not based on the same algorithm as the one used in the === operator. Specifically, for Sets, +0 (which is strictly equal to -0) and -0 were different values. However, this was changed in the ECMAScript 2015 specification. See "Key equality for -0 and 0" in the browser compatibility table for details. NaN and undefined can also be stored in a Set. All NaN values are equated (i.e. NaN is considered the same as NaN, even though NaN !== NaN).

我们可以简单理解为，像Set实例add数据时，每次都会进行等值判断，类似于将add的元素与每个元素进行 === 比较。因此对引用类型的去重是无效的

```js
var stra = "test"
var strb = "test"
var a = { a : 1}
var b = { a : 1}
stra === strb // true
a === b // false 尽管他们都是对象 { a: 1 }，但他们存储的地址是不一样的 
```

那这种情况怎么去重呢。我们可以自己写方法来处理，以数组为例子，可以将值[-1, 0, 1].join('|') 处理下，添加进去，到时统一再split出来

参考：[The Set | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

