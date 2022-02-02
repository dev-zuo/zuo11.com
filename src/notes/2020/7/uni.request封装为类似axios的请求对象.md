---
{
  "title": "uni.request封装为类似axios的请求对象",
  "staticFileName": "uni_request.html",
  "author": "guoqzuo",
  "createDate": "2020/07/26",
  "description": "uni.request封装,uni axios分装,在uni-app中为了抹平各平台的差异，官方提供了uni.request方法，和微信小程序的请求方法类似，一般这类请求是比较通用的，如果直接使用会有大量的重复代码，于是做了简单的封装，来看看代码",
  "keywords": "uni.request封装,uni axios分装",
  "category": "移动端混合开发"
}
---
# uni.request封装为类似axios的请求对象
在uni-app中为了抹平各平台的差异，官方提供了uni.request方法，和微信小程序的请求方法类似，一般这类请求是比较通用的，如果直接使用会有大量的重复代码，于是做了简单的封装，来看看代码

axios.js
```js
/**
 * @description 将uni.request封装成简单的aixos
 * @author guoqzuo
 * @example
 * axios.create(config) 根据配置，创建axios实例
 * axios.get(url[, config]) get请求
 * axios.post(url[, data[, config]]) post请求
 * config支持配置项
 * baseURL: "https://some-domain.com/api/", // baseURL
 * timeout: 1000, // 超时时间
 * headers: { "X-Custom-Header": "foobar" }, // 请求头
 * method: '' // 请求方法
 * url: '', // 请求url
 * data: '' // post 请求的data
 * toastErrorMsg 是否用toast显示错误信息，默认为是
 * showLoading  是否显示loading
 * reTry 是否重试，默认为否，待实现
 * params: '' // url后面的查询参数，待实现
 */

import Utils from '@/utils/utils.js'
class Axios {
  constructor() {
    this.config = {}
  }

  // 全局配置，返回一个axios实例
  create(config = {}) {
    Object.assign(this.config, config)
    return this
  }

  get(url = '', data = {}, config = {}) {
    // 暂不支持params
    config = { ...this.config, ...config, url, method: 'GET', data }
    return this._request(config)
  }

  post(url = '', data = {}, config = {}) {
    config = { ...this.config, ...config, url, method: 'POST', data }
    return this._request(config)
  }

  // uni.request 封装
  _request(config) {
    return new Promise(async (resolve, reject) => {
      const {
        baseURL,
        timeout,
        headers,
        method,
        url,
        data = {},
        toastErrorMsg,
        showLoading,
        successCode = 0
      } = config
      showLoading &&
        uni.showLoading({
          mask: true
        })
      const token = uni.getStorageSync('shopUserToken');
      token && (data.token = token)
      const [error, res] = await uni.request({
        data,
        method,
        header: headers,
        timeout,
        url: baseURL + url
      })

      // 请求完成后做 complete 该执行的内容
      showLoading && uni.hideLoading()

      // 判断请求是否成功，这里很奇怪，官方把error直接返回了，类似于node的callback
      if (error) {
        this._showToast(toastErrorMsg, error.errMsg)
        reject(error.errMsg)
        return
      }

      // statusCode === 200
      const { statusCode, header, data: resData } = res
      if (!resData || typeof resData !== 'object') {
        const msg = '接口异常，data数据出错'
        this._showToast(toastErrorMsg, msg)
        reject(msg)
        return
      }

      const { code = '', msg = '' } = resData
      // 请求成功，且状态码ok
      if (Number.parseInt(code) === successCode) {
        resolve(resData.data)
      } else {
        // msg: "登录失效，请重新登录" code: -400
        if (`${code}` === '-400') {
          uni.redirectTo({
            url: '/pages/login/login'
          })
          setTimeout(() => {
            this._showToast(toastErrorMsg, msg)
          }, 1000)
        } else {
          this._showToast(toastErrorMsg, msg)
        }
        reject(msg)
      }
    })
  }

  // 根据toastErrorMsg判断是否需要显示错误信息
  _showToast(toastErrorMsg, msg) {
    toastErrorMsg &&
      uni.showToast({
        title: msg,
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false
      })
  }
}

const axios = new Axios()
export default axios

```
配置axios service.js
```js
// service.js
import axios from './utils/axios'

const axiosInstance = axios.create({
  baseURL: "/index.php",
  successCode: 0, // 后端自己定义的成功或的错误码
  toastErrorMsg: true, // 是否用toast显示错误信息，默认为是
  showLoading: true  // 是否显示loading
});

export default axiosInstance
```
模块 modules/user.js
```js
import createServiceFromConfig from '../utils/createServiceFromConfig'

// 用户模块service
export default createServiceFromConfig([
  ['login', '/user/login', 'post'] // 登录
])
```
根据配置生成接口服务 createServiceFromConfig.js
```js
import service from '../service'

function createServiceFromConfig(configList) {
  let serviceObj = {}
  configList.forEach(item => {
    let [apiName, url, method = 'get'] = item
    serviceObj[apiName] = (payload = {}, config = {}) => {
      let url = item[1] // url 是第二位
      // uni.request 设置data会直接附加到get请求末尾，所以不用转换
      // let params = method === 'get' ? [config] : [payload, config]
      let params = [payload, config]
      return service[method](url, ...params); // 等价于 return axios.get(..)
    }
  })
  return serviceObj
}

export default createServiceFromConfig
```

调用接口
```js
import userService from "@/service/modules/user";
async login() {
  try {
    let data = await userService.login({
      mobile: "xxx",
      password: "xxx"
    });
    console.log(data);
  } catch (e) {
    console.error(e);
  }
}
```