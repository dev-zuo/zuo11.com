# vue v-model的理解
在前面讨论过，使用v-model的场景，来看一个实例，假如我们需要封装一个弹窗组件需要引入el-dialog组件

首先，我们来看看我们写好这个组件后应该怎么调用，通过show这个参数来控制dialog显示或隐藏
```html
<template>
  <my-dialog v-if="showDialog" :show="showDialog">
</template>
<script>
export default {
  components: {
    MyDialog: () => import('@/components/my-dialog')
  },
  data() {
    return {
      showDialog: flase
    }
  }
}
</script>
```
来看看实现，这里看element官方demo里在visible属性上用了.sync修饰符，有什么用呢？
```html
<!-- https://element.eleme.cn/#/zh-CN/component/dialog -->
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
```
看来看源码
```html
<!-- https://github.com/ElemeFE/element/blob/dev/packages/dialog/src/component.vue -->

<template>
  <transition name="dialog-fade" @after-enter="afterEnter" @after-leave="afterLeave">
    <div
      v-show="visible"
      class="el-dialog__wrapper"
      @click.self="handleWrapperClick">
      <!-- .... -->
    </div>
  </transition>
</template>

<script>
// ...
hide(cancel) {
  if (cancel !== false) {
    this.$emit('update:visible', false);
    this.$emit('close');
    this.closed = true;
  }
}
//... 
</script>
```
可以看到关闭弹窗时，使用了 
```js
this.$emit('update:visible', false);
```
修改了父组件传入的visible的值，没有使用v-model, 所以在el-dialog传入visible属性的时候加了.sync修饰符
```html
<el-dialog title="提示" :visible.sync="dialogVisible">
```
vue里面有介绍这种方法可以使子组件可以修改父组件的值，而不用多加一个事件参数，参见文档 [.sync修饰符](https://cn.vuejs.org/v2/guide/components-custom-events.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6)

但感觉这个接口设计的有点鸡肋，v-model不香吗？

子组件封装dialog的特殊之处在于，通过showDialog显示子组件的dialog后，子组件点击关闭后会自己关闭弹窗，这时 父组件的showDialog还是true，因此并不能通过show参数来控制显示，我们需要在子组件点击dialog关闭时，触发一个事件给父组件，从而修改对应的值
```html
<my-dialog v-if="showDialog" :show="showDialog" @close="showDialog = false">
```
这里当子组件关闭dialog时$emit一个close事件来手动将showDialog设置为false，以到达父组件可以通过showDialog来打开或关闭dialog的目的，我们可以来看看子组件的实现
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
// 注意如果我们把show直接设置给el-dialog的visible属性，
// el-dialog内部在关闭dialog时会触发一次 this.show = false操作
// 而show是父组件通过props单向传递的值，改动会提示错误，我们需要使用computed属性来中转
export default {
  props: {
    show: { 
      type: Boolean,
      required: true
    }
  }
  computed: {
    dialogVisible: {
      get() {
        return this.show // 父组件向下传递show的值时通过计算属性赋值到dialogVisible
      }
      set() {
        // 当dialog关闭时，会触发this.dialogVisible = false，从而来到这个方法，我们在这里将关闭事件同步给父组件
        this.$emit('close', false)
      }
    }
  },
  data() {

  }
}
</script>
```
上面的例子已经实现了功能，但缺点是，要使用两个参数，一个show属性，一个close事件。v-model就是一种简化参数的语法糖
```html
<my-dialog v-if="showDialog" :show="showDialog" @close="showDialog = false">
<!-- 等价于 -->
<my-dialog v-if="showDialog" v-model="showDialog">
<script>
export default {
  model: { // 新增了model属性，用来指定v-model赋值的属性名，以及改动父组件对应值需要$emit的事件名称
    prop: 'show',
    event: 'close'
  },
  // 其他后面的逻辑不变
  props
    show: { 
      type: Boolean,
      required: true
    }
  }
  // ....
}
</script>
```
关于v-model的文档，参考 [v-model | Vue API](https://cn.vuejs.org/v2/api/#model)

综上，v-model比.async更优雅，而在vue的refs里，也有建议使用v-model代替.async修饰符，且已经merge到了vue 3.0版本，相关文档 [Replace v-bind's .sync with a v-model argument](https://github.com/vuejs/rfcs/pull/8)
