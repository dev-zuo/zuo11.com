---
{
  "title": "vue组件的封装性与可操作性：ref拿不到子组件实例以及vuex增加代码复杂度问题",
  "staticFileName": "vue_comps_complex.html",
  "author": "guoqzuo",
  "createDate": "2020/10/31",
  "description": "一般在封装vue组件时，怎么把组件封装的更好，更容易维护理解是值得思考的问题。来看一个实际场景：一个组件里有高级查询和列表，他们东西都比较多，需要拆分成两个子组件",
  "keywords": "vue组件封装,props ref vuex封装组件时对比",
  "category": "Vue"
}
---
# vue组件的封装性与可操作性：ref拿不到子组件实例以及vuex增加代码复杂度问题
一般在封装vue组件时，怎么把组件封装的更好，更容易维护理解是值得思考的问题

来看一个实际场景：一个组件里有高级查询和列表，他们东西都比较多，需要拆分成两个子组件
```html
<!-- index.vue -->
<project-search></project-search>
<project-list></project-list>
```
查询的条件参数比较多，假设表单数据变量为 searchForm。

按照封装的完整性原则，自己的组件的数据放到自己的组件中，那么 searchForm 就需要放到 project-search 组件里。

但在index.vue中，我们需要查询列表，依赖searchForm的值，涉及到父组件取子组件的值的问题，一般有四种方法可以选择
- searchForm变量放到父组件，通过props传递到子组件（这样有点违背组件的封装性）
- vuex 个人认为，能不使用vuex的场景，尽量不要使用，除非真的需要使用，他会影响代码的简单性。
- bus 使用 bus 来通信，但和vuex类似，尽量少使用
- 使用ref直接取。但由于副组件加载子组件时，在mounted钩子里 ref 拿对应的子组件可能会拿不到，需要加 setTiemout，也是一种比较怪的操作

对比这几种情况。我一般使用props，把值直接放到index.vue里，再传递给子组件。这样算是比较好理解的一种方法，虽然封装性不强。但涉及到数据需要交互的场景，必须要做一些妥协。