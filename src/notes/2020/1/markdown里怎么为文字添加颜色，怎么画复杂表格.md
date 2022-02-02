---
{
  "title": "markdown里怎么为文字添加颜色，怎么画复杂表格",
  "staticFileName": "markdown_html.html",
  "author": "guoqzuo",
  "createDate": "2020/01/11",
  "description": "之前看markdown语法时，并没有添加颜色和复杂表格的方法，但最近了解到markdown里面可以直接使用html，那就方便了。复杂表格直接使用table标签画，如果想给文字加颜色，使用如下方法",
  "keywords": "markdown里怎么为文字添加颜色,markdown里怎么画复杂表格,markdown使用html时注意事项",
  "category": "计算机基础与开发工具"
}
---

# markdown里怎么为文字添加颜色，怎么画复杂表格

之前看markdown语法时，并没有添加颜色和复杂表格的方法，但最近了解到markdown里面可以直接使用html，那就方便了。复杂表格直接使用table标签画，如果想给文字加颜色，使用如下方法
```html
<span style="color: red">这是一段有颜色的字体</span>

<!-- 下划线 -->
<u>这是一段有下划线的文字</u>
```

**注意：markdown解析器很多。在Typora嵌入html的复杂表格没什么问题，但在github上显示时，table被放到了文档的最下面。语雀里导入时，也会有一点问题。所以为了保证最大程度的兼容，写md时，尽量避免使用内嵌html，对于复杂表格可以使用图片代替**

