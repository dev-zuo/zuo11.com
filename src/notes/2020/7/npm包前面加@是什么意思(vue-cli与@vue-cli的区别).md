---
{
  "title": "npm包前面加@是什么意思(vue-cli与@vue-cli的区别)",
  "staticFileName": "npm_scope.html",
  "author": "guoqzuo",
  "createDate": "2020/07/06",
  "description": "今天看vue-cli文档，发现了下面的这段话 vue-cli 改为了 @vue/cli，这两个npm有什么区别呢？npm包前面加@是什么意思呢？查了下官网，npm包前面加@，代表scopes相关的包，可以理解为作用域(范围)包，作用域使我们可以创建与其他用户或组织创建的包同名，而不会发生冲突。A scope allows you to create a package with the same name as a package created by another user or Org without conflict.",
  "keywords": "npm包前面加@是什么意思,vue-cli与@vue/cli的区别",
  "category": "前端工程化"
}
---
# npm包前面加@是什么意思(vue-cli与@vue/cli的区别)

今天看vue-cli文档，发现了下面的这段话 vue-cli 改为了 @vue/cli，这两个npm有什么区别呢？npm包前面加@是什么意思呢？

> Vue CLI 的包名称由 vue-cli 改成了 @vue/cli。 如果你已经全局安装了旧版本的 vue-cli (1.x 或 2.x)，你需要先通过 npm uninstall vue-cli -g 或 yarn global remove vue-cli 卸载它。

查了下官网，npm包前面加@，代表scopes相关的包，可以理解为作用域(范围)包，作用域使我们可以创建与其他用户或组织创建的包同名，而不会发生冲突。

A scope allows you to create a package with the same name as a package created by another user or Org without conflict.

作用域名称是介于@和斜线之间的所有内容：

The scope name is everything between the @ and the slash:

```js
// “npm” scope:
@npm/package-name
// “npmcorp” scope:
@npmcorp/package-name
```

## 为什么需要有作用域包
**npm包一个诟病就是包名很容易被占用的问题，占用后用其他人就不能用了。而作用域包类似于创建了一个命名空间，不同的命名空间，可以使用相同的包名**

作用域的命名不是谁便就能用的，只有两种可以使用：自己的用户名、自己创建的组织名

注意：必须先注册一个npm用户帐户，然后才能发布用户作用域的npm软件包。此外，要发布组织作用域的软件包，您必须创建一个npm用户帐户，然后创建一个npm Org(组织)。

**在 vue-cli 中可以用@vue/cli说明使用了vue这个npm账号或者组织发布了该包。**

参考:
- [npm学习（十）之如何使用创建、发布、使用作用域包](https://www.cnblogs.com/kunmomo/p/11222063.html)
- [About scopes - Packages and modules | npm](https://docs.npmjs.com/about-scopes)
- [Creating and publishing scoped public packages | npm](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages)