---
{
  "title": "什么是e2e test，除了单元测试外还有什么测试？",
  "staticFileName": "e2e_test.html",
  "author": "guoqzuo",
  "createDate": "2020/11/16",
  "description": "e2e 是 end to end 的缩写，翻译为端到端测试。单元测试只是整个测试金字塔中的一部分。其他类型的测试还包括 e2e(端到端)测试，快照比对测试等。e2e(端到端)测试致力于确保组件的一系列交互是正确的。相比简单快速的单元测试，它是更高级别的测试，例如可能会测试用户是否注册、登录以及更新他们的用户名。这种测试运行起来会比单元测试和快照比对测试慢一些。运行起来会更慢很多。这些测试通常只在部署前运行，来确保系统的每个部分都能够正常的协同工作。",
  "keywords": "e2e test,e2e test示例,端到端测试",
  "category": "Vue"
}
---
# 什么是e2e test，除了单元测试外还有什么测试？

e2e 是 end to end 的缩写，翻译为端到端测试。单元测试只是整个测试金字塔中的一部分。其他类型的测试还包括 e2e(端到端)测试，快照比对测试等。

## e2e(端到端)测试
e2e(端到端)测试致力于确保组件的一系列交互是正确的。相比简单快速的单元测试，它是更高级别的测试，例如可能会测试用户是否注册、登录以及更新他们的用户名。这种测试运行起来会比单元测试和快照比对测试慢一些。运行起来会更慢很多。这些测试通常只在部署前运行，来确保系统的每个部分都能够正常的协同工作。下面是一个简单的 e2e 测试示例：检查计算器两数求和的方法

```js
function testCal(browser) {
  browser
    .url('http://localhost:8080') // 使用浏览器打开 http://localhost:8080
    .click('#button-1') // 点击计算机按钮
    .click('#button-plus')
    .click('#button-1')
    .click('#button-equal')
    .assert.containsText("#result", "2") // 断言计算器显示结果是否正确
    .end()
}
```

## 单元测试
单元测试是最小巧、最简单、最有用的测试。它们通过隔离单个组件的每一个部分，来在最小工作单元上进行断言。能帮助开发者思考如何设计一个组件或重构一个现有组。通常每次代码发生变化的时候它们都会被运行，来看一个基本的单元测试例子：

```js
// sum.js
// 待测试函数 sum
export default function sum(a, b) {
  return a + b
}

// sum.spec.js
// 将 sum 函数导入测试文件
import sum from '../sum.js'

function testSum() {
  // 如果 sum 函数不返回 2，则抛出错误
  if (sum(1, 1) !== 2) {
    throw new Error('sum(1, 1) did not return 2')
  }
}

testSum() // 运行测试
```

## 快照比对测试
类似于找不同的游戏，快照测试会给运行中的应用拍一张图片，并将它与之前保存的图片进行比较。如果不同就是测试失败。这种方法对于确保代码变更后是否任然可以正确渲染很有帮助。以 Vue 组件为例子，会保存你的 Vue 组件的标记，然后比较每次新生成的测试运行结果。如果有些东西改变了，开发者就会得到通知，并决定这个改变是刻意为之 (组件更新时) 还是意外发生的 (组件行为不正确)。


更多测试 Vue 测试细节，可以参考 Edd Yerburgh 的书《Testing Vue.js Applications》，中文翻译版为《Vue.js应用测试》

参考：[额外的上下文 - Vue 组件的单元测试](https://cn.vuejs.org/v2/cookbook/unit-testing-vue-components.html#%E9%A2%9D%E5%A4%96%E7%9A%84%E4%B8%8A%E4%B8%8B%E6%96%87)