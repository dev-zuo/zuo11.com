---
{
  "title": "ES2020 bigint数据类型，为什么要新增这个数据类型?",
  "staticFileName": "bigint.html",
  "author": "guoqzuo",
  "createDate": "2019/12/26",
  "description": "ES5之前，基本数据类型有五个 boolean, string, number, null, undefined, ES6(ES2015)新增了一个symbol，ES2019 新增了 bigint，它用于表示大于 2的53次方 - 1的数据，即 > 9007199254740991",
  "keywords": "a + 1 === a + 2为true的场景,es2019 bigint数据类型",
  "category": "JavaScript"
}
---

# ES2020 bigint数据类型，为什么要新增这个数据类型?

ES5之前，基本数据类型有五个 boolean, string, number, null, undefined, ES6(ES2015)新增了一个symbol，ES2020 新增了 bigint，它用于表示大于 2的53次方 - 1的数据，即 > 9007199254740991

## a + 1 === a + 2
我们可以先来看一个神奇的例子：a + 1 === a + 2，居然可以成立，注意这里是全等？当a等于 2的53次方 - 1 时，就会出现这种情况
```js
var a = Math.pow(2, 53) - 1 // 正好是 Number.MAX_SAFE_INTEGER
a + 1 === a + 2 // true
```

以下是 tc39/proposal bigint 官方示例

```js
const x = Number.MAX_SAFE_INTEGER; // 最大的安全integer
// ↪ 9007199254740991, this is 1 less than 2^53

const y = x + 1;  
// ↪ 9007199254740992, ok, checks out

const z = x + 2
// ↪ 9007199254740992, wait, that’s the same as above!

// 不安全的integer，结果不符合预期
num = Number.MAX_SAFE_INTEGER // 9007199254740991
num + 1 // 9007199254740992
num + 2 // 9007199254740992
num + 3 // 9007199254740994
num + 4 // 9007199254740996
num + 5 // 9007199254740996
num + 6 // 9007199254740996
num + 7 // 9007199254740998
num + 8 // 9007199254741000
num + 9 // 9007199254741000
num + 10 // 9007199254741000
```

## 怎么解决上面的问题呢？使用bigint处理
BigInt数据类型有以下一个特性:
1. BigInt 类型的数据，需要通过 BingInt函数来创建
2. BigInt 类型的数据后面都会携带一个'n'的后缀，
3. BigInt 类型的数据不能和 number 数据类型相加
4. BigInt 类型的数据可以通过 toString转换为字符串，转后为字符串时，会默认去掉末尾的 'n'
5. typeof BigInt数据类型，值为 'bignit'

```js
const previousMaxSafe = BigInt(Number.MAX_SAFE_INTEGER);
// ↪ 9007199254740991n

const maxPlusOne = previousMaxSafe + 1n;
// ↪ 9007199254740992n
 
const theFuture = previousMaxSafe + 2n;
// ↪ 9007199254740993n, this works now!

BigInt(1) // 1n
let theBiggestInt = BigInt(2 ** 53) // 9007199254740992n
theBiggestInt + 2 // Uncaught TypeError: Cannot mix BigInt and other types, use explicit conversions
9007199254740994n.toString()  // "9007199254740994"
```

参考：
- [tc39/proposal-bigint: Arbitrary precision integers in JavaScript](https://github.com/tc39/proposal-bigint)
- [BigInts in JavaScript_ A case study in TC39.pptx](https://www.yuque.com/guoqzuo/csm14e/mig1pq)
- [JS最新基本数据类型:BigInt](https://segmentfault.com/a/1190000019912017?utm_source=tag-newest)
- [tc39 Finished Proposals](https://github.com/tc39/proposals/blob/master/finished-proposals.md)
