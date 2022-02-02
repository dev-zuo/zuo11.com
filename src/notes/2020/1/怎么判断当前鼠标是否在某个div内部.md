---
{
  "title": "怎么判断当前鼠标是否在某个div内部",
  "staticFileName": "contains.html",
  "author": "guoqzuo",
  "createDate": "2020/01/07",
  "description": "当监听到事件，事件的 eveent.target 怎么判断是否在某个div内部呢？可以使用DOM专有扩展的contains方法",
  "keywords": "怎么判断当前鼠标是否在某个div内部,怎么判断当前event.target在某个div内部",
  "category": "JavaScript"
}
---

# 怎么判断当前鼠标是否在某个div内部

当监听到事件，事件的 eveent.target 怎么判断是否在某个div内部呢？可以使用DOM专有扩展的contains方法

```js
let eventType = document.mozHidden ? 'DOMMouseScroll' : 'mousewheel'
let ele = '某个dom'
ele.addEventListener(eventType, (e) => {
  if ('容器范围内dom'.contains(e.target)) {
    // 当前鼠标在容器内
  }
})
```

参考：[DOM专有扩展 contains方法 | JS高程3笔记](https://www.yuque.com/guoqzuo/js_es6/qgh717#2a813746)