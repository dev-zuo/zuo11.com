---
{
  "title": "eslint禁止在return语句中使用赋值",
  "staticFileName": "devtools_eslint.html",
  "author": "guoqzuo",
  "createDate": "2019/10/17",
  "description": "在项目中，有一次为了少写一行，将设置值和return语句写成了一行，发现eslint报错，为什么会有这个错误呢？下面我们来看看。",
  "keywords": "eslintno-return-assign,eslint禁止在return中使用赋值,no-return-assign, eslint no-return-assign",
  "category": "计算机基础与开发工具"
}
---

# eslint禁止在return语句中使用赋值

在项目中，有一次为了少写一行，将设置值和return语句写成了一行，发现eslint报错，为什么会有这个错误呢？下面我们来看看。

## 在项目中使用的代码
```js
// xx.vue 代码methods片段
test() {
  // 更改data里message的值，且返回
  return this.message = 'some value'
}
```

eslint 对应的限制规则是 **no-return-assign**
```js
function doSomething() {
  return foo = bar + 2
}
```

## 官方的解释
为什么会禁止return里赋值了，官方的解释是：**对于上面的代码，很难说明return的意图，该函数返回的结果是bar + 2 为什么要赋值给foo，目的还可能是比较运算符，如 ==，这样会存在歧义**，因此最好不要在return语句中使用赋值操作



## 怎么消除vscode红色标记提示?

鼠标移动到错误的位置，直到出现快速修复的按钮，选择Disabled no-return-assgin for this line，就会添加异常注释，// eslint-disabled-next-line on-return-assign

为了增强代码可读性有些自动修复去掉的括号可以加上，在配合上面的注释即可让eslint忽略


参考: [no-return-assign - Rules - ESLint - Pluggable JavaScript linter](https://eslint.org/docs/rules/no-return-assign)