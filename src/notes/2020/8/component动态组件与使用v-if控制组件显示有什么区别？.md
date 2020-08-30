# component动态组件与使用v-if控制组件显示有什么区别？

component动态组件可以理解为它就是v-if控制组件显示的语法糖。我们用一个例子来测试，之前我们写过compoennt用is切换时的钩子函数demo，我们把demo改写下，使用 v-if来替换component，对比页面渲染以及钩子函数的执行情况。改写如下：

```html
<div>
  <!-- 这里用来打开或关闭keep-alive -->
  <keep-alive>
    <!-- <component :is="curComp"></component> -->
    <comp-a v-if="curComp === 'compA'"></comp-a>
    <comp-b v-else></comp-b>
  </keep-alive>
</div>
```
测试后发现，component和v-if的页面显示效果，钩子函数执行情况一模一样，不管是否加keep-alive，完整demo参见 [component vs v-if | github](https://github.com/zuoxiaobai/fedemo/tree/master/src/vuecli-demo/src/views/componentAndIs/)
