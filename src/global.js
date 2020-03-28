
console.log('您好，欢迎光临zuo11.com!')

// 实现tab间切换时，隐藏页面title改变功能
// JS高程3 Page Visibility API(页面可见性API)
// 参考：https://www.yuque.com/guoqzuo/js_es6/nocthb#0cf7a8b7
// var title = document.title;
// document.addEventListener('visibilitychange', function (event) {
//   document.title =  document.hidden ? '-> ' + title : title
//   if (document.hidden) {
//     // 做一些暂停操作
//   } else {
//     // 开始操作
//   }
// }, false)


// 当网络状态发生改变时（有网 => 无网，无网 => 有网）,提示信息
// JS高程3 离线检测
// 参考: https://www.yuque.com/guoqzuo/js_es6/sp2k81#244d3090
let errorMsgNode // 用来移除错误信息节点
window.ononline = function(event) {
  errorMsgNode && document.body.removeChild(errorMsgNode)
  message('success', '网络已连接', 3000)
}
window.onoffline = function(event) {
  message('error', '网络已断开')
}
/**
 * 为了显示网络信息，专门写了个小tips提示函数，在顶部显示信息
 * @param {}} type 文字颜色 error 为红色，其他为绿色
 * @param {*} msg 显示信息
 * @param {*} sec 如果有传入时间，sec秒后关闭提示
 */
function message(type, msg, sec) {
  let color = type === 'error' ? 'red' : 'green'
  let cssArr = [
    'position:fixed;top:8px;left:50%;z-index:9999999;',
    'transform:translateX(-50%);padding:5px 10px;background:#fff;'
  ]
  let htmlStr = `
    <div style="${cssArr.join('')}color:${color}">${msg}</di>
  `
  let node = document.createElement('div')
  node.innerHTML = htmlStr
  document.body.appendChild(node)
  if (Number.isInteger(sec) && sec > 0) {
    setTimeout(() => {
      document.body.removeChild(node)
    }, sec)
  } else {
    // 错误信息，一直提示，需要设置到变量里，等网络连接上时移除
    errorMsgNode = node
  }
}

window.matchMedia && console.log('Is dark mode: ', window.matchMedia('(prefers-color-scheme: dark)').matches)
window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
  console.log('dark mode change，已' + (event.matches ? '进入': '退出') + 'dark mode')
})

// 页面滚动比例监听
// posTop 顶部类似阮一峰ES6网页的滚动进度条
// pos 右下角滚动百分比
// JS高程3 - UI事件 scroll事件
// https://www.yuque.com/guoqzuo/js_es6/elgng1#e38771e5
let htmlStr = `
  <div id="posTop" style="position: fixed;top:0;height:2px;background: #25b864;z-index:999999;"></div>
  <div id="pos" style="display:none;position:fixed;bottom: 100px;right:20px;padding:10px;background: #25b864;color:white;width:40px;text-align: center;border-radius:5px;"></div>
`
let eleNode = document.createElement('div')
eleNode.innerHTML = htmlStr
document.body.appendChild(eleNode)

window.addEventListener('scroll', function(e) {
  let scrollTop = document.documentElement.scrollTop;
  let total = document.documentElement.scrollHeight - window.innerHeight;
  let persentage = parseInt(scrollTop/total*100);
  // console.log(scrollTop);  

  document.getElementById('pos').style.display = scrollTop === 0 ? 'none' : 'block';
  document.getElementById('pos').innerHTML = `${persentage}%`;
  document.getElementById('posTop').style.width = `${persentage}%`;
}, false)


// 操作粘贴板
// JS高程3 表单脚本 操作粘贴板
// https://www.yuque.com/guoqzuo/js_es6/ubpn7k#8482e7c5
document.body.oncopy = function(event) {
  console.log('copy', event);
  // 获取copy的内容
  // console.log(document.getSelection().toString());
  // 在copy内容里加入信息
  var msg = `
-----------------------------
标题：${document.title}
链接：${location.href}
作者：guoqzuo (http://github/zuoxiaobai)
  `
  event.clipboardData.setData('text/plain', `${document.getSelection().toString()} ${msg}`);
  event.preventDefault();
};