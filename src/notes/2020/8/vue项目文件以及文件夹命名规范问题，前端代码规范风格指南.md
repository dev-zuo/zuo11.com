
# vue项目文件以及文件夹命名规范问题，前端代码规范风格指南

在以vue为主的开发中，vue项目文件以及文件夹命名规范文件，在开发团队里面是需要统一的。我们尽量按照一种规范来开发，形成一种风格，这样更有利于项目迭代维护，下面来逐一介绍

## 个人总结的vue功能组件、目录结构风格
```js
// 新建文件夹，命名以小写字母开头，驼峰命名
- moduleA // 模块A目录
  - comps // 组件目录
    - CustomerRefuse.vue // 单文件组件命名规则，参考vue风格指南
    // 如果组件内容较多，创建一个文件夹
    // 命名以npm包命名规则一致，全小写、-分隔，建议不超过3个单词
    - no-permission
      - src // 其他资源目录，参考Element组件源码
      - index.vue // 入口或者使用index.js 方便 Vue.use 引入
  - index.vue // 模块A入口
```

## 业界较权威的风格指南
Vue、HTML、JS、CSS编码风格，可以看看下面比较好的风格指南：

- [Vue风格指南](https://cn.vuejs.org/v2/style-guide/)
- [Bootstrap 编码规范: 编写一致、灵活和可持续的 HTML 和 CSS 代码的规范。](https://codeguide.bootcss.com/)
- [Google JavaScript Style Guide](http://google.github.io/styleguide/jsguide.html)
- [Airbnb JS风格指南](https://github.com/airbnb/javascript)


## 其他风格
当然你也可以使用其他风格，下面是在网上找了一个看起来还算靠谱的命名规则：

- 文件或文件夹的命名遵循以下原则： 单文件组件文件名 **要么始终是单词大写开头 (PascalCase)，要么始终是横线连接 (kebab-case)。**
- index.js 或者 index.vue，统一使用小写字母开头的(kebab-case)命名规范
- 属于组件或类的，统一使用大写字母开头的(PascalCase)命名规范
- 其他非组件或类的，统一使用小写字母开头的(kebab-case)命名规范

参考 [Vue项目中的文件/文件夹命名规范](https://www.cnblogs.com/mouseleo/p/11484550.html)