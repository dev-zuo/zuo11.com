---
{
  "title": "not和nth混用的问题",
  "staticFileName": "not_nth.html",
  "author": "guoqzuo",
  "createDate": "2019/12/09",
  "description": ":not() 不支持在其参数中使用其他伪类。例如，h1:not(p:first-of-type) 不能匹配任何元素，所以不能混用，额外加个class吧",
  "keywords": ":not和:nth混用的问题",
  "category": "CSS"
}
---
# :not和:nth混用的问题

:not() 不支持在其参数中使用其他伪类。例如，h1:not(p:first-of-type) 不能匹配任何元素，所以不能混用，额外加个class吧

参考：[:not() - CSS（层叠样式表） | MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:not)
