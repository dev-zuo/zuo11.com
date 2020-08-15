
# vue里简单的总线(bus)发布订阅模式实现

在vue组件内部有实现发布订阅模式，类似于bus，在兄弟组件或任意两组件之间传值可以使用这种方法，代码如下

## vue内部发布订阅模式使用场景
```js
// 兄弟组件之间
// brother1
this.$parent.$on('foo', handle)
// brother2
this.$parent.$emit('foo') 


// 任意两组间之间
// Bus.js
export default new Vue()

// A组件
import Bus from 'Bus'
Bus.$on('foo', handle)
// B组件
import Bus from 'Bus'
Bus.$emit('foo', 'val') 
```

## 自己实现一个发布订阅
那内部是怎么实现的呢？我们先写一个调用demo，如下
```js
// main.js
import Bus from 'Bus.js'
Vue.prototype.$bus = new Bus()

// child1
this.$bus.$on('foo', handle)
// child2
this.$bus.$emit('foo')
```
再来写Bus.js实现简单的发布订阅
```js
class Bus {
  constructor() {
    this.callbacks = {}
  }
  $on(name, fn) {
    // 如果之前没有监听，就创建一个新的数组
    !this.callbacks[name] && (this.callbacks[name] = [])
    typeof fn === 'function' && this.callbacks[name].push(fn)
  }
  $emit(name, args) {
    if (this.callbacks[name]) {
      this.callbacks[name].forEach(cb => cb(args))
    }
  }
  $off(name, fn) {
    if (this.callbacks[name]) {
      // 如果没传fn， 移除所有，如果传了移除对应的函数，这里只做移除素有的
      this.callbacks[name] = undefined // 讲思路
    }
  } 
} 

export default Bus
```