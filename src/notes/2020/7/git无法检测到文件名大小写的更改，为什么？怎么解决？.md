---
{
  "title": "git无法检测到文件名大小写的更改，为什么？怎么解决？",
  "staticFileName": "git_file_name.html",
  "author": "guoqzuo",
  "createDate": "2020/07/26",
  "description": "git无法检测文件大小写改变,mac系统文件大小写不敏感，今天把开发分支合并到月底分支后，发现之前修改过文件名没有提交上去，手动改文件名后，git status 提示没有任何改动。于是百度了下，发现git默认配置为忽略大小写，因此无法正确检测大小写的更改。",
  "keywords": "mac文件大小写不敏感,macOS文件大小写不敏感,git无法检测文件大小写改变",
  "category": "运维部署与版本控制"
}
---

# git无法检测到文件名大小写的更改，为什么？怎么解决？

今天把开发分支合并到月底分支后，发现之前修改过文件名没有提交上去，手动改文件名后，git status 提示没有任何改动。

于是百度了下，发现git默认配置为忽略大小写，因此无法正确检测大小写的更改。

**临时解决办法：在当前项目使用git config core.ignorecase false，关闭git忽略大小写配置即可**

问题来了，提交后，远程仓库服务器上可以会同时存在两个文件，原来的文件并没有删除，为什么呢？

**macos是文件大小写不敏感的系统，而widonws/linux是大小写敏感的，假设把git上之前提交过的文件，修改大小写，再次提交后，git上会出现两个大小写不一样的文件**

macos是大小写不敏感的文件系统，也就是在macos上你无法在同一个目录下同时创建test.vue和Test.vue，如果出现这种情况，本地感知不到文件的改动，但git服务器却有记录这两个文件。

**最好的解决方法是将整个文件名都变更。而不是仅改变大小写**

参考: [Git无法检测到文件名大小写的更改](https://blog.csdn.net/sqlquan/article/details/93722680)