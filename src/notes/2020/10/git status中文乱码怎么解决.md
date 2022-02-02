---
{
  "title": "git status中文乱码怎么解决",
  "staticFileName": "git_status_chinese.html",
  "author": "guoqzuo",
  "createDate": "2020/10/31",
  "description": "git status时，如果中文乱码，可以对git进行一个配置即可 `git config --global core.quotepath false` 具体效果如下图",
  "keywords": "git中文乱码,git status乱码,git乱码",
  "category": "运维部署与版本控制"
}
---
# git status中文乱码怎么解决
git status时，如果中文乱码，可以对git进行一个配置即可 `git config --global core.quotepath false`

具体效果如下图

![git_chinese_show.png](../../../images/blog/git/git_chinese_show.png)