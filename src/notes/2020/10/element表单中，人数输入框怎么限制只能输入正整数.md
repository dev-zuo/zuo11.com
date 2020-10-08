# element表单中，人数输入框怎么限制只能输入正整数

在人数这一栏，输入时，前端需要确保输入的只能是正整数，且不能是负数，且自动校正，来看看怎么实现
```html
<template>
  <div>
    只能输入正整数: {{ peopleCount }}
    <el-input
      v-model="peopleCount"
      @keyup.native="keyUp"
      style="width:200px;margin:50px;"
    ></el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      peopleCount: ""
    };
  },
  methods: {
    keyUp(e) {
      // 非数字全部转换为''
      e.target.value = e.target.value.replace(/[^\d]/g, "");
      // 开始的0处理
      if ([0, "0"].includes(e.target.value)) {
        e.target.value = "";
      }
      this.peopleCount = e.target.value;
      return e.target.value;
    }
  }
};
</script>
```
有了上面的思路后，对于万元输入框怎么限制只能输入最多保留两位小数点的number类型数据，可以思考下
