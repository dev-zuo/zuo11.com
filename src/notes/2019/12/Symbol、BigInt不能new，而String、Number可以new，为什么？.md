# Symbol、BigInt不能new，而String、Number可以new，为什么？

在基本数据类型中，我们发现像 String, Number 是可以通过 new 来创建的，而 Symbol，BigInt 却不能使用 new 创建，这是为什么呢？ BigInt 内部是怎么检测用户使用了new来调用的？下面来看看

```js
BigInt('1') // 1n
new BigInt(1)
// Uncaught TypeError: BigInt is not a constructor
//     at new BigInt (<anonymous>)
//     at <anonymous>:1:1
```
可以看到BigInt并不是构造函数，没有 constructor，就是一个普通的函数。我们来对比下Number。
```js
var a = Number('1') // 这个创建了一个 number 类型的数据, 非对象
typeof a  // "number"
var b = new Number('1') // 这个是创建了一个Number对象,是对象
typeof b // "object"
b // Number {1}
b.valueOf() // 1
b.__proto__ === a.__proto__ // true
```
可以看到其实 Number 不仅可以当构造函数用，也可以直接当普通函数用，内部有处理，而 BigInt 它是不支持 new 调用的。

## 为什么 BigInt、Symbol 不能 new
最近看 JavaScript 高级程序设计第四版，在 Symbol 类型 p45 有介绍，Symbol 不支持 new。**这样做是为了避免创建 Symbol 原始值包装对象** 

在引用类型中，有三种原始值包装类型：String、Number、Boolean。原始值类型 "abc"、123 不是对象，**原始值包装类型** 是用来把原始值包装成对象的引用类型。

除了 JS 自身内部处理可能会使用外，我们在开发的实际场景中，一般都不会使用。一般使用字面量的形式，不会创建对应的对象。对开发体验来讲是比较鸡肋的功能。新增的 Symbol、BigInt 没有必要向开发者提供创建对应原始值对象的 API。一般也不会使用，多此一举。

以 Symbol 为例，如果你要创建 Symbol 包装对象，可以使用 Object()，代码如下

```js
let mySymbol = Symbol() 
mySymbol // Symbol()
typeof mySymbol // "symbol"
let myWrappedSymbol = Object(mySymbol)
myWrappedSymbol // Symbol {Symbol()}
typeof myWrappedSymbol // "object"
```

## Symbol、BigInt内部是怎么检测用户使用了new来调用的？
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