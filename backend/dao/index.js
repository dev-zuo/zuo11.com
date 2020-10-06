
const Sequelize = require('sequelize')

class Dao {
  constructor() {
    this.sequelize = ''
    this.IBD_CONFIG = null
    this.init()
  }

  // 初始化数据库
  async init() {
    try {
      // 建立连接
      // 参数分别为: database, username, password, config
      this.sequelize = new Sequelize('ibd', 'root', '1234567Abc,.', {
        host: 'mysql-db', // docker从一个镜像访问里另一个镜像(mysql)
        // host: 'localhost',
        // host: '192.168.112.1',
        dialect: 'mysql', // 'mysql' | 'mariadb' | 'postgres' | 'mssql' 之一 
      })

      // 测试连接，使用 .authenticate() 函数来测试连接
      await this.sequelize.authenticate() // 如果连接异常，会走catch的逻辑

      this.createConfigModel()
    } catch (e) {
      console.log(e)
    }
  }

  // 创建ibd_config model
  async createConfigModel() {
    // 创建表模型
    // public define(modelName: string, attributes: Object, options: Object): Model
    // 使用下面的模型创建表时，会默认加上3个字段 主键id, createdAt, updatedAt
    const IBD_CONFIG = this.sequelize.define('ibd_config', {
      id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true },
      auditMark: { type: Sequelize.INTEGER, allowNull: false },
    }, {
      // conifg
      timestamps: false, // 默认值为true，如果为true会加上createdAt, updatedAt字段
      freezeTableName: true // 默认为false, 默认情况下会为表名添加一个s，即 fruits，设置为true可以阻止这一默认行为
    })
    // 创建表：将模型同步到数据库
    let ret = await IBD_CONFIG.sync() // 如果表不存在则同步，否则不处理
    this.IBD_CONFIG = IBD_CONFIG
  }

  // 从数据库获取config数据
  async getIbdConfig() {
    // 查询所有数据（查）
    let ret = await this.IBD_CONFIG.findAll()
    // console.log(ret.length)
    // console.log(JSON.stringify(ret)) // 如果不stringify，打印的都是对象
    return ret[0]
  }

  // 修改config的值
  async setIbdConfig(auditMark, id) {
    try {
      let ret = await this.IBD_CONFIG.update({ auditMark }, {
        where: {
          id
        }
      })
      console.log(ret)
      return ret[0]
    } catch (e) {
      console.log(e.message)
    }
  }
}

module.exports = Dao