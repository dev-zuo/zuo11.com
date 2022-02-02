---
{
  "title": "git将远程仓库A分支合并到B分支",
  "staticFileName": "git_merge_branch.html",
  "author": "guoqzuo",
  "createDate": "2020/10/01",
  "description": "假设要将远程分支的 A 分支合并到 B 分支，一般我会先在A分支将B分支merge，再切到B分支，merge A分支。以将远程仓库的 dev1.3.4 分支合并到远程的 test1.3.4 分支为例，下面是我一般的合并过程",
  "keywords": "git远程分支合并,git合并分支",
  "category": "运维部署与版本控制"
}
---
# git将远程仓库A分支合并到B分支

假设要将远程分支的 A 分支合并到 B 分支，一般我会先在A分支将B分支merge，再切到B分支，merge A分支。

以将远程仓库的 dev1.3.4 分支合并到远程的 test1.3.4 分支为例，下面是我一般的合并过程

```bash
# 1. 本地切到 dev1.3.4 分支
# 2. merge远程的test1.3.4分支，命令如下
git merge origin/test1.3.4
# 3.如果有冲突(conflict)，修改冲突文件
# 4.修改冲突后提交代码到远程仓库，命令如下
git add 修改冲突相关的文件
git commit '修改冲突，fix conflict'
git push
# 5.切换到test1.3.4分支
# 6.merge本地的dev1.3.4，因为本地的dev1.3.4是最新的代码，命令如下
git merge dev1.3.4
git push
```

**另外，养成习惯，在git push前，先git pull**
