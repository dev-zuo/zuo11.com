
# vue组件里click事件监听可能会产生的性能问题

之前在看JS高程3里面有一个知识点，就是当多个子元素需要绑定click事件时，大量添加处理程序，会影响性能，尽量少添加处理事件。

但写vue习惯后，突然忘了这一点，其实vue监听事件我们也可以遵循这个原则：把事件放到其父元素上监听，然后通过 data-key属性来指定每个子元素对应的值。e.target.getAttribute('data-key')有值就表示子元素点击了

**这样做的好处是，内存占用更小**

JS高程3第13章事件 - 内存和性能 - 事件委托有介绍，相关描述及demo如下

事件委托，大量添加处理程序，会影响性能，尽量少添加处理事件，比如下面的代码：

```js
/*
<ul id="myLinks">
  <li id="goSomeWhere">goSomeWhere</li>
  <li id="doSomething">doSomething</li>
  <li id="sayHi">sayHi</li>
</ul>
*/
var item1 = document.getElementById('goSomeWhere');
var item2 = document.getElementById('doSomething');
var item3 = document.getElementById('sayHi');

EventUtil.addHandler(item1, 'click', function(event) {
  location.href = 'http://www.zuo11.com';
});
EventUtil.addHandler(item2, 'click', function(event) {
  document.title = "I change the title";
});
EventUtil.addHandler(item3, 'click', function(event) {
  alert('hi');
});
```
优化后的代码
```js
var links = document.getElementById('myLinks');
EventUtil.addHandler(links, 'click', function(event) {
  event = EventUtil.getEvent(event);
  var target = EventUtil.getTarget(event);
  switch (target.id) {
    case 'goSomeWhere':
      location.href = 'http://www.zuo11.com';
      break;
    case 'doSomething':
      document.title = "I change the title";
      break;
    case 'sayHi':
      alert('hi');
      break;
  }
});
```

参考之前的笔记 [事件 内存和性能 | JS高程3](https://www.yuque.com/guoqzuo/js_es6/elgng1#0ea56e91)