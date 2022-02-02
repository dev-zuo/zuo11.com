---
{
  "title": "正则表达式使用 () 和 match 或 replace 提取 url 路径参数",
  "staticFileName": "regExp_url.html",
  "author": "guoqzuo",
  "createDate": "2021/05/04",
  "description": "正则提取 url 参数，来看一个问题，使用正则表达式从 url 中提取区域、城市id、模块、页数id。url 示例如下 1. `http://www.xx.com/region/gd/module` 2. `http://www.xx.com/region/gd-c222/module` 3. `http://www.xx.com/region/gd-c222/module/p2` 下面来看看怎么实现。首先，回顾下正则表达式（Regular Expression）基础。正则表表达式以 `/pattern/flags` 表示，是 RegExp 对象的实例",
  "keywords": "正则提取 url 参数",
  "category": "JavaScript"
}
---
# 正则表达式使用 () 和 match 或 replace 提取 url 路径参数

来看一个问题，使用正则表达式从 url 中提取区域、城市id、模块、页数id。url 示例如下

1. `http://www.xx.com/region/gd/module`
2. `http://www.xx.com/region/gd-c222/module`
3. `http://www.xx.com/region/gd-c222/module/p2`

下面来看看怎么实现

首先，回顾下正则表达式（Regular Expression）基础。正则表表达式以 `/pattern/flags` 表示，是 RegExp 对象的实例

```js
/[a-z]*/g instanceof RegExp // true
```

pattern 模式由下面的字符组成
- `边界符号(^、$)` ^ 以 xx 开头，$ 以 xx 结尾
  - `/^abc/` 表示以 abc 开头
  - `/abc$/` 表示以 abc 结尾
- `字符集合([]、^、-)` 一系列的字符集合
  - `[abc]` 表示 abc 里面的任意一个字符
  - `[^abc]` 表示任意一个非 abc 字符，注意 ^ 在 [] 里面表示非 xx 字符
  - `[a-z0-9]` 表示 a 到 z 的字符，0 到 9 字符
- `预定义模式字符(.、\d、\w、\s、\n)` 一些常见字符集合的简写
  - `.` 表示除 \r\n 之外的所有字符
  - `\d` 是 `[0-9]` 的简写，表示数字
  - `\D` 是 `[^0-9]` 的简写，表示非数字
  - `\w` 是 `[0-9a-zA-Z_]` 的简写，表示数字、字母、下划线
  - `\W` 是 `[^0-9a-zA-Z_]` 的简写，表示非数字、字母、下划线
  - `\s` 是 `[ ]` 的简写，表示空白符(空格)，`"  a  b c   ".replace(/\s/g, '') === "abc"`
  - `\S` 是 `[^ ]` 的简写，表示非空白符
  - `\n` 表示 换行符

- `匹配次数/数量(?、*、+、{})`
  - `?` 匹配前面的模式 0 次或 1 次 {0, 1}
  - `*` 匹配前面的模式 0 次或多次 {0, }
  - `+` 匹配前面的模式 1 次或多次 {1, }
  - `{n}`	匹配前面的模式 n 次
  - `{n,m}` 匹配前面的模式 至少 n 次，至多 m 次
- `其他 ()、|`
  - `()` 用于匹配字符串中的多个部分，比如 `(\w+)\s(\w+)` 匹配 `aaa bbb`，第一部分 $1 为 'aaa'，第二部分 $2 为 'bbb'。可以使用 regExp.exec(str) 返回对象的 index 来获取对应的部分值。或者 replace 时，使用 $1 $2 等格式替代。
  - `|` 表示或 `/a|b/` 表示 a 或者 b 
- `转义字符* + ? $ ^ . | \ ( ) { } [ ]` 正则表达式保留字符都需要在前面加 `\` 进行转义，比如字符 `/` 需要使用 `\/` 表示

flags 标志位：g 不仅仅匹配第一个，全局匹配。i 忽略大小写

正则表达式中，一个 () 表示一个部分，来看一个例子。

```js
let str = "zuo guoqing"
let reg = /(\w+)\s(\w+)/ // 匹配两个部分 '第一部分 第二部分'
str.replace(reg, "$2 $1") // 将两个部分对调，"guoqing zuo"
str.match(reg) // { 0: "zuo guoqing", 1: "zuo", 2: "guoqing" }
reg.exec(str) // { 0: "zuo guoqing", 1: "zuo", 2: "guoqing" }
```

现在我们可以使用 () 来分部分（块）提取 url 中的字符了，将 url 拆解 `.com之前的部分\/区域部分\/城市以及id部分\/模块部分\/页数部分`
```js
// .com 之前的部分 [\S]+.com\/  匹配一个或多个非空白符.com\/
// 区域部分 ([\w]*)\/ 匹配 0 个 或多个 数字字母下划线
// 城市及id部分 ([\w-]*)\/ 匹配 0 个或多个 数字字母下划线 -
// 模块部分 ([\w]*)\/?
// 页数部分 ([\w]*)$
let regExp = /[\S]+.com\/([\w]*)\/([\w-]*)\/([\w]*)\/?([\w]*)$/
let a = `http://www.xx.com/region/gd/module`
let b = `http://www.xx.com/region/gd-c222/module`
let c = `http://www.xx.com/region/gd-c222/module/p2`
a.replace(regExp, '$1 $2 $3 $4') // "region gd module "
b.replace(regExp, '$1 $2 $3 $4') // "region gd-c222 module "
c.replace(regExp, '$1 $2 $3 $4') // "region gd-c222 module p2"
a.match(regExp) // { 1: "region", 2: "gd", 3: "module", 4: "" }
c.match(regExp) // { 1: "region", 2: "gd-c222", 3: "module", 4: "p2" }
```

