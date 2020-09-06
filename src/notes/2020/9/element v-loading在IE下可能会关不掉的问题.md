# element v-loading在IE下可能会关不掉的问题

对于请求非常快的情况，loading一加载很快就关闭。在IE下，可能出现 v-loading设置的值已经是 false，但loading还是一直显示，关闭不了的情况，解决方法是：在关闭loading前，加一个500ms的延时，就没问题了。

```js
setTimeout(() => {
  this.loading = false
}, 500)
```
