# node package.json中版本前的 ~ 与 ^ 分别代表什么

来看看element ui的package.json，其中async-validator是 ~ 开头，而其他都是 ^ 开头，有什么区别呢？
```js
"dependencies": {
  "async-validator": "~1.8.1",
  "babel-helper-vue-jsx-merge-props": "^2.0.0",
  "deepmerge": "^1.2.0",
  "normalize-wheel": "^1.0.1",
  "resize-observer-polyfill": "^1.5.0",
  "throttle-debounce": "^1.0.1"
},
```
版本格式 1.8.1 对应 major.minor.patch
- major：表示版本有了一个大更改。
- minor：表示增加了新的功能，并且可以向后兼容。
- patch：表示修复了bug，并且可以向后兼容。

~：他会更新到当前minor version（也就是中间的那位数字）中最新的版本，也就是只变动patch到最新版本，它不会自动更新minor版本, 波浪符号是曾经npm安装时候的默认符号，现在已经变为了插入符号。

^：这个符号就显得非常的灵活了，他将会把当前库的版本更新到当前major version（也就是第一位数字）中最新的版本。也就是更新minor到最新版本，他不会自动更新major版本。

当我们使用最新的Node运行'npm instal --save xxx'，的时候，会优先考虑使用插入符号（^）而不是波浪符号（~）了。

可以手动安装指定版本
```bash
# 安装最新版本
npm instlal xxx 
# 默认情况下，会安装最新版本npm包，等价于
npm install xxx@latest
# 安装指定版本
npm install xxx@[指定版本号]
# 安装未来版本，未正式发布的beta版本
npm install xxx@next 

```

参考：[Node.js中package.json中库的版本号详解(^和~区别)](https://www.cnblogs.com/jimaww/p/10179326.html)

