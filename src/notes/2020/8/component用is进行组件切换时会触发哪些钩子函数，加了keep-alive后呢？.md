# component用is进行组件切换时会触发哪些钩子函数，加了keep-alive后呢？

假设动态组件component使用is控制组件显示，默认显示为A组件，可以切换到B组件。问：

**首次进入页面以及用is切换组件时，会触发A/B组件的哪些钩子函数，加了keep-alive后呢？**

先给出结论

1. 如果不加keep-alive，和正常的进入页面和离开页面触发的钩子函数一致。

2. 如果加了keep-alive，组件首次加载才会触发 created,mounted等钩子函数，切换时就不会触发created,mounted,beforedestroyed等，所以额外加一个activated和deactivated钩子来提示页面已切换，离开当前页面，才会销毁A/B两个组件触发beforeDestroyed和destroyed两个钩子

这里面涉及到一些钩子函数的触发顺序问题，我们来写详细的demo来验证下
```html
<!-- index.vue 主页面 -->
<template>
  <div>
    <div>当前组件{{ curComp }}</div>
    <el-radio v-model="curComp" label="compA">组件A</el-radio>
    <el-radio v-model="curComp" label="compB">组件B</el-radio>
    <el-button @click="gotoOtherPage" size="mini">离开当前页面</el-button>
    <div>
      <!-- 这里用来打开或关闭keep-alive -->
      <!-- <keep-alive> -->
        <component :is="curComp"></component>
      <!-- </keep-alive> -->
    </div>
  </div>
</template>

<script>
export default {
  components: {
    compA: () => import("./A"),
    compB: () => import("./B")
  },
  data() {
    return {
      curComp: "compA"
    };
  },
  methods: {
    gotoOtherPage() {
      this.$router.push("/echarts");
    }
  },
  beforeCreate() {
    console.log("index beforeCreate");
  },
  created() {
    console.log("index created");
  },
  beforeMount() {
    console.log("index beforeMount");
  },
  mounted() {
    console.log("index mounted");
  },
  beforeUpdate() {
    console.log("index beforeUpdate");
  },
  updated() {
    console.log("index updated");
  },
  activated() {
    console.log("index activated");
  },
  deactivated() {
    console.log("index deactivated");
  },
  beforeDestroy() {
    console.log("index beforeDestroy");
  },
  destroyed() {
    console.log("index destroyed");
  },
  errorCaptured() {
    console.log("index errorCaptured");
  }
};
</script>

<style></style>
```
组件A.vue和B.vue代码基本一致，下面是A.vue示例，B.vue只是将A改为了B
```html
<!-- A.vue -->
<template>
  <div>
    我是A组件内容
  </div>
</template>

<script>
export default {
  beforeCreate() {
    console.log("A beforeCreate");
  },
  created() {
    console.log("A created");
  },
  beforeMount() {
    console.log("A beforeMount");
  },
  mounted() {
    console.log("A mounted");
  },
  beforeUpdate() {
    console.log("A beforeUpdate");
  },
  updated() {
    console.log("A updated");
  },
  activated() {
    console.log("A activated");
  },
  deactivated() {
    console.log("A deactivated");
  },
  beforeDestroy() {
    console.log("A beforeDestroy");
  },
  destroyed() {
    console.log("A destroyed");
  },
  errorCaptured() {
    console.log("A errorCaptured");
  }
};
</script>

<style></style>
```
keep-alive和非keep-alive钩子函数执行对比图

类别 | 非keep-alive | keep-alive
--- | --- | ---
首次进入 | index beforeCreate<br>index created<br>index beforeMount<br>index mounted<br>index beforeUpdate<br>A beforeCreate<br>A created<br>A beforeMount<br>A mounted<br>index updated<br> | index beforeCreate<br>index created<br>index beforeMount<br>index mounted<br>index beforeUpdate<br>A beforeCreate<br>A created<br>A beforeMount<br>A mounted<br>A activated<br>index updated
切换到B组件 | index beforeUpdate<br>A beforeDestroy<br>A destroyed<br>index updated<br>index beforeUpdate<br>B beforeCreate<br>B created<br>B beforeMount<br>B mounted<br>index updated | A deactivated<br>index updated<br>index beforeUpdate<br>B beforeCreate<br>B created<br>B beforeMount<br>B mounted<br>B activated<br>index updated
再切回到A组件 | index beforeUpdate<br>A beforeCreate<br>A created<br>A beforeMount<br>B beforeDestroy<br>B destroyed<br>A mounted<br>index updated | index beforeUpdate<br>B deactivated<br>A activated<br>index updated
再切回B组件 | index beforeUpdate<br>B beforeCreate<br>B created<br>B beforeMount<br>A beforeDestroy<br>A destroyed<br>B mounted<br>index updated | index beforeUpdate<br>A deactivated<br>B activated<br>index updated
点击离开当前页面 | index beforeDestroy<br>B beforeDestroy<br>B destroyed<br>index destroyed | index beforeDestroy<br>B deactivated<br>A beforeDestroy<br>A destroyed<br>B beforeDestroy<br>B destroyed<br>index destroyed

完整demo地址，参见 [vue hooks demo | github](https://github.com/zuoxiaobai/fedemo/tree/master/src/vuecli-demo/src/views/vuehooks/)