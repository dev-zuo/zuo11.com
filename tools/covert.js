const fs = require('fs')

/**
 * @description zuo-blog v0.7.0 => v1.0.0 配置文件数据转换
 */
class ConfigDataConvert {
  constructor() {
    this.notesPath = './src/notes'
    this.configFileList = [] // 配置文件路径数组
    this.successList = [] // 成功处理文件路径数组
    this.invalidList = [] // 失败处理文件数组
  }

  covert() {
    // 遍历配置文件，修改文件
    fs.readdirSync(this.notesPath).sort(this.numSort).forEach(year => {
      if (year.startsWith('.')) return // 过滤掉隐藏文件
      const yearPath = `${this.notesPath}/${year}` // './src/notes/2019'

      // 遍历该年份下月分目录[ '1', '2' ]
      fs.readdirSync(yearPath).sort(this.numSort).forEach(async month => {
        if (month.startsWith('.')) return // 过滤掉隐藏文件
        const monthPath = `${yearPath}/${month}` // './src/notes/2019/1'
        const monthCfgPath = `${monthPath}/_info.json` // 配置文件
        // 如果配置文件存在
        if (fs.existsSync(monthCfgPath)) {
          this.configFileList.push(monthCfgPath)
          // 根据配置文件遍历md文件
          JSON.parse(fs.readFileSync(monthCfgPath)).forEach(articleConfig => {
            const articlePath = `${monthPath}/${articleConfig.source}` // './src/notes/2019/1/xxx.md'
            this.handlerMdFile(articleConfig, articlePath, year, month)
            this.successList.push(articlePath)
          })
          // 删除配置文件
          fs.rmSync(monthCfgPath)
        }
      })
    })

    const { configFileList, successList, invalidList } = this
    const covertLog = { 
      configFileList, 
      successList, 
      invalidList, 
      configFileCount: configFileList.length, 
      successFileCount: successList.length
    }
    fs.writeFileSync('covertLog.json', JSON.stringify(covertLog, null, 2), (err) => {
      console.log(err)
    })
  }

  /**
   * @description 处理文件
   * @param {*} articleConfig 单个文件的配置信息 
   * @param {*} articlePath 单个文件的路径
   * @param {*} year 年份
   * @param {*} month 月份
   */
  handlerMdFile(articleConfig, articlePath, year, month) {
    // 先拿一个文件做测试 2017/1/404及500跳转处理
    // if (!articleConfig.source.includes('404及500跳转处理')) {
    //   return
    // }

    // 读文件内容
    const fileStr = fs.readFileSync(articlePath).toString()

    /**
     * 1. 将 source 内容去掉 .md 并将字段重命名为 title
     * 2. 将 json 配置文件当做 front-matter，追加到文件内容中
     * ---
     * front-matter 配置文件 json 格式
     * ---
     * 文件内容
     */
    // 新增的 title 要放在第一位，只能新增一个中间变量
    let newConfig = {
      title: articleConfig.source.split('.md')[0],
      ...articleConfig
    }
    Reflect.deleteProperty(newConfig, 'source')
    const configStr = JSON.stringify(newConfig, null, 2)
    const newFileContent = `---\n${configStr}\n---\n${fileStr}`

    // 写入文件
    fs.writeFileSync(articlePath, newFileContent)
  }

  // fs.readdirSync 读取的文件名按字符串来排序的，由于是年月，按数字排序
  numSort(a, b) {
    return a - b
  }
}

const configDataConvert = new ConfigDataConvert()
configDataConvert.covert()