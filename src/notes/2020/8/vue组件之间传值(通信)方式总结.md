
# vue组件之间传值(通信)方式总结

在vue中一般组件之间传值是必须要理解的，下面来总结下组件间传值的方法，分为以下几种情况
1. 父组件 => 子组件
2. 子组件 => 父组件
3. 兄弟组件
4. 父组件 => 子组件
5. 祖先和后代之间
6. 任意两个组件之间

## 父组件 => 子组件
- props

  ```js
  // child
  props: { msg: string }

  // parent
  <hello-word msg="xxxx" />
  ```

- 引用refs
  ```js
  // parent
  <hellow-word ref="hw" />

  this.$refs.hw.xx
  ```

## 子组件 => 父组件
```js
// child
this.$emit('add', 'val')

// parent
<hello-word @add="cartAdd($event)" />
```

## 兄弟组件
通过共同的祖辈组件(`$parent`或`$root`) 利用vue内置的发布订阅模式功能
```js
// brother1
this.$parent.$on('foo', handle)
// brother2
this.$parent.$emit('foo')
```

## 祖先和后代之间

### provide / inject 祖先给后代传值
```js
// 祖先组件
provide() {
    return { foo: 'foo'}  // 要像data一样，用函数包裹
}

// 后代组件
inject: ['foo']
```
  
### dispatch：后代给祖先传值
```js
function dispatch(eventName, data) {
    let parent = this.$parent
    // 只要还存在父元素就继续往上找
    while (parent) {
        // 父元素用$emit触发
        parent.$emit(eventName, data)
        // 继续传给上一层父元素
        parent = parent.$parent
    }
}
```

## 任意两个组件之间：事件总线(Bus)或vuex
```js
// vue组件自身实现了发布订阅模式
// Bus.js
export default new Vue()

// A组件
import Bus from 'Bus'
Bus.$on('foo', handle)
// B组件
import Bus from 'Bus'
Bus.$emit('foo', 'val')
```