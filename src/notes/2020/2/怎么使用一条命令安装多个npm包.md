
# 怎么使用一条命令安装多个npm包

在安装npm包时，我们一般使用 npm install xx --save，但对于一次需要安装多个包的情况，怎么用一条命令来安装呢？下面来看看

```bash
# 安装多个包koa、koa-router、koa-static 
npm install koa koa-router koa-static --save
# npm notice created a lockfile as package-lock.json. You should commit this file.
# npm WARN upload@1.0.0 No description
# npm WARN upload@1.0.0 No repository field.

# + koa-router@8.0.8
# + koa@2.11.0
# + koa-static@5.0.0
# added 61 packages from 29 contributors in 22.996s
# kevindeMacBook-Air:upload上传进度 kevin$
```

如果需要卸载已经写入package.json里的npm包

```bash
npm uninstall 对应的包 --save
```

