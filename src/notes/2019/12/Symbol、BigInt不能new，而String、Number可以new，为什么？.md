# Symbol、BigInt不能new，而String、Number可以new，为什么？

在基本数据类型中，我们发现像String, Number是可以通过 new 来创建的，而 Symbol，BigInt 却不能使用new创建，这是为什么呢？ BigInt内部是怎么检测用户使用了new来调用的？下面来看看

```js
BigInt('1') // 1n
new BigInt(1)
// Uncaught TypeError: BigInt is not a constructor
//     at new BigInt (<anonymous>)
//     at <anonymous>:1:1
```
可以看到BigInt并不是构造函数，没有constructor，就是一个普通的函数。我们来对比下Number。
```js
var a = Number('1') // 这个创建了一个 number 类型的数据, 非对象
typeof a  // "number"
var b = new Number('1') // 这个是创建了一个Number对象,是对象
typeof b // "object"
b // Number {1}
b.valueOf() // 1
b.__proto__ === a.__proto__ // true
```
可以看到其实Number不仅可以当构造函数用，也可以直接当普通函数用，内部有处理，而BigInt它是不支持new调用的，内部没有做相应处理

为什么？我的理解是，对于BigInt来说，支持new调用，是一个比较鸡肋的功能。然后就没有加。与他有关联的 BigInt64Array 是支持new调用的。


## BigInt内部是怎么检测用户使用了new来调用的？
对于函数来讲，怎么区分是new调用，还是直接调用? 复习下JS高程3中 [作用域安全的构造函数](https://www.yuque.com/guoqzuo/js_es6/aquxsq#482800ea) 的内容，在构造函数中，通过 this instanseof XX 来判断是new 调用的，还是直接调用的构造函数，像BigInt这种，当new调用时，直接就抛出了异常，来用个例子试试

```js
// 模拟实现
function A() {
  console.log(this)
  if (this instanceof A) {
    throw new Error('Uncaught TypeError: A is not a constructor')
  }
  return ''
}
// 测试
A() // window   ''
new A() // A {}  Uncaught TypeError: A is not a constructor
```

再复习一下class，class 创建的类型也是function，且只能通过new调用，应该函数内部也是加了类似上面的校验，当this instanceof 不等于当前class时，就直接抛异常

总结：核心问题是 this 的指向问题，一般直接调用A()时this指向window