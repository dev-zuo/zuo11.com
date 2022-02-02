---
{
  "title": "Object.observe()与Proxy",
  "staticFileName": "observe_proxy.html",
  "author": "guoqzuo",
  "createDate": "2020/08/02",
  "description": "Object.observe()是js实现观察者设计模式的一个API，现在已废弃，由Proxy取代，但Proxy不支持IE。它用于异步地监视一个对象的修改。当对象属性被修改时，方法的回调函数会提供一个有序的修改流。在vue2.0的双向绑定的实现里，会遍历data对象，通过建立对应的getter/setter访问器属性来追踪属性变化。Vue 3.0里已使用Proxy来追踪属性变化",
  "keywords": "observe与proxy",
  "category": "JavaScript"
}
---
# Object.observe()与Proxy
Object.observe()是js实现观察者设计模式的一个API，现在已废弃，由Proxy取代，但Proxy不支持IE。

它用于异步地监视一个对象的修改。当对象属性被修改时，方法的回调函数会提供一个有序的修改流。

在vue2.0的双向绑定的实现里，会遍历data对象，通过建立对应的getter/setter访问器属性来追踪属性变化。Vue 3.0里已使用Proxy来追踪属性变化

```js
// 截取至vue 3.0相关代码
// https://github.com/vuejs/vue-next/blob/40bdd51bf5ec24b8e3faab3e1cb4d91b076e456a/packages/reactivity/src/reactive.ts#L99
function createReactiveObject(
  target: unknown,
  toProxy: WeakMap<any, any>,
  toRaw: WeakMap<any, any>,
  baseHandlers: ProxyHandler<any>,
  collectionHandlers: ProxyHandler<any>
) {
  if (!isObject(target)) {
    if (__DEV__) {
      console.warn(`value cannot be made reactive: ${String(target)}`)
    }
    return target
  }
  // target already has corresponding Proxy
  let observed = toProxy.get(target)
  if (observed !== void 0) {
    return observed
  }
  // target is already a Proxy
  if (toRaw.has(target)) {
    return target
  }
  // only a whitelist of value types can be observed.
  if (!canObserve(target)) {
    return target
  }
  const handlers = collectionTypes.has(target.constructor)
    ? collectionHandlers
    : baseHandlers
  observed = new Proxy(target, handlers)
  toProxy.set(target, observed)
  toRaw.set(observed, target)
  return observed
}
```

- [Object.observe() | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/observe)
- [Proxy | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
- [vue2.0 深入响应式原理 | vue官网](https://cn.vuejs.org/v2/guide/reactivity.html)
- [vue3.0 数据响应式相关源码 | github ](https://github.com/vuejs/vue-next/tree/40bdd51bf5ec24b8e3faab3e1cb4d91b076e456a/packages/reactivity)

