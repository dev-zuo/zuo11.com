
console.log('您好，欢迎光临zuo11.com! ___')

// 实现tab间切换时，隐藏页面title改变功能
// JS高程3 Page Visibility API(页面可见性API)
// 参考：https://www.yuque.com/guoqzuo/js_es6/nocthb#0cf7a8b7
var title = document.title;
document.addEventListener('visibilitychange', function (event) {
  document.title =  document.hidden ? '快回来~ ' + title : title
  if (document.hidden) {
    // 做一些暂停操作
  } else {
    // 开始操作
  }
}, false)


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

// chrome 正常，safari不支持 TypeError: window.matchMedia('(prefers-color-scheme: dark)').addEventListener is not a function.
// 'window.matchMedia('(prefers-color-scheme: dark)').addEventListener' is undefined)
// window.matchMedia('(prefers-color-scheme: dark)').addListener 
// 暂时去掉
// window.matchMedia && console.log('Is dark mode: ', window.matchMedia('(prefers-color-scheme: dark)').matches)
// window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
//   console.log('dark mode change，已' + (event.matches ? '进入': '退出') + 'dark mode')
// })

// 页面滚动比例监听
// posTop 顶部类似阮一峰ES6网页的滚动进度条
// pos 右下角滚动百分比
// JS高程3 - UI事件 scroll事件
// https://www.yuque.com/guoqzuo/js_es6/elgng1#e38771e5
let htmlStr = `
  <div id="posTop" style="position: fixed;top:0;height:2px;background: var(--primary-bg);z-index:999999;"></div>
  <div id="posBack" style="cursor: pointer;display:none;position:fixed;bottom: 150px;right:20px;padding:10px;background: var(--primary-bg);color:white;width:40px;text-align: center;border-radius:5px;">回到顶部</div>
  <div id="pos" style="display:none;position:fixed;bottom: 100px;right:20px;padding:10px;background: var(--primary-bg);color:white;width:40px;text-align: center;border-radius:5px;"></div>
`
let eleNode = document.createElement('div')
eleNode.innerHTML = htmlStr
document.body.appendChild(eleNode)

eleNode.querySelector('#posBack').addEventListener('click', function(e) {
  document.documentElement.scrollTop = 0;
})
window.addEventListener('scroll', function(e) {
  let scrollTop = document.documentElement.scrollTop;
  let total = document.documentElement.scrollHeight - window.innerHeight;
  let persentage = parseInt(scrollTop/total*100);
  // console.log(scrollTop);  

  document.getElementById('pos').style.display = scrollTop === 0 ? 'none' : 'block';
  document.getElementById('pos').innerHTML = `${persentage}%`;
  // console.log(scrollTop)
  document.getElementById('posBack').style.display = scrollTop < 1200 ? 'none' : 'block';
  document.getElementById('posBack').innerHTML = `回到顶部`;
  document.getElementById('posTop').style.width = `${persentage}%`;
}, false)

// // 操作粘贴板
// // JS高程3 表单脚本 操作粘贴板
// // https://www.yuque.com/guoqzuo/js_es6/ubpn7k#8482e7c5
// document.body.oncopy = function(event) {
//   let articleDom = document.querySelector('article')
//   let articleTopDom = document.querySelector('.article-top')
//   let { target } = event 
//   // 事件不在article容器内，或者在article内但它是标题内容或时间区域的内容，不操作粘贴板
//   if (!articleDom.contains(target) || articleTopDom.contains(target) || target.tagName === 'H1') {
//     return 
//   }

//   // 获取copy的内容
//   // console.log(document.getSelection().toString());
//   // 在copy内容里加入信息
//   var msg = `
// -----------------------------
// 标题：${document.title}
// 链接：${location.href}
// 作者：guoqzuo (http://github.com/dev-zuo)
//   `
//   event.clipboardData.setData('text/plain', `${document.getSelection().toString()} ${msg}`);
//   event.preventDefault();
// };


// 公众号二维码显示在文章最底部
// function showQrcode() {
//   // 如果是文章分类、主页，不显示二维码
//   let filterList = ['左小白的技术日常', '文章分类 - 左小白的技术日常']
//   if (filterList.includes(document.title)) {
//     return
//   }
//   let articleDom = document.querySelector('article')
//   let div = document.createElement('div')
//   let img = document.createElement('img')

//   img.src = '/images/blog/web/qrcode.jpg'
//   img.style.height = "180px"
//   img.style.width = "180px"
//   // div.style.textAlign = 'center'
//   div.style.margin = "30px 0"

//   div.appendChild(img)
//   articleDom.appendChild(div)
// }

// showQrcode() // 执行



window.addEventListener('DOMContentLoaded', () => {
  const rightTags = document.querySelectorAll(".aside-wrap .category ul")
  console.log(rightTags)
  
  function getRandomColor() {
      return Math.random() * 200;
  }
  rightTags.forEach(item => {
      item.style.borderWidth = 0;
      item.style.background = '#fff' 
      item.style.color = `rgba(${getRandomColor()},${getRandomColor()},${getRandomColor()}, 1)`;
  })

  const outline = document.querySelector('.top')
  console.log(outline, outline.scrollHeight, outline.clientHeight, outline.scrollHeight > outline.clientHeight)
  if (outline.scrollHeight <= outline.clientHeight) {
    outline.style.overflowY = "auto"
  }
})
