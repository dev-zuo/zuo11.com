---
{
  "title": "pm2 process.yml You cannot define a mapping item when in a sequence",
  "staticFileName": "pm2_map.html",
  "author": "guoqzuo",
  "createDate": "2020/11/23",
  "description": "使用 pm2 运行 node 项目，`pm2 start process.yml` 后提示 You cannot define a mapping item when in a sequence，是 process.yml 配置文件的问题，修改下配置文件即可。将 `- script: app.js` 改为 `script: app.js` 重新运行就可以了",
  "keywords": "pm2 process.yml",
  "category": "前端工程化"
}
---
# pm2 process.yml You cannot define a mapping item when in a sequence
使用 pm2 运行 node 项目，`pm2 start process.yml` 后提示 You cannot define a mapping item when in a sequence，是 process.yml 配置文件的问题，修改下配置文件即可

```js
// cat process.yml
apps:
  - script: app.js 
  instances: 2
  watch: true
  env:
    NODE_ENV: production
```

将 `- script: app.js` 改为 `script: app.js` 重新运行就可以了

参考: [“You cannot define a mapping item when in a sequence” when running phpunit in symfony
 | Stack overflow](https://stackoverflow.com/questions/16482875/you-cannot-define-a-mapping-item-when-in-a-sequence-when-running-phpunit-in-sy)