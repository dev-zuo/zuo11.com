---
{
  "title": "element cascader显示异常问题",
  "staticFileName": "el_cascader.html",
  "author": "guoqzuo",
  "createDate": "2020/02/24",
  "description": "当cascader里选项比较多时，组件高度会异常，主要是 .el-cascader-menu__wrap 这个样式高度为100%，将cascader里其任意一父元素手动指定高度即可，但el-cascader-menu__wrap设置的效果最好",
  "keywords": "element cascader显示异常问题,element cascader高度问题",
  "category": "Vue"
}
---
# element cascader显示异常问题

当cascader里选项比较多时，组件高度会异常，主要是 `.el-cascader-menu__wrap` 这个样式高度为100%，将cascader里其任意一父元素手动指定高度即可，但el-cascader-menu__wrap设置的效果最好
```css
.el-cascader-menu__wrap {
  max-height: 300px;
  overflow: scroll;
}
```
但这样设置后，可能会影响全局，这个是直接挂载在body元素下的，对其他模块会有影响，怎么解决这个影响呢？

发现组件提供了一个 popper-class 属性，可以自定义浮层类名
```less
// 用 popper-class指定一个class，比如my-container，防止污染全局样式
.my-container {
  .el-cascader-menu__wrap {
    max-height: 300px;
    overflow: scroll;
  }
}
```

总结：当写类似的组件时，如果需要在body里插入，需要有入口可以指定对应的自定义class，这样当多个页面需要时，不会产生样式干扰

参考：

- [cascader 组件popper-class属性](https://element.eleme.cn/#/zh-CN/component/cascader#cascader-attributes)
- [vue element Cascader 高度过长问题？](https://segmentfault.com/q/1010000021033440)
