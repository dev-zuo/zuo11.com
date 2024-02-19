---
{
  "title": "v-infinite-scroll放到slot里或者用v-if控制时首次无法触发loadMore的问题",
  "staticFileName": "v-infinite-scroll.html",
  "author": "guoqzuo",
  "createDate": "2020/07/26",
  "description": "v-infinite-scroll不触发loadMore，element v-infinite-scroll指令, 最新项目结构调整，发现一个问题，把 v-infinite-scroll 对应的元素放到 slot 里，首次无法触发loadMore, 不放到slot里面又是正常的，来看代码",
  "keywords": "v-infinite-scroll不触发loadMore,element v-infinite-scroll指令",
  "category": "Vue"
}
---

# v-infinite-scroll 放到slot里或者用v-if控制时首次无法触发loadMore的问题
最新项目结构调整，发现一个问题，把 v-infinite-scroll 对应的元素放到 slot 里，首次无法触发loadMore, 不放到slot里面又是正常的，来看代码

```html
<template>
  <div>
    <-- 用 sub-comps-middle 组件嵌套，写在slot时，无法加载loadMore，去掉sub-comps-middle 就是正常的-->
    <sub-comps-middle>
      <div v-infinite-scroll="loadMore" infinite-scroll-distance="10">
        测试
      </div>
    </sub-comps-middle>
  </div>
</template>
```

带着这个问题，我看了下 v-infinite-scroll 的源码，在关键位置写了几个console，找到了其中的原因，来看看产生问题的地方

```js
// InfiniteScroll 部分源码
// github地址：https://github.com/ElemeFE/vue-infinite-scroll/blob/master/src/directive.js
var InfiniteScroll = {
  bind: function bind(el, binding, vnode) {
    el[ctx] = {
      el: el,
      vm: vnode.context,
      expression: binding.value
    };
    var args = arguments;
    console.log('bindfunc before mouted', el[ctx].vm, el[ctx])
    el[ctx].vm.$on('hook:mounted', function () {
      console.log('hook:mounted')
      el[ctx].vm.$nextTick(function () {
        if (isAttached(el)) {
          doBind.call(el[ctx], args);
        }
```
正常情况下，页面一加载，InfiniteScroll 会开始初始化，执行其bind函数。bind函数里加了一个监听，当接收到当前组件的 hook:mounted 事件，也就是mounted事件时，开始做真正的绑定，执行doBind方法。

那么问题来了，正常情况下，在组件mounted之前，InfiniteScroll会完成初始化，这样就可以接收到页面的mounted消息，然后执行真正的相关事件绑定。

假如我们把 v-infinite-scroll 写在slot里，当前页面组件mounted过后，InfiniteScroll才执行初始化，初始化时监听mounted再执行doBind，而页面已经mounted过了，所以会无法触发loadMore，同理，v-if 控制时，如果为false，可能会有InfiniteScroll没初始化之前，页面就已经mounted的情况。

怎么解决这个问题呢？**记住 v-infinite-scroll 必须放在一个单独的单文件组件里，不要放到某个组件的slot里。且不要用v-if控制，使用v-show，这样就不会有问题了。**

测试demo，参见: [v-infinite-scroll 测试demo](https://github.com/dev-zuo/fedemo/tree/master/src/vuecli-demo/src/views/infiniteScrollTest)