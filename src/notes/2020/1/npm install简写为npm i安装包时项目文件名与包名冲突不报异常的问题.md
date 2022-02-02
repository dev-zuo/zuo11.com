---
{
  "title": "npm install简写为npm i安装包时项目文件名与包名冲突不报异常的问题",
  "staticFileName": "npm_i.html",
  "author": "guoqzuo",
  "createDate": "2020/01/14",
  "description": "最近在安装 npm install 时喜欢简写 npm i mysql2 -s 但发现执行后，并没有安装成功，在package.json里也没有任何记录。还没有报任何错误。",
  "keywords": "npm install简写为npm i注意事项,npm init -y注意事项",
  "category": "前端工程化"
}
---

# npm install简写为npm i安装包时项目文件名与包名冲突不报异常的问题

最近在安装 npm install 时喜欢简写 npm i mysql2 -s 但发现执行后，并没有安装成功，在package.json里也没有任何记录。还没有报任何错误。

```bash
# 把简写的命令换成 非简写 再执行
npm install mysql --save

# kevindeMacBook-Air:mysql2 kevin$ npm i mysql2 -s    # 简写执行后，没有任何信息
# kevindeMacBook-Air:mysql2 kevin$ npm install mysql2 -save # 这次就报错了，提示项目名称与包名称相同
# npm ERR! code ENOSELF
# npm ERR! Refusing to install package with name "mysql2" under a package
# npm ERR! also called "mysql2". Did you name your project the same
# npm ERR! as the dependency you're installing?
# npm ERR! 
# npm ERR! For more information, see:
# npm ERR!     <https://docs.npmjs.com/cli/install#limitations-of-npms-install-algorithm>

# 由于在初始化生成package.json时为了方便，直接使用了下面的命令
npm init -y  # 所有默认yes，生成的package.json里面，项目名称字段为当前文件夹名。

# 由于文件夹名就是 mysql2，与安装的包名重复了。将package.json里的name属性改一个名字即可
```

**总结: 项目名称不要与依赖的包名相同，当npm安装简写执行异常时，使用非简写方法再试试。**