---
{
  "title": "vue为什么要将插槽slot='aaa'的写法变更为v-slot:aaa",
  "staticFileName": "slot_vs_v-slot.html",
  "author": "guoqzuo",
  "createDate": "2020/08/15",
  "description": "vue slot v-slot区别,v-slot是slot的语法糖，在 2.6.0 中，我们为具名插槽和作用域插槽引入了一个新的统一的语法 (即 v-slot 指令)。它取代了 slot 和 slot-scope 这两个目前已被废弃但未被移除。具名插槽 主要用于当有多个插槽时，通过名字对不同的插槽进行区分，先来看看聚名插槽使用时的一个特殊场景，由于在父组件里调用用子组件，会写上对应的插槽，这时插槽的作用域为当前的父组件，插槽内部使用的变量名默认都是从父组件取的。下面的例子中 slotA插槽内部调用的 user，它默认是当前组件的变量（父组件）",
  "keywords": "vue slot v-slot区别,v-slot是slot的语法糖",
  "category": "Vue"
}
---
# vue为什么要将插槽slot="aaa"的写法变更为v-slot:aaa

> 在 2.6.0 中，我们为具名插槽和作用域插槽引入了一个新的统一的语法 (即 v-slot 指令)。它取代了 slot 和 slot-scope 这两个目前已被废弃但未被移除

具名插槽 主要用于当有多个插槽时，通过名字对不同的插槽进行区分

## 先来看看聚名插槽使用时的一个特殊场景
由于在父组件里调用用子组件，会写上对应的插槽，这时插槽的作用域为当前的父组件，插槽内部使用的变量名默认都是从父组件取的。下面的例子中 slotA插槽内部调用的 user，它默认是当前组件的变量（父组件）
```html
<base-layout>
  <template v-slot:slotA>  <!-- 等价于 <template slot="slotA"> -->
    <h1>Here might be a page title {{ user }}</h1>
  </template>

  <p>A paragraph for the main content.</p>
</base-layout>
```

那如果想在插槽里面获取对应子组件作用域里的变量，也就是我想获取base-layout组件里面的变量，就需要**作用域插槽**了

## 作用域插槽使用方法
在调用时通过增加一个 slot-scope属性 拿到子组件slot上 v-bind的所有属性。
```html
<base-layout>
  <template v-slot:slotA="slotProps"> 
  <!-- 上面是语法糖等价于 <template slot="slotA" slot-scope="slotProps"> -->
    <h1>Here might be a page title {{slotProps.user}}</h1>
  </template>

  <p>A paragraph for the main content.</p>
</base-layout>
```
base-layout子组件实现时，将需要给出的属性v-bind到对应的slot，这样在父组件调用时，插槽内部就可以放到子组件内部的属性了，来看代码
```html
<!-- base-layout组件实现 -->
<div>
  <header>
    <slot name="slotA" v-bind:user="user"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
</div>
```

## v-slot:aaa是slot="aaa"的语法糖

v-slot将slot和slot-scope简写为一个属性，且v-slot更符合vue的语法规则，来对比下

```html
<!-- base-layout组件调用 新的写法 -->
<base-layout>
  <!-- 
    通过template(不能是其他元素) 指定其子元素的内容放到name为slotA的插槽里
    可以通过slotProps拿到slot位置bind的所有属性 
  -->
  <template v-slot:slotA="slotProps">
    <h1>Here might be a page title {{slotProps.user}}</h1>
  </template>

  <p>A paragraph for the main content.</p>
</base-layout>

<!-- base-layout组件调用 旧的写法 -->
<base-layout>
  <!-- 
    通过普通元素和template 指定其子元素的内容放到name为slotA的插槽里
    可以通过slotProps拿到slot位置bind的所有属性 
  -->
  <div slot="slotA" slot-scope="slotProps">
    <h1>Here might be a page title {{slotProps.user}}</h1>
  </div>

  <p>A paragraph for the main content.</p>
</base-layout>
```


参考：
- [ v-slot | vue rfcs](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0001-new-slot-syntax.md)
- [插槽 | Vue.js](https://cn.vuejs.org/v2/guide/components-slots.html)
