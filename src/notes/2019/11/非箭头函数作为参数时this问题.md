# 非箭头函数作为参数时this问题

复习下JS高程3里面将的函数做参数时this的问题，如果是非箭头函数，参数函数中使用了this，那么this取决于执行函数的this指向，而非参数函数执行环境的this，怎么将this绑定呢？有三种方法

1. 使用bind绑定一个作用域 
2. 使用闭包 
3. 使用箭头函数

来看 demo

```js
var a = 5

function callback() {
  console.log('-- callback this', this, this.a, '--')
}
function validate() {
  console.log('-- validate this', this, this.a, '--')
}
function showPrompt(title, validate, callback) {
  validate()
  callback()
}
showPrompt('1', validate, callback) // 5 5 
showPrompt('1', validate.bind({a: 2}), callback.bind({a: 1})) // 2 1
```
或者
```js
var a = 5
var callback = {
  a: 1,
  handler() {
    console.log(this, this.a)
  }
}
var validate = {
  a: 2,
  handler() {
    console.log(this, this.a)
  }
}
function showPrompt(title, validate, callback) {
  validate()
  callback()
}
showPrompt('1', validate.handler, callback.handler) // 5 5 
showPrompt('1', validate.handler.bind(validate), callback.handler.bind(callback)) // 2 1
```
使用箭头函数
```js
var a = 5
var callback = {
  a: 1,
  handler: () => {
    console.log(this, this.a)
  }
}
var validate = {
  a: 2,
  handler: () => {
    console.log(this, this.a)
  }
}
function showPrompt(title, validate, callback) {
  validate()
  callback()
}
showPrompt('1', validate.handler, callback.handler) // 5 5 
showPrompt('1', validate.handler.bind(validate), callback.handler.bind(callback)) // 5 5
```