---
{
  "title": "Vue keep-alive在路由跳转时按需缓存当前页面数据，$route非双向绑定的问题",
  "staticFileName": "keep-alive-include.html",
  "author": "guoqzuo",
  "createDate": "2020/11/08",
  "description": "有这么一个需求，页面 B 跳转到页面 C 时需要保存页面交互数据，跳到其他页面不缓存数据。在 Vue 中这种功能一般会使用 keep-alive 的 include 或 exclude 有条件的缓存来实现。起初我想省事，直接使用 $route.meta 来动态修改 include 值，但后面发现不生效，原来 $router.meta 不是双向绑定的，需要使用其他变量才行，下面来看看具体逻辑。",
  "keywords": "vue keep-alive按需缓存页面,vue按需缓存,$route是否是双向绑定的",
  "category": "Vue"
}
---
# Vue keep-alive在路由跳转时按需缓存当前页面数据，$route非双向绑定的问题

有这么一个需求，页面 B 跳转到页面 C 时需要保存页面交互数据，跳到其他页面不缓存数据。在 Vue 中这种功能一般会使用 keep-alive 的 include 或 exclude 有条件的缓存来实现。起初我想省事，直接使用 $route.meta 来动态修改 include 值，但后面发现不生效，原来 $router.meta 不是双向绑定的，需要使用其他变量才行，下面来看看具体逻辑。 

我们可以使用路由 meta 参数里传 keepAlive 为 true 或 false 来对某个路由页面做缓存。示例代码如下：

```html
<keep-alive>
  <router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>
<router-view v-if="!$route.meta.keepAlive"></router-view>
```

我们假设有A、B、C三个页面组件。B页面只有跳到C页面才缓存数据，跳到其他页面不缓存页面数据

这里 router-view 组件会切换三个组件的显示类似于 component is 切换组件。我们需要动态的去判断是否缓存 B 页面组件，使用 keep-alive 的 include 参数来指定需要缓存的页面组件数据

```html
<!-- 逗号分隔字符串 -->
<keep-alive include="PageB">
  <component :is="view"></component>
</keep-alive>
```

假设B页面组件的 name 为 'PageB'，那么默认情况下 include 为 'PageB'，就表示缓存该页面，如果设置 include 为 '' 就是不缓存页面数据，核心问题是怎么动态的改变这个 include 的值。

我们可以在B页面组件路由离开之前的钩子函数里，来修改这个值，**注意，需要单独弄一个变量，使用 `$route.meta.include` 参数来修改这个值是没有用的，因为 `$route.meta` 这个值并不像data里面的数据是双向绑定的，他在进入页面时就固定了。中间修改这个值不会触发 template 里面的模板重新渲染**

## $route.meta 是否是双向绑定测试
我们来测试 $route.meta 是否是双向绑定，下面的 demo 中 view 视图里面显示 `$route.meta.include` 的值，然后 3 秒后，再修改对应的值。页面上对应的值并没有刷新，所以 keep-alive 里面的 router-view 不能使用 router meta 里面的值来做实时切换，需要单独使用一个变量。
```html
<!-- index.vue 入口页面 http://localhost:8081/keepAlive/ -->
<template>
  <div>
    我是主页面
    <ul>
      <li><router-link to="/keepAlive/a">A组件页面</router-link></li>
      <li><router-link to="/keepAlive/b">B组件页面</router-link></li>
      <li><router-link to="/keepAlive/c">C组件页面</router-link></li>
    </ul>
    include{{ include }}
    <keep-alive :include="include">
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- 测试 $route.meta 的值是否是双向绑定的 -->
    $route.meta.include {{$route.meta.include}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      include: "PageB"
    };
  },
  created() {
    // 这里修改值后数据，页面的$route.meta.include值并没有刷新，因此不能为了节省变量使用$route.meta来做include的控制
    setTimeout(() => {
      this.$route.meta.include = "test"
      console.log('this.$route.meta.include', 'test')
    }, 3000)
  }
};
</script>
```

## B组件跳转时逻辑处理
/keepAlive/a、/keepAlive/c 只是单独的页面，没有任何逻辑，只是用来测试跳转。主要逻辑是在/keepAlive/b页面，下面的代码中在路由离开之前判断跳转的目标页面
1. 如果是页面 C，动态修改 keep-avlie 的 include 为 'PageB'，即缓存当前页面数据。
2. 如果是其他页面，include 设置为 ''，不缓存任何数据

```html
<template>
  <div>
    我是B组件页面
    <el-input v-model="input" placeholder="请输入B组件内容"></el-input>
    <el-radio-group v-model="radio">
      <el-radio :label="3">备选项</el-radio>
      <el-radio :label="6">备选项</el-radio>
      <el-radio :label="9">备选项</el-radio>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  name: "PageB",
  data() {
    return {
      input: "",
      radio: ""
    };
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === "keepAliveC") {
      // 如果跳转的页面C组件，缓存页面数据
      this.$parent.include = "PageB";
    } else {
      // 如果跳转的页面不是C组件，不缓存数据
      this.$parent.include = "";
    }
    next();
  }
};
</script>
```

以上就可以实现我们的目的了，完整demo参见 [keepalive测试demo｜ github](https://github.com/dev-zuo/fedemo/tree/master/src/vuecli-demo/src/views/keepAlive)


## 参考
- [keep-alive | Vue.js API](https://cn.vuejs.org/v2/api/#keep-alive)
- [keep-alive的深入理解与使用(配合router-view缓存整个路由页面)](https://blog.csdn.net/agonie201218/article/details/82151457)