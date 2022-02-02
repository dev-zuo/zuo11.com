---
{
  "title": "使用ssh方式拉取代码的步骤",
  "staticFileName": "git_ssh.html",
  "author": "guoqzuo",
  "createDate": "2020/08/02",
  "description": "在使用git拉取远程分支代码时，有两种方式，一种是git clone，另一种是 ssh。在文件太大git clone超时时，我们可以试试ssh这种方法，下面来看看具体步骤",
  "keywords": "git ssh",
  "category": "运维部署与版本控制"
}
---
# 使用ssh方式拉取代码的步骤

在使用git拉取远程分支代码时，有两种方式，一种是git clone，另一种是 ssh。在文件太大git clone超时时，我们可以试试ssh这种方法，下面来看看具体步骤

```bash
# 使用git平台邮箱账号生成公钥和私钥，全部默认、回车
ssh-keygen -t rsa -C "xxx@qq.com"

# 执行成功过后会在 ~/.ssh 目录下生成 id_rsa.pub 和 id_rsa 两个文件，一个公钥、一个私钥

# 查看公钥，并配置到对应的git平台里
cat ~/.ssh/id_rsa.pub

# 测试配置是否成功
ssh -T git@xxx.com 

# 拉取 
git clone git@xxx.com/xxxproject
```

参考：[GitHub如何配置SSH Key](https://blog.csdn.net/u013778905/article/details/83501204)