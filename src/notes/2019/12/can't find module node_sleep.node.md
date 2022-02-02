---
{
  "title": "can't find module node_sleep.node",
  "staticFileName": "node_sleep_module.html",
  "author": "guoqzuo",
  "createDate": "2019/12/04",
  "description": "can't find module './build/Release/node_sleep.node'，看了具体报错是sleep包引起的，到node_modules里面对应的目录查看，发现根本就没有build目录，解决方法：之前的版本是5.2.4，修改package.json将版本改为5.1.1，让后删除package-lock.json 再npm install就ok 了",
  "keywords": "can't find module './build/Release/node_sleep.node'",
  "category": "前端工程化"
}
---

# can't find module './build/Release/node_sleep.node'

看了具体报错是sleep包引起的，到node_modules里面对应的目录查看，发现根本就没有build目录

**解决方法：之前的版本是5.2.4，修改package.json将版本改为5.1.1，让后删除package-lock.json 再npm install就ok 了**