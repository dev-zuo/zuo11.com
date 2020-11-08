# .eslintignore不生效, vscode eslint插件不同版本有差异的问题
.eslintignore 文件的作用是，当不想对项目的某个目录进行 eslint 检查时，可以在这个文件中声明，类似 .gitignore 文件的效果。

```js
// .eslintignore
mock
```

上面表示忽略 mock 文件夹下的 eslint 代码检查。这样 eslint 插件就不会显示 warning、不会保存后自动 fix 该文件。在这个文件中去掉mock后，mock下的文件就又可以保存后 fix 了。

但有一个问题，vscode eslint插件不同版本的行为可能有差异，有可能把目录加入到了.eslintignore 后，保存时还是会 fix 这个目录下的 eslint 错误。**这种情况建议升级到最新版本。**