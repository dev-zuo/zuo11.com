
# 静态博客生成系统(二)：markdown大纲提取以及页面滚动到对应区域时高亮处理

在考虑把个人博客站点静态化时，其中一个原因是markdown的大纲显示比较好，文章结构层次分明，可以更好的阅读。那怎么提取markdown文件的大纲数据，并呈现在网页上呢？下面来看看zuo-blog是怎么处理的。

## 提取markdown文件的大纲结构数据
知道将md转换为html文件的方法后，需要生成对应的大纲数据。其实在marked这个npm包里有对应的方法。来看看具体实现
```js
// 截取至 zuo-blog 源码
// 读取文件内容，通过maked转换为html字符串
const fileStr = fs.readFileSync(articlePath).toString() 
// let htmlStr = marked(fileStr)
let headers = marked.lexer(fileStr).filter(item => item.type === 'heading')
let outline = _generateOutline(headers) // 根据文件内容生成大纲数据

/**
 * @description 将md文件heading列表，转换为层级结构，用于生成大纲
 * @param {*} headers 原数据格式
 * [ { type: 'heading', depth: 1, text: '站点优化 页面打开较慢处理' },
 *  { type: 'heading', depth: 2, text: '代码托管' },
 *  { type: 'heading', depth: 2, text: '速度慢的原因分析' },
 *  { type: 'heading', depth: 3, text: '代码分析' },
 *  { type: 'heading', depth: 2, text: '速度测试' } ]
 * @returns  [ { text: 'xx', children: [ { text:'xxx', children:[...] } ] } ]
 */
function _generateOutline(headers) {
  let tree = []
  // 加try catch是为了如果中间出现跨越的层级问题，直接返回错误
  try {
    for (let i = 0, len = headers.length; i < len; i++) {
      let item = headers[i]
      // 如果是一级目录，直接挂载到tree下
      if (item.depth === 1) {
        tree.push(item)
      } else {
        let target
        // 如果是二级目录，挂载到当前tree最后一个元素的children上
        if (item.depth === 2) {
          target = tree.slice(-1)[0]
        } else {
          // 如果是3级+，遍历到最近一个层级的list
          let count = item.depth - 2
          target = tree.slice(-1)[0]
          while(count--) {
            target = target.children.slice(-1)[0]
          }
        }
        !target.children && (target.children = [])
        target.children.push(item)
      }
    }
  } catch(e) {
    console.log(e)
    let text = '目录生成异常，请确保目录层级从H1到H6是正常顺序，对于没有H1或目录中间断层的情况需要修正'
    return [ { text } ]
  }
  return tree
}

// 最开始比较low的写法
//  let tree = []
//   for (let i = 0, len = headers.length; i < len; i++) {
//     let item = headers[i]
//     if (item.depth === 1) {
//       tree.push(item)
//     } else if (item.depth === 2) {
//       // 找最近的一个1级目录，加入到其list里面
//       let level1 = tree[tree.length - 1]
//       !level1.list && (level1.list = [])
//       level1.list.push(item)
//     } else if (item.depth === 3) {
//       // 找最近的一个二级目录
//       let level1 =  tree[tree.length - 1]
//       let level2 = level1.list[level1.list.length - 1]
//       !level2.list && (level2.list = [])
//       level2.list.push(item)
//     } else if (item.depth === 4) {
//        // 找最近的一个三级目录
//        let level1 =  tree[tree.length - 1]
//        let level2 = level1.list[level1.list.length - 1]
//        let level3 = level2.list[level2.list.length - 1]
//        !level3.list && (level3.list = [])
//        level3.list.push(item)
//     } else if (item.depth === 5) {
//        // 找最近的一个4级目录
//        let level1 =  tree[tree.length - 1]
//        let level2 = level1.list[level1.list.length - 1]
//        let level3 = level2.list[level2.list.length - 1]
//        let level4 = level3.list[level3.list.length - 1]
//        !level4.list && (level4.list = [])
//        level4.list.push(item)
//     } else if (item.depth === 6) {
//       // 找最近的一个5级目录
//       let level1 =  tree[tree.length - 1]
//       let level2 = level1.list[level1.list.length - 1]
//       let level3 = level2.list[level2.list.length - 1]
//       let level4 = level3.list[level3.list.length - 1]
//       let level5 = level4.list[level4.list.length - 1]
//       !level5.list && (level5.list = [])
//       level5.list.push(item)
//     } else if (item.depth === 7) {
//       // 找最近的一个6级目录
//       let level1 =  tree[tree.length - 1]
//       let level2 = level1.list[level1.list.length - 1]
//       let level3 = level2.list[level2.list.length - 1]
//       let level4 = level3.list[level3.list.length - 1]
//       let level5 = level4.list[level4.list.length - 1]
//       let level6 = level5.list[level5.list.length - 1]
//       !level6.list && (level6.list = [])
//       level6.list.push(item)
//     } 
//   }
```

