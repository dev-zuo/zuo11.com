---
{
  "title": "v-model 怎么优雅的绑定 Vuex 状态管理中的值，三种方法优缺点",
  "staticFileName": "v-model_vuex.html",
  "author": "guoqzuo",
  "createDate": "2021/05/04",
  "description": "在需要将 vuex 中的值，直接与表单 v-model 对应时，如果我们按照 vuex 强调的规范，只能通过 mutation 来改变 vuex state，那么会比较麻烦。假设我们脱离规范，关闭严格模式。那么 v-model 可以直接绑定 vuex state 值，会非常方便，但貌似又不合规范，不利于追踪。那到底要怎么做合适呢？个人建议是：怎么方便怎么来，只要项目可控即可。下面来看看几种方法对比 1. 官方推荐：使用 computed 的 get 和 set",
  "keywords": "v-model 绑定 vuex 中的值",
  "category": "Vue"
}
---
# v-model 怎么优雅的绑定 Vuex 状态管理中的值，三种方法优缺点
在需要将 vuex 中的值，直接与表单 v-model 对应时，如果我们按照 vuex 强调的规范，只能通过 mutation 来改变 vuex state，那么会比较麻烦。假设我们脱离规范，关闭严格模式。那么 v-model 可以直接绑定 vuex state 值，会非常方便，但貌似又不合规范，不利于追踪。

那到底要怎么做合适呢？个人建议是：怎么方便怎么来，只要项目可控即可。下面来看看几种方法对比

## 1. 官方推荐：使用 computed 的 get 和 set
- 优点：遵循 vuex 规范，通过 mutation 更改 state，有利于追踪
- 缺点：需要将表单的每个字段都使用 computed 计算属性，对于字段较少的情况，还可以。但当字段较多，且包含逻辑处理时，会比较麻烦不好维护。
```js
// <input v-model="message">
computed: {
  message: {
    get () {
      return this.$store.state.obj.message
    },
    set (value) {
      // 通过 updateMessage mutation 方法更改值
      this.$store.commit('updateMessage', value)
    }
  }
}
```
参考：[表单处理 | Vuex](https://vuex.vuejs.org/zh/guide/forms.html)


## 2. 非严格模式：直接将 state 设置到 v-model
关闭严格模式后，直接将 vuex state 当全局变量用，可以任意修改操作
```js
const store = new Vuex.Store({
  // ...
  strict: false // 关闭严格模式，或者直接不写这个属性
  // strict: true // 开启严格模式 
})
```

- 优点：可以将 obj.message 直接设置到 v-model，值实时更新，而且不用什么额外操作。
- 缺点：破坏了 vuex 的规则约束，不利于追踪，可能会造成难以维护的情况。

```js
<input v-model="obj.message">
```

## 3. 中间对象转换：watch 监听 state 改变，更新中间对象，v-model 中间对象
- 优点：折中方法，不破坏 vuex 规则约束，操作比一个一个加 computed 要简单
- 缺点：需要使用 watch 来初始化或更改值，触发时机需要特别注意

```html
<template>
  <div>
    <div>{{ obj }}</div>
    <div>{{ objCopy }}</div>
    <el-form>
      <el-input v-model="objCopy.message" />
      <el-button @click="confirm">提交</el-button>
    </el-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      objCopy: {
        message: ""
      }
    };
  },

  computed: {
    ...mapState(["obj"])
  },

  watch: {
    obj: {
      handler() {
        this.initData();
      },
      deep: true
    }
  },

  created() {
    this.initData();
  },

  methods: {
    initData() {
      Object.assign(this.objCopy, this.obj);
    },
    confirm() {
      this.$store.commit("updateObj", JSON.parse(JSON.stringify(this.objCopy)));
    }
  }
};
</script>
```