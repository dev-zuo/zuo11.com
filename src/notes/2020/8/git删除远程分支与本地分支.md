---
{
  "title": "git删除远程分支与本地分支",
  "staticFileName": "git_branch_del.html",
  "author": "guoqzuo",
  "createDate": "2020/08/02",
  "description": "git删除分支,git删除远程分支,git怎么删除远程分支,当我们常见远程分支，使用完成后，怎么删除远程的分支呢？我们以删除file_backup分支为例，来看看具体步骤 1. 先查看本地分支 2. 删除远程的file_backup分支 3. 删除本地分支",
  "keywords": "git删除分支,git删除远程分支,git怎么删除远程分支",
  "category": "运维部署与版本控制"
}
---
# git删除远程分支与本地分支

当我们常见远程分支，使用完成后，怎么删除远程的分支呢？我们以删除file_backup分支为例，来看看具体步骤

1. 先查看本地分支

```bash
git branch -a # 查看当前分
# file_backup
# master
# remotes/origin/HEAD -> origin/master
# remotes/origin/file_backup
```

2. 删除远程的file_backup分支

```bash
git push origin --delete file_backup
```

3. 删除本地分支

```bash
git branch -d file_backup
```

参考：[git删除远程分支和本地分支](https://www.cnblogs.com/luosongchao/p/3408365.html)