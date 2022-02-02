---
{
  "title": "如果需要兼容IE还是用flex比较好，慎用grid",
  "staticFileName": "ie_grid.html",
  "author": "guoqzuo",
  "createDate": "2020/07/12",
  "description": "grid适用于网格化布局，对于各个模块按百分比来的情况比较好，如果多个模块有的固定宽高有的非固定宽高就不怎么好分了, IE下支持需要加前缀，详情参见之前的笔记: grid网格布局。于是我在某个页面中使用了grid，但发现IE不兼容，grid的某些属性不兼容IE，加了-ms-都没用，最后为了不必要的麻烦和风险，还是换成flex布局了，改成flex后的代码居然比grid还简单...",
  "keywords": "grid的兼容性,grid使用场景,grid,ie grid不兼容",
  "category": "CSS"
}
---

# 如果需要兼容IE还是用flex比较好，慎用grid

grid适用于网格化布局，对于各个模块按百分比来的情况比较好，如果多个模块有的固定宽高有的非固定宽高就不怎么好分了, IE下支持需要加前缀，详情参见之前的笔记: [grid网格布局](https://www.yuque.com/guoqzuo/js_es6/kg7660#973d6cc6)

于是我在某个页面中使用了grid，但发现**IE不兼容，grid的某些属性不兼容IE，加了-ms-都没用**，最后为了不必要的麻烦和风险，还是换成flex布局了，改成flex后的代码居然比grid还简单...

参考: [CSS网格布局即使带有前缀也不能在IE11中工作](http://www.imooc.com/wenda/detail/575101)