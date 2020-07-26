# Array.prototype.fill()填充引用类型值的问题

在mock表格list数据时，我一般为了简洁会先创建一个对象info，然后new Array(10).fill(info) 来生成10条数据的数组

但这次发现一个问题，由于表格有一个字段是状态值0 - 5，我想随机设置下值，发现修改后的值都一样，来看看例子

```js
let a = {a: 1}
let b = Object.assign({}, a) // {a: 1}
let c = Object.assign({}, a) // {a: 1}
b.b = 2 // 尝试修改值，看看a和c是否修改，发现只有b修改了，a,c没变说明地址不一样

// 来看看fill
let list = new Array(5).fill(Object.assign({}, a))
// 乍一看，貌似每个填充的地址都不一样，我们修改数组中的一个元素试试
list[0].b = 2
```
再打印list，发现list所有数组对象的值都变了，因此**fill填充的对象都指向同一个地址**

用 Array.prototype.fill() mdn查权威文档，发现里面确实有这一块的描述
```js
// Objects by reference.
var arr = Array(3).fill({}) // [{}, {}, {}];
// 需要注意如果fill的参数为引用类型，会导致都执行都一个引用类型
// 如 arr[0] === arr[1] 为true
arr[0].hi = "hi"; // [{ hi: "hi" }, { hi: "hi" }, { hi: "hi" }]
```

那么遇到这种情况不能用fill要怎么处理呢

```js
let a = {a: 1}
// 这里还是用了fill 如果不fill内容到数组，map遍历时会忽略所有空的元素
let list = new Array(5).fill({}).map(item => {
  item = Object.assign({}, a)
  item.xxx = Math.round(Matn.random() * 5)
  return item
})
```

参考: [Array.prototype.fill() - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)