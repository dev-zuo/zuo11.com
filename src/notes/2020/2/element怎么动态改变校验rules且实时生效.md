

# element怎么动态改变校验rules且实时生效

在需要动态设置rules，并需要其实时生效的场景，一般需要将rules完成改变才行，这是为什么呢，下面来看看

## 实际应用场景
在做项目的过程中，需要需要动态变更rules的场景，有两个功能点：
1. 某个checkbox的值改变，有部分字段需要在必须和可选间切换
2. 某个cascader组件值改变时，需要动态切换部分字段（有删有减）

需要注意的地方
1. 可选和必选切换，只需要改变rules里的require属性，true和false之间切换（我之前直接暴力删rule里的fields，这种方法不能关闭原来必选时触发的错误提示）
2. 对于动态修改rules后，必选的小红星以及之前的错误信息还在的问题，需要完全改变rules的值，才能重新触发校验，使前端页面更新

```js
// 强制触发表单校验更新
this.rules = JSON.parse(JSON.stringify(this.rules))
```

## element对rules的监听逻辑
```js
// 截取自element源码: https://github.com/ElemeFE/element/blob/dev/packages/form/src/form.vue
watch: {
  rules() {
    // remove then add event listeners on form-item after form rules change
    this.fields.forEach(field => {
        field.removeValidateEvents();
        field.addValidateEvents();
    });

    if (this.validateOnRuleChange) {
        this.validate(() => {});
    }
  }
},
```

我们来看看element form 相关源码，可以看到使用watch监听rules的改变，没有使用deep，所以直接改变某个嵌套的属性时，是无法监听到的。这里可能是为了提高性能，就没加deep
