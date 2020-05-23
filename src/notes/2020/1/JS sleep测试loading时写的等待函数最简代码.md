
# JS sleep 测试loading时写的等待函数最简代码

一般想模拟延时，测试loading效果时，会写一个等待函数，怎么最简单方便呢？下面来研究下
```js
// 一般写法
const delay = function (msec){
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, msec)
  }) 
}
await delay(2000)
console.log('test')

// 使用箭头函数简写
const delay = (msec) => new Promise(resolve => setTimeout(() => resolve(), msec))
await delay(2000)
console.log('test')

// 舍弃函数封装与自定义时长，最精简写法
(async () => {
  await new Promise(r => setTimeout(() => r(), 2000)) // 一行代码
  console.log('test')
})()

```

在vue中的实际应用

```js
vue.prototype.$mydelay = (t) => new Promise(r => setTimeout(() => r(), t))
// 在vue中间中调用
await this.$mydelay(2000)
```