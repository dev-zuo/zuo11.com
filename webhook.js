const http = require('http')
const createHandler = require('github-webhook-handler')
const handler = createHandler({
  path:'/docker_deploy',
  secret:'docker_deploy_zuo10086'
})

function run_cmd(cmd, args, callback) {
  var spawn = require('child_process').spawn;
  var child = spawn(cmd, args);
  var resp = "";
  child.stdout.on('data', function (buffer) { resp += buffer.toString(); });
  child.stdout.on('end', function () { callback(resp) });
}

http.createServer((req,res) => {
  handler(req,res,err => {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(8800, () => {
  console.log('Webhook listen at 8800')
})

handler.on('error',err => {
  console.error('Error',err.message)
})

// 测试
// handler.on('*',event => {
//   // 可以接收所有事件，这里github里配置仅触发了push事件
//   console.log('Received * ', event.payload)
// })

handler.on('*', event =>  {
  console.log(event.payload)
  console.log('Received a push event for %s to %s', event.payload.repository.name, event.payload.ref);
  // 分支判断
  console.log(event.payload.ref)
  if(event.payload.ref === 'refs/heads/master'){
    console.log('deploy master..')
    run_cmd('sh', ['./deploy-master.sh'], function(text){ console.log(text) });
  }
})
