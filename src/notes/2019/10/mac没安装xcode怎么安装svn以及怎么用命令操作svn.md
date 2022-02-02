---
{
  "title": "mac没安装xcode怎么安装svn以及怎么用命令操作svn",
  "staticFileName": "mac_svn.html",
  "author": "guoqzuo",
  "createDate": "2019/10/30",
  "description": "一般在mac下，如果安装了xcode貌似有自动安装svn，如果卸载了xcode，那怎么安装svn呢？还有svn怎么使用命令来拉取更新，一般的git命令对应svn的命令是什么呢？下面我们来看看。",
  "keywords": "mac没安装xcode怎么安装svn,怎么用命令操作svn,svn拉取代码命令",
  "category": "运维部署与版本控制"
}
---

# mac没安装xcode怎么安装svn以及怎么用命令操作svn

一般在mac下，如果安装了xcode貌似有自动安装svn，如果卸载了xcode，那怎么安装svn呢？还有svn怎么使用命令来拉取更新，一般的git命令对应svn的命令是什么呢？下面我们来看看。

## 如果mac没有装xcode，怎么安装svn

最简单的方法：安装idea或webstorm等工具，在里面chenckout svn项目，会提示安装，按照提示来即可。

建议还是装会xcode，没xode对其他也会有影响，为了少踩点坑，建议还是装上为好。

## 使用命令操作svn
```bash
# checkout svn，注意如果密码错误，会不提示重新输入，如果403forbidden，就是没权限
svn checkout http://仓库地址 --username=用户名

# git与svn常用命令对比
# 整理自 https://blog.csdn.net/scythe666/article/details/51941622
svnadmin create  ------------------------------> git init
svn co                 ------------------------------> git clone
svn update          ------------------------------> git pull
svn add              ------------------------------> git add
svn commit        ------------------------------>  git add, git commit
svn status          ------------------------------>  git status
svn switch <branch>  ------------------------>  git checkout <branch>
svn merge <branch>  ------------------------>  git merge <branch>
svn revert <file>  ------------------------------> git checkout <file>
```
