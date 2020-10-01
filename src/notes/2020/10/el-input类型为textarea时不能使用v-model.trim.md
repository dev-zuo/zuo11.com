# el-input类型为textarea时不能使用v-model.trim

el-input如果type为textarea，不能使用.trim修饰符，否则输入内容时会无法换行，如果需要去掉收尾空格，可以在提交数据时，手动执行.trim()去空格

```html
<template>
  <div>
    <el-input
      type="textarea"
      v-model.trim="text"
      rows="5"
      style="width:200px;margin:100px;"
    ></el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: ""
    };
  }
};
</script>
```