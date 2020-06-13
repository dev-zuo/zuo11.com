# el-form-item里非elment输入组件时，校验回调函数不触发的问题

今天写表单校验规则，有个 el-form-item 里使用了富文本编辑器，发现校验规则校验这个值会有异常：
1. 当 change 或 blur 时，根本没有触发校验(提示错误)
2. 提交表单时，当该字段校验失败会提示错误，但该字段符合要求时，validate的回调一直没触发，导致无法进行校验成功之后的下一步操作

将富文本编辑器换成 el-input 正常，换成普通的 input 也会异常，感觉一头雾水。

使用 this.$refs.ruleForm.validateField('xxx') 单读校验也不行，这个应该是element表单输入组件特有的

于是粗略看了下源码，发现错误信息在form-item(也就是el-form-item)组件里处理，当el-select或el-input值改变时会将事件传递给form-item

两个不同的组件，一个组件里怎么捕获到另一个组件的事件呢，在element内部使用了发布订阅设计模式来处理：
1. 在form-item里订阅事件
2. 当el-input或el-select等elemnt表单输入组件的值改变时，发布事件

来看源码

```js
// 在 form-item 里订阅事件
// https://github.com/ElemeFE/element/blob/1.x/packages/form/src/form-item.vue
if (rules.length || this._props.hasOwnProperty('required')) {
  this.$on('el.form.blur', this.onFieldBlur);
  // 订阅了el.form.change事件
  this.$on('el.form.change', this.onFieldChange);
}

// 当 el-input 值改变时，发布事件
// https://github.com/ElemeFE/element/blob/1.x/packages/input/src/input.vue
// el-input
setCurrentValue(value) {
  if (value === this.currentValue) return;
  this.$nextTick(_ => {
    this.resizeTextarea();
  });
  this.currentValue = value;
  if (this.validateEvent) {
    // 发布el.form.change事件
    this.dispatch('ElFormItem', 'el.form.change', [value]);
  }
}

// el-select
// https://github.com/ElemeFE/element/blob/1.x/packages/select/src/select.vue
value(val) {
  if (this.multiple) {
    this.resetInputHeight();
    if (val.length > 0 || (this.$refs.input && this.query !== '')) {
      this.currentPlaceholder = '';
    } else {
      this.currentPlaceholder = this.cachedPlaceHolder;
    }
  }
  this.setSelected();
  if (this.filterable && !this.multiple) {
    this.inputLength = 20;
  }
  this.$emit('change', val);
  this.dispatch('ElFormItem', 'el.form.change', val);
}
```

所以，如果表单里使用了非element输入组件，比如普通的input，当值改变或输入框失去焦点时，没有发布对应的事件，那么form-item组件就不会触发校验

怎么来处理呢？这里暂时采用自定义方法来处理：
1. 从rules移除对应的字段 required，至于label前面的红星，直接在el-form-item__label类上加一个before属性来设置
2. 对于行内显示错误信息，可以在el-form-item__label的after里显示错误信息，通过一个父类的error-class来控制隐藏显示
3. 单独写校验逻辑，如果校验失败加上一个error-class，如果想做的更逼真一点，在错误时给输入组件加一个红色的border