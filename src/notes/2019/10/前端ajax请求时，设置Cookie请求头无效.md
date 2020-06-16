# 前端ajax请求时，设置Cookie请求头无效

前端设置请求头无效，header 设置cookie 无效，ajax 强制设置cookie无效，在前端mock接口时，对于需要设置请求头校验的情况，可能会想着在前端发送请求时设置对应的请求头，但发现前端设置了Cookie请求头，会出错。这是什么原因呢？

查资料后，了解到在前端发送AJAX请求时，有些请求头是无法设置的，比如：
```js
Accept-Charset
Accept-Encoding
Access-Control-Request-Headers
Access-Control-Request-Method
Connection
Content-Length
Cookie
Cookie2
Date
DNT
Expect
Host
Keep-Alive
Origin
Proxy-
Sec-
Referer
TE
Trailer
Transfer-Encoding
Upgrade
Via
```

参考：
- [Forbidden header name - MDN Web Docs Glossary: Definitions of Web-related terms | MDN](https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name)
- [前端设置Cookie请求头报错 Refused to set unsafe header Cookie_JavaScript_Lan77-CSDN博客](https://blog.csdn.net/qq_33679504/article/details/80736865)