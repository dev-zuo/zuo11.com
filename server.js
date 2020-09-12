
const Koa = require('koa')
const app = new Koa()

// const path = require('path')
// console.log(path.resolve(__dirname, './dist'))
// /Users/guoqzuo/Desktop/gitclone/zuo11.com/dist

app.use(require('koa-static')(__dirname + '/dist'))

app.listen(3001, () => {
  console.log('zuo11.com local server listen on 3001')
})