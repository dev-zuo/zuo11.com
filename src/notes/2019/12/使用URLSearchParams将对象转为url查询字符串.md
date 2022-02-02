---
{
  "title": "使用URLSearchParams将对象转为url查询字符串",
  "staticFileName": "url_query.html",
  "author": "guoqzuo",
  "createDate": "2019/12/05",
  "description": "在做get请求时，我们需要传一些参数，单纯的字符串拼接的方法不够优雅，下面来看怎么用URLSearchParams将对象直接转为查询字符串，另外查看axios源码，看看axios内部是怎么将params对象拼接到url上的",
  "keywords": "对象转url查询字符串,axios是怎么将params对象转查询字符串的",
  "category": "JavaScript"
}
---

# 使用URLSearchParams将对象转为url查询字符串

在做get请求时，我们需要传一些参数，单纯的字符串拼接的方法不够优雅，下面来看怎么用URLSearchParams将对象直接转为查询字符串，另外查看axios源码，看看axios内部是怎么将params对象拼接到url上的

## 对象转查询参数
```js
let obj = {a: 1, b: 2}
let queryParams = new URLSearchParams()
Object.entries(obj).forEach(([key, value]) => {
  queryParams.append(key, value)
})
console.log(queryParams.toString()) // a=1&b=2s
```

更多URLSearchParams的细节操作参见之前的一篇文章 [URLSearchParams URL查询字符串处理](http://www.zuo11.com/blog/2019/10/web_url_searchparams.html)

## axios是怎么将config里的params对象转url查询参数的
在axios中，如果我们想在url后面添加查询字符串，只需要在config参数里加一个params属性，传入对象即可
```js
{
  // ...
  // `params` are the URL parameters to be sent with the request
  // Must be a plain object or a URLSearchParams object
  params: {
    ID: 12345
  },

  // `paramsSerializer` is an optional function in charge of serializing `params`
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function (params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },
  // ....
}
```
那axios内部是怎么将对象转为字符串的呢？来看下axios的源码
```js
// 生成path用的是buildURL方法
// lib/adapters/http.js
path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ''),

// lib/helpers/buildURL.js
'use strict';

var utils = require('./../utils');

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

```
可以看到axios拼接url的过程

- 序列化
  - 如果config里有传入paramsSerializer参数，就使用这个函数来转换，一般是使用的是一个qs的npm包，https://www.npmjs.com/package/qs
  - 如果是is URLSearchParams，直接toString()
  - 如果非上面两种情况，在不支持URLSearchParams的情况下也能用，使用utils.forEach去转成

- 拼接 '?' 或 '&'