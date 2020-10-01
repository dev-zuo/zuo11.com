# http请求有哪几种传参方式

在swagger文档里，有一个传参类型的描述 Parameter Type，一般有四种

- header 通过请求头传参，也就是参数加到首部 headers 里
- path  参数放到url路径里，比如 /user/123 这里 123是用户id
- query 查询参数，也就是url后面 ? 符号之后的传参，一般用于get请求传参，比如 /user/123?a=xx&b=xx
- body 参数放到请求体，一般用于post请求，相对get请求来说，安全性好，可以传的数据更多