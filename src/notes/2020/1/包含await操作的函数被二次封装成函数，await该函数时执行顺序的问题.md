
# 包含await操作的函数被二次封装成函数，await该函数时执行顺序的问题

包含await操作的函数被二次封装成函数，await该函数时执行顺序需要注意，当一个包含await的函数A，被另一个函数B包裹，当await函数B执行时，如果包裹函数B里并没有return函数A或await函数A，await函数B执行时并不会等到函数A全部执行完毕才继续执行，来看个例子

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