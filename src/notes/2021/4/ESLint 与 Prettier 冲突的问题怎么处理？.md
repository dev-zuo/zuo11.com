---
{
  "title": "ESLint 与 Prettier 冲突的问题怎么处理？",
  "staticFileName": "eslint_prettier_conflict.html",
  "author": "guoqzuo",
  "createDate": "2021/04/03",
  "description": "在安装 @vue/cli 后，使用 vue create xx 创建项目，如果选择了 eslint + prettier，可能会出现冲突。比如 在 .eslintrc.js 的 rules 中设置了强制单引号，而默认情况下 prettier 是双引号。`如果有双引号，eslint 会提示 error。如果有单引号 prettier 会警告提示`，保存自动 fix 会在单双引号之间来回切换，总是会有异常提示。",
  "keywords": "eslint prettier conflict,ESLint 与 Prettier 冲突",
  "category": "前端工程化"
}
---
# ESLint 与 Prettier 冲突的问题怎么处理？

在安装 @vue/cli 后，使用 vue create xx 创建项目，如果选择了 eslint + prettier，可能会出现冲突。比如

在 .eslintrc.js 的 rules 中设置了强制单引号，而默认情况下 prettier 是双引号。`如果有双引号，eslint 会提示 error。如果有单引号 prettier 会警告提示`，保存自动 fix 会在单双引号之间来回切换，总是会有异常提示。
```js
// .eslintrc.js
module.exports = {
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  rules: {
    "no-console":  "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "quotes": [2, 'single'] // 强制单引号， prittier 默认要双引号引号，冲突
  },
  // ...
};
```

为了解决冲突，我们可以在 prettier 的配置文件（.prettierrc.js）中加入强制使用单引号的选项，这样就可以了。
```js
// .prettierrc.js
// 修改后注意可能要关闭 vscode 后再重新打开才生效，另外最好保证该项目没有被多层目录嵌套，直接打开的项目
module.exports = {
  singleQuote: true, // 使用单引号替代双引号
  // semi: false, // 行尾自动去掉分号
  // printWidth: 100, // 最大行宽 100
  // tabWidth: 2 // tab 2 个空格
}
```

一般建议只在 eslint 或 prettier 配置中选一个做配置，除非有解决不了的冲突，才在两个配置文件中都做配置。

参考：[vscode 配置 eslint + prettier冲突问题](https://segmentfault.com/q/1010000016953293)