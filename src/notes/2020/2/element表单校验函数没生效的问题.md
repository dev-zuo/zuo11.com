---
{
  "title": "element表单校验函数没生效的问题",
  "staticFileName": "el_form_validate.html",
  "author": "guoqzuo",
  "createDate": "2020/02/24",
  "description": "根据element官网的dmeo，加入表单校验，发现校验的rules根本没执行。注意：el-form-item 标签也需要设置 prop 属性，并且名称需要和对应model的名称一致，我这次漏写了，所以一直没生效",
  "keywords": "element表单校验没生效",
  "category": "Vue"
}
---

# element 表单校验函数没生效的问题

根据element官网的dmeo，加入表单校验，发现校验的rules根本没执行。

注意：**el-form-item 标签也需要设置 prop 属性，并且名称需要和对应model的名称一致**

我这次漏写了，所以一直没生效

参考：
- [表单 自定义校验规则 - element](https://element.eleme.cn/#/zh-CN/component/form#zi-ding-yi-xiao-yan-gui-ze)
- [关于el-form中的rules未生效问题的解决方法](https://blog.csdn.net/qq_36070288/article/details/88683747)

