---
{
  "title": "vuex状态更新后一直没生效的问题",
  "staticFileName": "vuex_issue.html",
  "author": "guoqzuo",
  "createDate": "2019/12/12",
  "description": "今天写一个功能时，push数据更新state变量可以刷新到页面，但用slice改变state变量时，页面报错，提示 'TypeError: Cannot rad property 'wrapper' of undefined'，百度了下可能是@click方法没定义报的错，但我这里只是改了vuex状态，而且push新增数据都可以，就是slice删除数据会报错，最后发现是有一个@click方法确实没有定义，但这种情况很奇怪。为什么push又不报错，可能涉及到了diff的一些检测、算法。所以，页面有consloe.error的错误，一定要先解决，不要以为对功能没影响就不管，不然可能会遇到一些奇怪的问题。",
  "keywords": "vuex状态更新后一直没生效的问题,vuex TypeError: Cannot rad property 'wrapper' of undefined'",
  "category": "Vue"
}
---

# vuex状态更新后，一直没生效的问题

今天写一个功能时，push数据更新state变量可以刷新到页面，但用slice改变state变量时，页面报错，提示 'TypeError: Cannot rad property 'wrapper' of undefined'。

百度了下可能是@click方法没定义报的错，但我这里只是改了vuex状态，而且push新增数据都可以，就是slice删除数据会报错，最后发现是有一个@click方法确实没有定义，但这种情况很奇怪。

为什么push又不报错，可能涉及到了diff的一些检测、算法。

**所以，页面有consloe.error的错误，一定要先解决，不要以为对功能没影响就不管，不然可能会遇到一些奇怪的问题。**
