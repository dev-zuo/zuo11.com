# element.childNodes 和 element.children 有什么区别
元素的 **childNodes** 和 **children** 属性都是用于获取元素子节点，他们返回值都是类数组对象，且都是活动对象（当节点变更后，值也会动态变更）。但有以下区别：
1. childNodes 获取的子节点包含所有节点类型，比如注释节点、文本节点、换行空白符文本节点，而 children 仅包含元素类型的子节点。
2. childNodes 类型是 NodeList，children 类型是 HTMLCollection

有了 childNodes 为什么又出了 children 这个 DOM 专有扩展？children 属性是因为 IE9 之前的版本与其他浏览器在处理空白文本节点上有差异才出现的。参见 《JavaScript 高级程序设计（第 4 版）》第 15 章 DOM 扩展 - 专有扩展 - children 属性 p456
```js
(function() {
  let testDom = document.createElement('div')
  testDom.innerHTML = `
    123
    <!-- sdfsdf -->
    <span>abc</span>
    <div>test</div>
  `
  let { childNodes, children } = testDom
  console.log(childNodes) // NodeList(7) [text, comment, text, span, text, div, text]
  console.log(children) // HTMLCollection(2) [span, div]

  // 动态性、再次向节点追加内容，再打印之前获取的值
  testDom.appendChild(document.createElement('div'))
  console.log(childNodes) // NodeList(8) [text, comment, text, span, text, div, text, div]
  console.log(children) // HTMLCollection(3) [span, div, div]
})()
```