## 根据大纲数据生成html
在md文件显示的右侧，显示大纲html，将大纲JSON数据，生成html。注意：
1. ul 的padding-left要修改为0，而不是1em，因为发现语雀、gaylab对应的大纲实现里，focus时都有左侧border，菜单的padding-left根据其depth来生成，padding-left: (depth * 1)em
2. 这里大纲的每一个标题都没有使用a标签，不是走hash，而是直接通过点击js来滚动到对应id的位置。
```js
/**
  * @description 根据大纲数据(JSON)生成侧边栏html
  * @param {*} outline 
  */
_getAsideHtml(outline) {
  function handlerId(id) {
    let newId = id.toLowerCase().replace(/\s/g, '-')
    newId = newId.replace(/[\(\)\/\,\=\>\.\:\+]/g, '')
    return newId
  }
  let asideHtml = ''
  let backupOutline = JSON.parse(JSON.stringify(outline))
  for (let i = 0, len = outline.length; i < len; i++) {
    asideHtml += '<ul>'
    asideHtml += `<li><span class="ul-span" data-id="${handlerId(outline[i].text)}" style="padding-left:${outline[i].depth + 'em'}">${outline[i].text}<span></li>`
    if (outline[i].children) {
      asideHtml += getChildrenAsideHtml(outline[i].children)
    } 
    asideHtml += '</ul>'
  }

  function getChildrenAsideHtml(outline) {
    if (!outline || outline.length === 0) {
      return ''
    }
    let asideHtml = ''
    for (let i = 0, len = outline.length; i < len; i++) {
      asideHtml += '<ul>'
      asideHtml += `<li><span class="ul-span" data-id="${handlerId(outline[i].text)}" style="padding-left:${outline[i].depth + 'em'}">${outline[i].text}<span></li>`
      if (outline[i].children) {
        asideHtml += getChildrenAsideHtml(outline[i].children)
      } 
      asideHtml += '</ul>'
    }
    return asideHtml
  }
  return asideHtml
}
```

## 页面滚动到对应的大纲区域时怎么设置高亮
这里需要注意有两点：
1. 点击大纲里某个标题，页面滚动到对应区域
2. 滚动页面后自动改变大纲focus

这里的核心问题是: 怎么获取页面滚动到了哪个标题区域？

**每次一进入页面，将每个标题(h1,h2,..)的id，offsetTop(距离页面顶部距离)按顺序存到数组，监听页面滚动事件，根据document.documentElement.scrollTop的高度，来匹配之前的数组，就可以找到滚动到哪个标题了**

来看具体代码

```js
// 监听大纲的点击事件
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

window.onload = () => {
  // 如果是category，且有hash值，向上滚动 -70
  // 通过category.html#web进入页面时, 由于顶部fixed会有遮挡，fix方案
  let { pathname, hash } = location
  pathname.includes('category.html') && hash && document.documentElement.scrollBy(0, -70)

  // 将每个标题的高度，存到数组里，当滚动时，自动focus右侧大纲
  let nodes = document.getElementsByClassName('ul-span')
  for (let i = 0, len = nodes.length; i < len; i++) {
    // console.log(nodes.dataset)
    let id = nodes[i].dataset.id
    headersArr.push({id: id, offsetTop: document.getElementById(id).offsetTop})
  }
  // console.log(headersArr)

  window.onscroll = () => {
    focusAsideSpan()
    // debounce(focusAsideSpan)
  }
}

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
  for (let i = 0, len = headersArr.length; i < len; i++) {
    if (headersArr[i].offsetTop - scrollTop >= 0) {
      // 移除所有的active
      let nodes = document.getElementsByClassName('ul-span')
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
  // 如果走到这里，说明滚到底部了
  // 移除所有的active
  let nodes = document.getElementsByClassName('ul-span')
  for (let i = 0, len = nodes.length; i < len; i++) {
    nodes[i].classList.remove('active')
  }
  nodes[nodes.length - 1].classList.add('active')
}
```

## 大纲更好的实现方式
这里实现很复杂，对于非标准层级结构来说会有bug，**其实这里没必要做的这么麻烦，没必要将对象数组，转换为树形结构，只需要渲染时根据不同的depth设置不同的margin-left或padding-left，其值为 (depth - 1) * baseWidth基础间距，这样就可以很好的显示了，待0.3.0版本优化**