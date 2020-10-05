
const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const Dao = require('./dao/index')

const app = new Koa()
const router = new Router()
const dao = new Dao()

app.use(require('koa-bodyparser')())

app.use(static(__dirname + '/public'))

router.get('/ibd/fooddaily/info', async (ctx, next) => {
  try {
    let res = await dao.getIbdConfig()
    let data = JSON.parse(JSON.stringify(res))

    ctx.body = {
      code: 200,
      msg: '成功',
      data
    }
  } catch(e) {
    ctx.body = {
      code: 1001,
      msg: e.message,
      data: {}
    }
  }
})

router.put('/ibd/fooddaily/info', async (ctx, next) => {
  let  { id, auditMark } = ctx.request.body
  console.log(id, auditMark)

  try {
    let res = await dao.setIbdConfig(auditMark, id)
    console.log(res)
    let data = JSON.parse(JSON.stringify(res))

    ctx.body = {
      code: 200,
      msg: '成功',
      data
    }
  } catch(e) {
    ctx.body = {
      code: 1002,
      msg: e.message,
      data: {}
    }
  }
})

router.get('/', (ctx, next) => {
  ctx.body = 'Forbidden'
})

app.use(router.routes())


app.listen(8700, () => {
  console.log('服务已开启，在8700端口')
})


// const Koa = require('koa')
// const Router = require('koa-router')
// const app = new Koa()
// const router = new Router()

// router.get('/', (ctx, next) => {
//   ctx.body = 'Forbidden'
// })

// app.use(router.routes())

// app.listen(8700, () => {
//   console.log('服务已开启，在8700端口')
// })