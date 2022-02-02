---
{
  "title": "角色权限vuex状态管理设计思路",
  "staticFileName": "vuex_role.html",
  "author": "guoqzuo",
  "createDate": "2020/09/24",
  "description": "在vue项目中做角色权限控制时，如果角色较多、权限较复杂，或者很多地方需要使用，就需要使用vuex状态管理了，我们可以在vuex里提供一个getter方法，用于获取对应的角色权限，假设getter名为roleMuster，在需要用到的vue组件里，通过mapGetters导入，就可以使用了",
  "keywords": "vue角色权限,vuex权限",
  "category": "Vue"
}
---

# 角色权限vuex状态管理设计思路

在vue项目中做角色权限控制时，如果角色较多、权限较复杂，或者很多地方需要使用，就需要使用vuex状态管理了，我们可以在vuex里提供一个getter方法，用于获取对应的角色权限，假设getter名为roleMuster，在需要用到的vue组件里，通过mapGetters导入，就可以使用了

先来看看vuex store写法，把角色弄成role模块
```js
// role/index.js，只用到getters
import getters from './getters'
export default {
  namespaced: true,
  state: {},
  mutations: {},
  getters
}

// role/getters.js
export default {
  roleMuster(state, getters, rootState, rootGetters) {
    return {
      role_admin: 'xx',
      role_user: 'xx',
    }
  }
}
```

在vue组件中使用
```js
import { mapGetters } from 'vuex'

// 计算属性
computed: {
  ...mapGetters('role', ['roleMuster'])
}

// 如果有对应的权限，值则为true
let { role_admin, role_user, role_b, role_c } = this.roleMuster

```

在getter的逻辑里可以对角色对应的code进行转换，使用好理解变量代替，消除魔术字符串，当后端角色code变换时，我们这个变量不变，更有利于维护。
