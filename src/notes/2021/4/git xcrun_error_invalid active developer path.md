---
{
  "title": "git xcrun: error: invalid active developer path",
  "staticFileName": "git_xcrun_error.html",
  "author": "guoqzuo",
  "createDate": "2021/04/03",
  "description": "在 mac 下输入 git 命令，突然提示 xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun，可能是没有安装 xcode，有些功能没有的原因。一般可以通过运行 `xcode-select --install` 命令来解决，按照提示完成安装，就 OK 了",
  "keywords": "git xcrun error,invalid active developer path",
  "category": "计算机基础与开发工具"
}
---
# git xcrun: error: invalid active developer path

在 mac 下输入 git 命令，突然提示 xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun，可能是没有安装 xcode，有些功能没有的原因。

一般可以通过运行 `xcode-select --install` 命令来解决，按照提示完成安装，就 OK 了

```bash
# 安装一些依赖
xcode-select --install
```
