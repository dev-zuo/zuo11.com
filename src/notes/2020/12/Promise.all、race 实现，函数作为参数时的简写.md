---
{
  "title": "Promise.all、race 实现，函数作为参数时的简写",
  "staticFileName": "promise_all_abbr.html",
  "author": "guoqzuo",
  "createDate": "2020/12/15",
  "description": "一般函数当参数时，有一种情况可以直接简写，例子如下 func(data => { console.log(data) })，可以简写为 func(console.log) 下面来看看在 Promise.all 和 Promise.race 实现中的应用",
  "keywords": "Promise.all实现,Promise.race实现,函数参数简写",
  "category": "JavaScript"
}
---
# Promise.all、race 实现，函数作为参数时的简写
一般函数当参数时，有一种情况可以直接简写，例子如下
```js
func(data => {
  console.log(data)
})
```
可以简写为
```js
func(console.log)
```
下面来看看在 Promise.all 和 Promise.race 实现中的应用
```js
class MyPromise {
  static all(array) {
    return new MyPromise((resolve, reject) => {
      let successCount = 0
      let resultArr = []
      for (let i = 0; i < array.length; i++) {
        let promise = MyPromise.resolve(array[i])
        promise._then((data) => {
          successCount++
          resultArr.push(data)
          successCount === array.length && resolve(resultArr)
        }, (err) => {
          reject(err)
        })
        // 函数参数 (err) => { reject(err) } 等价于 reject
      }
    })
  }

  static race(array) {
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < array.length; i++) {
        let promise = MyPromise.resolve(array[i])
        promise._then(resolve, reject)
        // 函数参数 (err) => { reject(err) } 等价于 reject
      }
    })
  }
}
```