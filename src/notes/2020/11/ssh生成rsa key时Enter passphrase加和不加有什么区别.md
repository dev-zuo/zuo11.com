# ssh生成rsa key时Enter passphrase加和不加有什么区别？

在使用 ssh 拉取 git 仓库前，需要先生成公共/私有 rsa 密钥对。(Generating public/private rsa key pair.)，一般使用 `ssh-keygen -t rsa -C '邮箱@xx.com'` 命令，这个时候，会有下面的提示

Enter passphrase (empty for no passphrase): 

输入通行码(密码、口令短语)，如果不输入，那么就是不使用密码。**如果输入了密码，这个有什么用呢？**

这个主要是安全方面的考虑，如果你私钥泄露了，还有一个保护机制。在你每次使用 ssh 做敏感操作时，就会提示你输入密码

比如我们使用 ssh 方式拉取 git 仓库代码，远程 origin 源是 ssh 地址，**那么提交代码时，每次 git pull, git push 时都需要输入对应的秘钥**。相对会比较麻烦一点，但安全性更高。