---
{
  "title": "js 点击按钮复制内容的实现, 使用 ele.select 加 document.execCommand('copy')",
  "staticFileName": "js_copy.html",
  "author": "guoqzuo",
  "createDate": "2021/09/09",
  "description": "点击按钮复制链接、复制代码在前端是比较常见的需求，这里介绍一种比较简单的实现：1.先借用 input 等可以选中文本的元素，调用 element.select() 选中文本内容 2.再执行 document.execCommand('copy') 对选中内容进行复制 我们可以通过下面的例子来了解这个过程，点击按钮复制内容 - 在线演示",
  "keywords": "js 点击按钮复制内容实现,js 向粘贴板写入内容,js copy text,测试tag",
  "category": "JavaScript"
}
---
# js 点击按钮复制内容的实现, 使用 ele.select 加 document.execCommand('copy')

点击按钮复制链接、复制代码在前端是比较常见的需求，这里介绍一种比较简单的实现：
1. 先借用 input 等可以选中文本的元素，调用 element.select() 选中文本内容
2. 再执行 document.execCommand("copy") 对选中内容进行复制

我们可以通过下面的例子来了解这个过程，[点击按钮复制内容 - 在线演示](https://zuoxiaobai.github.io/fedemo/src/DebugDemo/%E7%82%B9%E5%87%BB%E6%8C%89%E9%92%AE%E5%A4%8D%E5%88%B6%E9%93%BE%E6%8E%A5/)
```html
<body>
  <input id="inputText" value="abcde">
  <button onclick="execCopy()">点击按钮复制内容</button>
  <script>
    function execCopy() {
      let element = document.querySelector("#inputText");
      element.select();
      document.execCommand("copy");
    }
  </script>
</body>
```
实际使用中，我们需要清楚两点：
1. 我们设置的内容是动态的，需要动态设置 input 内容
2. 我们不需要在页面上显示 input 内容，需要动态创建元素，并隐藏元素

我们可以将该功能封装成一个可复用的函数，如下
```js
// 复制内容
function copyContent(text) {
	// 动态创建 input 元素，设置内容
	let element = document.createElement('input')
	element.setAttribute('value', text)
	// 隐藏 input
	element.style.position = 'absolute'
	element.style.top = '-1000px'
	element.style.display = 'block'
	// 挂载到 body
	document.body.appendChild(element)
	// 复制
	element.select()
	document.execCommand("Copy");
	// 复制完成后从 body 移除
	document.body.removeChild(element)
}
```
实际使用示例
```html
<body>
  <button onclick="execCopy()">点击按钮复制内容</button>
  <p id="randomText"></p>
  <textarea></textarea>
  <script>
    // 复制内容
    function copyContent(text) {
      // 动态创建 input 元素，设置内容
      let element = document.createElement('input')
      element.setAttribute('value', text)
      // 隐藏 input
      element.style.position = 'absolute'
      element.style.top = '-1000px'
      element.style.display = 'block'
      // 挂载到 body
      document.body.appendChild(element)
      // 复制
      element.select()
      document.execCommand("Copy");
      // 复制完成后从 body 移除
      document.body.removeChild(element)
    }

    // 生成 len 长度的随机字符串
    function getRandomStr(len) {
      // ascii 编码转 字符串，String.fromCharCode(65)  65 "A", 97 "a", 48 "0"
      // 字符串转 ascii 编码, "a".charCodeAt(0)
      let result = ''
      for (let i = 0; i < len; i++) {
        result += String.fromCharCode(97 + Math.random() * 25 + 1) // 0 ~ 25
      }
      return result
    }

    function execCopy() {
      // 生成随机字符串
      let text = getRandomStr(10)
      document.querySelector('#randomText').innerHTML = text
      copyContent(text) // 复制内容
    }
  </script>
</body>
```
完整代码参见：[点击按钮复制内容 - demo](https://github.com/zuoxiaobai/fedemo/tree/master/src/DebugDemo/%E7%82%B9%E5%87%BB%E6%8C%89%E9%92%AE%E5%A4%8D%E5%88%B6%E9%93%BE%E6%8E%A5)，如果觉得有用，可以帮忙 star、fork，谢谢啦！
