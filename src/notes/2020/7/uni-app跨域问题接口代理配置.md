# uni-app跨域问题接口代理配置
在uni-app中有一个manifest.json配置文件，里面的h5配置下有默认的devServer选项，和vue.config.js里的代理配置一致，都是使用的webpack的代理功能，默认配置为
```js
"h5": {
  "devServer" : {
      "https" : false,
      "port" : 80
  }
}
```
根据具体情况，具体配置，下面是一个示范配置
```js
"h5": {
  "devServer": {
    "port": 8086,
    "disableHostCheck": true,
    "proxy": {
      "/": {
          "target": "http://xxxx:8086/",
          "changeOrigin": true,
          "secure": false
      }
    }
  }
}
```
这里要注意的是，**要在manifest.json文件配置，而不是pages.json里，每次修改配置后记得点击重新运行到浏览器，如果不生效关闭再开启HBuildeX，多试试**