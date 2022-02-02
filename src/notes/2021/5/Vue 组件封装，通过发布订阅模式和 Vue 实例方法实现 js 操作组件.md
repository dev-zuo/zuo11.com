---
{
  "title": "Vue 组件封装，通过发布订阅模式和 Vue 实例方法实现 js 操作组件",
  "staticFileName": "vue_js_comp.html",
  "author": "guoqzuo",
  "createDate": "2021/05/04",
  "description": "以消息组件为例，如果多个组件共用一个全局的消息组件，那怎么优雅的显示消息呢？普通的组件 props 传值的方式会受限，因为组件层级是不确定的。你可能会想到状态管理，将是否显示消息、消息内容存到状态管理 state 中，如果需要显示就修改 vuex 值即可。但这样调用起来会不够方便、简洁。这里我们可以使用发布订阅模式，结合 Vue 实例属性来优雅的实现该功能。下面来看看使用示例",
  "keywords": "vue js 操作组件, vue 组件封装",
  "category": "Vue"
}
---
# Vue 组件封装，通过发布订阅模式和 Vue 实例方法实现 js 操作组件
以消息组件为例，如果多个组件共用一个全局的消息组件，那怎么优雅的显示消息呢？

普通的组件 props 传值的方式会受限，因为组件层级是不确定的。

你可能会想到状态管理，将是否显示消息、消息内容存到状态管理 state 中，如果需要显示就修改 vuex 值即可。

但这样调用起来会不够方便、简洁。这里我们可以使用发布订阅模式，结合 Vue 实例属性来优雅的实现该功能。下面来看看使用示例

```html
<!-- 先在 main.js 里全局注册 -->
<!-- 
import MessageInfo from "./components/message-info/index.js";
Vue.use(MessageInfo);
-->

<!-- msgTest 测试页面 -->
<template>
  <div>
    <button @click="showMsg">Show msg</button>
    <!-- 消息组件 message-info -->
    <message-info>
      <!-- slot -->
      <button @click="closeMsg">手动关闭 message</button>
    </message-info>
  </div>
</template>

<script>
export default {
  methods: {
    // 显示弹窗
    showMsg() {
      this.$showMsg(["消息1", "消息2"]);
    },

    // 手动关闭弹窗
    closeMsg() {
      this.$closeMsg();
    }
  }
};
</script>
<style></style>
```
上面的例子中，我们使用 this.$showMsg() 和 this.$closeMsg() 来轻松实现了消息的显示与关闭。这样做的好处是，**可以在任何子组件中来操作消息的显示和隐藏**，简单方便。

下面来看 message-info 组件的具体实现，组件目录如下，相比其他组件多了 EventBus.js，MessageInfo.js 主要用于发布订阅事件处理
```bash
├── message-info
│   ├── src 
│   │   ├── EventBus.js # 发布订阅 bus
│   │   ├── index.vue # vue 组件
│   │   └── MessageInfo.js # js 对象
│   └── index.js # 组件入口文件，Vue.use 时注册全局组件，绑定实例属性
```

message-info/index.js 入口文件

```js
import MessageInfo from "./src/index.vue";
import MessageInfoCore from "./src/MessageInfo.js";

MessageInfo.install = function(Vue) {
  // 注册全局组件 message-vue
  Vue.component(MessageInfo.name, MessageInfo);

  // 绑定实例属性
  Vue.prototype.$showMsg = MessageInfoCore.showMsg;
  Vue.prototype.$closeMsg = MessageInfoCore.closeMsg;
};

export default MessageInfo;
```
message-info/src/index.vue 组件代码
```html
<template>
  <!-- 父元素遮罩层-->
  <div class="msg-info-wrap" v-if="showMsg" @click="closeMsg">
    <!-- 消息弹窗 -->
    <div class="msg-info" @click.stop>
      <!-- 消息列表 -->
      <div v-for="msg in messages" :key="msg">{{ msg }}</div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Bus from "./EventBus";

export default {
  name: "MessageInfo",
  data() {
    return {
      showMsg: false,
      messages: []
    };
  },

  created() {
    Bus.$on("showMsg", msgList => {
      this.showMsg = true; // 显示消息
      this.messages = msgList; // 显示对应的消息列表
    });
    Bus.$on("closeMsg", this.closeMsg);
  },

  destroyed() {
    Bus.$off("showMsg");
    Bus.$off("closeMsg");
  },

  methods: {
    closeMsg() {
      this.showMsg = false;
      this.messages = [];
    }
  }
};
</script>

<style lang="less" scoped>
.msg-info-wrap {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.1);
  .msg-info {
    position: absolute;
    top: 30%;
    left: 50%;
    width: 50%;
    padding: 20px;
    border-radius: 5px;
    transform: translate(-50%, -50%);
    background: #fff;
  }
}
</style>
```
message-info/src/EventBus.js
```js
import Vue from "vue";

let Bus = new Vue();

export default Bus;
```
message-info/src/MessageInfo.js
```js
import Bus from "./EventBus";

class MessageInfo {
  static showMsg(...args) {
    Bus.$emit("showMsg", ...args);
  }

  static closeMsg(...args) {
    Bus.$emit("closeMsg", ...args);
  }
}

export default MessageInfo;
```

完整 github 代码地址： [message 组件 代码 | github](https://github.com/zuoxiaobai/fedemo/tree/master/src/vuecli-demo/src/components/message-info)