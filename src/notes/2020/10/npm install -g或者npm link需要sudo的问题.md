
# npm install -g或者npm link需要sudo的问题
在mac下，安装node后，会出现两个命令 npm 和 node，再使用 npm install -g 时，默认需要管理员权限，可以再前面加 sudo 以管理源方式运行即可。

如果在开发 npm 包的时候。如果开发对应的命令程序，测试时需要在当前目录执行 npm link，这里也需要加 sudo。