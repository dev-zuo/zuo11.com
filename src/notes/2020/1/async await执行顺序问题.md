
# asycn/await 执行顺序问题

注意：await 后面的内容如果值为promise，则等待promise执行完再向下执行，如果非promise，await不会等待(await下面的代码和await等待的函数会同步执行)

```js
(async () => {
  await test() // await fn()
  console.log('异步执行完成')
})()

async function test() {
  fn() // return fn() 或 await fn()
}

async function fn(next) {
  console.log('start fn')
  await delay()
  console.log('end fn')
}

function delay() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
}

// return fn()  或 await fn() 结果
// start fn
// end fn
// 异步执行完成

// fn() 结果
// start fn
// 异步执行完成
// end fn
```

参考：[async/await函数的执行顺序的理解 - csdn](https://blog.csdn.net/guzhao593/article/details/84191401)