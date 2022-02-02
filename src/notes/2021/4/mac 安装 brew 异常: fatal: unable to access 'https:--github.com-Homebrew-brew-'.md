---
{
  "title": "mac 安装 brew 异常: fatal: unable to access 'https:--github.com-Homebrew-brew-'",
  "staticFileName": "mac_brew_new.html",
  "author": "guoqzuo",
  "createDate": "2021/04/03",
  "description": "为了快速安装 svn, git, nginx 等，我想着先在 macbook 上安装 brew，按照常规的方法修改了 ruby 源，但还是出现安装错误 `fatal: unable to access 'https://github.com/Homebrew/brew/' LibreSSL SSL_connect: SSL_ERROR_SYSCALL in connection to github.com:443 Failed during: git fetch --force origin` ",
  "keywords": "mac安装brew fail,mac 安装 brew,mac homebrew 安装失败",
  "category": "计算机基础与开发工具"
}
---
# mac 安装 brew 异常: fatal: unable to access 'https://github.com/Homebrew/brew/'

为了快速安装 svn, git, nginx 等，我想着先在 macbook 上安装 brew，按照常规的方法修改了 ruby 源，但还是出现安装错误 `fatal: unable to access 'https://github.com/Homebrew/brew/' LibreSSL SSL_connect: SSL_ERROR_SYSCALL in connection to github.com:443 Failed during: git fetch --force origin` 

意思大概是在 github 上拉取 brew 时，出现 443 错误。我们可以通过替换安装时的 shell 路径来解决，一般我们使用的安装命令如下
```js
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```
**这样可能会出错，不推荐使用，我们可以使用 gitee 上的一个 shell 脚本 进行安装**，命令如下
```js
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
```

按照提示安装好，就可以使用 brew install 命令来安装 nginx，svn 等工具了

一般常规修改 ruby 源的方法
```bash
# 修改源
gem sources --add https://gems.ruby-china.com/ --remove https://rubygems.org/
# 查看当前源
gem sources -l
# *** CURRENT SOURCES ***

# https://gems.ruby-china.com/
```

参考: [mac安装homebrew失败怎么办？- 知乎](https://www.zhihu.com/question/35928898?sort=created)