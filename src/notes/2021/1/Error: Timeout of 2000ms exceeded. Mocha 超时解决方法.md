# Error: Timeout of 2000ms exceeded. Mocha 超时解决方法
在 mocha 中，默认每个测试时间限制为 2s，如果超过两秒就会抛出异常。对于大于 2s 的异步任务可以使用 mocha 上下文的 timeout() 方法手动指定超时时间。注意不要使用箭头函数，否则无法调用 this.timeout() 方法。
- `this.timeout(5000)` 将超时时间设置为 5s，这样就不会有 2s 的限制了
- `this.timeout(1000)` 对于性能要求较高的场景，可以限制超时时间为 1s

```js
// 耗时 3s 的异步任务
function asyncOptPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (1 === 2) {
        resolve()
      } else {
        reject('不相等') // 也可以是 reject(new Error('不相等'))
      }
    }, 3000)
  })
}

describe('异步测试', function () {
  it('asyncOpt 正确执行应该返回 true', async function() {
    this.timeout(5000); // 设置超时时间为 5s
    // this.timeout(1000); 
    await asyncOptPromise()
  })
})
```