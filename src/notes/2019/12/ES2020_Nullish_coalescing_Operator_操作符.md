---
{
  "title": "ES2020 '?.' 与 '??' 操作符",
  "staticFileName": "es2020_operator.html",
  "author": "guoqzuo",
  "createDate": "2019/12/09",
  "description": "Optional chaining operator(?.) 与 Nullish coalescing Operator(??) 目前正式进入 stg4，确定会成为ES2020标准，阮一峰老师已经在他的es6入门教程里更新了，下面来看看具体怎么使用",
  "keywords": "??与?.,js ??是什么意思,js ?.是什么意思",
  "category": "JavaScript"
}
---

# ES2020 '?.' 与 '??' 操作符

Optional chaining operator(?.) 与 Nullish coalescing Operator(??) 目前正式进入 stg4，确定会成为ES2020标准，阮一峰老师已经在他的es6入门教程里更新了，下面来看看具体怎么使用

## Optional chaining operator(?.)

可选链操作符，阮一峰ES6入门里称之为"链判断运算符"，**作用：当对象的属性或方法不存在时，需要先判断是否有值再使用。对于比较多层级的子属性判断就更复杂了，可选链操作符用于简化该场景的写法**
```js
// 示例1：当obj.sayHi存在，则执行该函数
obj.sayHi && obj.sayHi()
// 简化写法:
obj.sayHi?.() 

// 示例2: 如果当user.address为undefined，再访问子集元素会报错
var street = user.address ? user.address.street : undefined
// 简化写法: 
var street = user.address?.street

// 示例3
var argName = 'name'
obj?.[argName] 

// 语法
obj?.prop       // optional static property access
obj?.[expr]     // optional dynamic property access
func?.(...args) // optional function or method call

```
## Nullish coalescing Operator(??)

**Null判断运算符，主要用来替代 || 判断变量是否是null和undifined这两种情况，排除0，''，false的误判**，一般我们在判空时可能会出现问题，来看个例子
```js
// 示例
const response = {
  settings: {
    nullValue: null,
    height: 400,
    animationDuration: 0,
    headerText: '',
    showSplashScreen: false
  }
};

// 一般需求是，如果某个值非null 或undefined 就使用默认值
const undefinedValue = response.settings.undefinedValue || 'some other default'; // result: 'some other default'
const nullValue = response.settings.nullValue || 'some other default'; // result: 'some other default'

// 但 || 这种写法，只要左侧为false(比如(''、0、false))，也会使用默认值 
const headerText = response.settings.headerText || 'Hello, world!'; // Potentially unintended. '' is falsy, result: 'Hello, world!'
const animationDuration = response.settings.animationDuration || 300; // Potentially unintended. 0 is falsy, result: 300
const showSplashScreen = response.settings.showSplashScreen || true; // Potentially unintended. false is falsy, result: true

```
**?? 就是为了解决这种问题需求的，只有当左侧值为null或undefined，才使用右侧的默认值**
```js
const undefinedValue = response.settings.undefinedValue ?? 'some other default'; // result: 'some other default'
const nullValue = response.settings.nullValue ?? 'some other default'; // result: 'some other default'
const headerText = response.settings.headerText ?? 'Hello, world!'; // result: ''
const animationDuration = response.settings.animationDuration ?? 300; // result: 0
const showSplashScreen = response.settings.showSplashScreen ?? true; // result: false
```

参考文档：

[可选链 - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/%E5%8F%AF%E9%80%89%E9%93%BE)

[对象的扩展 - ECMAScript 6入门](http://es6.ruanyifeng.com/#docs/object#%E9%93%BE%E5%88%A4%E6%96%AD%E8%BF%90%E7%AE%97%E7%AC%A6)

[tc39 - Finished Proposals](https://github.com/tc39/proposals/blob/master/finished-proposals.md)

[tc39 - proposal-optional-chaining](https://github.com/tc39/proposal-optional-chaining)

[proposal-nullish-coalescing](https://github.com/tc39/proposal-nullish-coalescing)
