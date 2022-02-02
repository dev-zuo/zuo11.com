---
{
  "title": "怎么清除app内嵌H5的localStorage",
  "staticFileName": "clear_app_h5.html",
  "author": "guoqzuo",
  "createDate": "2019/12/27",
  "description": "当你在app内容H5中使用了localStorage又担心可能会超出5M的限制时，就要注意localStorage的清除了。那怎么才能清除app内嵌H5的localStorage呢？我做了一些测试",
  "keywords": "怎么清除app内嵌H5的localStorage",
  "category": "JavaScript"
}
---

# 怎么清除app内嵌H5的localStorage

当你在app内容H5中使用了localStorage又担心可能会超出5M的限制时，就要注意localStorage的清除了。那怎么才能清除app内嵌H5的localStorage呢？我做了一些测试

测试手机: iPhone8, 红米6，内嵌H5使用localStorage存储了一些数据，尝试清除

- 完全退出app 安卓、iOS都无法清除
- 退出登录 安卓、iOS都无法清除
- 使用app内置缓存清理功能 安卓、iOS都无法清除
- 使用系统的清除app数据方法：安卓清除app所有数据可以，iOS不可以(长按关机键，出现滑动关机，长按home键，直至滑动关机关闭)
- 使用H5内置的 localStorage.clear() 都可以清除，注意域名
- 删除app肯定可以清除

总结，**在不删除app以及使用H5内置的清除函数的情况下，安卓可以使用系统的清除app所有数据来清除，但iOS暂未发现清除的方法。**
