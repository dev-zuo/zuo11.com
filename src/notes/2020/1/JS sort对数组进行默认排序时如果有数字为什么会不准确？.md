
# JS sort对数组进行默认排序时如果有数字为什么会不准确？

正常情况使用 sort 是好用的，但如果有数字时，会有问题，**因为如果sort不传参，默认情况下会将所有元素转换为字符串后，再根据unicode值来进行排序**，下面我们来看看对应的实例

```js
var arr = [5, -11, -10] 
arr.sort() // [-10, -11, 5]

var arr2 = [5, 0, 6, 11, 7]
arr2].sort() // [0, 11, 5, 6, 7]

// 明显上面的结果是有问题的，默认的排序遇到负数就不正确了
// 这就需要自定义排序了
arr.sort((a, b) => a - b) // [-11, -10, 5]
arr2.sort((a, b) => a - b) //  [0, 5, 6, 7, 11]
```

为什么会这样呢？我们来看看MDN官方解释 arr.sort([compareFunction])

> compareFunction(Optional)，Specifies a function that defines the sort order. If omitted, the array elements are converted to strings, then sorted according to each character's Unicode code point value.

sort参数指定一个自定义排序的函数，如果省略了该传值，数组的元素会先转换为string，再根据每个字符在Unicode的值来排序


综上，我们在使用sort进行排序时要注意两点：

1. **在对数组做sort操作时，会改变数组，不会像map那样返回一个新的数据，对原数组无影响**
2. **sort对非字符串排序时，一定要使用自定义排序**

参考: [Array.prototype.sort() | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)