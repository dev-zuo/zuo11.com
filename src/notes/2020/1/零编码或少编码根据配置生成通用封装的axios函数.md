---
{
  "title": "零编码或少编码根据配置生成通用封装的axios函数",
  "staticFileName": "axios_package.html",
  "author": "guoqzuo",
  "createDate": "2020/01/19",
  "description": "现在项目中，每个模块都会单独弄一个对应service.js，把所有接口请求放到里面，其实就是将axios请求封装为一个个函数。每个函数的函数名、url、请求方法会有所差别。重复代码比较多。最近在看mongodb教程时，了解到零编码编程的思想，于是想把这里优化下，最好以后写新模块时，只要写简单的配置文件就可以自动生成函数，不用再单独手写函数",
  "keywords": "axios二次封装,axios服务封装",
  "category": "http与https"
}
---
# 零编码或少编码生成通用封装的axios函数

现在项目中，每个模块都会单独弄一个对应service.js，把所有接口请求放到里面，其实就是将axios请求封装为一个个函数。每个函数的函数名、url、请求方法会有所差别。重复代码比较多。最近在看mongodb教程时，了解到零编码编程的思想，于是想把这里优化下，最好以后写新模块时，只要写简单的配置文件就可以自动生成函数，不用再单独手写函数。先来看看原来的方式：
```js
// someService.js
// 这里的service是对axios的封装，增加了一些请求拦截，用响应拦截等
import { service, downloadService } from '../service.js'
let someService = {
  urls: {
    funcA: '/api/url1',
    funcB: '/api/url2',
    funcC: '/api/url3',
  },
  funcA() {
    return service.post(someService.urls.funcA, payload)
  },
  funcB() {
    return service.get(someService.urls.funcB, {params: payload})
  },
  funcC() {
    return downloadService.post(someService.urls.funcC, payload)
  }
}
export default someService

// 在vue组件里，使用方法
import someService from 'someService.js'
someService.funcA(payload).then(() => {
  // 接收结果
})
```
当接口比较多时，比如20+，那就需要写20个类似的函数，冗余性太高，这里使用零编码编程的思想来优化一下，先来看看优化后的代码
```js
// 优化后的 someService.js 和旧的写法实现的功能一样，且更加强大
import generateCommonApi from './utils/generateCommonApi'
import { downloadService } from '../service.js'

// 之前使用对象结构，发现还是有大量重复的属性字段，不是很方便，用数组的方式，写法更精简，更高效
// 但同时牺牲了扩展性，类似于大的框架总会遇到的问题：各种实现都各有优缺点，关键是要去找一种平衡，做一些取舍。
const someApiList = [
  ['funcA', '/api/url1', 'post'],
  ['funcB', '/api/url2'],
  ['funcC', '/api/url3', 'post', downloadService]
]
export default generateCommonApi(someApiList)
```
这里通过写一个generateCommonApi.js来实现自动生成通用api对象，以后就不用再写大量重复的代码了。来看看具体实现:
```js
// generateCommonApi.js
// 参考文档：https://github.com/axios/axios
import { services } from './service.js'

function generateCommonApi(apiList, isAddTimestamp2Url) {
  let obj = {}
  let methodsList = ['request', 'get', 'delete', 'head', 'options', 'post', 'put' 'patch']

  // 遍历JSON配置，生成对应的请求函数并挂载到obj对象
  apiList.forEach(item => {
    let [apiName, url, method = 'get', servicesFunc = services] = item
    let isMethodOk = typeof method === 'string' && methodsList.includes(method.toLowerCase())
    method = isMethodOk ? method : 'get'

    // 如果需要加时间戳
    url += isAddTimestamp2Url ? '' : `${url.includes('?') ? '&' : '?'}t=${+new Date()}`

    obj[apiName] = async (payload = {}, config = {}) => {
      let paramsMap = {
        '1': [payload],
        '2': [url, {params: payload, ...config}],
        '3': [url, payload, config]
      }
      let is3Args = ['post', 'put', 'patch'].includes(method)
      let methodType = method === 'request' ? '1' : is3Args ? '3' : '2'

      return servicesFunc[method](...paramsMap[methodType])
    }
  })
  return obj
}

export default generateCommonApi 
```

后面我又对其进行了扩展与修改，这里只提供一个思路，并不是完美的实现，