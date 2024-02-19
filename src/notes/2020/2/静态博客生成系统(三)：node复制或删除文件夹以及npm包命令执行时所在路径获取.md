---
{
  "title": "静态博客生成系统(三)：node复制或删除文件夹以及npm包命令执行时所在路径获取",
  "staticFileName": "zuoblog_3_file.html",
  "author": "guoqzuo",
  "createDate": "2020/02/02",
  "description": "静态博客生成系统，需要把src目录下的源文件生成dist目录下的可部署的文件，对于资源文件需要从src下直接拷贝过去。这就涉及怎么用node复制或删除文件夹了，另外我们在使用zuoblog init执行构建生成时，需要知道命令执行时所在的路径，下面来看看",
  "keywords": "node复制或删除文件夹,npm包命令执行时所在路径获取",
  "category": "前端工程化"
}
---

# 静态博客生成系统(三)：node复制或删除文件夹以及npm包命令执行时所在路径获取

静态博客生成系统，需要把src目录下的源文件生成dist目录下的可部署的文件，对于资源文件需要从src下直接拷贝过去。这就涉及怎么用node复制或删除文件夹了，另外我们在使用zuoblog init执行构建生成时，需要知道命令执行时所在的路径，下面来看看

## node复制或删除文件夹
node只提供了复制文件、删除空文件夹的方法，如果需要复制文件夹或删除文件夹，就需要自己写方法了，在网上找了个不错的实现，稍微再次封装了下，来看[源码 | github](https://github.com/dev-zuo/zuo-blog/blob/master/vendor/utils/FSExtend.js)
```js
const path = require('path')
const fs = require('fs')

/**
 * node 在操作文件夹时会比较麻烦，需要自己封装方法，将网上的方法修改了下路径方面的问题
 * https://segmentfault.com/a/1190000020040889
 */
class FSExtend {
  /**
   * 删除文件夹
   */
  static deleteFolder(delPath) {
    // console.log('pre delPath', delPath)
    // delPath = path.join(__dirname, delPath) // 这个是当前文件的路径
    // process.cwd()  当前命令执行时所在的目录
    delPath = path.join(process.cwd(), delPath)
    // console.log('delPath', delPath)

    try {
        if (fs.existsSync(delPath)) {
            const delFn = function (address) {
                const files = fs.readdirSync(address)
                for (let i = 0; i < files.length; i++) {
                    const dirPath = path.join(address, files[i])
                    if (fs.statSync(dirPath).isDirectory()) {
                        delFn(dirPath)
                    } else {
                        FSExtend.deleteFile(dirPath)
                    }
                }
                /**
                * @des 只能删空文件夹
                */
                fs.rmdirSync(address);
            }
            delFn(delPath);
        } else {
            // console.log('需要删除的文件不存在，不用删除', delPath);
        }
    } catch (error) {
        console.log('del folder error', error);
    }
  }

  /**
   * @description 删除文件
   * @param { delPath：String } （需要删除文件的地址）
   */
  static deleteFile(delPath) {
    try {
        /**
         * @des 判断文件或文件夹是否存在
         */
        if (fs.existsSync(delPath)) {
            fs.unlinkSync(delPath);
        } else {
            console.log('inexistence path：', delPath);
        }
    } catch (error) {
        console.log('del error', error);
    }
  }

  /**
   * @description 负责文件夹
   */
  static copyFolder(copiedPath, resultPath) {
    // copiedPath = path.join(process.cwd(), copiedPath)
    // resultPath = path.join(process.cwd(), resultPath)

    function createDir (dirPath) {
        fs.mkdirSync(dirPath)        
    }

    if (fs.existsSync(copiedPath)) {
        createDir(resultPath)
        /**
         * @des 方式一：利用子进程操作命令行方式
         */
        // child_process.spawn('cp', ['-r', copiedPath, resultPath])

        /**
         * @des 方式二：
         */
        const files = fs.readdirSync(copiedPath, { withFileTypes: true });
        for (let i = 0; i < files.length; i++) {
            const cf = files[i]
            const ccp = path.join(copiedPath, cf.name)
            const crp = path.join(resultPath, cf.name)  
            if (cf.isFile()) {
                /**
                 * @des 创建文件,使用流的形式可以读写大文件
                 */
                const readStream = fs.createReadStream(ccp)
                const writeStream = fs.createWriteStream(crp)
                readStream.pipe(writeStream)
            } else {
                try {
                    /**
                     * @des 判断读(R_OK | W_OK)写权限
                     */
                    fs.accessSync(path.join(crp, '..'), fs.constants.W_OK)
                    FSExtend.copyFolder(ccp, crp)
                } catch (error) {
                    console.log('folder write error:', error);
                }

            }
        }
    } else {
        console.log('do not exist path: ', copiedPath);
    }
  }
}

module.exports = FSExtend
```

## zuoblog init命令执行时所在的路径获取
在写 zuoblog init 命令执行的操作时，需要操作当前命令执行时所在的目录，而__dirname是程序文件的路径。这就需要用到 process.cwd()了，可以获取到当前命令执行时所在的目录
```js
const path = require('path')
// delPath = path.join(__dirname, delPath) // 这个是当前文件的路径
// process.cwd()  当前命令执行时所在的目录
// 在每次构建前，先删除当前路径下的dist目录，下面是获取对应路径的方法
delPath = path.join(process.cwd(), delPath)
```
