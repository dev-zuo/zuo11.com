
# custom validator check failed for prop "percentage"

在使用element的 el-progress 组件时，出现 custom validator check failed for prop "percentage" 的错误，后来发现是 percentage 属性设置的值超过了100，我们可以在js逻辑理加一个判断，set percentage 的值时，不能超过100，如果大于100，就直接设置为100

```html
<el-progress type="circle" :percentage="0"></el-progress>
```

参考:

[el-progress组件 - ElemntUI](https://element.eleme.cn/#/zh-CN/component/progress#huan-xing-jin-du-tiao)