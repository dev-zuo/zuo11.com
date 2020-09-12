
# 引用数据类型数组去重，去掉id重复的元素

有一个需求，客户信息列表，需要去除重复的客户。于是想着怎么优雅的写去重的逻辑，下面是最后使用的方法，使用 filter 遍历数组，将遍历的id存入 Set 数组，判断该数组里是否存在该id，如果已经存在就过滤，这样返回的就是去重后的数组了，具体实现如下

```js
let customerList = [ 
  { id: '1', info: 'xxx' },
  { id: '3', info: 'xxx' },
  { id: '1', info: 'xxx' },
  { id: '2', info: 'xxx' },
  { id: '3', info: 'xxx' },
]

// 去重
let tempSet = new Set()
let newList = customerList.filter(item => {
  if (tempSet.has(item.id)) {
    return false
  }
  tempSet.add(item.id)
  return true
})
console.log(newList)
// [
//   { id: '1', info: 'xxx' },
//   { id: '3', info: 'xxx' },
//   { id: '2', info: 'xxx' },
// ]
```
