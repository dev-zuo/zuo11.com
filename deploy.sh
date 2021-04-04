# 进入生成的文件夹
cd dist

# 在新生成的目录下初始化 .git，并 add 所有文件，提交到该目录下项目的本地master分支(默认)
git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
# zuoxiaobai/fenote 对应的配置如下，将 dist 目录下的 master 分支 push 到远程远程仓库的 gh-pages 分支
git push -f git@github.com:zuoxiaobai/zuo11.com.git master:gh-pages

cd -