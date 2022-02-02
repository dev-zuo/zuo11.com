---
{
  "title": "vue性能优化 - webpack包体积优化",
  "staticFileName": "vue_webpack_optimization.html",
  "author": "guoqzuo",
  "createDate": "2019/12/25",
  "description": "安装 webpack-bundle-analyzer npm包， 在package.json的scripts加入对应的命令，运行npm run report 即可build，并在dist目录生成report.html，打开就可以各个模块包对应的大小，这样就可以开始优化了",
  "keywords": "webpack-bundle-analyzer,webpack包体积优化",
  "category": "Vue"
}
---

# vue性能优化 - webpack包体积优化

1. 安装 **webpack-bundle-analyzer** npm包
```bash
# 安装包
npm install webpack-bundle-analyzer --save-dev
```

2. 在package.json的scripts加入对应的命令，运行npm run report 即可build，并在dist目录生成report.html，打开就可以各个模块包对应的大小，这样就可以开始优化了
```js
scripts: {
  "report": "vue-cli-service build --report"
}
```

3. 路由都弄成懒加载，js懒加载可以使用import()，如果使用import xx from 'xx'，会直接打包到主包，就需要弄成懒加载的逻辑。但如果使用该js，怎么判断js已懒加载完？setTimeout 1s后再调用，弱网呢？怎么监听？这就需要了解懒加载的逻辑了，示例如下：
```html
<!-- 监听是否加载完成 -->
<!-- 在浏览器中，import 语句只能在声明了 type="module" 的 script 的标签中使用。-->
<script type="module">
  let myModule = () => import('./testModule.js')
  
  // testModule.js   内容 export default { a: 1, b: "test" }

  // 类似于路由组件component懒加载逻辑。myModule仅是一个函数，返回promise，需要调用时 myModule().then() 即可
  window.onload = () => {
    console.log('onload')

    // dom已加载，3秒后加载模块
    setTimeout(() => {
      console.log(myModule, typeof myModule) // () => import('./testModule.js') "function"
      // myModule() 函数执行后，返回promise
      myModule().then((res) => {
        console.log('模块加载成功', res) // 加载成功 Module {Symbol(Symbol.toStringTag): "Module"}
        let data = res.default // {a: 1, b: "test"}
        console.log(data.a) // 1
      },(e) => {
        console.log('import 加载异常')
      })
    }, 3000)
  }
</script>
```

参考: [import - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import)