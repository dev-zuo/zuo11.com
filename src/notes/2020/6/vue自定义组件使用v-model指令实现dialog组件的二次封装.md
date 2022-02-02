---
{
  "title": "vue自定义组件使用v-model指令实现dialog组件的二次封装",
  "staticFileName": "v_model_dialog.html",
  "author": "guoqzuo",
  "createDate": "2020/06/29",
  "description": "当某个组件是对element的dialog组件进行二次封装时，我们需要对dialog进行隐藏显示，当子组件里的dialog关闭时，需要修改父组件传入的值，尽管不是表单组件也可以使用v-model来解决，先来看看怎么调用",
  "keywords": "v-model属性实现dialog组件的二次封装,element dialog组件的二次封装",
  "category": "Vue"
}
---

# vue自定义组件使用v-model指令实现dialog组件的二次封装

当某个组件是对element的dialog组件进行二次封装时，我们需要对dialog进行隐藏显示，当子组件里的dialog关闭时，需要修改父组件传入的值，尽管不是表单组件也可以使用v-model来解决，先来看看怎么调用

```html
<template>
  <div>
    <user-selection v-model="showUserSelection" @confirm="confirm"/>
    <el-button type="primary" @click="showUserSelection = true">打开弹窗</el-button>
  <div>
<template>
<script>
export default {
  components: {
    UserSelection: () => import("../src/components/user-selection/src/main")
  },
  data() {
    return {
      showUserSelection: false
    }
  },
  methods: {
    confirm(value) {
      console.log(value)
    }
  }
}
</script>
```

再来看组件实现

```html
<template>
  <div>
    <el-dialog title="提示" :visible.sync="dialogVisible">
      内容
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  model: {
    prop: 'show', // 设置对应v-model的属性字段
    event: 'close' // 如果不指定默认为input，当$emit该事件，可以自动执行 修改父组件v-model参数的值
  },
  props: ['show'], // 接收v-model的传值
  computed: {
    dialogVisible: {
      get() {
        return this.show
      },
      set(newVal) {
        console.log(newVal)
        this.$emit('close', newVal)
      }
    }
  },
  data() {
    return {}
  }
}
</script>
```