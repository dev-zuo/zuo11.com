---
{
  "title": "怎么遍历localStorage",
  "staticFileName": "localstorage_iterator.html",
  "author": "guoqzuo",
  "createDate": "2019/12/19",
  "description": "localStorage本身没有提供对应的遍历方法，我们可以使用 localStorage.key(index) 结合for循环来遍历",
  "keywords": "怎么遍历localStorage,怎么遍历sessionStorage",
  "category": "JavaScript"
}
---

# 怎么遍历localStorage

localStorage本身没有提供对应的遍历方法，我们可以使用 localStorage.key(index) 结合for循环来遍历


```js
let len = localStorage.length
for (let i = 0; i < len; i++) {
  let keyName = localStorage.key(i)
  console.log(keyName, localStorage.getItem(keyName))
}
```

同理，sessionStorage也可以用类似的方法来遍历
