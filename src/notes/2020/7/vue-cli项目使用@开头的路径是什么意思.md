---
{
  "title": "vue-cli项目使用@开头的路径是什么意思",
  "staticFileName": "vue_src_alias.html",
  "author": "guoqzuo",
  "createDate": "2020/07/12",
  "description": "我们在vue-cli创建的vue项目里，可以使用@开头的路径，表示从src目录开始，这样如果后面代码的目录层级有调整，或者复用代码时，都不会影响功能，代码更健壮",
  "keywords": "vue-cli项目使用@开头的路径是什么意思,@开头的路径,路径中有@",
  "category": "Vue"
}
---

# vue-cli项目使用@开头的路径是什么意思

我们在vue-cli创建的vue项目里，可以使用@开头的路径，表示从src目录开始，这样如果后面代码的目录层级有调整，或者复用代码时，都不会影响功能，代码更健壮

```js
() => import('../../../components/xxx/xx')  // bad 
() => import('@/components/xxx/xx')  // good 对应 src/components/xxx/xx
require('../../assets/img/xxx.png') // bad
require('@/assets/img/xxx.png') // good 对应 src/assets/img/xxx.png
```

