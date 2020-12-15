
// 侧边栏点击事件及滚动到对应区域自动focus

let asideDiv = document.getElementsByTagName('aside')[0]
asideDiv.onclick = (e) => {
  let id = e.target.dataset.id
  if (!id) return
  // 移除所有的active
  let nodes = document.getElementsByClassName('ul-span')
  for (let i = 0, len = nodes.length; i < len; i++) {
    nodes[i].classList.remove('active')
  }
  e.target.classList.add('active')
  document.getElementById(id).scrollIntoView(true)
  document.documentElement.scrollBy(0, -70)
}

let headersArr = []

// 通过category.html#web进入页面时, 由于顶部fixed会有遮挡，fix方案
window.addEventListener('load', () => {

  // 2500 执行是因为 google 广告为了优化加载体验，延迟2s加载，插入广告内容会对内容位置产生影响
  // setTimeout(() => {
    // 如果是category，且有hash值，向上滚动 -70
    let { pathname, hash } = location
    pathname.includes('category.html') && hash && document.documentElement.scrollBy(0, -70)

    // 将每个标题的高度，存到数组里，当滚动时，自动focus右侧大纲
    let nodes = document.getElementsByClassName('ul-span')
    for (let i = 0, len = nodes.length; i < len; i++) {
      // console.log(nodes.dataset)
      let id = nodes[i].dataset.id
      headersArr.push({ id: id, offsetTop: document.getElementById(id).offsetTop })
    }
    // console.log(headersArr)

    window.addEventListener('scroll', () => {
      focusAsideSpan()
      // debounce(focusAsideSpan)
    })
  // }, 2500);
})
// 效果不好，没有实时滚动的感觉，关闭防抖
// function debounce(method, context) {
//   clearTimeout(method.tId)
//   method.tId = setTimeout(function() {
//     method.call(context)
//   }, 100)
// }

function focusAsideSpan() {
  let scrollTop = document.documentElement.scrollTop
  let curNode
  let nodes = document.getElementsByClassName('ul-span')
  let gap = 70 // 误差
  // console.log(scrollTop)
  for (let i = 0, len = headersArr.length; i < len; i++) {
    if (scrollTop < headersArr[0].offsetTop) {
      for (let i = 0, len = nodes.length; i < len; i++) {
        nodes[i].classList.remove('active')
      }
      nodes[0].classList.add('active')
    } else if (i === len - 1) {
      for (let i = 0, len = nodes.length; i < len; i++) {
        nodes[i].classList.remove('active')
      }
      nodes[nodes.length - 1].classList.add('active')
    } else if (scrollTop >= (headersArr[i].offsetTop - gap) && scrollTop < (headersArr[i + 1].offsetTop - gap)) {
      // 移除所有的active
      for (let j = 0, len = nodes.length; j < len; j++) {
        if (headersArr[i].id === nodes[j].dataset.id) {
          nodes[j].classList.remove('active')
          nodes[j].classList.add('active')
        } else {
          nodes[j].classList.remove('active')
        }
      }
      return
    }
  }
}

// 返回首页
function gotoIndex() {
  window.location.href = "/"
}
