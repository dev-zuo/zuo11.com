---
{
  "title": "failed at the phantomjs-prebuilt@2.1.16  intsall script",
  "staticFileName": "phantomjs-prebuilt.html",
  "author": "guoqzuo",
  "createDate": "2019/12/04",
  "description": "从远程仓库拉取代码，npm install，发现提示failed at the phantomjs-prebuilt@2.1.16 intsall script，怎么解决呢？ 使用 npm install —ignore-scripts** 忽略package.json中设置的脚本，意思就是避免package.json中的脚本影响包的正常安装。The --ignore-scripts argument will cause npm to not execute any scripts defined in the package.json. See npm-scripts.",
  "keywords": "failed at the phantomjs-prebuilt@2.1.16  intsall script",
  "category": "前端工程化"
}
---

# failed at the phantomjs-prebuilt@2.1.16 intsall script

从远程仓库拉取代码，npm install，发现提示failed at the phantomjs-prebuilt@2.1.16 intsall script，怎么解决呢？

使用 **npm install —ignore-scripts** 忽略package.json中设置的脚本，意思就是避免package.json中的脚本影响包的正常安装。

The --ignore-scripts argument will cause npm to not execute any scripts defined in the package.json. See npm-scripts.

https://docs.npmjs.com/cli/install