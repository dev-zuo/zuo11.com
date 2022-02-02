---
{
  "title": "git commit提交信息有误怎么修改",
  "staticFileName": "git_comit_amend.html",
  "author": "guoqzuo",
  "createDate": "2020/06/29",
  "description": "如果不小心提交了，但没有push，可以使用--amend参数来修改上一次的commit信息，命令如下：git commit --amend -m 'xxx', 注意，一般是修改没有push前的提交信息",
  "keywords": "git commit提交信息修改,commit备注信息有误怎么修改",
  "category": "运维部署与版本控制"
}
---

# git commit提交信息有误怎么修改

如果不小心提交了，但没有push，可以使用--amend参数来修改上一次的commit信息，命令如下

```js
git commit --amend -m 'xxx'
```

注意，一般是修改没有push前的提交信息