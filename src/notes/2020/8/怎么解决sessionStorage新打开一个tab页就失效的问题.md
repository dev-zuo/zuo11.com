---
{
  "title": "怎么解决sessionStorage新打开一个tab页就失效的问题",
  "staticFileName": "sessionStorage_loss.html",
  "author": "guoqzuo",
  "createDate": "2020/08/22",
  "description": "sessionStorage新打开一个tab页就失效,sessionStorage打开新tab丢失,首页我们要知道3点：1. sessionStorage在浏览器的两个tab页之前是无法共享的，一个tab页中sessionStorage修改后，不能触发其他tab页的storage事件 2. 当前tab页的localStorage修改是无法触发当前页的storage事件的，他会触发其他tab页的storage事件 3. localStorage的共享，只发生在同源的地址里。非同源无法共享localStorage 怎么将就页面的sessionStorage传递到新开的tab页呢？",
  "keywords": "sessionStorage新打开一个tab页就失效,sessionStorage打开新tab丢失",
  "category": "JavaScript"
}
---

# 怎么解决sessionStorage新打开一个tab页就失效的问题

首页我们要知道3点：
1. sessionStorage在浏览器的两个tab页之前是无法共享的，一个tab页中sessionStorage修改后，不能触发其他tab页的storage事件
2. 当前tab页的localStorage修改是无法触发当前页的storage事件的，他会触发其他tab页的storage事件
3. localStorage的共享，只发生在同源的地址里。非同源无法共享localStorage

怎么将就页面的sessionStorage传递到新开的tab页呢？

由于sessionStorage打开新tab页默认会丢失。那新开tab页的sessionStorage就是空的。我们可以判断，如果sessionStorage.length值为0，那么就是新开的页面。这时我们通过设置一个localStorage字段的值，触发之前打开页面的Storage事件，在这个事件里我们将当前页面的sessionStorage通过localStorage设置值，来触发新页面的Storage事件，把sessionStorage传递到新的页面

下面是部分核心代码，详细demo参见 [github demo地址](https://github.com/dev-zuo/fedemo/tree/master/src/vuecli-demo/src/views/sessionFailureNewTabTest)

```html
<script>
import NewTabSessionShare from "./newTabSessionShare";
export default {
  data() {
    return {
      alreadyCheck: false
    };
  },
  created() {
    this.alreadyCheck = sessionStorage.getItem("TEST_alreadyCheck") === "true";
    NewTabSessionShare.init(() => {
      this.alreadyCheck =
        sessionStorage.getItem("TEST_alreadyCheck") === "true";
    });
  }
}
```
newTabSessionShare.js
```js
class NewTabSessionShare {
  constructor() {}

  static init(cb) {
    let tempFields = "TEST_tempEmit";

    window.addEventListener("storage", event => {
      console.log(event);
      // 由于每个页面都会触发该事件，我们需要判断当前页是新开的tab页，还是旧的
      // 如果是新开的tab页，负责接收localStorage.getItem('sessionStorage') 并删除
      // 如果是旧的tab页，负责写入localStorage.setItem('sessionStorage')

      // 旧的tab页接收到事件时，key会是tempFields
      if (event.key === tempFields) {
        console.log("接收到新tab页打开时触发的消息");
        // 触发新tab页的storage事件，传递当前页的sessioinStorage事件
        localStorage.setItem("sessionStorage", JSON.stringify(sessionStorage));
        // 清除localStorage
        localStorage.removeItem("sessionStorage");
        // 这里会触发两次新tab页的storage事件
        // 1. newValue: "{"TEST_alreadyCheck":"true"}"  oldValue: null
        // 2. newValue: null oldValue: "{"TEST_alreadyCheck":"true"}"
      } else if (event.key === "sessionStorage") {
        console.log(
          "新tab页接收到老tab页，设置的localStorage，接收并删除",
          localStorage.getItem("sessionStorage")
        );
        // 新打开窗口如果newValue的值不为null，那就是旧tab页将其sessionStorage传递到了当前页
        // 然后，将传过来的数据原封不动的设置到当前页
        if (event.newValue !== null) {
          let data = JSON.parse(event.newValue);
          for (let key in data) {
            sessionStorage.setItem(key, data[key]);
          }
          typeof cb === "function" && cb();
        }
      }
    });

    // 如果是新开的tab页，那么sessoinStorage为空
    if (!sessionStorage.length) {
      // 通过触发其他页面的storage事件，来读取之前页面的sessionStorage并传递到当前页
      localStorage.setItem(tempFields, Date.now());
    }
  }
}

export default NewTabSessionShare;

```

参考
- [新开一个tab页，页面sessionStorage失效的问题](https://www.cnblogs.com/web-chuan/p/9335311.html)
- [storage事件 JS高程3笔记](https://www.yuque.com/guoqzuo/js_es6/sp2k81#70400d01)
- [storage demo示例，同时在两个tab页中打开该页面，console里设置localStorage试试](https://zuoxiaobai.github.io/fedemo/src/JS_ES6/JS%E9%AB%98%E7%A8%8B3/%E7%A6%BB%E7%BA%BF%E5%BA%94%E7%94%A8%E4%B8%8E%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%AD%98%E5%82%A8/%E6%95%B0%E6%8D%AE%E5%AD%98%E5%82%A8/storage.html)

