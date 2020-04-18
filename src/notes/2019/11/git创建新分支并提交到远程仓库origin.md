
# git创建新分支并提交到远程仓库origin

当我们加入到一个项目组开发项目，一般最开始的一件事情就是从远程仓库clone代码，然后新创建一个分支进行开发。显然你需要把每天写的代码上传到服务器，那怎么将本地创建的分支推送到远程并与之关联呢，下面来看一下对应的流程

假设在 pc-v2 分支，新建一个分支 pc-v2-zuo，推送到远程步骤

```bash
# 基于当前分支创建一个pc-v2-zuo分支并切换到该分支
git checkout -b pc-v2-zuo 

# 先push
git push origin pc-v2-zuo:pc-v2-zuo # 将分支推送到远程分支

# 再将当前分支关联到远程分支
git branch —set-upstream-to=origin/pc-v2-zuo pc-v2-zuo
```

记得每次git commit、git push前都要git pull更新

如果在pc-v2-zuo这个分支开发完成后，怎么将更新合并到某个特定的分支呢(加上为v1.2.0)？一般我的方法是

1. 在当前分支 git merge origin/v1.2.0 将目标分支的内容先merge到自己分支。解决冲突后提交到远程

2. 然后再切到v1.2.0，在将自己的分支合并到当前分支git merge pc-v2-zuo，再push

参考之前的笔记：[廖雪峰 git教程笔记](https://www.yuque.com/guoqzuo/csm14e/gn4bpl)
