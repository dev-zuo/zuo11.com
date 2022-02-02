---
{
  "title": "IE下dialog弹窗的滚动条滚动到底部时，触发了浏览器滚动条",
  "staticFileName": "ie_dialog_scroll.html",
  "author": "guoqzuo",
  "createDate": "2020/01/07",
  "description": "Element dialog弹窗的滚动条滚动到底部时，触发了浏览器滚动条同样都是有遮罩层，chrome都是OK的，但IE下会有问题。经过定位后发现，对于dialog使用了append-to-body属性的，都没问题。发现dialog显示时body上添加了一个 el-popup-parent--hidden的class, 设置了overflow为hidden，关了滚动条。对于没有append-to-body属性的dialog如果想修复有两种办法",
  "keywords": "IE下dialog弹窗的滚动条滚动到底部时，触发了浏览器滚动条",
  "category": "Vue"
}
---

# IE下dialog弹窗的滚动条滚动到底部时，触发了浏览器滚动条

Element dialog弹窗的滚动条滚动到底部时，触发了浏览器滚动条同样都是有遮罩层，chrome都是OK的，但IE下会有问题。经过定位后发现，对于dialog使用了append-to-body属性的，都没问题。发现dialog显示时body上添加了一个 el-popup-parent--hidden的class, 设置了overflow为hidden，关了滚动条。对于没有append-to-body属性的dialog如果想修复有两种办法：

1. 添加append-to-body，将dialog插入到body上
2. 不插入到body，根据el-popup-parent--hidden将有滚动条的子div设置overflow:hidden。

对于不是dialog，普通的弹窗，可以使用另一种思路：

监听鼠标滚动事件，使用Node.contains函数，判断鼠标是否在dialog范围内滚动，如果是，且到了底部，禁止其默认行为
append-to-body属性： Dialog 自身是否插入至 body 元素上。嵌套的 Dialog 必须指定该属性并赋值为 true

参考：[element dialog](https://element.eleme.cn/#/zh-CN/component/dialog)