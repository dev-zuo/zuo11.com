# uni复制功能只支持app、小程序，怎么兼容H5

uni复制功能只支持app、小程序，怎么兼容H5呢？当H5时，我们可以引导用户自己选择后copy，如果是app调用uni的api，代码如下

```js
copy() {
  // #ifdef H5
  prompt('复制失败。请选中下列微信号，手动复制', this.copyInfo)
  // #endif

  // #ifdef APP-PLUS
  uni.setClipboardData({
    data: this.contact,
    success: function () {
      uni.showToast({
        title: '复制成功',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
      })
    }
  });
  // #endif
}
```