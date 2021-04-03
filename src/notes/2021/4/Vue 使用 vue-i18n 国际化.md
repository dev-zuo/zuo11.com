# Vue 使用 vue-i18n 国际化

在 vue 项目中，可以使用 [vue-i18n](https://kazupon.github.io/vue-i18n/zh/started.html#html) 来做国际化。下面来看具体是怎么使用的

1. 安装
```bash
npm install vue-i18n --save
```

2. 在 main.js 引入，并做初始化配置，使用 locale 设置默认语言，使用 messages 对象属性，指定不同语言对应的内容。

```js
// main.js
import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'ja', // 设置默认语言环境
  // 在 vue template 的 {{}} 中，使用 $t('un') 即可拿到 un 属性指定的值
  // 不需要在 data() {} 中设置什么
  messages: {
    en: { // 中文
      un: 'hi',  
      message: {
        hello: 'hello world',
      },
    },
    ja: { // 日文
      un: 'ちは',
      message: {
        hello: 'こんにちは、世界',
      },
    }
  },
})

new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
```

3. 在 vue template 中直接使用。如果想动态切换语言，使用 `this.$root.$i18n.locale = 'en'` 即可修改语言

```html
<template>
  <div id="app">
    <div id="nav">
      <p>{{ $t('un') }}</p>
      <p>{{ $t('message.hello') }}</p>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  created() {
    setTimeout(() => {
      console.log('lang change')
      this.$root.$i18n.locale = 'en' // 5s 后变更默认语言为英文
    }, 5000)
  },
}
</script>
```

注意如果信息较多，messages 信息的内容，最好模块化，尽量分割成子模块，不要全部写在一起。