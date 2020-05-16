
# IE下dialog弹窗全屏后列表横向滚动卡顿的问题

全屏后添加了一个名为 `is-fullscreen` 的class，发现把对应的overflow:auto去掉后，就不会卡顿。去掉其实就是将overflow设置为默认值visible，如果子组件高度超出范围，将is-fullscreen设置的height 100% 改为 auto。另一种方法是将table的z-index改为3000(相对dialog比较高的一个层级)，这样IE下就不会卡顿了。

overflow相关值描述

值 | 描述
--- | ---
visible	| 默认值。内容不会被修剪，会呈现在元素框之外。
hidden	| 内容会被修剪，并且其余内容是不可见的。
scroll	| 内容会被修剪，但是浏览器会显示滚动条以便查看其余的内容。
auto	| 如果内容被修剪，则浏览器会显示滚动条以便查看其余的内容。
inherit	| 规定应该从父元素继承 overflow 属性的值。

参考：[CSS overflow 属性](https://www.w3school.com.cn/cssref/pr_pos_overflow.asp)