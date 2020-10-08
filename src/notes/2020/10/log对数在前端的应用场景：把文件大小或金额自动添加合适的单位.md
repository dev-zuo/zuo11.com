# log对数在前端的应用场景：把文件大小或金额自动添加合适的单位

在写下载/导出文件接口时，由于接口文件数据是流的形式而非buffer，导致total为0，无法获取进度。只能通过loaded知道当前下载了多少字节。前端显示时，怎么给出合适的单位，是KB、MB，还是G？

```js
// Math.pow(2, 0) // B
// > Math.pow(2, 10) // KB
// > Math.pow(2, 20) // MB
// > Math.pow(2, 30) // GB
// > Math.pow(2, 40) // TB
// > Math.pow(2, 50) // PB
// 以此类推...
```
可以通过对数来快速确定区间
```js
/**
 * @description 格式化文件size
 * @param { Number } value 文件大小 B 字节
 * @returns 转换后的文件大小及单位数组，保留两位小数
 * @example
 * formatFileSize(100) =>  [100, "B"]
 * formatFileSize(10000) => [9.77, "KB"]
 * formatFileSize(100000000) => [95.37, "MB"]
 */
function formatFileSize(value) {
  let unitArr = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB','YB']
  let index = Math.floor(Math.log2(value) / 10) // 计算该value的值为2的多少次方，向下取整
  // 如果超出范围取最大值
  if (index > unitArr.length - 1) {
    index = unitArr.length - 1
  }
  let result = value / Math.pow(2, index * 10) // 装换为合适的单位
  result = (result * 100).toFixed() / 100 

  return [result, unitArr[index]]
}
```
依此类推，假设给定单位为元，将值转换为合适的单位：元/万/亿/兆(万亿)，10的4次方 万，10的8次方 亿，10的12次方 兆
```js
/**
 * @description 格式化人民币
 * @param { Number } value 元
 * @returns 转换后的人民币及单位数组，保留两位小数
 * @example
 * formartMoney(1000) => [1000, "元"]
 * formartMoney(98000) => [9.8, "万"]
 * formartMoney(100000000) => [1, "亿"]
 */
function formartMoney(value) {
  let unitArr = ['元', '万', '亿', '兆'] 
  let index = Math.floor(Math.log10(value) / 4)
  // 如果超出范围取最大值
  if (index > unitArr.length - 1) {
    index = unitArr.length - 1
  }
  let result = value / Math.pow(10, index * 4) // 装换为合适的单位

  result = (result * 100).toFixed() / 100 

  return [result, unitArr[index]]
}
```

扩展：
- [KB,MB,GB,TB,在往上是什么单位呢](https://zhidao.baidu.com/question/542103416.html)
- [万亿上面是什么数位](https://zhidao.baidu.com/question/70310844.html)

