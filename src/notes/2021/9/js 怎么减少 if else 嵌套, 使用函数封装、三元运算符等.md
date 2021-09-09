# js 怎么减少 if else 嵌套, 使用函数封装、三元运算符等

在 if else 或函数嵌套层级较多，代码会逐渐变的难看，不好理解及维护。一般可以通过改变代码组织方式，来减少代码嵌套层级，这里主要介绍下面 5 种方法：

1. 将代码块按功能块封装成函数，减少函数内代码的嵌套层级
2. if 优化，逻辑假时 true，减少 if 中包含大量代码的情况
3. 使用三元运算符减少 if 层级
4. 使用逻辑运算符减少 if 层级
5. 使用策略模式减少 if、else 层级

来看一个简单的例子，在 vue 实例中，watch 深度监听 userInfo 对象，里面的处理函数中有 if，有数组遍历函数，层级会比较深
```html
<script>
export default {
  data() {
    return {
      userInfo: {}
    };
  },
  watch: {
    userInfo: {
      handler(value) {
        if (value.name) {
          let indexMap = this.arrList.reduce(() => {
            console.log("test1");
            // 可能存在 if 或函数嵌套
          });

          this.list.forEach(item => {
            if (indexMap[item.index]) {
              console.log("test2");
            }
          });
        }
      },
      deep: true
    }
  }
};
</script>
```
下面来具体看减少代码嵌套层级的几种思路：

## 1.将代码块按功能块封装成函数

```js
if (condition) {
  let indexMap = this.arrList.reduce(() => {
    console.log("test1");
    // 可能存在的 if 或函数嵌套
  });
}

// 可以优化为下面这种，这样就避免了函数代码直接嵌套在 reduce 方法内部
if (condition) {
  const reduceFunc = () => {
    console.log("test1");
    // 可能存在的 if 或函数嵌套
  }
  let indexMap = this.arrList.reduce(reduceFunc);
}
```

## 2. if 优化，逻辑假时 true，减少 if 中包含大量代码的情况

```js
function func() {
  if (condition) {
    // 一大段代码
    // 可能存在 if 等嵌套层级的代码
  }
}
// 可以优化为下面这种，这样可以将一大段代码从 if (condition) 嵌套中解放出来
function func() {
  if (!condition) {
    return false // 条件不满足时结束函数
  }
  // 一大段代码
  // 可能存在 if 等嵌套层级的代码
}
```

## 3. 三元运算符

```js
function func() {
  let a = '1'
  if (b) {
    a = '2'
  }
}
// 可以优化为
function func() {
  let a = b ? '2' : '1'
}
```

## 4. 逻辑运算符

```js
function func() {
  if (callback) {
    callback()
  }
}
// 可以优化为
function func() {
  callback && callback()
}
```

## 5. 策略模式

```js
function func() {
  if (type === 'a') {
    // 执行内容 1
  } else if (type === 'b') {
    // 执行内容 2
  } else if (type === 'c') {
    // 执行内容 3
  }
  // 后续代码
}

// 使用策略模式优化
function func() {
  let handlerA = () => { console.log('执行内容1') }
  let handlerB = () => { console.log('执行内容2') }
  let handlerC = () => { console.log('执行内容3') }
  let handlerMap = {
    a: handlerA,
    b: handlerB,
    c: handlerC
  }
  handlerMap[type] && handlerMap[type]()
  // 后续代码
}
```