---
{
  "title": "Element表格IE下由于滚动条原因导致错位问题",
  "staticFileName": "element_dolayout.html",
  "author": "guoqzuo",
  "createDate": "2020/01/07",
  "description": "Element 表头固定，表内容可滑动，在IE下滚动条会显示，有一定的宽度占位，导致表头与表内容由点错位，解决方法是：由于表单内容是从接口加载的，从接口加载完数据后，对el-talbe进行从新布局dolayout",
  "keywords": "Element表格IE下由于滚动条原因导致错位问题",
  "category": "Vue"
}
---

# Element表格IE下由于滚动条原因导致错位问题

Element 表头固定，表内容可滑动，在IE下滚动条会显示，有一定的宽度占位，导致表头与表内容由点错位，解决方法是：由于表单内容是从接口加载的，从接口加载完数据后，对el-talbe进行从新布局dolayout

```js
// Table Methods: doLayout
// 对 Table 进行重新布局。当 Table 或其祖先元素由隐藏切换为显示时，可能需要调用此方法
// <el-table ref="table"></el-table>

// 从接口获取数据成功后
this.$nextTick(() => {
  this.$refs['table'].doLayout()
})
```

参考：[Table 表格组件 | Element](https://element.eleme.cn/#/zh-CN/component/table)
