---
{
  "title": "多个 ssh 怎么配置，github、gitlab、gitee 多个平台配置并测试",
  "staticFileName": "multiple_ssh.html",
  "author": "guoqzuo",
  "createDate": "2021/04/03",
  "description": "在之前我们有介绍过使用 ssh 方式拉取代码的步骤，仅一个平台时（比如 github）还可以。如果多个 git 平台（比如 github、gitlab、gitee）都需要配置 ssh 时，那怎么配置呢？首先我们要在 ~/.ssh/ 目录下新建一个 config 文件，内容如下",
  "keywords": "ssh多git平台,多个ssh配置,multiple ssh",
  "category": "运维部署与版本控制"
}
---
# 多个 ssh 怎么配置，github、gitlab、gitee 多个平台配置并测试

在之前我们有介绍过 [使用ssh方式拉取代码的步骤](http://www.zuo11.com/blog/2020/8/git_ssh.html)，仅一个平台时（比如 github）还可以。如果多个 git 平台（比如 github、gitlab、gitee）都需要配置 ssh 时，那怎么配置呢？

首先我们要在 ~/.ssh/ 目录下新建一个 config 文件，内容如下
```bash
# github 配置
Host github.com
    HostName github.com
    IdentityFile ~/.ssh/id_rsa
    User guoqzuo@gmail.com

# gitee 配置
Host gitee.com
    HostName gitee.com
    IdentityFile ~/.ssh/gitee/id_rsa_gitee
    User 916707888@qq.com

# gitlab 配置
Host gitlab.com
    HostName gitlab.com
    IdentityFile ~/.ssh/gitlab/id_rsa_gitlab
    User i@zuoguoqing.com
```
其中 IdentityFile 指定的秘钥文件是需要注意的，需要使用 `ssh-keygen -t rsa -C "对应的邮箱"` 生成 id_rsa 秘钥对，其中 id_rsa.pub 公钥文件中的内容是需要设置到 github/gitee/gitlab 等平台上的。由于有多个，我们需要指定对应的文件名字，一般以 id_rsa_github 或 id_rsa_gitlab 来与默认的文件名做区别。注意：如果不指定名字，默认会放到 `~/.ssh/id_rsa`，自定义文件名后，如果没指定目录，会在当前目录生成。建议都放到 `~/.ssh/` 目录下方便管理。

测试 ssh key 是否配置成功
```bash
# 测试 gitee ssh 是否配置成功
ssh -T git@gitee.com
# Hi 左国清! You've successfully authenticated, but GITEE.COM does not provide shell access.

# 测试 github ssh 是否配置成功
ssh -T git@github.com
# Hi zuoxiaobai! You've successfully authenticated, but GitHub does not provide shell access.

# 测试 gitlab ssh 是否配置成功
ssh -T git@gitlab.com
# Welcome to GitLab, @zuoxiaobai!
```
如果在测试时，没有提示上面的内容，而是提示 `The authenticity of host 'github.com (140.82.121.4)' can't be established. RSA key fingerprint is SHA256:xxxx... Are you sure you want to continue connecting (yes/no/[fingerprint])? ` 选择 yes 即可，会将对应的 key 添加到 `~/.ssh/known_hosts` 中，然后就能看到上面的成功信息了。我的 `~/.ssh/` 目录内容如下
```bash
# 查看 
ls ~/.ssh/
# config		gitee		gitlab		id_rsa		id_rsa.pub	known_hosts
```