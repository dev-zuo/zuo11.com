---
{
  "title": "Make sure you configure your ‘user.name’ and ‘user.email’ in git",
  "staticFileName": "git_user_email.html",
  "author": "guoqzuo",
  "createDate": "2021/04/11",
  "description": "git 设置 user.name user.email，github 提交没有绿点，github提交没头像，在 vscode 中，使用可视化工具，而非命令的方式提交代码时，如果没有配置 git 的 user.name 和 user.email，可能会弹出 Make sure you configure your ‘user.name’ and ‘user.email’ in git 的错误，代码无法提交。这就需要先配置好，再提交了。另外，在 github 或 gitlab 等页面中，可能会遇到提交没有绿点或者看不到头像的情况，可能是因为配置的 user.email 发生了变化，和平台的 email 不一致导致的。修改成一致的就正常了。",
  "keywords": "git config,git 设置 user.name user.email,github 提交没有绿点,github提交没头像",
  "category": "运维部署与版本控制"
}
---
# Make sure you configure your ‘user.name’ and ‘user.email’ in git
在 vscode 中，使用可视化工具，而非命令的方式提交代码时，如果没有配置 git 的 user.name 和 user.email，可能会弹出 Make sure you configure your ‘user.name’ and ‘user.email’ in git 的错误，代码无法提交。这就需要先配置好，再提交了。

另外，在 github 或 gitlab 等页面中，可能会遇到提交没有绿点或者看不到头像的情况，可能是因为配置的 user.email 发生了变化，和平台的 email 不一致导致的。修改成一致的就正常了。

下面来看看怎么设置 user.name 和 user.email。git 配置（configure）分两种，一种是全局的，一种是针对单个项目仓库的（项目目录下）。可以使用 git config 来管理管理配置（查看、设置）

**查看配置**

可以使用 git config --list 查看当前配置，如果没有 user.name，和 user.email，就说明还没有配置。
```bash
# 查看当前目录下项目的配置
git config --list
# credential.helper=osxkeychain
# user.name=zuoxiaobai
# user.email=guoqzuo@gmail.com
# remote.origin.url=git@github.com:zuoxiaobai/fenote.git
# remote.origin.fetch=+refs/heads/*:refs/remotes/origin/*
# branch.master.remote=origin
# branch.master.merge=refs/heads/master

# 查看全局配置
git config --list --global
# user.name=zuoxiaobai
# user.email=guoqzuo@gmail.com
# core.quotepath=false
```
**设置（修改配置）** 

可以使用 git config 属性名 属性值，来设置 git 配置，默认是项目内的（局部的），如果需要设置全局的，需要加上 --global，设置完成后，再使用查看配置的命令 git config --list 就可以看到配置生效了。
```bash
# 进入项目目录，单个仓库（项目），局部设置
git config user.name "zuoxiaobai" 
git config user.email "guoqzuo@gmail.com"

# 全局设置
git config --global user.name "zuoxiaobai" 
git config --global user.email "guoqzuo@gmail.com"
```

> 注意 git config 属性名 属性值 时，如果属性值没有用双引号 "" 包裹，那么中间不能有空格，比如 git config user.name zuo xiaobai，相当于 git config user.name zuo，会丢弃空格后面的部分

更多用法，可以使用 git config --help 查看帮助，或查看对应的官方文档 [Git - git-config Documentation](https://git-scm.com/docs/git-config)
