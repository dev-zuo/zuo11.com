---
{
  "title": "点击外部关闭div - js阻止事件冒泡实例",
  "staticFileName": "click_external_close.html",
  "author": "guoqzuo",
  "createDate": "2019/11/09",
  "description": "点击外部关闭div，一般在做弹窗div时，需要做点击div外部关闭div的功能，怎么做到的呢？一句话总结：用一个父元素(铺满屏幕，绝对布局)包裹该div(绝对布局，水平垂直居中，固定宽高)，**父元素监听点击事件后移除div，子元素div监听点击后阻止事件冒泡**。这样就实现了，点击外部关闭div，点击内部区域不关不div。",
  "keywords": "点击div外部关闭div,js点击外部关闭div,点击外部关闭div,js阻止事件冒泡实例",
  "category": "JavaScript"
}
---

# 点击外部关闭div - js阻止事件冒泡实例

一般在做弹窗div时，需要做点击div外部关闭div的功能，怎么做到的呢？一句话总结：用一个父元素(铺满屏幕，绝对布局)包裹该div(绝对布局，水平垂直居中，固定宽高)，**父元素监听点击事件后移除div，子元素div监听点击后阻止事件冒泡**。这样就实现了，点击外部关闭div，点击内部区域不关不div。

来看测试demo

```html
<body>
  <button id="clickme">点击我弹窗对话框</button>
  <script>
    function showPopup(event) {
      let tempHtml = `
        <!-- 遮罩 -->
        <div class="mask" style="position:absolute;z-index:25555;top:0;bottom:0;width:100%;background:#888;opacity:0.5"></div>
        <!-- 内容区域-->
        <div id="popup-content-container" class="content-container" style="position:absolute;z-index:25556;top:0;bottom:0;width:100%">
          <div id="popup-content-main" class="content-main" style="position:absolute;top:50%;left:50%; transform: translate(-50%, -50%); width:300px;height:200px;background:#fff;border:1px solid #ddd;">
            我是弹窗盒子  
            <button id="closebtn">关闭</button>
          </div>
        </div>
      `

      // 创建div
      let div = document.createElement('div')
      div.setAttribute('id', 'popup-div')
      div.innerHTML = tempHtml

      // 挂载到dom
      document.body.appendChild(div)

      // 事件监听
      // 关闭弹窗
      document.getElementById('closebtn').onclick = function(e) {
        document.body.removeChild(div)  // 移除元素
      }

      // 点击外部关闭div 关键代码  
      document.getElementById('popup-content-container').onclick = function(e) {
        document.body.removeChild(div)  // 移除元素
      }
      document.getElementById('popup-content-main').onclick = function(e) {
        e.stopPropagation() 
      }
    }

    // 简单的弹窗框封装，只为测试点击外部关闭div
    document.getElementById('clickme').onclick = (event) => {
      showPopup(event)
    }
  </script>
</body>
```

完整demo地址：[点击外部关闭div - github](https://github.com/zuoxiaobai/fedemo/blob/master/src/DebugDemo/%E7%82%B9%E5%87%BB%E5%A4%96%E9%83%A8%E5%85%B3%E9%97%ADdiv/index.html)

在线演示地址: [点击外部关闭div - 在线演示](https://zuoxiaobai.github.io/fedemo/src/DebugDemo/点击外部关闭div/index.html)