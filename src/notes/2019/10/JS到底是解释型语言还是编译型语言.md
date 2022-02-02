---
{
  "title": "JS到底是解释型语言还是编译型语言",
  "staticFileName": "js_language.html",
  "author": "guoqzuo",
  "createDate": "2019/10/28",
  "description": "JS到底是解释型语言还是编译型语言呢？一般的书里都写的是js是一种解释型语言，但令人令人困惑的地方是：—般解释型语言是逐行解释执行的，为什么JS会有変曩提升(hoisting)的能力？执行JS时会用到JIT, JIT(just in time compilers 及时编译）会做代码优化(同时也会创建代码的编译版本),解释型语言无法做到这些变量提升问题",
  "keywords": "JS到底是解释型语言还是编译型语言",
  "category": "JavaScript"
}
---

# JS到底是解释型语言还是编译型语言

> 本文整理自 https://segmentfault.com/a/1190000013126460

Is JavaScript really interpreted or compiled language ?

## Js是一种解释型语言，令人困惑的地方

- —般解释型语言是逐行解释执行的，为什么JS会有変曩提升(hoisting)的能力？
- 执行JS时会用到JIT, JIT(just in time compilers 及时编译）会做代码优化(同时也会创建代码的编译版本),解释型语言无法做到这些变量提升问题

在函数作用域内的任何变量声明都会被提升到顶部，且值为undefined，

## JS处理声明语句的过程

- 一旦v8引擎进入一个执行具体代码的执行上下文(函数)，会对代码进行词法分析或分词(lexing and tokenizing the code), 会将代码切分为原子性的令牌(atomic token) , 比 如foo = 10 
- 在分析完当前作用域后，它会将翻译后的版本解析为AST(抽象语法树)
- 每次遇到声明都会将其发送到作用域，并创建绑定，每次声明都会为变量分配内存，只是分配内存，并不会通过修改源代码来将变最声明语句提升，在JS中分配内存，意味着将变量默认设置为undefined
- 在这之后，引擎每次遇到赋值或者取值，都会通过作用域(scope)查找绑定。如果当前作用域中没有找到，就接着向上级作用域中查找，直到找到为止 
- 接着引擎生成CPU可执行的机器码 
- 最后，代码执行完毕

## JIT是什么

JS start out slow, but then got faster thanks to something colled the JIT, but how does the JiT work ?
通俗一点说：浏览器在解释执行JS时，如果遇到某些语句多次执行，会将对应的语句编译，并存储。下次再执行相同的语句时，不用再重新编译，而是直接执行之前存储的该语句编译的版本。当然里面不止这么简单，还有很多优化， 详情參考: A crash course in just-in-time (JIT) compilers

## 总结

- JS需要有JS引擎解析才能执行。这是解释型语需要的，编译型语言程序你能直接运行。
- 变量提升只是JS解释器处理事情的方式导致的，
- JIT 是唯一一点可以对JS是否是解释型语言提出疑问的理由。但JIT不是完整的编译器，它仅在执行前编译，且JIT只是Mozilla 和 Google开发人员为了提升浏览器性能才引入的，JS或TC39从没有强制要求使用JIT，
综上：JS是解释型语言或混合型语言(编译型型和解释型的混合)，而不是编译型语亩。
