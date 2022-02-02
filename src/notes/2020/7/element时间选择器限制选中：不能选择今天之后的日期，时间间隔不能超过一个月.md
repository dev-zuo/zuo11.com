---
{
  "title": "element时间选择器限制选中：不能选择今天之后的日期，时间间隔不能超过一个月",
  "staticFileName": "el-date-picker-limit.html",
  "author": "guoqzuo",
  "createDate": "2020/07/26",
  "description": "elmement el-date-picker限制选中,elmement el-date-picker disabled某些选中,element时间限制选中,一般使用 picker-options 这个属性来disable某些时间段，注意 如果设置了default-time 00:00:00 - 23:59:59 会影响对应的日期判断，必要时可以去掉，逻辑可以由后端处理",
  "keywords": "elmement el-date-picker限制选中,elmement el-date-picker disabled某些选中",
  "category": "Vue"
}
---
# element时间选择器限制选中：不能选择今天之后的日期，时间间隔不能超过一个月

一般使用 picker-options 这个属性来disable某些时间段，注意 如果设置了default-time 00:00:00 - 23:59:59 会影响对应的日期判断，必要时可以去掉，逻辑可以由后端处理

## 不能选择今天之后的日期
```html
<el-date-picker
  v-model="value1"
  type="date"
  :picker-options="pickerOptions"
  placeholder="选择日期">
</el-date-picker>
<script>
export default {
  data() {
    return {
      // 时间不能选择今天之后的日期
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      }
    }
  }
}
</script>
```

## 时间间隔不能超过一个月
点击某个时间后会触发 pickerOptions里的 onPick函数，获取当前点击的时间，然后计算时间disabled前后一个月的时间
```js
// <el-date-picker v-model="date" type="daterange" :picker-options="pickerOptions">
// </el-date-picker>
export default {
  data() {
    const pickerOptions = {
      // 选中时间时触发 element第一次选中后会赋值给minDate
      onPick: ({ maxDate, minDate }) => {
        this._curClickDate = minDate.getTime()
        // 第二次选中后，按两次点击的时间顺序依次赋值给 minDate、maxDate
        // 且面板会关闭，这时要清空_curClickDate，供下一次使用
        maxDate && (this._curClickDate = '')
      },
      disabledDate: time => {
        const { _curClickDate } = this
        const gap = 31 * 24 * 3600 * 1000 // 一个月，按31天算
        const t = time.getTime()
        let start = _curClickDate - gap
        let end = _curClickDate + gap
        return t > Date.now() || (_curClickDate && (t > end || t < start))
      }
    }
    return {
      date: '',
      pickerOptions,
    }
  }
}
```
具体demo：[在线体验](https://zuoxiaobai.github.io/fedemo/src/DebugDemo/element%E6%97%B6%E9%97%B4%E9%80%89%E6%8B%A9/) [github demo源码地址](https://github.com/zuoxiaobai/fedemo/blob/master/src/DebugDemo/element%E6%97%B6%E9%97%B4%E9%80%89%E6%8B%A9/index.html)

## 如果可选日期由后台的接口返回
这种情况可以把pickerOptions放到计算属性里
