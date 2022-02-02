---
{
  "title": "uni动态修改导航栏按钮文案",
  "staticFileName": "uni_eidt_nav.html",
  "author": "guoqzuo",
  "createDate": "2020/08/10",
  "description": "一般uni导航栏按钮是在配置文件里面写的，那怎么动态的修改配置呢？先来看导航栏按钮配置文件，导航栏右侧有一个按钮 编辑",
  "keywords": "uni动态修改导航栏按钮、文案",
  "category": "移动端混合开发"
}
---
# uni动态修改导航栏按钮文案
一般uni导航栏按钮是在配置文件里面写的，那怎么动态的修改配置呢？先来看导航栏按钮配置文件，导航栏右侧有一个按钮 "编辑"
```js
{
  "path": "pages/cart/cart",
  "style": {
    "navigationBarTitleText": "标题",
    "app-plus": {
      "autoBackButton": false,
      "titleNView": {
        // 这里没有用搜索栏
        // "searchInput": {
        //     "align": "center",
        //     "backgroundColor": "#eee",
        //     "borderRadius": "5px", // 只能用px作单位
        //     "placeholder": "请输入内容",
        //     "placeholderColor": "#ccc"
        // },
        "buttons": [{
            "color": "#222222",
            "colorPressed": "#eee",
            "float": "right",
            "fontSize": "14px",
            "width": "45px",
            "text": "编辑" // 字体图标\u 开头，加上字体图标unicode后面四位
        }]
      }
    }
  }
}
```
再来看看对应的js
```js
export default {
  // 导航栏右侧按钮  编辑 => 完成
  // 点击编辑或完成，会触发该函数
  onNavigationBarButtonTap(e) {
    let isApp = !!this.$mp.page.$getAppWebview
    if (isApp) {
      // 如果是app场景
      this.changeNavButtonText()
    } else {
      // 如果是H5
      let btnEle = document.querySelectorAll('.uni-page-head-btn i')[1]
      let curText = btnEle.textContent
      btnEle.textContent = curText === '完成' ? '编辑' : '完成'
      this.isEdit = curText === '编辑'
    }
  },
  methods: {
     // 修改导航栏标题
    changeNavButtonText(text) {
      let webview = this.$mp.page.$getAppWebview()
      let tn = webview.getStyle().titleNView;
      let curText = webview.getStyle().titleNView.buttons[0].text

      webview.setTitleNViewButtonStyle(0, {  
        text: curText === '完成' ? '编辑' : '完成'
      }); 
      this.isEdit = curText === '编辑' 
      // 用于真机调试时 log
      // uni.showToast({
      //   title: curText + '/' + this.isEdit + '/' + uni.getSystemInfoSync().platform,
      //   icon: 'none',
      //   image: '',
      //   duration: 1500,
      //   mask: false,
      // })
    }
  }
}
```