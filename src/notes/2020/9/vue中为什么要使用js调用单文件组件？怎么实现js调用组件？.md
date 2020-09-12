
# vue中为什么要使用js调用单文件组件？怎么实现js调用组件？

如果自己写一个组件。一般情况下，vue项目中在某个组件里调用另一个组件，至少需要修改三个位置
1. 在 template 里写引入组件，加上传参等
2. 在 components 里声明组件（如果全局引入了，可以省去这一步）
3. data 里面写对应的传参数

代码对应如下，这种组件对于使用地方比较多时候，我们就需要想办法直接使用js来调用组件，而不是每次都要在 template 里面声明对应的组件，这样会有很多重复代码，可维护性较差。

```html
<template>
  <el-button @click="showToast">打开toast</el-button>
  <!-- template中使用组件 -->
  <toast v-model="showToast"></toast>
</template>
<script>
export default {
  components: {
    Toast: () => import('./Toast.vue')
  }
  data() {
    return {
      showToast: false
    }
  }
}
</script>
```

## 较早之前使用js加载组件尝试
在较早之前，用js写过一个直接挂载组件到当前dom上的一个方法，分三步：
1. 使用 Vue.extend，处理需要用js调用的vue单文件组件，返回该vue组件的一个子类
2. new对应的组件子类，生成对应的组件实例，并使用 `.$mount()` 挂载组件，返回对应组件的 vm
3. 这样可以通过 vm.$el 拿到组件dom，append到当前组件dom里，即可完成加载

具体写法如下
```js
// 假设写好了 showInfo.vue 组件，执行clickShow函数直接显示dialog
// 组件中 dialog :visible.sync="dialogTableVisible"初始值设置为true

// demo.vue 在需要调用的vue文件中引入该组件
import ShowInfo from 'showInfo.vue'
// ...
clickShow() {
  const Component = Vue.extend(ShowInfo)

  // 挂载后返回对应组件的vm
  let showInfoVue = new Component().$mount() 

  // 将组件vm的dom，append到当前页面
  this.$el.appendChild(showInfoVue.$el) 
}
// ... 
```

具体参考：[使用js调用vue单文件组件](http://www.zuo11.com/blog/2020/2/js_vue_comp.html)


但它有一个缺点，常规调用组件时，我们会向子组件里面传入参数或事件。而这种情况不能向调用的子组件传入参数。下面来看另一种方法

## 使用js将单文件组件挂载到body的通用方法
我们来看看下面的create方法，其实和上面的方法流程基本一致，只是改变了创建对应vue单文件组件实例的方法。这里用render函数来替代之前的Vue.extend来创建对应组件实例，这样可以通过render函数的createElement函数向子组件内部传参数，传方法等。
```js
// create.js
import Vue from "vue";

export default function create(Component, props) {
  // 先创建实例
  const vm = new Vue({
    render(h) {
      // h就是createElement，它返回VNode
      return h(Component, { props });
    }
  }).$mount();

  // 手动挂载
  document.body.appendChild(vm.$el);

  // 销毁方法
  const comp = vm.$children[0];
  comp.remove = function() {
    document.body.removeChild(vm.$el);
    vm.$destroy();
  };
  return comp;
}
```
上面的例子中，create函数参数接收一个单文件组件对象，以及在调用组件时需要传递给组件的参数，来看看具体使用例子
```html
<template>
  <div>
    <el-button @click="showToast">打开toast</el-button>
  </div>
</template>
<script>
import Toast from "./Toast.vue";
import create from "./create";
export default {
  methods: {
    showToast() {
      console.log("show toast");
      let toast = create(Toast, {
        show: true,
        message: "我是错误信息",
        type: "error"
      });
      // 等价于 <toast :show="true" message="xx" :type="error"></toast>
      console.log(toast);
      setTimeout(() => {
        toast.remove();
      }, 2000);
    }
  }
};
</script>
```
Toast.vue 单文件组件代码如下
```html
<template>
  <div class="my-toast" v-if="show">
    <div :class="type">{{ message }}</div>
  </div>
</template>
<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: "error"
    }
    show: {
      type: Boolean,
    }
  }
};
</script>
<style lang="less" scoped>
.my-toast {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  border: 1px solid #ccc;
  text-align: center;
  .error {
    color: red;
  }
  .success {
    color: green;
  }
}
</style>
```

## 再进一步封装
上面的例子中，我们引入了 create.js 以及 对应的单文件组件。它还是不够简洁，我们可以再封装一次，只需要调用一个js就搞定。如果我们将它在main.js里面引入并挂载到vue实例属性，那么调用就非常方便了。

```js
// 在main.js里注册实例属性
import showDialog from '@/views/jsDialog/index.js'
Vue.prototype.$showDialog = showDialog

// 其他地方直接使用 this.$showDialog(options) 即可调用组件
```

下面来看看实现思路，关于render函数createElement的options的配置，参见 [createElement 参数 - 深入数据对象](https://cn.vuejs.org/v2/guide/render-function.html#%E6%B7%B1%E5%85%A5%E6%95%B0%E6%8D%AE%E5%AF%B9%E8%B1%A1)

```js
// showDialog/index.js
import Vue from "vue";
import DialogComponent from '@/views/jsDialog/src/index.vue'

let TheDialog = null
export default function showDialog(options) {
  // 如果未移除，先移除
  TheDialog && TheDialog.remove()

  TheDialog = create(DialogComponent, {
    on: {
      // 单文件组件内部可以emit该事件，销毁TheDialog组件
      'close-dialog': () => {
        TheDialog.remove()
      }
    },
    props: {
      // 需要传入的属性，单文件组件需要使用props接收
      title: '标题',
      content: '内容' 
    }
    // 其他参数
    ...options
  })

  function create(Component, options) {
    // 先创建实例
    const vm = new Vue({
      render(h) {
        // h就是createElement，它返回VNode
        return h(Component, options);
      }
    }).$mount();

    // 手动挂载
    document.body.appendChild(vm.$el);

    // 销毁方法
    const comp = vm.$children[0];
    comp.remove = function() {
      document.body.removeChild(vm.$el);
      vm.$destroy();
    };
    return comp;
  }
}
```

**注意，虽然js调用更方便了，但js处理、render组件的传参复杂度会增加。它和普通组件各有各的优缺点。**

