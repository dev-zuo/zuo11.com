---
{
  "title": "当if else逻辑较多时可以使用策略模式",
  "staticFileName": "if_else_handle.html",
  "author": "guoqzuo",
  "createDate": "2020/01/08",
  "description": "当项目中，if else较多时，我们可以考虑使用策略模式，来更优雅的处理，来看看demo",
  "keywords": "js策略模式的使用场景",
  "category": "计算机基础与开发工具"
}
---

# 当if else逻辑较多时可以使用策略模式

当项目中，if else较多时，我们可以考虑使用策略模式，来更优雅的处理，来看看demo

```js
// if else 
if () {
  a
} else if () {
  b
} else if () {
  c
}

// 更优雅的写法，策略模式
// 更多策略模式，策略模式表单验证可参考：JS设计模式与开发实战 第五章p82
let rules = [
  'a': () => { a },
  'b': () => { b },
  'c': () => { c },
]
rules[name]()
```
