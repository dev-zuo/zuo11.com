
# uni-app开发需要了解的事情，uni-app开发体验怎么样

uni-app 读法为 u ni ai po，官网：[uni-app 官方文档](https://uniapp.dcloud.io/README)

## uni-app开发需要了解的事情
1. uni-app开发需要下载HBuilderX开发工具
2. 需要注册ucloud账号，打包安卓、iOS时需要有证书。安卓的证书免费，iOS证书需要花钱
3. uni开发和通常vue-cli搭的脚手架开发方式还是有一定区别的，更像是vue + 小程序开发的结合
4. 默认不支持 vue-router
5. 默认hello word打包安卓的apk包为 16M 左右

## uni-app开发体验怎么样？
如果你习惯开发vue，再来写uni，你会发现有很多问题
1. vue-router非常不方便、vant组件用不了
2. img标签到app上显示不了，需要使用image标签
3. 路由页面要在pages.json里设置，js跳转需要使用uni.navigator等内置API

感觉开发体验很差。但如果你开发过小程序，你会发现
1. template里UI组件部分基本类似于小程序开发
2. script、style方面基本和vue开发体验保持一致，uni提供了许多类似于小程序的内置api，比如跳转路由、通用请求等

综上：**uni开发就是小程序开发和vue开发的结合**，碰巧我在小程序开发和vue开发方面都有一定的开发经验，所以感觉还算得心应手，但对于没有开发过小程序的开发人员来讲，刚开始会觉得不怎么习惯。另外我个人不喜欢这种开发方式，有点乱，能少碰就尽量少碰，感觉整体代码很乱，强依赖uni框架与HBuilderX开发工具。