
# echarts饼图label两端对齐label距离引导线距离

在对 echarts 饼图label做自定义时，可以通过label选项的 distanceToLabelLine 设置 label 距离引导线距离、alignTo 设置两端对齐。注意echarts版本要是 v4.6 + ，下面来看示例

```js
// 两端对齐 + 引导线距离
{
name: '访问来源',
type: 'pie',
minAngle: 90, // label最小扇区大小
label: {
    normal: {
        alignTo: 'edge', // label两端对称布局
        //  ECharts v4.6.0 版本起，提供了 'labelLine' 与 'edge' 两种新的布局方式
        margin: 90, // 布局为两端对称时候需要外边距防止图表变形 数值随意不要太大
        distanceToLabelLine: 0, // label距离引导线距离
        formatter: function(param) {
            return '{a|' + param.name + '}\n{hr|}\n' + '{d|' + param.value + '}';
        },
        rich: {
            a: {
                padding: [4, 10, 0, 10],  // 4边距是文字和hr间距，此处的边距10用于解决label和引导线有间距问题
                color: 'blue'
            },
            d: {
                padding: [0, 10, 4, 10],
                color: 'purple'
            },
            hr: {
                borderWidth: 1,
                width: '100%',
                height: 0,
                borderColor: ' '
            }
        }
    },

}

// 分隔线上线显示内容 
label: {
    normal: {
        formatter: '{font|{c}}\n{hr|}\n{font|{d}%}',
        rich: {
            font: {
                fontSize: 20,
                padding: [5, 0],
                color: '#fff'
            },
            hr: {
                height: 0,
                borderWidth: 1,
                width: '100%',
                borderColor: '#fff'
            }
        }
    },
},
labelLine: {
    lineStyle: {
        color: '#fff'
    }
}
```

参考：
- [饼图标签两端对称效果](https://gallery.echartsjs.com/editor.html?c=x1TVKFGtZ1)
- [南丁格尔 + 折线上下内容显示](https://gallery.echartsjs.com/editor.html?c=xtv96q-x7e)
