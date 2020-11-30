# Google广告一个页面怎么显示多个广告，多个广告只显示的一个是什么原因？
在 Google Adsense 中，理论上配置好广告形式后，获取代码，把对应的代码放到页面中就可以显示广告了。但发现，如果放多个广告，只有一个可以显示出来，下面来看看是为什么？

官方提供的代码如下:

```html
<script async src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'></script>
<ins class='adsbygoogle'
     style='display:block'
     data-ad-client='ca-pub-9527676606416000'
     data-ad-slot='3653238000'
     data-ad-format='auto'
     data-full-width-responsive='true'></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

一般在验证开通 Google Adsense 时，就会引入第一行 script 代码。那么只需要把下面的 ins 元素 和 script 里的代码拷贝进页面里就行。

当有多个广告时，我只拷贝了 多个 ins 到指定位置。 script 里面 `(adsbygoogle = window.adsbygoogle || []).push({});` 只放到了 body最后面的 script 里，这时只能显示一个广告。于是我看了下其他可以显示多个 google 广告的页面，打开源码后，发现最下面的 script 里的内容也要多次拷贝。也就是 **如果页面上要放多个 google 广告，每次都需要引入 ins +  script 两部分的代码**

```html
<!-- 广告 1 -->
<ins class='adsbygoogle' style="ins内容简写"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>

<!-- 广告 2 -->
<ins class='adsbygoogle' style="ins内容简写"></ins>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
```
