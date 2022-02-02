---
{
  "title": "ElementUI el-tabs组件切换tab时会触发组件的哪些钩子函数",
  "staticFileName": "el_tabs_hooks.html",
  "author": "guoqzuo",
  "createDate": "2020/08/30",
  "description": "element el-tabs钩子,el-tabs钩子函数,这里主要是要弄清楚el-tabs是怎么实现组件切换的，使用el-tab-pane slot和不用这个插槽触发的钩子函数会相同吗？如果不使用el-tab-pane的slot，只使用tab的导航，下面的内容自己控制，就看是使用component还是v-if来控制了，这种情况el-tabs组件不会干扰切换的逻辑。问题来了，如果内容放到了el-tab-pane的slot呢？他有一个lazy属性，用来设置某个tab标签页是否延迟渲染，这个会对钩子函数有什么影响呢？我们改写上面的例子，通过demo来看看",
  "keywords": "element el-tabs钩子,el-tabs钩子函数",
  "category": "Vue"
}
---
# ElementUI el-tabs组件切换tab时会触发组件的哪些钩子函数

这里主要是要弄清楚el-tabs是怎么实现组件切换的，使用el-tab-pane slot和不用这个插槽触发的钩子函数会相同吗？

如果不使用el-tab-pane的slot，只使用tab的导航，下面的内容自己控制，就看是使用component还是v-if来控制了，这种情况el-tabs组件不会干扰切换的逻辑。

问题来了，如果内容放到了el-tab-pane的slot呢？他有一个lazy属性，用来设置某个tab标签页是否延迟渲染，这个会对钩子函数有什么影响呢？我们改写上面的例子，通过demo来看看

```html
<template>
  <div>
    <div>当前组件{{ activeName }}</div>
    <el-button @click="gotoOtherPage" size="mini">离开当前页面</el-button>

    <!-- 不使用el-tab-pane slot的逻辑，仅用tab控制顶部tab栏 -->
    <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="组件A" name="compA"></el-tab-pane>
      <el-tab-pane label="组件B" name="compB"></el-tab-pane>
    </el-tabs>
    <div>
      <keep-alive>
        <component :is="activeName"></component>
      </keep-alive>
    </div> -->

    <!-- 使用el-tab-pane slot -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="组件A" name="compA" :lazy="false">
        <!-- <keep-alive> -->
          <comp-a></comp-a>
          <!-- <comp-a v-if="activeName === 'compA'"></comp-a> -->
        <!-- </keep-alive> -->
      </el-tab-pane>
      <el-tab-pane label="组件B" name="compB" :lazy="false">
        <!-- <keep-alive> -->
          <comp-b></comp-b>
          <!-- <comp-b v-if="activeName === 'compB'"></comp-b> -->
        <!-- </keep-alive> -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
```

1. 如果默认lazy为false，且slot直接写对应的组件
首次进入会触发A/B/index三个组件的新进入页面相关钩子，**再切换到B，不会触发A/B的任何钩子**，仅触发index的updated相关钩子, 再切换到A或来回切换，同上不会触发A/B任何钩子，离开页面，触发A/B/index的destroy相关钩子
2. 如果lazy设置为ture，且slot直接写对应的组件
首次进入会触发A/index两个组件的新进入页面相关钩子，**再切换到B，不会触发A的任何钩子**，仅触发index的updated相关钩子以及新进入页面B的钩子, 再切换到A或来回切换，不会触发A/B任何钩子，离开页面，触发A/B/index的destroy相关钩子
3. 如果lazy为false，slot里对应的组件用keep-alive包裹
首次进入会触发A/B/index三个组件的新进入页面相关钩子，外加A/B的activated钩子；再切换到B，不会触发A/B的任何钩子，仅触发index的updated相关钩子, 再切换到A或来回切换，同上不会触发A/B任何钩子，离开页面，触发A/B/index的destroy相关钩子以及A/B的deactivated相关钩子
4. 如果lazy为true，slot里对应的组件用keep-alive包裹
首次进入会触发A/index两个组件的新进入页面相关钩子，外加A的activated钩子；再切换到B，不会触发A的任何钩子，仅触发index的updated相关钩子以及新进入页面B的钩子外加B的activated钩子, 再切换到A或来回切换，不会触发A/B任何钩子，离开页面，触发A/B/index的destroy相关钩子
5. 如果lazy默认为false或者true，给组件加上v-if（或者component)来控制组件显示
和不使用slot，单独在外部用v-if时的钩子保持一致
6. 如果lazy默认为false或true，给组件加上v-if（或者component)来控制组件显示，再加上keep-alive
和不使用slot，单独在外部用v-if时的钩子并加上keep-avlie保持一致

**综上，el-tabs组件el-tab-pane的slot有好多种情况，会比较混乱，对于需要精准控制tabs组件切换逻辑的场景，个人建议不要使用他的slot，除非你能很明确的知道其钩子函数的执行顺序与逻辑，最好还是仅使用其顶部tab，下面的主内容写在外部，不要写在el-tab-pane内部**。其实主要区别是，如果slot里不用v-if控制，首次加载后，A/B来回切换不会触发A/B的任何钩子函数。完整demo参见 [el-tabs 切换逻辑demo| github](https://github.com/zuoxiaobai/fedemo/tree/master/src/vuecli-demo/src/views/elementTabs/)

