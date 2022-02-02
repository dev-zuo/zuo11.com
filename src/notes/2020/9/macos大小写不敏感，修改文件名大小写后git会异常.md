---
{
  "title": "macos大小写不敏感，修改文件名大小写后git会异常",
  "staticFileName": "mac_git_case.html",
  "author": "guoqzuo",
  "createDate": "2020/09/07",
  "description": "怎么解决git修改文件大小后报错,git修改文件大小写,mac上git修改文件大小写,macos是文件大小写不敏感的系统，而widonws/linux是大小写敏感的，假设把git上之前提交过的文件，修改大小写，再次提交后，git上会出现两个大小写不一样的文件？为什么呢。macos是大小写不敏感的文件系统，也就是在macos上你无法在同一个目录下同时创建test.vue和Test.vue，如果出现这种情况，本地感知不到文件的改动，但git服务器却有记录这两个文件。最好的解决方法是将整个文件名都变更。而不是仅改变大小写",
  "keywords": "怎么解决git修改文件大小后报错,git修改文件大小写,mac上git修改文件大小写",
  "category": "运维部署与版本控制"
}
---
# macos大小写不敏感，修改文件名大小写后git会异常
macos是文件大小写不敏感的系统，而widonws/linux是大小写敏感的，假设把git上之前提交过的文件，修改大小写，再次提交后，git上会出现两个大小写不一样的文件？为什么呢

macos是大小写不敏感的文件系统，也就是在macos上你无法在同一个目录下同时创建test.vue和Test.vue，如果出现这种情况，本地感知不到文件的改动，但git服务器却有记录这两个文件。

最好的解决方法是将整个文件名都变更。而不是仅改变大小写